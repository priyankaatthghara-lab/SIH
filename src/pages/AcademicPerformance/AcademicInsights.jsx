import React from "react";
import { Sparkles, CheckCircle2, AlertCircle, TrendingUp, Info } from "lucide-react";
import { generateAcademicInsights } from "../../utils/academicCalculations";

const AcademicInsights = ({ student }) => {
  const insights = generateAcademicInsights(student);

  const getCardIcon = (type) => {
    switch (type) {
      case "positive":
        return <CheckCircle2 size={16} color="#15803D" />;
      case "warning":
        return <AlertCircle size={16} color="#DC2626" />;
      case "negative":
        return <AlertCircle size={16} color="#B91C1C" />;
      case "info":
      default:
        return <Info size={16} color="#2563EB" />;
    }
  };

  const getCardBorder = (type) => {
    switch (type) {
      case "positive":
        return "#BBF7D0";
      case "warning":
      case "negative":
        return "#FECACA";
      case "info":
      default:
        return "#BFDBFE";
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.titleRow}>
          <Sparkles size={18} color="#8B5CF6" />
          <h3 style={styles.title}>Academic Insights &amp; Advisory</h3>
        </div>
        <span style={styles.badge}>Automated Academic Advisory</span>
      </div>

      <div style={styles.grid}>
        {insights.map((ins, idx) => (
          <div
            key={idx}
            style={{
              ...styles.card,
              borderColor: getCardBorder(ins.type),
            }}
          >
            <div style={styles.cardHeader}>
              {getCardIcon(ins.type)}
              <h4 style={styles.cardTitle}>{ins.title}</h4>
            </div>
            <p style={styles.cardDesc}>{ins.description}</p>
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
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
    flexWrap: "wrap",
    gap: "8px",
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
  badge: {
    fontSize: "11px",
    fontWeight: 600,
    backgroundColor: "#F3E8FF",
    color: "#7E22CE",
    padding: "3px 10px",
    borderRadius: "12px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "14px",
  },
  card: {
    backgroundColor: "#F9FAFB",
    borderRadius: "12px",
    padding: "16px",
    border: "1px solid #E5E7EB",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  cardTitle: {
    fontSize: "13.5px",
    fontWeight: 700,
    color: "#111827",
    margin: 0,
  },
  cardDesc: {
    fontSize: "12.5px",
    color: "#4B5563",
    lineHeight: 1.5,
    margin: 0,
  },
};

export default AcademicInsights;
