import React from "react";
import { CheckCircle, AlertTriangle, ArrowUp, ArrowDown } from "lucide-react";

const StrongWeakSubjects = ({ student }) => {
  const subjects = student?.subjects || [];
  const sorted = [...subjects].sort((a, b) => b.marks - a.marks);

  const top3 = sorted.slice(0, 3);
  const bottom3 = sorted.slice(-3).reverse();

  return (
    <div style={styles.grid}>
      {/* Strongest Subjects Card */}
      <div style={styles.card}>
        <div style={styles.headerRow}>
          <div style={styles.iconCircleGood}>
            <CheckCircle size={18} color="#15803D" />
          </div>
          <div>
            <h3 style={styles.title}>Strongest Subjects</h3>
            <p style={styles.subtitle}>Top 3 highest-scoring academic areas</p>
          </div>
        </div>

        <div style={styles.list}>
          {top3.map((sub, idx) => (
            <div key={sub.id || idx} style={styles.item}>
              <div style={styles.rankNum}>#{idx + 1}</div>
              <div style={styles.itemInfo}>
                <div style={styles.subName}>{sub.name}</div>
                <div style={styles.subMeta}>
                  <code>{sub.code}</code> &bull; Sem {sub.semester} &bull; {sub.faculty}
                </div>
              </div>
              <div style={styles.scorePillGood}>
                <ArrowUp size={13} color="#15803D" />
                <span>{sub.marks}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subjects Needing Attention Card */}
      <div style={styles.card}>
        <div style={styles.headerRow}>
          <div style={styles.iconCircleWarn}>
            <AlertTriangle size={18} color="#DC2626" />
          </div>
          <div>
            <h3 style={styles.title}>Subjects Needing Attention</h3>
            <p style={styles.subtitle}>Bottom 3 subjects with performance gaps</p>
          </div>
        </div>

        <div style={styles.list}>
          {bottom3.map((sub, idx) => (
            <div key={sub.id || idx} style={styles.item}>
              <div style={styles.rankNumWarn}>#{idx + 1}</div>
              <div style={styles.itemInfo}>
                <div style={styles.subName}>{sub.name}</div>
                <div style={styles.subMeta}>
                  <code>{sub.code}</code> &bull; Sem {sub.semester} &bull; Class Avg: {sub.classAverage}%
                </div>
              </div>
              <div style={styles.scorePillWarn}>
                <ArrowDown size={13} color="#DC2626" />
                <span>{sub.marks}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    padding: "22px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
    border: "1px solid #F3F4F6",
  },
  headerRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "18px",
    paddingBottom: "12px",
    borderBottom: "1px solid #F3F4F6",
  },
  iconCircleGood: {
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    backgroundColor: "#DCFCE7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircleWarn: {
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    backgroundColor: "#FEE2E2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: "15px",
    fontWeight: 700,
    color: "#111827",
    margin: 0,
  },
  subtitle: {
    fontSize: "12px",
    color: "#6B7280",
    margin: "2px 0 0 0",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  item: {
    display: "flex",
    alignItems: "center",
    padding: "10px 12px",
    borderRadius: "10px",
    backgroundColor: "#F9FAFB",
    border: "1px solid #F3F4F6",
    gap: "12px",
  },
  rankNum: {
    fontSize: "13px",
    fontWeight: 800,
    color: "#2563EB",
    width: "22px",
  },
  rankNumWarn: {
    fontSize: "13px",
    fontWeight: 800,
    color: "#DC2626",
    width: "22px",
  },
  itemInfo: {
    flex: 1,
  },
  subName: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#111827",
  },
  subMeta: {
    fontSize: "11px",
    color: "#6B7280",
    marginTop: "2px",
  },
  scorePillGood: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    backgroundColor: "#DCFCE7",
    color: "#15803D",
    padding: "4px 8px",
    borderRadius: "6px",
    fontWeight: 700,
    fontSize: "12px",
  },
  scorePillWarn: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    backgroundColor: "#FEE2E2",
    color: "#DC2626",
    padding: "4px 8px",
    borderRadius: "6px",
    fontWeight: 700,
    fontSize: "12px",
  },
};

export default StrongWeakSubjects;
