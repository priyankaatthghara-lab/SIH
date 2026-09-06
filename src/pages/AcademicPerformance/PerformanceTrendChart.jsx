import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { TrendingUp, Sparkles } from "lucide-react";
import { generateTrendInsight } from "../../utils/academicCalculations";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={styles.tooltip}>
        <p style={styles.tooltipTitle}>{label}</p>
        {payload.map((entry, index) => (
          <div key={index} style={styles.tooltipItem}>
            <span style={{ ...styles.dot, backgroundColor: entry.color }} />
            <span style={styles.tooltipKey}>{entry.name}:</span>
            <strong style={styles.tooltipVal}>{entry.value.toFixed(2)}</strong>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const PerformanceTrendChart = ({ student }) => {
  const trends = student?.semesterTrends || [];
  const chartData = trends.map((t) => ({
    name: `Semester ${t.semester}`,
    SGPA: t.sgpa,
    CGPA: t.cgpa,
    attendance: t.attendance,
  }));

  const insight = generateTrendInsight(trends);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.titleRow}>
          <TrendingUp size={18} color="#2563EB" />
          <h2 style={styles.title}>CGPA &amp; SGPA Progression Trend</h2>
        </div>
        <div style={styles.legendBadge}>
          <span style={{ ...styles.legendDot, backgroundColor: "#2563EB" }} /> SGPA (Semester)
          <span style={{ ...styles.legendDot, backgroundColor: "#10B981", marginLeft: "12px" }} /> CGPA (Cumulative)
        </div>
      </div>

      <div style={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={chartData} margin={{ top: 16, right: 24, left: -10, bottom: 4 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 12 }}
            />
            <YAxis
              domain={[6.0, 10.0]}
              ticks={[6.0, 7.0, 8.0, 9.0, 10.0]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="SGPA"
              stroke="#2563EB"
              strokeWidth={3}
              dot={{ r: 5, fill: "#2563EB", strokeWidth: 2, stroke: "#FFFFFF" }}
              activeDot={{ r: 7 }}
            />
            <Line
              type="monotone"
              dataKey="CGPA"
              stroke="#10B981"
              strokeWidth={3}
              strokeDasharray="4 4"
              dot={{ r: 5, fill: "#10B981", strokeWidth: 2, stroke: "#FFFFFF" }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Dynamic Data-driven Insight */}
      <div style={styles.insightBox}>
        <Sparkles size={16} color="#3B82F6" style={{ flexShrink: 0 }} />
        <span style={styles.insightText}>{insight}</span>
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
    flexWrap: "wrap",
    gap: "10px",
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
  legendBadge: {
    display: "flex",
    alignItems: "center",
    fontSize: "12px",
    fontWeight: 600,
    color: "#6B7280",
    backgroundColor: "#F9FAFB",
    padding: "6px 14px",
    borderRadius: "20px",
    border: "1px solid #E5E7EB",
  },
  legendDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    marginRight: "6px",
  },
  chartWrapper: {
    width: "100%",
    height: "260px",
  },
  insightBox: {
    marginTop: "16px",
    backgroundColor: "#EFF6FF",
    borderLeft: "4px solid #3B82F6",
    padding: "10px 14px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  insightText: {
    fontSize: "13px",
    color: "#1E40AF",
    fontWeight: 500,
    lineHeight: 1.4,
  },
  tooltip: {
    backgroundColor: "#1E293B",
    color: "#FFFFFF",
    padding: "10px 14px",
    borderRadius: "8px",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)",
    fontSize: "12px",
  },
  tooltipTitle: {
    fontWeight: 700,
    marginBottom: "6px",
    borderBottom: "1px solid #334155",
    paddingBottom: "4px",
    color: "#F8FAFC",
  },
  tooltipItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginTop: "4px",
  },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
  },
  tooltipKey: {
    color: "#94A3B8",
  },
  tooltipVal: {
    color: "#FFFFFF",
    marginLeft: "auto",
  },
};

export default PerformanceTrendChart;
