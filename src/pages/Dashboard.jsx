import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap, BookOpen, Users, Building2, Search,
  Filter, ChevronRight, X, UserRound, ArrowRight,
  Clock, RotateCcw, Award
} from "lucide-react";
import { useStudent } from "../context/StudentContext";

// University Academic Programs
const UNIVERSITY_COURSES = [
  {
    id: "COURSE-BTECH-CSE",
    code: "B.Tech",
    name: "Computer Science & Engineering",
    department: "School of Engineering & Technology",
    category: "Engineering",
    level: "Undergraduate",
    duration: "4 Years (8 Semesters)",
    degree: "Bachelor of Technology",
    totalStudents: 120,
  },
  {
    id: "COURSE-BTECH-AI",
    code: "B.Tech",
    name: "Artificial Intelligence & Data Science",
    department: "School of Engineering & Technology",
    category: "Engineering",
    level: "Undergraduate",
    duration: "4 Years (8 Semesters)",
    degree: "Bachelor of Technology",
    totalStudents: 95,
  },
  {
    id: "COURSE-BBA-MKT",
    code: "BBA",
    name: "Marketing & Strategy",
    department: "School of Business & Management",
    category: "Management",
    level: "Undergraduate",
    duration: "3 Years (6 Semesters)",
    degree: "Bachelor of Business Administration",
    totalStudents: 110,
  },
  {
    id: "COURSE-MBA-FIN",
    code: "MBA",
    name: "Financial Analytics & Investment Banking",
    department: "School of Business & Management",
    category: "Management",
    level: "Postgraduate",
    duration: "2 Years (4 Semesters)",
    degree: "Master of Business Administration",
    totalStudents: 80,
  },
  {
    id: "COURSE-BCA-CLD",
    code: "BCA",
    name: "Cloud Computing & Web Applications",
    department: "Department of Computer Applications",
    category: "Computer Applications",
    level: "Undergraduate",
    duration: "3 Years (6 Semesters)",
    degree: "Bachelor of Computer Applications",
    totalStudents: 105,
  },
  {
    id: "COURSE-MCA-SFT",
    code: "MCA",
    name: "Software Systems & Architecture",
    department: "Department of Computer Applications",
    category: "Computer Applications",
    level: "Postgraduate",
    duration: "2 Years (4 Semesters)",
    degree: "Master of Computer Applications",
    totalStudents: 65,
  },
  {
    id: "COURSE-BCOM-ACT",
    code: "B.Com",
    name: "Accounting, Taxation & Audit",
    department: "School of Commerce & Finance",
    category: "Commerce",
    level: "Undergraduate",
    duration: "3 Years (6 Semesters)",
    degree: "Bachelor of Commerce (Honours)",
    totalStudents: 140,
  },
  {
    id: "COURSE-MCOM-INT",
    code: "M.Com",
    name: "International Business & Trade Finance",
    department: "School of Commerce & Finance",
    category: "Commerce",
    level: "Postgraduate",
    duration: "2 Years (4 Semesters)",
    degree: "Master of Commerce",
    totalStudents: 50,
  },
  {
    id: "COURSE-BA-ECO",
    code: "BA",
    name: "Economics & Public Policy",
    department: "School of Humanities & Social Sciences",
    category: "Humanities",
    level: "Undergraduate",
    duration: "3 Years (6 Semesters)",
    degree: "Bachelor of Arts",
    totalStudents: 90,
  },
  {
    id: "COURSE-MA-PUB",
    code: "MA",
    name: "Public Administration & Governance",
    department: "School of Humanities & Social Sciences",
    category: "Humanities",
    level: "Postgraduate",
    duration: "2 Years (4 Semesters)",
    degree: "Master of Arts",
    totalStudents: 45,
  },
];

const CATEGORIES = [
  "All Categories",
  "Engineering",
  "Management",
  "Computer Applications",
  "Commerce",
  "Humanities",
];

const Dashboard = () => {
  const { allStudents, selectStudent } = useStudent();
  const navigate = useNavigate();

  // Horizontal filter states
  const [courseSearch, setCourseSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLevel, setSelectedLevel] = useState("ALL");

  // Modal state for viewing enrolled students
  const [activeModal, setActiveModal] = useState(null); // { course, students }

  // Filter courses based on search, category, and level
  const filteredCourses = useMemo(() => {
    return UNIVERSITY_COURSES.filter((course) => {
      // Category filter
      if (selectedCategory !== "All Categories" && course.category !== selectedCategory) {
        return false;
      }

      // Level filter
      if (selectedLevel !== "ALL" && course.level !== selectedLevel) {
        return false;
      }

      // Search query
      if (courseSearch.trim() !== "") {
        const query = courseSearch.toLowerCase().trim();
        const matchesName = course.name.toLowerCase().includes(query);
        const matchesCode = course.code.toLowerCase().includes(query);
        const matchesDept = course.department.toLowerCase().includes(query);
        return matchesName || matchesCode || matchesDept;
      }

      return true;
    });
  }, [courseSearch, selectedCategory, selectedLevel]);

  // Open modal with students for this course
  const handleOpenStudents = (course) => {
    const matchedStudents = allStudents.filter((student) => {
      const progMatch = student.program?.toLowerCase() === course.code.toLowerCase();
      const branchMatch = student.branch?.toLowerCase().includes(course.name.toLowerCase()) ||
                          course.name.toLowerCase().includes(student.branch?.toLowerCase() || "");
      return progMatch || branchMatch;
    });

    const fallback = allStudents.filter((s) => s.program?.toLowerCase() === course.code.toLowerCase());
    const finalStudents = matchedStudents.length > 0 ? matchedStudents : (fallback.length > 0 ? fallback : allStudents.slice(0, 3));

    setActiveModal({
      course,
      students: finalStudents,
    });
  };

  const handleStudentSelect = (student) => {
    selectStudent(student);
    setActiveModal(null);
    navigate("/profile");
  };

  const resetFilters = () => {
    setCourseSearch("");
    setSelectedCategory("All Categories");
    setSelectedLevel("ALL");
  };

  const isFiltered = courseSearch.trim() !== "" || selectedCategory !== "All Categories" || selectedLevel !== "ALL";

  // Summary counts
  const totalPrograms = UNIVERSITY_COURSES.length;
  const totalDepartments = new Set(UNIVERSITY_COURSES.map((c) => c.department)).size;
  const totalEnrolled = UNIVERSITY_COURSES.reduce((acc, c) => acc + (c.totalStudents || 0), 0);

  return (
    <div style={s.page}>
      {/* ── Page Header ── */}
      <div style={s.pageHeader}>
        <div>
          <p style={s.breadcrumb}>Home &rsaquo; Institute Dashboard</p>
          <h1 style={s.pageTitle}>Institute Dashboard</h1>
          <p style={s.pageSubtitle}>
            Explore university courses, departments, and view enrolled student directories.
          </p>
        </div>
      </div>

      {/* ── Top Summary Cards ── */}
      <div style={s.summaryGrid}>
        <div style={s.summaryCard}>
          <div style={{ ...s.statIcon, backgroundColor: "#EFF6FF", color: "#2563EB" }}>
            <GraduationCap size={22} />
          </div>
          <div>
            <div style={s.statValue}>{totalPrograms}</div>
            <div style={s.statLabel}>Total Academic Courses</div>
          </div>
        </div>

        <div style={s.summaryCard}>
          <div style={{ ...s.statIcon, backgroundColor: "#F3E8FF", color: "#9333EA" }}>
            <Building2 size={22} />
          </div>
          <div>
            <div style={s.statValue}>{totalDepartments}</div>
            <div style={s.statLabel}>Academic Departments</div>
          </div>
        </div>

        <div style={s.summaryCard}>
          <div style={{ ...s.statIcon, backgroundColor: "#DCFCE7", color: "#16A34A" }}>
            <Users size={22} />
          </div>
          <div>
            <div style={s.statValue}>{totalEnrolled.toLocaleString()}</div>
            <div style={s.statLabel}>Enrolled Students</div>
          </div>
        </div>

        <div style={s.summaryCard}>
          <div style={{ ...s.statIcon, backgroundColor: "#FEF3C7", color: "#D97706" }}>
            <Award size={22} />
          </div>
          <div>
            <div style={s.statValue}>100%</div>
            <div style={s.statLabel}>Active University Batches</div>
          </div>
        </div>
      </div>

      {/* ── Horizontal Filter Section ── */}
      <div style={s.filterSection}>
        <div style={s.filterHeaderRow}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Filter size={16} color="#3B82F6" />
            <span style={s.filterHeading}>Filter & Search Courses</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={s.courseCountPill}>
              {filteredCourses.length} of {UNIVERSITY_COURSES.length} Courses
            </span>
            {isFiltered && (
              <button onClick={resetFilters} style={s.clearFiltersBtn} title="Reset all filters">
                <RotateCcw size={13} /> Reset
              </button>
            )}
          </div>
        </div>

        {/* Horizontal Form Row */}
        <div style={s.filterControlsRow}>
          {/* Search Input */}
          <div style={s.searchBox}>
            <Search size={16} color="#9CA3AF" />
            <input
              type="text"
              placeholder="Search by course name, code, or department..."
              value={courseSearch}
              onChange={(e) => setCourseSearch(e.target.value)}
              style={s.searchInput}
            />
            {courseSearch && (
              <button onClick={() => setCourseSearch("")} style={s.clearInputBtn}>
                &times;
              </button>
            )}
          </div>

          {/* Department / Category Dropdown */}
          <div style={s.selectGroup}>
            <label style={s.selectLabel}>Department:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={s.select}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Degree Level Dropdown */}
          <div style={s.selectGroup}>
            <label style={s.selectLabel}>Degree Level:</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              style={s.select}
            >
              <option value="ALL">All Degrees</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Postgraduate">Postgraduate</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Course Cards Grid ── */}
      {filteredCourses.length > 0 ? (
        <div style={s.courseGrid}>
          {filteredCourses.map((course) => {
            const studentCount = course.totalStudents || 100;

            return (
              <div key={course.id} style={s.courseCard}>
                {/* Card Top: Code & Level */}
                <div style={s.cardTopRow}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={s.courseCodeBadge}>{course.code}</span>
                    <span style={s.levelBadge}>{course.level}</span>
                  </div>
                  <span style={s.durationText}>
                    <Clock size={12} /> {course.duration}
                  </span>
                </div>

                {/* Course Name & Department */}
                <div style={s.courseTitleArea}>
                  <h3 style={s.courseName}>{course.name}</h3>
                  <p style={s.deptName}>{course.department}</p>
                </div>

                {/* Enrolled Students Info */}
                <div style={s.enrolledInfoBox}>
                  <Users size={16} color="#3B82F6" />
                  <span style={s.enrolledText}>
                    <strong>{studentCount}</strong> Students Enrolled
                  </span>
                </div>

                {/* View Students Button */}
                <button
                  onClick={() => handleOpenStudents(course)}
                  style={s.viewStudentsBtn}
                >
                  <UserRound size={15} />
                  <span>View Students</span>
                  <ChevronRight size={16} style={{ marginLeft: "auto" }} />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div style={s.emptyState}>
          <Search size={36} color="#9CA3AF" />
          <h3 style={s.emptyTitle}>No courses found</h3>
          <p style={s.emptySubtitle}>
            No academic programs match your search or filter criteria.
          </p>
          <button onClick={resetFilters} style={s.emptyResetBtn}>
            <RotateCcw size={14} /> Clear Filters
          </button>
        </div>
      )}

      {/* ── Enrolled Students Modal (Avatar & Name ONLY) ── */}
      {activeModal && (
        <div style={s.modalOverlay} onClick={() => setActiveModal(null)}>
          <div style={s.modalBox} onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div style={s.modalHeader}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={s.modalCodeBadge}>{activeModal.course.code}</span>
                  <h3 style={s.modalTitle}>{activeModal.course.name}</h3>
                </div>
                <p style={s.modalSubtitle}>{activeModal.course.department}</p>
              </div>
              <button onClick={() => setActiveModal(null)} style={s.modalCloseBtn}>
                <X size={18} />
              </button>
            </div>

            {/* Modal Info Note */}
            <div style={s.modalInfoNotice}>
              <UserRound size={14} color="#3B82F6" />
              <span>Select any student to view their complete academic profile.</span>
            </div>

            {/* Students List showing ONLY Avatar and Name */}
            <div style={s.modalStudentsList}>
              {activeModal.students.map((student) => (
                <div
                  key={student.id}
                  onClick={() => handleStudentSelect(student)}
                  style={s.studentItemCard}
                >
                  <img
                    src={student.avatar}
                    alt={student.name}
                    style={s.studentAvatar}
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={s.studentName}>{student.name}</h4>
                    <p style={s.studentRoll}>{student.rollNo || student.id}</p>
                  </div>
                  <div style={s.viewProfileLink}>
                    <span>View Profile</span>
                    <ChevronRight size={15} />
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div style={s.modalFooter}>
              <span style={s.modalCountText}>
                {activeModal.students.length} {activeModal.students.length === 1 ? "Student" : "Students"} Listed
              </span>
              <button onClick={() => setActiveModal(null)} style={s.modalDismissBtn}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ── Styles (Matching InternSetu Design System) ──────────────────────────────
const s = {
  page: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  pageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  breadcrumb: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 6,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: 700,
    color: "#111827",
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 14,
    color: "#6B7280",
  },

  // Summary Cards
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 18,
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: "18px 20px",
    display: "flex",
    alignItems: "center",
    gap: 16,
    boxShadow: "0 1px 3px rgba(0,0,0,.06)",
    border: "1px solid #E5E7EB",
  },
  statIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 700,
    color: "#111827",
    lineHeight: 1.2,
  },
  statLabel: {
    fontSize: 12.5,
    color: "#6B7280",
    marginTop: 2,
  },

  // Horizontal Filter Section
  filterSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: "18px 22px",
    boxShadow: "0 1px 3px rgba(0,0,0,.06)",
    border: "1px solid #E5E7EB",
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  filterHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
  },
  filterHeading: {
    fontSize: 14.5,
    fontWeight: 700,
    color: "#111827",
  },
  courseCountPill: {
    fontSize: 12,
    fontWeight: 600,
    backgroundColor: "#EFF6FF",
    color: "#2563EB",
    padding: "3px 10px",
    borderRadius: 12,
  },
  clearFiltersBtn: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#F3F4F6",
    border: "1px solid #E5E7EB",
    borderRadius: 8,
    padding: "4px 10px",
    fontSize: "12px",
    fontWeight: 500,
    color: "#4B5563",
    cursor: "pointer",
  },

  // Horizontal Filter Controls Row
  filterControlsRow: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    flexWrap: "wrap",
  },
  searchBox: {
    flex: "1 1 300px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#F9FAFB",
    border: "1px solid #D1D5DB",
    borderRadius: 8,
    padding: "8px 14px",
  },
  searchInput: {
    border: "none",
    background: "transparent",
    outline: "none",
    fontSize: "13.5px",
    color: "#111827",
    width: "100%",
  },
  clearInputBtn: {
    background: "transparent",
    border: "none",
    fontSize: 16,
    color: "#9CA3AF",
    cursor: "pointer",
  },
  selectGroup: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  selectLabel: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#4B5563",
    whiteSpace: "nowrap",
  },
  select: {
    backgroundColor: "#F9FAFB",
    border: "1px solid #D1D5DB",
    borderRadius: 8,
    padding: "8px 12px",
    fontSize: "13px",
    fontWeight: 500,
    color: "#1F2937",
    outline: "none",
    cursor: "pointer",
  },

  courseGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 20,
  },
  courseCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 22,
    boxShadow: "0 1px 3px rgba(0,0,0,.06)",
    border: "1px solid #E5E7EB",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  cardTopRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  courseCodeBadge: {
    backgroundColor: "#EFF6FF",
    color: "#2563EB",
    fontSize: "12px",
    fontWeight: 700,
    padding: "3px 9px",
    borderRadius: 6,
  },
  levelBadge: {
    backgroundColor: "#F3E8FF",
    color: "#9333EA",
    fontSize: "11px",
    fontWeight: 600,
    padding: "3px 8px",
    borderRadius: 6,
  },
  durationText: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: "11.5px",
    color: "#6B7280",
    fontWeight: 500,
  },
  courseTitleArea: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  courseName: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#111827",
    lineHeight: 1.3,
  },
  deptName: {
    fontSize: "12.5px",
    color: "#6B7280",
  },
  enrolledInfoBox: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F9FAFB",
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid #F3F4F6",
  },
  enrolledText: {
    fontSize: "13px",
    color: "#374151",
  },
  viewStudentsBtn: {
    marginTop: "auto",
    display: "flex",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#3B82F6",
    color: "#FFFFFF",
    border: "none",
    borderRadius: 8,
    padding: "10px 16px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "background-color 0.15s ease",
  },

  // Empty State
  emptyState: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: "48px 24px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #E5E7EB",
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: 700,
    color: "#111827",
    marginTop: 12,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 13,
    color: "#6B7280",
    maxWidth: 400,
    marginBottom: 16,
  },
  emptyResetBtn: {
    padding: "8px 16px",
    backgroundColor: "#3B82F6",
    color: "#FFFFFF",
    border: "none",
    borderRadius: 8,
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 6,
  },

  // Modal (Avatar & Name ONLY)
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(17, 24, 39, 0.6)",
    backdropFilter: "blur(3px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: 20,
  },
  modalBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    width: "100%",
    maxWidth: "500px",
    maxHeight: "85vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    overflow: "hidden",
  },
  modalHeader: {
    padding: "20px 24px 14px",
    borderBottom: "1px solid #E5E7EB",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  modalCodeBadge: {
    backgroundColor: "#EFF6FF",
    color: "#2563EB",
    fontSize: 11,
    fontWeight: 700,
    padding: "2px 7px",
    borderRadius: 4,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: 700,
    color: "#111827",
  },
  modalSubtitle: {
    fontSize: 12.5,
    color: "#6B7280",
  },
  modalCloseBtn: {
    background: "#F3F4F6",
    border: "none",
    borderRadius: "50%",
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#6B7280",
    cursor: "pointer",
  },
  modalInfoNotice: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#EFF6FF",
    padding: "10px 24px",
    fontSize: 12,
    color: "#1D4ED8",
    fontWeight: 500,
    borderBottom: "1px solid #DBEAFE",
  },
  modalStudentsList: {
    padding: "14px 20px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  studentItemCard: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "12px 16px",
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
    border: "1px solid #E5E7EB",
    cursor: "pointer",
    transition: "all 0.15s ease",
  },
  studentAvatar: {
    width: 42,
    height: 42,
    borderRadius: "50%",
    backgroundColor: "#E0E7FF",
    objectFit: "cover",
    border: "2px solid #FFFFFF",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    flexShrink: 0,
  },
  studentName: {
    fontSize: 14,
    fontWeight: 600,
    color: "#111827",
  },
  studentRoll: {
    fontSize: 11.5,
    color: "#6B7280",
    marginTop: 1,
  },
  viewProfileLink: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 12,
    fontWeight: 600,
    color: "#3B82F6",
  },
  modalFooter: {
    padding: "14px 24px",
    borderTop: "1px solid #E5E7EB",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  modalCountText: {
    fontSize: 12.5,
    color: "#6B7280",
    fontWeight: 500,
  },
  modalDismissBtn: {
    padding: "7px 16px",
    backgroundColor: "#E5E7EB",
    color: "#374151",
    border: "none",
    borderRadius: 8,
    fontSize: "12.5px",
    fontWeight: 600,
    cursor: "pointer",
  },
};

export default Dashboard;
