import React, { useState } from "react";
import { Search, X, Users, Check } from "lucide-react";

const CompareStudentModal = ({ isOpen, onClose, allStudents, currentStudent, onSelectCompareStudent }) => {
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  const candidates = (allStudents || []).filter((s) => s.id !== currentStudent?.id);
  const filtered = candidates.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.id.toLowerCase().includes(search.toLowerCase()) ||
    (s.rollNo && s.rollNo.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <div style={styles.titleRow}>
            <Users size={20} color="#2563EB" />
            <div>
              <h3 style={styles.title}>Compare Academic Performance</h3>
              <p style={styles.subtitle}>
                Select a peer to compare side-by-side with <strong>{currentStudent?.name}</strong>
              </p>
            </div>
          </div>
          <button style={styles.closeBtn} onClick={onClose}>
            <X size={18} color="#6B7280" />
          </button>
        </div>

        {/* Search */}
        <div style={styles.searchBox}>
          <Search size={16} color="#9CA3AF" />
          <input
            autoFocus
            type="text"
            placeholder="Search student by name, roll no, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        {/* Student List */}
        <div style={styles.list}>
          {filtered.length === 0 ? (
            <div style={styles.noResults}>No peers found matching your query.</div>
          ) : (
            filtered.map((st) => (
              <div
                key={st.id}
                style={styles.item}
                onClick={() => {
                  onSelectCompareStudent(st);
                  onClose();
                }}
              >
                <img src={st.avatar} alt={st.name} style={styles.avatar} />
                <div style={styles.info}>
                  <div style={styles.name}>{st.name}</div>
                  <div style={styles.meta}>
                    {st.id} &bull; Roll: {st.rollNo || "N/A"} &bull; Sem {st.semester}
                  </div>
                </div>
                <div style={styles.cgpaPill}>
                  CGPA {st.currentCgpa}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(17, 24, 39, 0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px",
  },
  modal: {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "520px",
    maxHeight: "85vh",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    overflow: "hidden",
  },
  header: {
    padding: "20px 24px 16px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottom: "1px solid #F3F4F6",
  },
  titleRow: {
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
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
    margin: "3px 0 0 0",
  },
  closeBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    borderRadius: "6px",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 14px",
    margin: "16px 24px",
    backgroundColor: "#F9FAFB",
    borderRadius: "8px",
    border: "1px solid #E5E7EB",
  },
  searchInput: {
    border: "none",
    backgroundColor: "transparent",
    outline: "none",
    fontSize: "13px",
    color: "#111827",
    width: "100%",
  },
  list: {
    overflowY: "auto",
    padding: "0 24px 20px 24px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  item: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #F3F4F6",
    backgroundColor: "#FFFFFF",
    cursor: "pointer",
    transition: "all 0.15s ease",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#E2E8F0",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: "13.5px",
    fontWeight: 600,
    color: "#111827",
  },
  meta: {
    fontSize: "11px",
    color: "#6B7280",
    marginTop: "2px",
  },
  cgpaPill: {
    backgroundColor: "#EFF6FF",
    color: "#1D4ED8",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "11.5px",
    fontWeight: 700,
    border: "1px solid #BFDBFE",
  },
  noResults: {
    textAlign: "center",
    padding: "24px",
    color: "#9CA3AF",
    fontSize: "13px",
  },
};

export default CompareStudentModal;
