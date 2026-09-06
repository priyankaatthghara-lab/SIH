import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Download, Users, TrendingUp } from "lucide-react";
import { useStudent } from "../../context/StudentContext";
import { downloadAcademicReport } from "../../utils/reportGenerator";

// Child Components
import AcademicSummaryCards from "./AcademicSummaryCards";
import PerformanceTrendChart from "./PerformanceTrendChart";
import SemesterPerformanceTable from "./SemesterPerformanceTable";
import SubjectPerformanceSection from "./SubjectPerformanceSection";
import StrongWeakSubjects from "./StrongWeakSubjects";
import ClassComparison from "./ClassComparison";
import GradeDistribution from "./GradeDistribution";
import AcademicInsights from "./AcademicInsights";
import StudentComparisonSection from "./StudentComparisonSection";
import CompareStudentModal from "./CompareStudentModal";

const AcademicPerformance = () => {
  const { student, allStudents } = useStudent();

  // Semester and subject filter states
  const [selectedSemester, setSelectedSemester] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [performanceFilter, setPerformanceFilter] = useState("All");

  // Comparison states
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [compareStudent, setCompareStudent] = useState(null);

  // If primary student changes, reset comparison if compareStudent is the same as new primary
  useEffect(() => {
    if (compareStudent && compareStudent.id === student?.id) {
      setCompareStudent(null);
    }
  }, [student, compareStudent]);

  const handleSelectCompareStudent = (peer) => {
    if (peer.id === student?.id) return;
    setCompareStudent(peer);
  };

  const handleRemoveComparison = () => {
    setCompareStudent(null);
  };

  return (
    <div style={styles.page}>
      {/* ── Page Header ── */}
      <div style={styles.pageHeader}>
        <div style={styles.headerLeft}>
          <p style={styles.breadcrumb}>
            <Link to="/" style={styles.homeLink}>Home</Link> &rsaquo; Academic Performance
          </p>
          <h1 style={styles.pageTitle}>Academic Performance</h1>
          <p style={styles.pageSubtitle}>
            Detailed academic analytics, semester-wise performance and student comparison
          </p>
        </div>

        {/* Header Right: Actions */}
        <div style={styles.headerRight}>
          <div style={styles.headerButtons}>
            {!compareStudent ? (
              <button
                style={styles.compareBtn}
                onClick={() => setIsCompareModalOpen(true)}
              >
                <Users size={15} /> Compare Student
              </button>
            ) : (
              <button
                style={styles.activeCompareBtn}
                onClick={() => setIsCompareModalOpen(true)}
              >
                <Users size={15} /> Change Comparison ({compareStudent.name.split(" ")[0]})
              </button>
            )}

            <button
              style={styles.downloadBtn}
              onClick={() => downloadAcademicReport(student)}
            >
              <Download size={15} /> Download Academic Report
            </button>
          </div>
        </div>
      </div>

      {/* ── Optional Student-to-Student Comparison Section (when active) ── */}
      {compareStudent && (
        <StudentComparisonSection
          studentA={student}
          studentB={compareStudent}
          onRemoveComparison={handleRemoveComparison}
        />
      )}

      {/* ── Section 1: Analytical Summary Cards ── */}
      <AcademicSummaryCards student={student} />

      {/* ── Section 2: CGPA/SGPA Trend Chart ── */}
      <PerformanceTrendChart student={student} />

      {/* ── Section 3: Semester-wise Performance Table ── */}
      <SemesterPerformanceTable
        student={student}
        selectedSemester={selectedSemester}
        onSelectSemester={setSelectedSemester}
      />

      {/* ── Section 4: All Subjects Course Breakdown & Visual Bar ── */}
      <SubjectPerformanceSection
        student={student}
        selectedSemester={selectedSemester}
        onSelectSemester={setSelectedSemester}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        performanceFilter={performanceFilter}
        onPerformanceFilterChange={setPerformanceFilter}
      />

      {/* ── Section 5: Strongest & Weakest Subjects ── */}
      <StrongWeakSubjects student={student} />

      {/* ── Section 6: Class Comparison & Grade Distribution ── */}
      <div style={styles.twoColumnGrid}>
        <ClassComparison student={student} />
        <GradeDistribution student={student} />
      </div>

      {/* ── Section 7: Academic Insights & Advisory ── */}
      <AcademicInsights student={student} />

      {/* ── Compare Student Modal ── */}
      <CompareStudentModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        allStudents={allStudents}
        currentStudent={student}
        onSelectCompareStudent={handleSelectCompareStudent}
      />
    </div>
  );
};

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    paddingBottom: "40px",
  },
  pageHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "16px",
  },
  headerLeft: {
    display: "flex",
    flexDirection: "column",
  },
  breadcrumb: {
    fontSize: "13px",
    color: "#6B7280",
    marginBottom: "4px",
  },
  homeLink: {
    color: "#2563EB",
    textDecoration: "none",
    fontWeight: 500,
  },
  pageTitle: {
    fontSize: "26px",
    fontWeight: 700,
    color: "#111827",
    margin: "0 0 4px 0",
    letterSpacing: "-0.5px",
  },
  pageSubtitle: {
    fontSize: "13.5px",
    color: "#6B7280",
    margin: 0,
  },
  headerRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "12px",
  },
  headerButtons: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  compareBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "9px 16px",
    backgroundColor: "#EFF6FF",
    border: "1px solid #BFDBFE",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: 600,
    color: "#2563EB",
    cursor: "pointer",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
    transition: "all 0.15s ease",
  },
  activeCompareBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "9px 16px",
    backgroundColor: "#2563EB",
    border: "1px solid #2563EB",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: 600,
    color: "#FFFFFF",
    cursor: "pointer",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
    transition: "all 0.15s ease",
  },
  downloadBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "9px 16px",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: 600,
    color: "#374151",
    cursor: "pointer",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    transition: "all 0.15s ease",
  },
  twoColumnGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
    gap: "20px",
  },
};

export default AcademicPerformance;
