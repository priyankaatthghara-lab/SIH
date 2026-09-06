import React from "react";
import { Users2, BarChart2 } from "lucide-react";

const ComparisonRow = ({ label, studentVal, classVal, unit = "%", formatVal }) => {
  const diff = studentVal - classVal;
  const isHigher = diff >= 0;

  return (
    <div style={styles.compRow}>
      <div style={styles.rowHeader}>
        <span style={styles.label}>{label}</span>
        <div style={styles.valComparison}>
          <span style={styles.studentBadge}>
            Student: <strong>{formatVal ? formatVal(studentVal) : `${studentVal}${unit}`}</strong>
          </span>
          <span style={styles.classBadge}>
            Class Avg: {formatVal ? formatVal(classVal) : `${classVal}${unit}`}
          </span>
        </div>
      </div>

      <div style={styles.barPair}>
        {/* Student Bar */}
        <div style={styles.singleBarWrap}>
          <div style={{ ...styles.barFillStudent, width: `${Math.min(100, Math.max(0, (studentVal / (unit === "" ? 10 : 100)) * 100))}%` }} />
        </div>
        {/* Class Bar */}
        <div style={styles.singleBarWrap}>
          <div style={{ ...styles.barFillClass, width: `${Math.min(100, Math.max(0, (classVal / (unit === "" ? 10 : 100)) * 100))}%` }} />
        </div>
      </div>

      <div style={styles.diffFoot}>
        <span style={{ color: isHigher ? "#15803D" : "#DC2626", fontWeight: 700, fontSize: "11px" }}>
          {isHigher ? `+${diff.toFixed(1)}${unit} higher than class average` : `${diff.toFixed(1)}${unit} below class average`}
        </span>
      </div>
    </div>
  );
};

const ClassComparison = ({ student }) => {
  const subjects = student?.subjects || [];
  const avgMarks = subjects.length
    ? Math.round(subjects.reduce((sum, s) => sum + s.marks, 0) / subjects.length)
    : 78;
  const classAvgMarks = 72; // departmental benchmark

  const studentAtt = student?.overallAttendance || 88;
  const classAvgAtt = 80;

  const studentCgpa = student?.currentCgpa || 8.5;
  const classAvgCgpa = student?.departmentAvgCgpa || 7.9;

  const strongCount = subjects.filter((s) => s.status === "Strong").length;
  const needsAttentionCount = subjects.filter((s) => s.status === "Needs Attention" || s.marks < 60).length;

  return (
    <div style={styles.container}>
      <div style={styles.titleRow}>
        <Users2 size={18} color="#2563EB" />
        <div>
          <h3 style={styles.title}>Performance vs Class Benchmark</h3>
          <p style={styles.subtitle}>Comparative standing against CSE department cohort average</p>
        </div>
      </div>

      <div style={styles.rowsGrid}>
        <ComparisonRow
          label="Overall Course Marks"
          studentVal={avgMarks}
          classVal={classAvgMarks}
          unit="%"
        />

        <ComparisonRow
          label="Average Attendance"
          studentVal={studentAtt}
          classVal={classAvgAtt}
          unit="%"
        />

        <ComparisonRow
          label="Cumulative CGPA"
          studentVal={studentCgpa}
          classVal={classAvgCgpa}
          unit=""
          formatVal={(v) => Number(v).toFixed(2)}
        />
      </div>

      {/* Footer mini summary */}
      <div style={styles.summaryBar}>
        <div style={styles.summaryItem}>
          <span style={styles.sumValGood}>{strongCount}</span>
          <span style={styles.sumLbl}>Strong Subjects (&ge;80%)</span>
        </div>
        <div style={styles.divider} />
        <div style={styles.summaryItem}>
          <span style={styles.sumValWarn}>{needsAttentionCount}</span>
          <span style={styles.sumLbl}>Subjects Needing Focus (&lt;60%)</span>
        </div>
        <div style={styles.divider} />
        <div style={styles.summaryItem}>
          <span style={styles.sumValBlue}>#{student?.departmentRank || 1}</span>
          <span style={styles.sumLbl}>Batch Standing (Top {100 - (student?.percentile || 80)}%)</span>
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
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    border: "1px solid #F3F4F6",
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  title: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#111827",
    margin: 0,
  },
  subtitle: {
    fontSize: "12px",
    color: "#6B7280",
    margin: "2px 0 0 0",
  },
  rowsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  compRow: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  rowHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#374151",
  },
  valComparison: {
    display: "flex",
    gap: "8px",
    fontSize: "12px",
  },
  studentBadge: {
    backgroundColor: "#EFF6FF",
    color: "#1D4ED8",
    padding: "2px 8px",
    borderRadius: "4px",
    fontWeight: 500,
  },
  classBadge: {
    backgroundColor: "#F1F5F9",
    color: "#475569",
    padding: "2px 8px",
    borderRadius: "4px",
    fontWeight: 500,
  },
  barPair: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    marginTop: "2px",
  },
  singleBarWrap: {
    height: "7px",
    backgroundColor: "#E2E8F0",
    borderRadius: "4px",
    overflow: "hidden",
  },
  barFillStudent: {
    height: "100%",
    backgroundColor: "#2563EB",
    borderRadius: "4px",
    transition: "width 0.4s ease",
  },
  barFillClass: {
    height: "100%",
    backgroundColor: "#94A3B8",
    borderRadius: "4px",
    transition: "width 0.4s ease",
  },
  diffFoot: {
    display: "flex",
    justifyContent: "flex-end",
  },
  summaryBar: {
    marginTop: "24px",
    paddingTop: "16px",
    borderTop: "1px solid #F1F5F9",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    padding: "12px",
    borderRadius: "10px",
  },
  summaryItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  sumValGood: {
    fontSize: "18px",
    fontWeight: 800,
    color: "#15803D",
  },
  sumValWarn: {
    fontSize: "18px",
    fontWeight: 800,
    color: "#DC2626",
  },
  sumValBlue: {
    fontSize: "18px",
    fontWeight: 800,
    color: "#2563EB",
  },
  sumLbl: {
    fontSize: "11px",
    fontWeight: 600,
    color: "#64748B",
    marginTop: "2px",
  },
  divider: {
    width: "1px",
    height: "30px",
    backgroundColor: "#E2E8F0",
  },
};

export default ClassComparison;
