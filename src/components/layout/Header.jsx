import React, { useState, useRef, useEffect } from "react";
import { Search, GraduationCap, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStudent } from "../../context/StudentContext";

const Header = ({ onMenuClick }) => {
  const { selectStudent, allStudents } = useStudent();
  const navigate = useNavigate();
  const [search, setSearch]         = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const globalSearchRef             = useRef(null);

  // Close search results on outside click
  useEffect(() => {
    const handler = (e) => {
      if (globalSearchRef.current && !globalSearchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const searchTerm = search.trim().toLowerCase();
  const matchingStudents = searchTerm
    ? allStudents.filter((s) =>
        s.name.toLowerCase().includes(searchTerm) ||
        s.id.toLowerCase().includes(searchTerm) ||
        (s.program || "").toLowerCase().includes(searchTerm) ||
        (s.branch || "").toLowerCase().includes(searchTerm) ||
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
    navigate("/profile");
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

  return (
    <header className="header-container" style={s.header}>
      {/* ── Left: Hamburger Menu (Mobile) & Global Search ── */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button 
          className="mobile-menu-btn" 
          onClick={onMenuClick}
          style={{ background: "none", border: "none", cursor: "pointer", display: "none" }}
        >
          <Menu size={24} color="#111827" />
        </button>
        <div className="header-searchbox" style={s.searchBox} ref={globalSearchRef}>
          <Search size={16} color="#9CA3AF" />
        <input
          type="text"
          placeholder="Search students, skills, or programs..."
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
              <p style={s.noResult}>No students found for "{search}"</p>
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
                    <small style={s.searchStudentMeta}>
                      {student.program} &middot; {student.branch || student.id}
                    </small>
                  </span>
                </button>
              ))
            )}
          </div>
        )}
      </div>
      </div>

      {/* ── Right: Institute Logo Only ── */}
      <div className="header-right" style={s.right}>
        <div style={s.instituteBadge}>
          <div style={s.instituteLogoCircle}>
            <GraduationCap size={22} color="#FFFFFF" />
          </div>
          <div style={s.instituteInfo}>
            <span style={s.instituteName}>ABC Institute of Technology</span>
            <span style={s.instituteSub}>University Academic Portal</span>
          </div>
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
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#F9FAFB",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    padding: "9px 16px",
    width: "340px",
  },
  searchInput: {
    border: "none",
    background: "transparent",
    outline: "none",
    fontSize: "13.5px",
    color: "#111827",
    width: "100%",
  },

  // Right section (Institute Logo)
  right: {
    display: "flex",
    alignItems: "center",
  },
  instituteBadge: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    backgroundColor: "#F9FAFB",
    border: "1px solid #E5E7EB",
    borderRadius: "10px",
    padding: "8px 16px",
  },
  instituteLogoCircle: {
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    backgroundColor: "#3B82F6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxShadow: "0 2px 4px rgba(59, 130, 246, 0.25)",
  },
  instituteInfo: {
    display: "flex",
    flexDirection: "column",
  },
  instituteName: {
    fontSize: "13.5px",
    fontWeight: 700,
    color: "#111827",
    lineHeight: 1.2,
  },
  instituteSub: {
    fontSize: "11px",
    color: "#6B7280",
    marginTop: "2px",
  },

  // Global search results
  globalSearchResults: {
    position: "absolute",
    top: "calc(100% + 8px)",
    left: 0,
    width: "360px",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "10px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
    overflow: "hidden",
    zIndex: 200,
  },
  globalSearchItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    width: "100%",
    padding: "10px 14px",
    border: "none",
    borderBottom: "1px solid #F3F4F6",
    backgroundColor: "#FFFFFF",
    textAlign: "left",
    cursor: "pointer",
  },
  searchAvatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "#E0E7FF",
    flexShrink: 0,
  },
  searchStudentName: {
    display: "block",
    fontSize: "13px",
    color: "#111827",
  },
  searchStudentMeta: {
    display: "block",
    marginTop: "2px",
    fontSize: "11.5px",
    color: "#6B7280",
  },
  noResult: {
    padding: "16px",
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: "13px",
  },
};

export default Header;
