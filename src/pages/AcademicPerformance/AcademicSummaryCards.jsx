import React from "react";
import { TrendingUp, Award, CheckCircle2, Flame } from "lucide-react";
import { calculateAcademicTrend } from "../../utils/academicCalculations";

const StatCard = ({ icon, value, max, label, iconBg, iconColor, subtext }) => (
  <div style={styles.card}>
    <div style={{ ...styles.iconBox, backgroundColor: iconBg, color: iconColor }}>
      {icon}
    </div>
    <div style={styles.valueRow}>
      <span style={styles.value}>{value}</span>
      {max && <span style={styles.max}> / {max}</span>}
    </div>
    <div style={styles.label}>{label}</div>
    {subtext && <div style={styles.subtext}>{subtext}</div>}
  </div>
);

const AcademicSummaryCards = ({ student }) => {
  const trends = student?.semesterTrends || [];
  const currentSemTrend = trends[trends.length - 1] || {};
  const currentSgpa = currentSemTrend.sgpa ?? student?.currentCgpa ?? 8.7;
  const trendInfo = calculateAcademicTrend(trends);
  const totalEarnedCredits = trends.reduce((sum, s) => sum + (Number(s.credits) || 0), 0) || student?.totalCredits || 96;

  return (
    <div style={styles.grid}>
      <StatCard
        icon={<TrendingUp size={22} />}
        value={student?.currentCgpa ?? 8.7}
        max="10"
        label="Current CGPA"
        iconBg="#DCFCE7"
        iconColor="#16A34A"
        subtext={`Rank #${student?.departmentRank || 1} in Dept`}
      />

      <StatCard
        icon={<Award size={22} />}
        value={currentSgpa}
        max="10"
        label="Latest SGPA"
        iconBg="#EFF6FF"
        iconColor="#2563EB"
        subtext={`Semester ${student?.semester || 5}`}
      />

      <StatCard
        icon={<CheckCircle2 size={22} />}
        value={totalEarnedCredits}
        max="120"
        label="Credits Earned"
        iconBg="#F3E8FF"
        iconColor="#9333EA"
        subtext={`${120 - totalEarnedCredits} Credits Remaining`}
      />

      <StatCard
        icon={<Flame size={22} />}
        value={trendInfo.text}
        label="Academic Trend"
        iconBg="#EEF2FF"
        iconColor="#4F46E5"
        subtext={`Across ${trends.length} Semesters`}
      />
    </div>
  );
};

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
    gap: "16px",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: "14px",
    padding: "18px 16px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    border: "1px solid #F3F4F6",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    position: "relative",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  iconBox: {
    width: "42px",
    height: "42px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "12px",
  },
  valueRow: {
    display: "flex",
    alignItems: "baseline",
    gap: "3px",
  },
  value: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#111827",
    letterSpacing: "-0.5px",
  },
  max: {
    fontSize: "13px",
    color: "#9CA3AF",
    fontWeight: 500,
  },
  label: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#6B7280",
    marginTop: "4px",
  },
  subtext: {
    fontSize: "11px",
    fontWeight: 600,
    color: "#9CA3AF",
    marginTop: "6px",
  },
};

export default AcademicSummaryCards;
