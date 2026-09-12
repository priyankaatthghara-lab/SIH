import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Star, Calendar, Users, Search, Briefcase, Clock,
  CheckCircle2, X, BookOpen, Zap, MapPin, Video, Building2, UserCheck, Mail
} from "lucide-react";
import { useStudent } from "../../context/StudentContext";
import {
  getData,
  bookMentorSession,
  getMentorBookings,
  cancelMentorBooking,
  assignMentorToStudent,
  getAssignmentsForStudent,
} from "../../services/storageService";

// ── Skill-match helper ────────────────────────────────────────
const getSkillMatch = (mentorExpertise, studentSkills) => {
  if (!studentSkills?.length || !mentorExpertise?.length) return [];
  const criticalGapSkills = studentSkills
    .filter(sk => sk.required - sk.current > 10)
    .map(sk => sk.name.toLowerCase());
  return mentorExpertise.filter(exp =>
    criticalGapSkills.some(sk =>
      exp.toLowerCase().includes(sk) || sk.includes(exp.toLowerCase())
    )
  );
};

// ── Star Rating ───────────────────────────────────────────────
const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      {[1,2,3,4,5].map(i => (
        <Star
          key={i}
          size={13}
          color={i <= full ? "#F59E0B" : "#E5E7EB"}
          fill={i <= full ? "#F59E0B" : "none"}
        />
      ))}
      <span style={{ fontSize: 12, fontWeight: 700, color: "#374151", marginLeft: 2 }}>{rating}</span>
    </div>
  );
};

// ── Booking Modal ─────────────────────────────────────────────
const BookingModal = ({ mentor, onClose, onBook, existingBookings }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [booked, setBooked] = useState(false);

  const alreadyBookedDates = existingBookings
    .filter(b => b.mentorId === mentor.id)
    .map(b => b.date + b.time);

  const handleConfirm = () => {
    if (!selectedSlot) return;
    onBook({
      mentorId: mentor.id,
      mentorName: mentor.name,
      date: selectedSlot.date,
      time: selectedSlot.time,
      mode: selectedSlot.mode,
    });
    setBooked(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div style={m.overlay} onClick={onClose}>
      <div style={m.modal} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={m.modalHeader}>
          <div>
            <h2 style={m.modalTitle}>Book a Session</h2>
            <p style={m.modalSub}>with {mentor.name}</p>
          </div>
          <button style={m.closeBtn} onClick={onClose}><X size={18} /></button>
        </div>

        {booked ? (
          <div style={m.successBox}>
            <CheckCircle2 size={36} color="#15803D" />
            <p style={m.successText}>Session booked successfully!</p>
          </div>
        ) : (
          <>
            <p style={m.slotPrompt}>Select an available time slot:</p>
            <div style={m.slotList}>
              {(mentor.availableSlots || []).map((slot, i) => {
                const key = slot.date + slot.time;
                const isBooked = alreadyBookedDates.includes(key);
                const isSelected = selectedSlot === slot;
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={isBooked}
                    style={{
                      ...m.slotBtn,
                      backgroundColor: isBooked ? "#F9FAFB" : isSelected ? "#EFF6FF" : "#FFFFFF",
                      border: `1.5px solid ${isBooked ? "#E5E7EB" : isSelected ? "#2563EB" : "#E5E7EB"}`,
                      opacity: isBooked ? 0.5 : 1,
                      cursor: isBooked ? "not-allowed" : "pointer",
                    }}
                    onClick={() => !isBooked && setSelectedSlot(slot)}
                  >
                    <div style={m.slotDate}>
                      <Calendar size={14} color={isSelected ? "#2563EB" : "#374151"} />
                      <span style={{ color: isSelected ? "#2563EB" : "#111827", fontWeight: 600 }}>{slot.date}</span>
                    </div>
                    <div style={m.slotDetails}>
                      <span style={m.slotTime}><Clock size={12} /> {slot.time}</span>
                      <span style={{
                        ...m.modeChip,
                        backgroundColor: slot.mode === "Online" ? "#EFF6FF" : "#F0FDF4",
                        color: slot.mode === "Online" ? "#2563EB" : "#15803D",
                      }}>
                        {slot.mode === "Online" ? <Video size={11} /> : <Building2 size={11} />}
                        {slot.mode}
                      </span>
                    </div>
                    {isBooked && <span style={m.bookedTag}>Already booked</span>}
                    {isSelected && !isBooked && (
                      <CheckCircle2 size={16} color="#2563EB" style={{ position: "absolute", top: 10, right: 10 }} />
                    )}
                  </button>
                );
              })}
            </div>
            <div style={m.modalFooter}>
              <button style={m.cancelBtn} onClick={onClose}>Cancel</button>
              <button
                style={{
                  ...m.confirmBtn,
                  opacity: selectedSlot ? 1 : 0.5,
                  cursor: selectedSlot ? "pointer" : "not-allowed",
                }}
                onClick={handleConfirm}
                disabled={!selectedSlot}
              >
                Confirm Booking
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const AssignmentModal = ({ mentor, student, gaps, onClose, onAssign }) => {
  const [skillId, setSkillId] = useState(gaps[0]?.id || "");
  const [note, setNote] = useState("");
  const selectedSkill = gaps.find((skill) => skill.id === skillId);

  const handleConfirm = () => {
    if (!selectedSkill) return;
    onAssign({
      mentorId: mentor.id,
      mentorName: mentor.name,
      mentorCompany: mentor.company,
      studentId: student.id,
      studentName: student.name,
      studentEmail: student.email,
      skillId: selectedSkill.id,
      skillName: selectedSkill.name,
      note: note.trim(),
    });
  };

  return (
    <div style={m.overlay} onClick={onClose}>
      <div style={m.modal} onClick={(event) => event.stopPropagation()}>
        <div style={m.modalHeader}>
          <div>
            <h2 style={m.modalTitle}>Assign Mentor</h2>
            <p style={m.modalSub}>{student.name} · {mentor.name}</p>
          </div>
          <button style={m.closeBtn} onClick={onClose}><X size={18} /></button>
        </div>
        {gaps.length === 0 ? (
          <div style={m.emptyAssignment}>
            <CheckCircle2 size={28} color="#15803D" />
            <p>No open skill gaps remain for this student.</p>
          </div>
        ) : (
          <>
            <div style={m.formBody}>
              <label style={m.fieldLabel} htmlFor="gap-select">Skill gap to support</label>
              <select id="gap-select" value={skillId} onChange={(event) => setSkillId(event.target.value)} style={m.select}>
                {gaps.map((skill) => (
                  <option key={skill.id} value={skill.id}>{skill.name} ({skill.required - skill.current} pts)</option>
                ))}
              </select>
              <label style={m.fieldLabel} htmlFor="assignment-note">Note (optional)</label>
              <textarea id="assignment-note" value={note} onChange={(event) => setNote(event.target.value)} placeholder="Add guidance for the student..." style={m.textarea} />
            </div>
            <div style={m.modalFooter}>
              <button style={m.cancelBtn} onClick={onClose}>Cancel</button>
              <button style={m.confirmBtn} onClick={handleConfirm} disabled={!selectedSkill}>
                <UserCheck size={14} /> Assign &amp; Notify Student
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ── Mentor Card ───────────────────────────────────────────────
const MentorCard = ({ mentor, skillMatches, onBook, onAssign, isBooked, assignedSkills, studentName }) => {
  return (
    <div style={c.card}>
      {/* Top: avatar + info */}
      <div style={c.topRow}>
        <img src={mentor.avatar} alt={mentor.name} style={c.avatar} />
        <div style={c.info}>
          <div style={c.name}>{mentor.name}</div>
          <div style={c.role}>{mentor.designation}</div>
          <div style={c.company}>
            <Briefcase size={12} color="#6B7280" /> {mentor.company}
          </div>
          <StarRating rating={mentor.rating} />
        </div>
      </div>

      {/* Stats row */}
      <div style={c.statsRow}>
        <div style={c.stat}>
          <span style={c.statVal}>{mentor.experience}y</span>
          <span style={c.statLbl}>Experience</span>
        </div>
        <div style={c.statDivider} />
        <div style={c.stat}>
          <span style={c.statVal}>{mentor.totalSessions}</span>
          <span style={c.statLbl}>Sessions</span>
        </div>
        <div style={c.statDivider} />
        <div style={c.stat}>
          <span style={c.statVal}>{mentor.availableSlots?.length ?? 0}</span>
          <span style={c.statLbl}>Open Slots</span>
        </div>
      </div>

      {/* Bio */}
      <p style={c.bio}>{mentor.bio}</p>

      {/* Expertise chips */}
      <div style={c.expertiseRow}>
        {(mentor.expertise || []).map(exp => (
          <span key={exp} style={c.expChip}>{exp}</span>
        ))}
      </div>

      {/* Skill gap match indicator */}
      {skillMatches.length > 0 && (
        <div style={c.matchBanner}>
          <Zap size={13} color="#D97706" />
          <span style={c.matchText}>
            Helps close your gap in: {skillMatches.slice(0, 3).join(", ")}
          </span>
        </div>
      )}

      {assignedSkills.length > 0 && (
        <div style={c.assignedBanner}>
          <CheckCircle2 size={13} color="#15803D" />
          <span>Assigned for: {assignedSkills.join(", ")}</span>
        </div>
      )}

      <button style={c.assignBtn} onClick={() => onAssign(mentor)}>
        <UserCheck size={14} /> Assign to {studentName}
      </button>
      <button
        style={{
          ...c.bookBtn,
          ...(isBooked
            ? { backgroundColor: "#DCFCE7", color: "#15803D", border: "1px solid #BBF7D0" }
            : {}),
        }}
        onClick={() => onBook(mentor)}
      >
        {isBooked ? (
          <><CheckCircle2 size={14} /> Session Booked — Book Another</>
        ) : (
          <><Calendar size={14} /> Book a Session</>
        )}
      </button>
    </div>
  );
};

// ── My Bookings Panel ─────────────────────────────────────────
const MyBookings = ({ bookings, onCancel }) => {
  if (bookings.length === 0) {
    return (
      <div style={b.emptyBox}>
        <Calendar size={28} color="#D1D5DB" />
        <p style={{ color: "#9CA3AF", fontSize: 14, margin: 0 }}>
          No sessions booked yet. Find a mentor and book your first session!
        </p>
      </div>
    );
  }
  return (
    <div style={b.list}>
      {bookings.map(booking => (
        <div key={booking.id} style={b.item}>
          <div style={b.itemLeft}>
            <div style={b.bookingName}>{booking.mentorName}</div>
            <div style={b.bookingMeta}>
              <span><Calendar size={12} /> {booking.date}</span>
              <span><Clock size={12} /> {booking.time}</span>
              <span>
                {booking.mode === "Online"
                  ? <><Video size={12} /> Online</>
                  : <><MapPin size={12} /> In-Person</>
                }
              </span>
            </div>
            <span style={{ ...b.statusChip, backgroundColor: "#DCFCE7", color: "#15803D" }}>
              {booking.status}
            </span>
          </div>
          <button style={b.cancelBtn} onClick={() => onCancel(booking.id)}>
            <X size={13} /> Cancel
          </button>
        </div>
      ))}
    </div>
  );
};

// ── Main page ─────────────────────────────────────────────────
const Mentors = () => {
  const { student } = useStudent();
  const db = getData();
  const mentors = db?.mentors || [];
  const studentSkills = student?.skills || [];

  const [search, setSearch] = useState("");
  const [expertiseFilter, setExpertiseFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("find"); // "find" | "bookings"
  const [bookingMentor, setBookingMentor] = useState(null);
  const [assignmentMentor, setAssignmentMentor] = useState(null);
  const [assignmentMessage, setAssignmentMessage] = useState("");
  const [bookings, setBookings] = useState(() => getMentorBookings());
  const [assignments, setAssignments] = useState(() => getAssignmentsForStudent(student.id));

  // All unique expertise tags
  const allExpertise = useMemo(() => {
    const tags = new Set();
    mentors.forEach(m => (m.expertise || []).forEach(e => tags.add(e)));
    return ["All", ...Array.from(tags)];
  }, [mentors]);

  const filtered = useMemo(() => {
    let list = mentors;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.company.toLowerCase().includes(q) ||
        (m.expertise || []).some(e => e.toLowerCase().includes(q))
      );
    }
    if (expertiseFilter !== "All") {
      list = list.filter(m => (m.expertise || []).includes(expertiseFilter));
    }
    return list;
  }, [mentors, search, expertiseFilter]);

  const handleBook = (mentor) => {
    setBookingMentor(mentor);
  };

  const handleConfirmBook = (bookingData) => {
    const newBooking = bookMentorSession(bookingData);
    setBookings(getMentorBookings());
    return newBooking;
  };

  const handleCancel = (bookingId) => {
    cancelMentorBooking(bookingId);
    setBookings(getMentorBookings());
  };

  const handleAssign = (mentor) => setAssignmentMentor(mentor);

  const handleConfirmAssignment = (assignmentData) => {
    const assignment = assignMentorToStudent(assignmentData);
    setAssignments(getAssignmentsForStudent(student.id));
    setAssignmentMentor(null);
    setAssignmentMessage(`Mentor assigned and email notification recorded for ${student.email}.`);
    window.setTimeout(() => setAssignmentMessage(""), 4500);
    return assignment;
  };

  const bookedMentorIds = bookings.map(b => b.mentorId);

  return (
    <div style={p.page}>

      {/* ── Page Header ── */}
      <div style={p.pageHeader}>
        <div>
          <div style={p.breadcrumb}>
            <Link to="/" style={p.homeLink}>Home</Link> &rsaquo; Mentors
          </div>
          <h1 style={p.pageTitle}>Mentors</h1>
          <p style={p.pageSubtitle}>
            Connect with industry experts — book 1-on-1 sessions to accelerate your career
          </p>
        </div>
        {/* Booking count badge */}
        {bookings.length > 0 && (
          <div style={p.bookingsBadge}>
            <CheckCircle2 size={16} color="#15803D" />
            <span style={{ fontSize: 13, fontWeight: 600, color: "#15803D" }}>
              {bookings.length} Session{bookings.length > 1 ? "s" : ""} Booked
            </span>
          </div>
        )}
      </div>

      {/* ── Tabs ── */}
      <div style={p.tabs}>
        <button
          style={{ ...p.tab, ...(activeTab === "find" ? p.tabActive : {}) }}
          onClick={() => setActiveTab("find")}
        >
          <Users size={15} /> Find Mentors
          <span style={{
            ...p.tabCount,
            backgroundColor: activeTab === "find" ? "#2563EB" : "#E5E7EB",
            color: activeTab === "find" ? "#fff" : "#6B7280",
          }}>{mentors.length}</span>
        </button>
        <button
          style={{ ...p.tab, ...(activeTab === "bookings" ? p.tabActive : {}) }}
          onClick={() => setActiveTab("bookings")}
        >
          <Calendar size={15} /> My Bookings
          {bookings.length > 0 && (
            <span style={{
              ...p.tabCount,
              backgroundColor: activeTab === "bookings" ? "#2563EB" : "#EF4444",
              color: "#fff",
            }}>{bookings.length}</span>
          )}
        </button>
      </div>

      {activeTab === "bookings" ? (
        <div style={p.contentCard}>
          <div style={p.sectionTitle}>
            <Calendar size={17} color="#2563EB" />
            <h2 style={p.sTitle}>My Booked Sessions</h2>
          </div>
          <MyBookings bookings={bookings} onCancel={handleCancel} />
        </div>
      ) : (
        <>
          {assignmentMessage && (
            <div style={p.assignmentNotice}><Mail size={15} /> {assignmentMessage}</div>
          )}
          {/* ── Search + Filter ── */}
          <div style={p.searchFilterBar}>
            <div style={p.searchBox}>
              <Search size={14} color="#9CA3AF" />
              <input
                type="text"
                placeholder="Search mentor, company or skill…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={p.searchInput}
              />
            </div>
            <div style={p.filterPills}>
              {allExpertise.slice(0, 10).map(tag => (
                <button
                  key={tag}
                  type="button"
                  style={{
                    ...p.pill,
                    backgroundColor: expertiseFilter === tag ? "#2563EB" : "#F3F4F6",
                    color: expertiseFilter === tag ? "#fff" : "#4B5563",
                  }}
                  onClick={() => setExpertiseFilter(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* ── Skill-match info banner ── */}
          {student?.skills?.some(sk => sk.required - sk.current > 10) && (
            <div style={p.matchInfo}>
              <Zap size={14} color="#D97706" />
              <span style={{ fontSize: 12.5, color: "#92400E" }}>
                <strong>Skill Gap Alert:</strong> Mentors highlighted below can directly help with your critical skill gaps. Book early!
              </span>
            </div>
          )}

          {/* ── Mentor Grid ── */}
          {filtered.length === 0 ? (
            <div style={p.emptyState}>
              <BookOpen size={28} color="#D1D5DB" />
              <p style={{ color: "#9CA3AF", fontSize: 14, margin: 0 }}>No mentors match your search.</p>
            </div>
          ) : (
            <div style={p.mentorGrid}>
              {filtered.map(mentor => {
                const skillMatches = getSkillMatch(mentor.expertise, studentSkills);
                const isBooked = bookedMentorIds.includes(mentor.id);
                return (
                  <MentorCard
                    key={mentor.id}
                    mentor={mentor}
                    skillMatches={skillMatches}
                    onBook={handleBook}
                    onAssign={handleAssign}
                    isBooked={isBooked}
                    assignedSkills={assignments.filter((a) => a.mentorId === mentor.id).map((a) => a.skillName)}
                    studentName={student.name.split(" ")[0]}
                  />
                );
              })}
            </div>
          )}
        </>
      )}

      {/* ── Booking Modal ── */}
      {bookingMentor && (
        <BookingModal
          mentor={bookingMentor}
          onClose={() => setBookingMentor(null)}
          onBook={handleConfirmBook}
          existingBookings={bookings}
        />
      )}
      {assignmentMentor && (
        <AssignmentModal
          mentor={assignmentMentor}
          student={student}
          gaps={studentSkills.filter((skill) => skill.required > skill.current && !assignments.some((a) => a.skillId === skill.id && a.status === "Active"))}
          onClose={() => setAssignmentMentor(null)}
          onAssign={handleConfirmAssignment}
        />
      )}
    </div>
  );
};

// ── Styles ────────────────────────────────────────────────────
const p = {
  page: { display: "flex", flexDirection: "column", gap: 24, paddingBottom: 40 },
  pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 },
  breadcrumb: { fontSize: 13, color: "#6B7280", marginBottom: 4 },
  homeLink: { color: "#2563EB", textDecoration: "none", fontWeight: 500 },
  pageTitle: { fontSize: 26, fontWeight: 700, color: "#111827", margin: "0 0 4px 0", letterSpacing: "-0.5px" },
  pageSubtitle: { fontSize: 13.5, color: "#6B7280", margin: 0 },
  bookingsBadge: {
    display: "flex", alignItems: "center", gap: 8,
    backgroundColor: "#DCFCE7", border: "1px solid #BBF7D0",
    padding: "10px 16px", borderRadius: 10,
  },
  tabs: {
    display: "flex", gap: 4,
    backgroundColor: "#F3F4F6", padding: 4, borderRadius: 10,
    width: "fit-content",
  },
  tab: {
    display: "flex", alignItems: "center", gap: 7,
    padding: "8px 18px", borderRadius: 8, border: "none",
    fontSize: 13.5, fontWeight: 600, color: "#6B7280",
    backgroundColor: "transparent", cursor: "pointer",
    transition: "all 0.15s ease",
  },
  tabActive: { backgroundColor: "#FFFFFF", color: "#111827", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" },
  tabCount: {
    fontSize: 11, fontWeight: 700, padding: "2px 7px", borderRadius: 20,
  },
  searchFilterBar: {
    display: "flex", flexDirection: "column", gap: 12,
    backgroundColor: "#FFFFFF", border: "1px solid #F3F4F6",
    borderRadius: 14, padding: "16px 18px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  },
  searchBox: {
    display: "flex", alignItems: "center", gap: 8,
    backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB",
    borderRadius: 10, padding: "9px 14px",
  },
  searchInput: {
    border: "none", backgroundColor: "transparent", outline: "none",
    fontSize: 13, color: "#111827", width: "100%",
  },
  filterPills: { display: "flex", flexWrap: "wrap", gap: 6 },
  pill: {
    border: "none", padding: "6px 13px", borderRadius: 8,
    fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
  },
  matchInfo: {
    display: "flex", alignItems: "center", gap: 8,
    backgroundColor: "#FFFBEB", border: "1px solid #FDE68A",
    borderRadius: 10, padding: "10px 16px",
  },
  assignmentNotice: {
    display: "flex", alignItems: "center", gap: 8, color: "#166534",
    backgroundColor: "#DCFCE7", border: "1px solid #BBF7D0",
    borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 600,
  },
  mentorGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 16,
  },
  emptyState: {
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", gap: 12,
    backgroundColor: "#FFFFFF", border: "1px solid #F3F4F6",
    borderRadius: 16, padding: "48px 24px",
  },
  contentCard: {
    backgroundColor: "#FFFFFF", border: "1px solid #F3F4F6",
    borderRadius: 16, padding: "22px 22px 18px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  sectionTitle: { display: "flex", alignItems: "center", gap: 8, marginBottom: 18 },
  sTitle: { fontSize: 15, fontWeight: 700, color: "#111827", margin: 0 },
};

const c = {
  card: {
    backgroundColor: "#FFFFFF", border: "1px solid #F3F4F6",
    borderRadius: 16, padding: "20px 20px 16px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    display: "flex", flexDirection: "column", gap: 12,
  },
  topRow: { display: "flex", gap: 14, alignItems: "flex-start" },
  avatar: { width: 52, height: 52, borderRadius: 12, border: "2px solid #F3F4F6", flexShrink: 0 },
  info: { display: "flex", flexDirection: "column", gap: 2 },
  name: { fontSize: 15, fontWeight: 700, color: "#111827" },
  role: { fontSize: 12.5, color: "#4B5563", fontWeight: 500 },
  company: { display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#6B7280" },
  statsRow: {
    display: "flex", justifyContent: "space-around", alignItems: "center",
    backgroundColor: "#F9FAFB", borderRadius: 10, padding: "10px 14px",
  },
  stat: { display: "flex", flexDirection: "column", alignItems: "center", gap: 2 },
  statVal: { fontSize: 16, fontWeight: 800, color: "#111827" },
  statLbl: { fontSize: 10.5, color: "#9CA3AF", fontWeight: 500 },
  statDivider: { width: 1, height: 28, backgroundColor: "#E5E7EB" },
  bio: { fontSize: 12.5, color: "#6B7280", lineHeight: 1.55, margin: 0 },
  expertiseRow: { display: "flex", flexWrap: "wrap", gap: 6 },
  expChip: {
    fontSize: 11.5, fontWeight: 600,
    backgroundColor: "#EFF6FF", color: "#2563EB",
    border: "1px solid #BFDBFE", padding: "3px 9px", borderRadius: 20,
  },
  matchBanner: {
    display: "flex", alignItems: "center", gap: 6,
    backgroundColor: "#FFFBEB", border: "1px solid #FDE68A",
    borderRadius: 8, padding: "7px 10px",
  },
  matchText: { fontSize: 12, color: "#92400E", fontWeight: 600 },
  bookBtn: {
    display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
    backgroundColor: "#2563EB", color: "#FFFFFF",
    border: "none", borderRadius: 10, padding: "10px 16px",
    fontSize: 13, fontWeight: 700, cursor: "pointer",
    transition: "all 0.15s ease", marginTop: 4,
  },
  assignBtn: {
    display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
    backgroundColor: "#F5F3FF", color: "#6D28D9",
    border: "1px solid #DDD6FE", borderRadius: 10, padding: "9px 16px",
    fontSize: 13, fontWeight: 700, cursor: "pointer",
  },
  assignedBanner: {
    display: "flex", alignItems: "center", gap: 6, color: "#166534",
    backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0",
    borderRadius: 8, padding: "7px 10px", fontSize: 12, fontWeight: 600,
  },
};

const b = {
  list: { display: "flex", flexDirection: "column", gap: 12 },
  item: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
    padding: "14px 16px", backgroundColor: "#F9FAFB", borderRadius: 12,
    border: "1px solid #E5E7EB",
  },
  itemLeft: { display: "flex", flexDirection: "column", gap: 5 },
  bookingName: { fontSize: 14, fontWeight: 700, color: "#111827" },
  bookingMeta: {
    display: "flex", flexWrap: "wrap", gap: 10,
    fontSize: 12, color: "#6B7280",
    alignItems: "center",
  },
  statusChip: {
    display: "inline-block", fontSize: 11, fontWeight: 700,
    padding: "2px 8px", borderRadius: 20,
  },
  cancelBtn: {
    display: "flex", alignItems: "center", gap: 5,
    backgroundColor: "#FEE2E2", color: "#DC2626",
    border: "1px solid #FECACA", borderRadius: 8,
    padding: "7px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer",
  },
  emptyBox: {
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", gap: 12,
    backgroundColor: "#F9FAFB", borderRadius: 12,
    padding: "40px 24px",
  },
};

const m = {
  overlay: {
    position: "fixed", inset: 0,
    backgroundColor: "rgba(17,24,39,0.6)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 1000, padding: 20,
  },
  modal: {
    backgroundColor: "#FFFFFF", borderRadius: 18,
    width: "100%", maxWidth: 480,
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
    overflow: "hidden",
  },
  modalHeader: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
    padding: "22px 24px 16px",
    borderBottom: "1px solid #F3F4F6",
  },
  modalTitle: { fontSize: 18, fontWeight: 800, color: "#111827", margin: "0 0 2px 0" },
  modalSub: { fontSize: 13, color: "#6B7280", margin: 0 },
  closeBtn: {
    backgroundColor: "#F3F4F6", border: "none", borderRadius: 8,
    width: 32, height: 32, display: "flex", alignItems: "center",
    justifyContent: "center", cursor: "pointer", color: "#374151",
    flexShrink: 0,
  },
  slotPrompt: { fontSize: 13.5, color: "#374151", fontWeight: 500, margin: 0, padding: "16px 24px 8px" },
  slotList: { padding: "0 24px 16px", display: "flex", flexDirection: "column", gap: 10 },
  slotBtn: {
    position: "relative",
    display: "flex", flexDirection: "column", gap: 6,
    padding: "12px 14px", borderRadius: 12,
    textAlign: "left", transition: "all 0.15s",
  },
  slotDate: { display: "flex", alignItems: "center", gap: 7, fontSize: 13.5, fontWeight: 700, color: "#111827" },
  slotDetails: { display: "flex", alignItems: "center", gap: 10 },
  slotTime: { display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "#6B7280" },
  modeChip: {
    display: "flex", alignItems: "center", gap: 4,
    fontSize: 11.5, fontWeight: 600, padding: "2px 8px", borderRadius: 20,
  },
  bookedTag: {
    fontSize: 10.5, fontWeight: 700, color: "#9CA3AF",
    backgroundColor: "#F3F4F6", padding: "1px 6px", borderRadius: 4, width: "fit-content",
  },
  modalFooter: {
    display: "flex", justifyContent: "flex-end", gap: 10,
    padding: "14px 24px", borderTop: "1px solid #F3F4F6",
  },
  cancelBtn: {
    padding: "9px 20px", borderRadius: 10, border: "1px solid #E5E7EB",
    backgroundColor: "#FFFFFF", fontSize: 13.5, fontWeight: 600, color: "#374151", cursor: "pointer",
  },
  confirmBtn: {
    padding: "9px 20px", borderRadius: 10, border: "none",
    backgroundColor: "#2563EB", fontSize: 13.5, fontWeight: 700, color: "#FFFFFF", cursor: "pointer",
  },
  successBox: {
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", gap: 12, padding: "40px 24px",
  },
  successText: { fontSize: 16, fontWeight: 700, color: "#15803D", margin: 0 },
  formBody: { display: "flex", flexDirection: "column", gap: 8, padding: "18px 24px" },
  fieldLabel: { fontSize: 12.5, fontWeight: 700, color: "#374151" },
  select: { border: "1px solid #D1D5DB", borderRadius: 8, padding: "9px 10px", fontSize: 13, backgroundColor: "#fff" },
  textarea: { border: "1px solid #D1D5DB", borderRadius: 8, padding: "9px 10px", fontSize: 13, minHeight: 70, resize: "vertical", fontFamily: "inherit" },
  emptyAssignment: { display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "32px 24px", color: "#166534", fontSize: 13 },
};

export default Mentors;
