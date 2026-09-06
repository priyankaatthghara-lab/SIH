import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Check, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStudent } from "../../context/StudentContext";

const Header = () => {
  const { student: selected, selectStudent, allStudents } = useStudent();
  const navigate = useNavigate();
  const [open, setOpen]             = useState(false);
  const [search, setSearch]         = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const dropdownRef                 = useRef(null);
  const globalSearchRef             = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      const outsideStudentDropdown = dropdownRef.current && !dropdownRef.current.contains(e.target);
      const outsideGlobalSearch = globalSearchRef.current && !globalSearchRef.current.contains(e.target);
      if (outsideStudentDropdown && outsideGlobalSearch) {
        setOpen(false);
        setSearch("");
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const searchTerm = search.trim().toLowerCase();
  const filtered = allStudents.filter((s) =>
    s.name.toLowerCase().includes(searchTerm) ||
    s.id.toLowerCase().includes(searchTerm)
  );
  const matchingStudents = searchTerm
    ? allStudents.filter((s) =>
        s.name.toLowerCase().includes(searchTerm) ||
        s.id.toLowerCase().includes(searchTerm) ||
        (s.skills || []).some((skill) =>
          skill.name.toLowerCase().includes(searchTerm) ||
          skill.category.toLowerCase().includes(searchTerm)
        )
      )
    : [];

  const openStudentFromSearch = (student) => {
    selectStudent(student);
    setSearch("");
    setSearchOpen(false);
    navigate("/");
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter" && matchingStudents[0]) {
      openStudentFromSearch(matchingStudents[0]);
    }
    if (event.key === "Escape") {
      setSearch("");
      setSearchOpen(false);
    }
  };

  const cgpaColor = (cgpa) => {
    if (cgpa >= 8.5) return "#10b981";
    if (cgpa >= 7.5) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <header style={s.header}>

      {/* ── Left: Search ── */}
      <div style={s.searchBox} ref={globalSearchRef}>
        <Search size={16} color="#9CA3AF" />
        <input
          type="text"
          placeholder="Search a skill to find a student..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setSearchOpen(true);
          }}
          onFocus={() => setSearchOpen(true)}
          onKeyDown={handleSearchKeyDown}
          style={s.searchInput}
        />
        {searchOpen && searchTerm && (
          <div style={s.globalSearchResults}>
            {matchingStudents.length === 0 ? (
              <p style={s.noResult}>No student has that skill.</p>
            ) : (
              matchingStudents.map((student) => (
                <button
                  key={student.id}
                  type="button"
                  style={s.globalSearchItem}
                  onClick={() => openStudentFromSearch(student)}
                >
                  <img src={student.avatar} alt="" style={s.searchAvatar} />
                  <span>
                    <strong style={s.searchStudentName}>{student.name}</strong>
                    <small style={s.searchStudentSkills}>
                      {(student.skills || [])
                        .filter((skill) =>
                          skill.name.toLowerCase().includes(searchTerm) ||
                          skill.category.toLowerCase().includes(searchTerm)
                        )
                        .slice(0, 2)
                        .map((skill) => skill.name)
                        .join(", ") || student.id}
                    </small>
                  </span>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* ── Right: Student Selector ── */}
      <div style={s.right}>
        {/* ── Student Selector Dropdown ── */}
        <div style={{ position: "relative" }} ref={dropdownRef}>
          <button onClick={() => { setOpen(!open); setSearch(""); }} style={s.selectorBtn}>
            <img src={selected.avatar} alt="student" style={s.selectorAvatar} />
            <div style={s.selectorInfo}>
              <span style={s.selectorName}>{selected.name}</span>
              <span style={s.selectorMeta}>{selected.id} &middot; CGPA {selected.cgpa}</span>
            </div>
            <ChevronDown size={16} color="#6B7280"
              style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
            />
          </button>

          {/* Dropdown panel */}
          {open && (
            <div style={s.dropdown}>
              {/* Header row */}
              <div style={s.dropdownHeader}>
                <GraduationCap size={15} color="#4F46E5" />
                <span style={s.dropdownTitle}>Select Student</span>
              </div>

              {/* Search inside dropdown */}
              <div style={s.dropdownSearch}>
                <Search size={13} color="#9CA3AF" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search by name or ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={s.dropdownSearchInput}
                />
              </div>

              {/* Student list */}
              <div style={s.list}>
                {filtered.length === 0 && (
                  <p style={s.noResult}>No students found</p>
                )}
                {filtered.map((student) => {
                  const isActive = student.id === selected.id;
                  return (
                    <button
                      key={student.id}
                      onClick={() => { selectStudent(student); setOpen(false); setSearch(""); }}
                      style={{
                        ...s.listItem,
                        backgroundColor: isActive ? "#EEF2FF" : "transparent",
                      }}
                    >
                      <img src={student.avatar} alt={student.name} style={s.listAvatar} />
                      <div style={{ flex: 1, textAlign: "left" }}>
                        <p style={{ ...s.listName, color: isActive ? "#4F46E5" : "#111827" }}>
                          {student.name}
                        </p>
                        <p style={s.listMeta}>{student.id} &middot; Sem {student.semester}</p>
                      </div>
                      <div style={s.cgpaPill(cgpaColor(student.cgpa))}>
                        {student.cgpa}
                      </div>
                      {isActive && <Check size={14} color="#4F46E5" style={{ flexShrink: 0 }} />}
                    </button>
                  );
                })}
              </div>

              {/* Footer */}
              <div style={s.dropdownFooter}>
                <span style={s.footerNote}>Batch 2022–2026 &middot; CSE &middot; {allStudents.length} students</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// ── Styles ──────────────────────────────────────────────────
const s = {
  header: {
    height: "70px",
    backgroundColor: "#FFFFFF",
    borderBottom: "1px solid #E5E7EB",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 32px",
    position: "sticky",
    top: 0,
    zIndex: 50,
    flexShrink: 0,
  },

  // Search
  searchBox: {
    position: "relative", display: "flex", alignItems: "center", gap: "10px",
    backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB",
    borderRadius: "8px", padding: "9px 16px", width: "320px",
  },
  searchInput: {
    border: "none", background: "transparent", outline: "none",
    fontSize: "13.5px", color: "#111827", width: "100%",
  },

  // Right section
  right: { display: "flex", alignItems: "center", gap: "20px" },

  globalSearchResults: {
    position: "absolute", top: "calc(100% + 8px)", left: 0, width: "360px",
    backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB",
    borderRadius: "10px", boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
    overflow: "hidden", zIndex: 200,
  },
  globalSearchItem: {
    display: "flex", alignItems: "center", gap: "10px", width: "100%",
    padding: "10px 12px", border: "none", borderBottom: "1px solid #F3F4F6",
    backgroundColor: "#FFFFFF", textAlign: "left", cursor: "pointer",
  },
  searchAvatar: { width: "30px", height: "30px", borderRadius: "50%" },
  searchStudentName: { display: "block", fontSize: "12.5px", color: "#111827" },
  searchStudentSkills: { display: "block", marginTop: "2px", fontSize: "11px", color: "#6B7280" },

  // Selector button
  selectorBtn: {
    display: "flex", alignItems: "center", gap: "10px",
    backgroundColor: "#F9FAFB", border: "1px solid #E5E7EB",
    borderRadius: "10px", padding: "8px 14px",
    cursor: "pointer", transition: "border-color 0.2s",
    minWidth: "260px",
  },
  selectorAvatar: { width: "32px", height: "32px", borderRadius: "50%", objectFit: "cover", backgroundColor: "#E0E7FF" },
  selectorInfo: { flex: 1, textAlign: "left" },
  selectorName: { display: "block", fontSize: "13px", fontWeight: 600, color: "#111827" },
  selectorMeta: { display: "block", fontSize: "11px", color: "#6B7280" },

  // Dropdown
  dropdown: {
    position: "absolute", top: "calc(100% + 8px)", right: 0,
    width: "340px",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "12px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
    zIndex: 200,
    overflow: "hidden",
  },
  dropdownHeader: {
    display: "flex", alignItems: "center", gap: "8px",
    padding: "14px 16px 10px",
    borderBottom: "1px solid #F3F4F6",
  },
  dropdownTitle: { fontSize: "13px", fontWeight: 600, color: "#374151" },
  dropdownSearch: {
    display: "flex", alignItems: "center", gap: "8px",
    padding: "10px 14px",
    borderBottom: "1px solid #F3F4F6",
    backgroundColor: "#F9FAFB",
  },
  dropdownSearchInput: {
    border: "none", background: "transparent", outline: "none",
    fontSize: "13px", color: "#111827", width: "100%",
  },

  // List
  list: { maxHeight: "280px", overflowY: "auto" },
  noResult: { padding: "20px", textAlign: "center", color: "#9CA3AF", fontSize: "13px" },
  listItem: {
    width: "100%", display: "flex", alignItems: "center", gap: "10px",
    padding: "10px 14px", border: "none", cursor: "pointer",
    transition: "background 0.15s",
    borderBottom: "1px solid #F9FAFB",
  },
  listAvatar: { width: "34px", height: "34px", borderRadius: "50%", objectFit: "cover", backgroundColor: "#E0E7FF", flexShrink: 0 },
  listName: { fontSize: "13px", fontWeight: 600, marginBottom: "2px" },
  listMeta: { fontSize: "11px", color: "#9CA3AF" },
  cgpaPill: (color) => ({
    fontSize: "11px", fontWeight: 700,
    color: color, backgroundColor: color + "18",
    padding: "2px 8px", borderRadius: "20px",
    flexShrink: 0,
  }),

  // Footer
  dropdownFooter: {
    padding: "10px 16px",
    borderTop: "1px solid #F3F4F6",
    backgroundColor: "#F9FAFB",
  },
  footerNote: { fontSize: "11px", color: "#9CA3AF" },
};

export default Header;
