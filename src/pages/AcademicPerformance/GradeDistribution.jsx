import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from "recharts";
import { PieChart as PieIcon } from "lucide-react";
import { calculateGradeDistribution } from "../../utils/academicCalculations";

const GRADE_COLORS = {
  "A+": "#10B981",
  "A": "#059669",
  "A-": "#3B82F6",
  "B+": "#6366F1",
  "B": "#8B5CF6",
  "B-": "#EC4899",
  "C+": "#F59E0B",
  "C": "#D97706",
  "D": "#EF4444",
  "F": "#B91C1C",
};

const GradeDistribution = ({ student }) => {
  const subjects = student?.subjects || [];
  const distributionData = calculateGradeDistribution(subjects);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.titleRow}>
          <PieIcon size={18} color="#2563EB" />
          <h3 style={styles.title}>Grade Distribution</h3>
        </div>
        <span style={styles.totalBadge}>{subjects.length} Total Grades</span>
      </div>

      <div style={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={distributionData} margin={{ top: 12, right: 10, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="grade"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 12, fontWeight: 600 }}
            />
            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 11 }}
            />
            <Tooltip
              formatter={(val) => [`${val} Subjects`, "Count"]}
              contentStyle={{
                backgroundColor: "#1E293B",
                color: "#FFFFFF",
                borderRadius: "8px",
                fontSize: "12px",
                border: "none",
              }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={28}>
              {distributionData.map((entry) => (
                <Cell key={entry.grade} fill={GRADE_COLORS[entry.grade] || "#3B82F6"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={styles.legendRow}>
        {distributionData.map((d) => (
          <div key={d.grade} style={styles.legendItem}>
            <span
              style={{
                ...styles.legendDot,
                backgroundColor: GRADE_COLORS[d.grade] || "#3B82F6",
              }}
            />
            <span style={styles.legendGrade}>{d.grade}:</span>
            <strong style={styles.legendCount}>{d.count}</strong>
          </div>
        ))}
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
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
  totalBadge: {
    fontSize: "11px",
    fontWeight: 600,
    backgroundColor: "#F3F4F6",
    color: "#4B5563",
    padding: "3px 8px",
    borderRadius: "12px",
  },
  chartWrapper: {
    width: "100%",
    height: "220px",
  },
  legendRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginTop: "16px",
    paddingTop: "14px",
    borderTop: "1px solid #F1F5F9",
    justifyContent: "center",
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "11.5px",
  },
  legendDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
  },
  legendGrade: {
    color: "#64748B",
    fontWeight: 600,
  },
  legendCount: {
    color: "#0F172A",
  },
};

export default GradeDistribution;
