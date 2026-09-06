import React from "react";
import { getSemesterStatus, getStatusBadgeStyle } from "../../utils/academicCalculations";
import { Calendar, CheckCircle2 } from "lucide-react";

const SemesterPerformanceTable = ({ student, selectedSemester, onSelectSemester }) => {
  const trends = student?.semesterTrends || [];

  return (
    <div style={styles.container}>
      <div style={styles.headerRow}>
        <div style={styles.titleGroup}>
          <Calendar size={18} color="#2563EB" />
          <h2 style={styles.title}>Semester-wise Academic Record</h2>
        </div>
        <span style={styles.hint}>Click a semester to filter subjects below</span>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Semester</th>
              <th style={{ ...styles.th, textAlign: "right" }}>SGPA</th>
              <th style={{ ...styles.th, textAlign: "right" }}>CGPA</th>
              <th style={{ ...styles.th, textAlign: "right" }}>Credits</th>
              <th style={{ ...styles.th, textAlign: "right" }}>Attendance</th>
              <th style={{ ...styles.th, textAlign: "center" }}>Academic Standing</th>
              <th style={{ ...styles.th, textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {trends.map((sem) => {
              const status = getSemesterStatus(sem.sgpa, sem.attendance, student?.backlogs || 0);
              const badgeStyle = getStatusBadgeStyle(status);
              const isSelected = selectedSemester === sem.semester;

              return (
                <tr
                  key={sem.semester}
                  style={{
                    ...styles.tr,
                    backgroundColor: isSelected ? "#F0F7FF" : "transparent",
                  }}
                  onClick={() => onSelectSemester(sem.semester)}
                >
                  <td style={styles.td}>
                    <div style={styles.semName}>
                      <span style={{ ...styles.activeDot, backgroundColor: isSelected ? "#2563EB" : "#CBD5E1" }} />
                      <strong>Semester {sem.semester}</strong>
                      {sem.semester === student?.semester && (
                        <span style={styles.currentBadge}>Current</span>
                      )}
                    </div>
                  </td>
                  <td style={{ ...styles.td, textAlign: "right", fontWeight: 700, color: "#111827" }}>
                    {Number(sem.sgpa).toFixed(2)}
                  </td>
                  <td style={{ ...styles.td, textAlign: "right", fontWeight: 700, color: "#2563EB" }}>
                    {Number(sem.cgpa).toFixed(2)}
                  </td>
                  <td style={{ ...styles.td, textAlign: "right", color: "#4B5563" }}>
                    {sem.credits}
                  </td>
                  <td style={{ ...styles.td, textAlign: "right" }}>
                    <span style={{
                      fontWeight: 600,
                      color: sem.attendance >= 85 ? "#15803D" : sem.attendance >= 75 ? "#D97706" : "#DC2626"
                    }}>
                      {sem.attendance}%
                    </span>
                  </td>
                  <td style={{ ...styles.td, textAlign: "center" }}>
                    <span style={{
                      ...styles.badge,
                      backgroundColor: badgeStyle.bg,
                      color: badgeStyle.text,
                      border: `1px solid ${badgeStyle.border}`,
                    }}>
                      {status}
                    </span>
                  </td>
                  <td style={{ ...styles.td, textAlign: "center" }}>
                    <button
                      type="button"
                      style={{
                        ...styles.filterBtn,
                        backgroundColor: isSelected ? "#2563EB" : "#F3F4F6",
                        color: isSelected ? "#FFFFFF" : "#374151",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectSemester(isSelected ? "All" : sem.semester);
                      }}
                    >
                      {isSelected ? "Active Filter" : "View Subjects"}
                    </button>
                  </td>
                </tr>
              );
            })}
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
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    flexWrap: "wrap",
    gap: "8px",
  },
  titleGroup: {
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
  hint: {
    fontSize: "12px",
    color: "#6B7280",
    fontWeight: 500,
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
    cursor: "pointer",
    transition: "background-color 0.15s ease",
  },
  td: {
    padding: "13px 14px",
    color: "#374151",
    verticalAlign: "middle",
  },
  semName: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  activeDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
  },
  currentBadge: {
    fontSize: "10px",
    fontWeight: 700,
    backgroundColor: "#EFF6FF",
    color: "#2563EB",
    padding: "2px 6px",
    borderRadius: "4px",
    border: "1px solid #BFDBFE",
  },
  badge: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: 700,
  },
  filterBtn: {
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "11px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.15s ease",
  },
};

export default SemesterPerformanceTable;
