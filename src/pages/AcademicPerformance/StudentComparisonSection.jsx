import React, { useState } from "react";
import {
  Users, X, ArrowUpRight, ArrowDownRight, Award,
  BookOpen, CheckCircle2, Sparkles, Filter
} from "lucide-react";
import { generateComparisonSummary } from "../../utils/academicCalculations";

const MetricCompareCard = ({ title, valA, valB, nameA, nameB, unit = "", max = 10, isHigherBetter = true }) => {
  const diff = Number((valA - valB).toFixed(2));
  const aWins = isHigherBetter ? diff > 0 : diff < 0;
  const bWins = isHigherBetter ? diff < 0 : diff > 0;

  return (
    <div style={styles.metricCard}>
      <div style={styles.metricTitle}>{title}</div>
      <div style={styles.metricValsRow}>
        <div style={styles.studentCol}>
          <span style={styles.studentColName}>{nameA}</span>
          <span style={{ ...styles.studentColVal, color: aWins ? "#15803D" : "#1F2937" }}>
            {valA}{unit} {aWins && "↑"}
          </span>
        </div>
        <div style={styles.vsBadge}>VS</div>
        <div style={styles.studentCol}>
          <span style={styles.studentColName}>{nameB}</span>
          <span style={{ ...styles.studentColVal, color: bWins ? "#15803D" : "#1F2937" }}>
            {valB}{unit} {bWins && "↑"}
          </span>
        </div>
      </div>

      {/* Visual comparison bars */}
      <div style={styles.barPair}>
        <div style={styles.singleBarWrap}>
          <div style={{ ...styles.barFillA, width: `${Math.min(100, Math.max(0, (valA / max) * 100))}%` }} />
        </div>
        <div style={styles.singleBarWrap}>
          <div style={{ ...styles.barFillB, width: `${Math.min(100, Math.max(0, (valB / max) * 100))}%` }} />
        </div>
      </div>
    </div>
  );
};

const StudentComparisonSection = ({ studentA, studentB, onRemoveComparison }) => {
  const [compSemester, setCompSemester] = useState(3);

  if (!studentA || !studentB) return null;

  const nameA = studentA.name.split(" ")[0];
  const nameB = studentB.name.split(" ")[0];

  // Semester subject filtering for comparison
  const subjectsA = (studentA.subjects || []).filter((s) => s.semester === compSemester);
  const subjectsB = (studentB.subjects || []).filter((s) => s.semester === compSemester);

  // Average course marks
  const avgMarksA = studentA.subjects?.length
    ? Math.round(studentA.subjects.reduce((sum, s) => sum + s.marks, 0) / studentA.subjects.length)
    : 80;
  const avgMarksB = studentB.subjects?.length
    ? Math.round(studentB.subjects.reduce((sum, s) => sum + s.marks, 0) / studentB.subjects.length)
    : 80;

  const totalCreditsA = (studentA.semesterTrends || []).reduce((sum, s) => sum + (s.credits || 0), 0) || studentA.totalCredits || 96;
  const totalCreditsB = (studentB.semesterTrends || []).reduce((sum, s) => sum + (s.credits || 0), 0) || studentB.totalCredits || 96;

  const summaryInsight = generateComparisonSummary(studentA, studentB, subjectsA, subjectsB);

  return (
    <div style={styles.container}>
      {/* Comparison Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.versusPill}>
            <Users size={16} color="#2563EB" />
            <span>Peer Benchmark Analysis</span>
          </div>
          <div style={styles.namesRow}>
            <div style={styles.studentBadgeA}>
              <img src={studentA.avatar} alt={studentA.name} style={styles.miniAvatar} />
              <span>{studentA.name}</span>
            </div>
            <span style={styles.vsText}>VS</span>
            <div style={styles.studentBadgeB}>
              <img src={studentB.avatar} alt={studentB.name} style={styles.miniAvatar} />
              <span>{studentB.name}</span>
            </div>
          </div>
        </div>

        <button style={styles.removeBtn} onClick={onRemoveComparison}>
          <X size={15} /> Remove Comparison
        </button>
      </div>

      {/* Grid of 5 Small Comparison Metric Bar Charts */}
      <div style={styles.cardsGrid}>
        <MetricCompareCard
          title="Cumulative CGPA"
          valA={studentA.currentCgpa}
          valB={studentB.currentCgpa}
          nameA={nameA}
          nameB={nameB}
          max={10}
        />
        <MetricCompareCard
          title="Average Attendance"
          valA={studentA.overallAttendance}
          valB={studentB.overallAttendance}
          nameA={nameA}
          nameB={nameB}
          unit="%"
          max={100}
        />
        <MetricCompareCard
          title="Overall Academic Score"
          valA={studentA.academicHealthScore || 85}
          valB={studentB.academicHealthScore || 80}
          nameA={nameA}
          nameB={nameB}
          unit="/100"
          max={100}
        />
        <MetricCompareCard
          title="Average Subject Marks"
          valA={avgMarksA}
          valB={avgMarksB}
          nameA={nameA}
          nameB={nameB}
          unit="%"
          max={100}
        />
        <MetricCompareCard
          title="Credits Earned"
          valA={totalCreditsA}
          valB={totalCreditsB}
          nameA={nameA}
          nameB={nameB}
          max={120}
        />
      </div>

      {/* Subject-Wise Student Comparison Section */}
      <div style={styles.subCompWrapper}>
        <div style={styles.subCompHeader}>
          <div>
            <h4 style={styles.subCompTitle}>Subject-Wise Peer Head-to-Head</h4>
            <p style={styles.subCompSubtitle}>Compare detailed course scores for a specific semester</p>
          </div>

          <div style={styles.semSelector}>
            {[1, 2, 3, 4, 5].map((sem) => (
              <button
                key={sem}
                style={{
                  ...styles.semBtn,
                  backgroundColor: compSemester === sem ? "#2563EB" : "#F3F4F6",
                  color: compSemester === sem ? "#FFFFFF" : "#374151",
                }}
                onClick={() => setCompSemester(sem)}
              >
                Sem {sem}
              </button>
            ))}
          </div>
        </div>

        {/* Subject Comparison Table */}
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={{ ...styles.th, width: "32%" }}>Subject</th>
                <th style={{ ...styles.th, width: "18%", textAlign: "right" }}>{studentA.name}</th>
                <th style={{ ...styles.th, width: "18%", textAlign: "right" }}>{studentB.name}</th>
                <th style={{ ...styles.th, width: "14%", textAlign: "center" }}>Difference</th>
                <th style={{ ...styles.th, width: "18%" }}>Visual Benchmark</th>
              </tr>
            </thead>
            <tbody>
              {subjectsA.map((subA) => {
                const subB = subjectsB.find(
                  (s) => s.code === subA.code || s.name.toLowerCase() === subA.name.toLowerCase()
                ) || { marks: 70, grade: "B" };

                const diff = subA.marks - subB.marks;
                const aLeads = diff > 0;
                const bLeads = diff < 0;

                return (
                  <tr key={subA.id || subA.code} style={styles.tr}>
                    <td style={styles.td}>
                      <div style={styles.courseName}>{subA.name}</div>
                      <div style={styles.courseCode}>{subA.code} &bull; {subA.credits} Credits</div>
                    </td>
                    <td style={{ ...styles.td, textAlign: "right" }}>
                      <span style={{ fontWeight: 700, color: aLeads ? "#15803D" : "#111827" }}>
                        {subA.marks}%
                      </span>
                      <span style={styles.miniGradePill}>{subA.grade}</span>
                    </td>
                    <td style={{ ...styles.td, textAlign: "right" }}>
                      <span style={{ fontWeight: 700, color: bLeads ? "#15803D" : "#111827" }}>
                        {subB.marks}%
                      </span>
                      <span style={styles.miniGradePill}>{subB.grade}</span>
                    </td>
                    <td style={{ ...styles.td, textAlign: "center" }}>
                      <span style={{
                        ...styles.diffPill,
                        backgroundColor: diff > 0 ? "#DCFCE7" : diff < 0 ? "#FEE2E2" : "#F3F4F6",
                        color: diff > 0 ? "#15803D" : diff < 0 ? "#DC2626" : "#4B5563",
                      }}>
                        {diff > 0 ? `+${diff}%` : `${diff}%`}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div style={styles.miniCompBars}>
                        <div style={styles.tinyBarWrap}>
                          <div style={{ ...styles.barFillA, width: `${subA.marks}%` }} />
                        </div>
                        <div style={styles.tinyBarWrap}>
                          <div style={{ ...styles.barFillB, width: `${subB.marks}%` }} />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comparison Insight Box */}
      <div style={styles.insightBox}>
        <Sparkles size={18} color="#2563EB" style={{ flexShrink: 0, marginTop: "2px" }} />
        <div>
          <div style={styles.insightTitle}>Comparative Academic Summary</div>
          <div style={styles.insightDesc}>{summaryInsight}</div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
    border: "2px solid #BFDBFE",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
    paddingBottom: "16px",
    borderBottom: "1px solid #E5E7EB",
  },
  headerLeft: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  versusPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    backgroundColor: "#EFF6FF",
    color: "#1D4ED8",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: 700,
    width: "fit-content",
  },
  namesRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  studentBadgeA: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#F0FDF4",
    border: "1px solid #BBF7D0",
    padding: "6px 12px",
    borderRadius: "8px",
    fontWeight: 700,
    color: "#166534",
    fontSize: "13.5px",
  },
  studentBadgeB: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#EFF6FF",
    border: "1px solid #BFDBFE",
    padding: "6px 12px",
    borderRadius: "8px",
    fontWeight: 700,
    color: "#1E40AF",
    fontSize: "13.5px",
  },
  miniAvatar: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
  },
  vsText: {
    fontSize: "12px",
    fontWeight: 800,
    color: "#9CA3AF",
  },
  removeBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    backgroundColor: "#FEE2E2",
    color: "#B91C1C",
    border: "1px solid #FECACA",
    padding: "8px 14px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.15s ease",
  },
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "12px",
  },
  metricCard: {
    backgroundColor: "#F9FAFB",
    borderRadius: "12px",
    padding: "14px",
    border: "1px solid #E5E7EB",
  },
  metricTitle: {
    fontSize: "12px",
    fontWeight: 600,
    color: "#4B5563",
    marginBottom: "8px",
  },
  metricValsRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  studentCol: {
    display: "flex",
    flexDirection: "column",
  },
  studentColName: {
    fontSize: "10px",
    color: "#6B7280",
    fontWeight: 500,
  },
  studentColVal: {
    fontSize: "15px",
    fontWeight: 700,
  },
  vsBadge: {
    fontSize: "10px",
    fontWeight: 800,
    color: "#9CA3AF",
  },
  barPair: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },
  singleBarWrap: {
    height: "5px",
    backgroundColor: "#E5E7EB",
    borderRadius: "3px",
    overflow: "hidden",
  },
  barFillA: {
    height: "100%",
    backgroundColor: "#16A34A",
    borderRadius: "3px",
  },
  barFillB: {
    height: "100%",
    backgroundColor: "#2563EB",
    borderRadius: "3px",
  },
  subCompWrapper: {
    backgroundColor: "#F8FAFC",
    borderRadius: "12px",
    padding: "18px",
    border: "1px solid #E2E8F0",
  },
  subCompHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "14px",
    flexWrap: "wrap",
    gap: "10px",
  },
  subCompTitle: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#0F172A",
    margin: 0,
  },
  subCompSubtitle: {
    fontSize: "11.5px",
    color: "#64748B",
    margin: "2px 0 0 0",
  },
  semSelector: {
    display: "flex",
    gap: "4px",
  },
  semBtn: {
    border: "none",
    padding: "5px 10px",
    borderRadius: "6px",
    fontSize: "11px",
    fontWeight: 600,
    cursor: "pointer",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "12.5px",
  },
  th: {
    textAlign: "left",
    padding: "8px 10px",
    color: "#64748B",
    fontWeight: 600,
    borderBottom: "1px solid #CBD5E1",
    fontSize: "11.5px",
  },
  tr: {
    borderBottom: "1px solid #E2E8F0",
  },
  td: {
    padding: "10px 10px",
    verticalAlign: "middle",
  },
  courseName: {
    fontWeight: 600,
    color: "#1E293B",
  },
  courseCode: {
    fontSize: "10.5px",
    color: "#64748B",
  },
  miniGradePill: {
    display: "inline-block",
    marginLeft: "6px",
    padding: "1px 5px",
    borderRadius: "4px",
    backgroundColor: "#F1F5F9",
    color: "#475569",
    fontSize: "10px",
    fontWeight: 700,
  },
  diffPill: {
    display: "inline-block",
    padding: "2px 7px",
    borderRadius: "10px",
    fontSize: "11px",
    fontWeight: 700,
  },
  miniCompBars: {
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },
  tinyBarWrap: {
    height: "4px",
    backgroundColor: "#E2E8F0",
    borderRadius: "2px",
    overflow: "hidden",
  },
  insightBox: {
    backgroundColor: "#EFF6FF",
    borderRadius: "10px",
    padding: "14px 16px",
    border: "1px solid #BFDBFE",
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
  },
  insightTitle: {
    fontSize: "13px",
    fontWeight: 700,
    color: "#1E3A8A",
  },
  insightDesc: {
    fontSize: "12.5px",
    color: "#1E40AF",
    marginTop: "3px",
    lineHeight: 1.5,
  },
};

export default StudentComparisonSection;
