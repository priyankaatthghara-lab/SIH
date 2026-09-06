import React, { useState } from "react";
import { Search, BookOpen, Filter, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { getStatusBadgeStyle } from "../../utils/academicCalculations";

const MiniComparisonBar = ({ studentMarks, classAvg }) => {
  return (
    <div style={styles.compBarWrapper}>
      <div style={styles.compBarRow}>
        <span style={styles.barLbl}>Student</span>
        <div style={styles.barTrack}>
          <div style={{ ...styles.barFill, width: `${Math.min(100, Math.max(0, studentMarks))}%`, backgroundColor: "#2563EB" }} />
        </div>
        <span style={styles.barVal}>{studentMarks}%</span>
      </div>
      <div style={styles.compBarRow}>
        <span style={styles.barLbl}>Class Avg</span>
        <div style={styles.barTrack}>
          <div style={{ ...styles.barFill, width: `${Math.min(100, Math.max(0, classAvg))}%`, backgroundColor: "#94A3B8" }} />
        </div>
        <span style={{ ...styles.barVal, color: "#64748B" }}>{classAvg}%</span>
      </div>
    </div>
  );
};

const SubjectPerformanceSection = ({
  student,
  selectedSemester,
  onSelectSemester,
  searchQuery,
  onSearchChange,
  performanceFilter,
  onPerformanceFilterChange
}) => {
  const subjects = student?.subjects || [];
  const availableSemesters = [1, 2, 3, 4, 5];

  // Filtering
  const filteredSubjects = subjects.filter((sub) => {
    // Semester filter
    if (selectedSemester !== "All" && sub.semester !== Number(selectedSemester)) {
      return false;
    }
    // Performance filter
    if (performanceFilter !== "All" && sub.status !== performanceFilter) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = sub.name.toLowerCase().includes(q);
      const matchCode = sub.code.toLowerCase().includes(q);
      const matchFaculty = sub.faculty.toLowerCase().includes(q);
      if (!matchName && !matchCode && !matchFaculty) return false;
    }
    return true;
  });

  return (
    <div style={styles.container}>
      {/* Title & Stats */}
      <div style={styles.topHeader}>
        <div style={styles.titleRow}>
          <BookOpen size={18} color="#2563EB" />
          <h2 style={styles.title}>All Subject Marks &amp; Course Breakdown</h2>
          <span style={styles.countBadge}>{filteredSubjects.length} Courses</span>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div style={styles.filterBar}>
        {/* Semester Pills */}
        <div style={styles.semPills}>
          <button
            type="button"
            style={{
              ...styles.semPill,
              backgroundColor: selectedSemester === "All" ? "#2563EB" : "#F3F4F6",
              color: selectedSemester === "All" ? "#FFFFFF" : "#4B5563",
            }}
            onClick={() => onSelectSemester("All")}
          >
            All Semesters
          </button>
          {availableSemesters.map((sem) => (
            <button
              key={sem}
              type="button"
              style={{
                ...styles.semPill,
                backgroundColor: selectedSemester === sem ? "#2563EB" : "#F3F4F6",
                color: selectedSemester === sem ? "#FFFFFF" : "#4B5563",
              }}
              onClick={() => onSelectSemester(sem)}
            >
              Sem {sem}
            </button>
          ))}
        </div>

        {/* Right Filter & Search */}
        <div style={styles.searchFilterGroup}>
          <div style={styles.searchBox}>
            <Search size={14} color="#9CA3AF" />
            <input
              type="text"
              placeholder="Search subject or code..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          <div style={styles.selectWrapper}>
            <Filter size={13} color="#6B7280" style={{ position: "absolute", left: 10, top: 11 }} />
            <select
              value={performanceFilter}
              onChange={(e) => onPerformanceFilterChange(e.target.value)}
              style={styles.selectInput}
            >
              <option value="All">All Statuses</option>
              <option value="Strong">Strong (80%+)</option>
              <option value="Good">Good (70-79%)</option>
              <option value="Average">Average (60-69%)</option>
              <option value="Needs Attention">Needs Attention (&lt;60%)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Subjects Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.th, width: "24%" }}>Subject Details</th>
              <th style={{ ...styles.th, width: "16%" }}>Faculty</th>
              <th style={{ ...styles.th, width: "8%", textAlign: "center" }}>Sem</th>
              <th style={{ ...styles.th, width: "8%", textAlign: "right" }}>Marks</th>
              <th style={{ ...styles.th, width: "6%", textAlign: "center" }}>Grade</th>
              <th style={{ ...styles.th, width: "8%", textAlign: "right" }}>Attendance</th>
              <th style={{ ...styles.th, width: "18%" }}>Class Comparison</th>
              <th style={{ ...styles.th, width: "12%", textAlign: "center" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubjects.length === 0 ? (
              <tr>
                <td colSpan={8} style={styles.noData}>
                  No subjects match the selected filters.
                </td>
              </tr>
            ) : (
              filteredSubjects.map((sub) => {
                const badgeStyle = getStatusBadgeStyle(sub.status);
                const diff = sub.marks - sub.classAverage;
                const isPositive = diff >= 0;

                return (
                  <tr key={`${sub.semester}-${sub.id}`} style={styles.tr}>
                    <td style={styles.td}>
                      <div style={styles.subName}>{sub.name}</div>
                      <div style={styles.subMeta}>
                        <code>{sub.code}</code> &bull; {sub.credits} Credits
                      </div>
                    </td>
                    <td style={styles.td}>
                      <span style={styles.facultyText}>{sub.faculty}</span>
                    </td>
                    <td style={{ ...styles.td, textAlign: "center" }}>
                      <span style={styles.semBadge}>Sem {sub.semester}</span>
                    </td>
                    <td style={{ ...styles.td, textAlign: "right" }}>
                      <div style={styles.marksBold}>{sub.marks} / 100</div>
                    </td>
                    <td style={{ ...styles.td, textAlign: "center" }}>
                      <span style={styles.gradePill}>{sub.grade}</span>
                    </td>
                    <td style={{ ...styles.td, textAlign: "right" }}>
                      <span style={{
                        fontWeight: 600,
                        color: sub.attendance >= 85 ? "#15803D" : sub.attendance >= 75 ? "#D97706" : "#DC2626"
                      }}>
                        {sub.attendance}%
                      </span>
                    </td>
                    <td style={styles.td}>
                      <MiniComparisonBar studentMarks={sub.marks} classAvg={sub.classAverage} />
                      <div style={{ ...styles.diffLabel, color: isPositive ? "#15803D" : "#DC2626" }}>
                        {isPositive ? (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
                            <ArrowUpRight size={12} /> +{diff}% vs class avg
                          </span>
                        ) : (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
                            <ArrowDownRight size={12} /> {diff}% vs class avg
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={{ ...styles.td, textAlign: "center" }}>
                      <span style={{
                        ...styles.statusBadge,
                        backgroundColor: badgeStyle.bg,
                        color: badgeStyle.text,
                        border: `1px solid ${badgeStyle.border}`,
                      }}>
                        {sub.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    border: "1px solid #F3F4F6",
  },
  topHeader: {
    marginBottom: "16px",
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  title: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#111827",
    margin: 0,
  },
  countBadge: {
    fontSize: "11px",
    fontWeight: 700,
    backgroundColor: "#EFF6FF",
    color: "#2563EB",
    padding: "3px 8px",
    borderRadius: "12px",
    border: "1px solid #BFDBFE",
  },
  filterBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "14px",
  },
  semPills: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
  },
  semPill: {
    border: "none",
    padding: "7px 14px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.15s ease",
  },
  searchFilterGroup: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#F9FAFB",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    padding: "6px 12px",
    width: "220px",
  },
  searchInput: {
    border: "none",
    backgroundColor: "transparent",
    outline: "none",
    fontSize: "12.5px",
    color: "#1F2937",
    width: "100%",
  },
  selectWrapper: {
    position: "relative",
  },
  selectInput: {
    border: "1px solid #E5E7EB",
    backgroundColor: "#F9FAFB",
    borderRadius: "8px",
    padding: "7px 12px 7px 28px",
    fontSize: "12.5px",
    fontWeight: 500,
    color: "#374151",
    outline: "none",
    cursor: "pointer",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13px",
  },
  th: {
    textAlign: "left",
    padding: "12px 14px",
    color: "#6B7280",
    fontWeight: 600,
    borderBottom: "1px solid #E5E7EB",
    backgroundColor: "#F9FAFB",
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  tr: {
    borderBottom: "1px solid #F3F4F6",
  },
  td: {
    padding: "14px 14px",
    verticalAlign: "middle",
  },
  subName: {
    fontWeight: 600,
    color: "#111827",
    fontSize: "13.5px",
    lineHeight: 1.3,
  },
  subMeta: {
    fontSize: "11px",
    color: "#6B7280",
    marginTop: "2px",
  },
  facultyText: {
    color: "#4B5563",
    fontSize: "12.5px",
  },
  semBadge: {
    fontSize: "11px",
    fontWeight: 600,
    backgroundColor: "#F3F4F6",
    color: "#4B5563",
    padding: "3px 8px",
    borderRadius: "6px",
  },
  marksBold: {
    fontWeight: 700,
    color: "#111827",
    fontSize: "13.5px",
  },
  gradePill: {
    display: "inline-block",
    padding: "3px 8px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: 700,
    backgroundColor: "#EEF2FF",
    color: "#4F46E5",
    border: "1px solid #C7D2FE",
  },
  statusBadge: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: 700,
  },
  compBarWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    width: "160px",
  },
  compBarRow: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "10.5px",
  },
  barLbl: {
    width: "52px",
    color: "#6B7280",
    fontSize: "10px",
    fontWeight: 500,
  },
  barTrack: {
    flex: 1,
    height: "6px",
    backgroundColor: "#E5E7EB",
    borderRadius: "3px",
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: "3px",
    transition: "width 0.3s ease",
  },
  barVal: {
    width: "28px",
    textAlign: "right",
    fontWeight: 600,
    color: "#1F2937",
    fontSize: "10px",
  },
  diffLabel: {
    fontSize: "10.5px",
    fontWeight: 600,
    marginTop: "2px",
  },
  noData: {
    textAlign: "center",
    padding: "32px",
    color: "#9CA3AF",
    fontSize: "13px",
  },
};

export default SubjectPerformanceSection;
