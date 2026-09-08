import React from "react";
import { Link } from "react-router-dom";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, BarChart, Bar, Cell
} from "recharts";
import {
  Download, TrendingUp, CheckCircle, XCircle,
  AlertCircle, Sparkles, BookOpen, Calendar,
  UserRound, Check
} from "lucide-react";
import { useStudent } from "../context/StudentContext";
import { downloadAcademicReport } from "../utils/reportGenerator";

const StatCard = ({ icon, value, max, label, iconBg, iconColor }) => (
  <div style={s.statCard}>
    <div style={{ ...s.statIcon, backgroundColor: iconBg, color: iconColor }}>{icon}</div>
    <div style={s.statValue}>{value}{max && <span style={s.statMax}> / {max}</span>}</div>
    <div style={s.statLabel}>{label}</div>
  </div>
);

const MiniBar = ({ value, color }) => (
  <div style={s.barTrack}>
    <div style={{ ...s.barFill, width: `${Math.min(100, Math.max(0, value))}%`, backgroundColor: color }} />
  </div>
);

const StudentProfile = () => {
  const { student, selectStudent, allStudents } = useStudent();

  const trendData = (student?.semesterTrends || []).map((sem) => ({
    name: `Sem ${sem.semester}`,
    cgpa: sem.sgpa,
  }));

  const compData = [
    { name: "Your CGPA", value: student?.currentCgpa ?? 8.7, color: "#3b82f6" },
    { name: "Dept Avg", value: student?.departmentAvgCgpa ?? 7.9, color: "#93c5fd" },
    { name: "Your %ile", value: student?.yourPercentileCgpa ?? 8.2, color: "#a855f7" },
  ];

  const readinessBars = student?.readinessBars || [
    { label: "Academics",        val: student?.academicHealthScore ?? 86, color: "#10b981" },
    { label: "Technical Skills", val: student?.skillReadinessScore ?? 74, color: "#3b82f6" },
    { label: "Projects",         val: 61, color: "#f59e0b" },
    { label: "Resume",           val: 92, color: "#8b5cf6" },
    { label: "Communication",    val: 68, color: "#ef4444" },
  ];

  const milestones = [
    { title: "Semester 6 Begins",       date: "Jan 2026", color: "#10b981" },
    { title: "Project Submission",       date: "Mar 2026", color: "#10b981" },
    { title: "End Semester Exams",       date: "Apr 2026", color: "#f59e0b" },
    { title: "Internship Applications",  date: "May 2026", color: "#8b5cf6" },
    { title: "Placement Session",        date: "Jan 2027", color: "#6b7280" },
  ];

  const skillCorr = [
    { subject: "Data Structures",     skills: "DSA, Problem Solving", career: "Software Development" },
    { subject: "Database Management", skills: "SQL, Data Modeling",   career: "Backend / Data Analyst" },
    { subject: "Operating Systems",   skills: "Linux, Architecture",  career: "Systems Engineer" },
    { subject: "Computer Networks",   skills: "Networking, Protocols",career: "Network Engineer" },
    { subject: "Mathematics",         skills: "Logic, Analysis",      career: "Data Science" },
  ];

  const strengthBars = (student?.subjects || []).slice(0, 5).map((sub) => {
    let color = "#10b981";
    if (sub.marks < 65) color = "#ef4444";
    else if (sub.marks < 75) color = "#f59e0b";
    else if (sub.marks < 85) color = "#3b82f6";

    return {
      name: sub.name,
      val: sub.marks,
      color,
    };
  });

  const growthVal = student?.growthScore ?? student?.academicHealthScore ?? 86;
  const growthImprovement = student?.growthImprovement ?? 12;
  const readinessVal = student?.internshipScore ?? student?.internshipReadiness ?? 78;

  // Generate dynamic AI insights based on the selected student
  const insights = [];
  if (student?.currentCgpa >= 8.5) {
    insights.push({ type: "good", text: `Outstanding performance! Current CGPA of ${student.currentCgpa} ranks you in the top tier.` });
  } else if (student?.currentCgpa >= 7.5) {
    insights.push({ type: "good", text: `Consistent performance with a CGPA of ${student.currentCgpa}.` });
  } else {
    insights.push({ type: "warn", text: `CGPA is currently ${student?.currentCgpa}. Needs focused effort to reach 8.0+.` });
  }

  const weakSubject = (student?.subjects || []).find((s) => s.marks < 65);
  const strongSubject = (student?.subjects || []).find((s) => s.marks >= 85);

  if (weakSubject) {
    insights.push({ type: "bad", text: `Your score in ${weakSubject.name} (${weakSubject.marks}%) is below expected benchmark.` });
  }
  if (strongSubject) {
    insights.push({ type: "good", text: `Strong mastery demonstrated in ${strongSubject.name} with ${strongSubject.marks}%.` });
  }

  if (student?.overallAttendance < 75) {
    insights.push({ type: "bad", text: `Overall attendance is critically low at ${student.overallAttendance}% (below 75% requirement).` });
  } else if (student?.overallAttendance >= 90) {
    insights.push({ type: "good", text: `Excellent attendance record at ${student.overallAttendance}%.` });
  } else {
    insights.push({ type: "info", text: `Attendance is steady at ${student?.overallAttendance}%. Maintain it above 80%.` });
  }

  const recommendedAction = weakSubject
    ? `Focus on revising ${weakSubject.name} core concepts and seek faculty mentorship to improve semester grades.`
    : `Leverage your high marks in ${strongSubject?.name || "core subjects"} to apply for domain-specific internship roles.`;

  return (
    <div style={s.page}>

      {/* Page Header with Corner Switcher & Controls */}
      <div style={s.pageHeader}>
        <div style={{ flex: 1, minWidth: 260 }}>
          <p style={s.breadcrumb}>
            <Link to="/" style={s.breadcrumbLink}>Dashboard</Link> &rsaquo; Student Profile
          </p>
          <h1 style={s.pageTitle}>Student Profile</h1>
          <p style={s.pageSubtitle}>Track academic progress, discover insights and get personalised recommendations.</p>
        </div>

        {/* ── Corner Student Switcher & Action Buttons ── */}
        <div style={s.headerCornerSection}>
          {/* Compact Scrollable Avatar Strip in the corner */}
          <div style={s.cornerSelectorBox}>
            <div style={s.cornerSelectorLabel}>
              <UserRound size={13} color="#3B82F6" />
              <span>Switch Student:</span>
            </div>
            <div style={s.cornerScrollStrip}>
              {allStudents.map((sItem) => {
                const isActive = sItem.id === student?.id;
                return (
                  <button
                    key={sItem.id}
                    onClick={() => selectStudent(sItem)}
                    style={{
                      ...s.cornerAvatarBtn,
                      borderColor: isActive ? "#3B82F6" : "transparent",
                      backgroundColor: isActive ? "#EFF6FF" : "transparent",
                    }}
                    title={`${sItem.name} (${sItem.program} - ${sItem.branch})`}
                  >
                    <div style={s.cornerAvatarWrap}>
                      <img src={sItem.avatar} alt={sItem.name} style={s.cornerAvatarImg} />
                      {isActive && (
                        <div style={s.cornerActiveBadge}>
                          <Check size={8} color="#FFFFFF" strokeWidth={3.5} />
                        </div>
                      )}
                    </div>
                    <span style={{
                      ...s.cornerAvatarName,
                      color: isActive ? "#1D4ED8" : "#4B5563",
                      fontWeight: isActive ? 700 : 500
                    }}>
                      {sItem.name.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action button */}
          <button style={s.dlBtn} onClick={() => downloadAcademicReport(student)}>
            <Download size={14} /> Download Academic Report
          </button>
        </div>
      </div>

      {/* Row 1 - Profile + 4 Stat Cards */}
      <div style={s.row1}>
        <div style={s.profileCard}>
          <div style={s.profileTop}>
            <img src={student?.avatar} alt="student" style={s.avatar} />
            <div style={{ flex: 1 }}>
              <h2 style={s.studentName}>{student?.name}</h2>
              <p style={s.studentMeta}>{student?.program} in {student?.branch}</p>
              <p style={s.studentMeta}>ABC Institute of Technology</p>
              <p style={s.studentMeta}>Roll No: {student?.id}</p>
            </div>
            <span style={s.semBadge}>{student?.semester}th Semester</span>
          </div>
          <div style={s.quoteBox}>
            "{student?.motivationalQuote || "Consistent effort leads to great progress."}"
          </div>
        </div>
        <StatCard icon={<TrendingUp size={22} />} value={student?.currentCgpa} max="10"
          label="Current CGPA" iconBg="#dcfce7" iconColor="#16a34a" />
        <StatCard icon={<BookOpen size={22} />} value={`${student?.overallAttendance}%`}
          label="Attendance" iconBg="#dbeafe" iconColor="#2563eb" />
        <StatCard icon={<AlertCircle size={22} />} value={student?.backlogs}
          label="Backlogs" iconBg="#f3e8ff" iconColor="#9333ea" />
        <StatCard icon={<Calendar size={22} />} value={student?.semester} max="8"
          label="Semester" iconBg="#fef3c7" iconColor="#d97706" />
      </div>

      {/* Row 2 - CGPA Trend | Growth Score | Rank */}
      <div style={s.row}>
        <div style={{ ...s.card, flex: 2 }}>
          <p style={s.cardTitle}>CGPA Trend</p>
          <div style={{ height: 220, marginTop: 16 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="cgpaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                <YAxis domain={[6, 10]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6b7280" }} />
                <Tooltip />
                <Area type="monotone" dataKey="cgpa" stroke="#3b82f6" strokeWidth={3}
                  fill="url(#cgpaGrad)" dot={{ r: 5, fill: "#3b82f6" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ ...s.card, flex: 1.5 }}>
          <p style={s.cardTitle}>Academic Growth Score</p>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 20 }}>
            <svg viewBox="0 0 36 36" style={{ width: 110, height: 110 }}>
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="#e5e7eb" strokeWidth="3" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray={`${growthVal}, 100`} />
              <text x="18" y="17" textAnchor="middle" style={{ fontSize: 10, fontWeight: "bold", fill: "#111827" }}>{growthVal}</text>
              <text x="18" y="23" textAnchor="middle" style={{ fontSize: 4, fill: "#6b7280" }}>/100</text>
            </svg>
            <div style={s.improveBadge}>
              <TrendingUp size={14} />
              <span>{growthImprovement >= 0 ? `+${growthImprovement}%` : `${growthImprovement}%`} improvement<br />from last year</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
            {["CGPA Improvement", "Attendance", "No Backlogs", "Course Completion"].map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#374151" }}>
                <CheckCircle size={15} color="#10b981" /> {t}
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...s.card, flex: 1.5 }}>
          <p style={s.cardTitle}>Your Rank &amp; Comparison</p>
          <div style={{ height: 180, marginTop: 12 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={compData} margin={{ top: 16, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#6b7280" }} />
                <Tooltip cursor={{ fill: "transparent" }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}
                  label={{ position: "top", fontSize: 12, fontWeight: "bold" }}>
                  {compData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={s.trophyBox}>
            Ranked #{student?.departmentRank || 1} of {student?.totalStudents || 120} &mdash; better than <strong>{student?.percentile ?? 82}%</strong> of peers!
          </div>
        </div>
      </div>

      {/* Row 3 - Subject Strength | Skill-Academic Correlation */}
      <div style={s.row}>
        <div style={{ ...s.card, flex: 1 }}>
          <div style={s.cardHeader}>
            <p style={s.cardTitle}>Subject Strength Analysis</p>
            <span style={s.link}>View All</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 20 }}>
            {strengthBars.map((item) => (
              <div key={item.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 170, fontSize: 13, color: "#4b5563" }}>{item.name}</span>
                <MiniBar value={item.val} color={item.color} />
                <span style={{ width: 30, fontSize: 13, fontWeight: 600, color: "#111827", textAlign: "right" }}>
                  {(item.val / 10).toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...s.card, flex: 1.8 }}>
          <div style={s.cardHeader}>
            <p style={s.cardTitle}>Skill-Academic Correlation</p>
           
          </div>
          <table style={s.table}>
            <thead>
              <tr>
                {["Academic Subject", "Relevant Industry Skills", "Career Relevance"].map((h) => (
                  <th key={h} style={s.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {skillCorr.map((row, i) => (
                <tr key={i} style={s.tr}>
                  <td style={s.td}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={s.subIcon}><BookOpen size={13} color="#4f46e5" /></div>
                      {row.subject}
                    </div>
                  </td>
                  <td style={s.td}>{row.skills}</td>
                  <td style={s.td}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      {row.career} <span style={{ color: "#9ca3af" }}>&#8250;</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Row 4 - Internship Readiness | AI Insights | Milestones */}
      <div style={s.row}>
        <div style={{ ...s.card, flex: 1 }}>
          <p style={s.cardTitle}>Internship Readiness Score</p>
          <div style={{ display: "flex", gap: 20, marginTop: 20, alignItems: "center" }}>
            <svg viewBox="0 0 36 36" style={{ width: 110, height: 110, flexShrink: 0 }}>
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="#e5e7eb" strokeWidth="3" />
              <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray={`${readinessVal}, 100`} />
              <text x="18" y="17" textAnchor="middle" style={{ fontSize: 10, fontWeight: "bold", fill: "#111827" }}>{readinessVal}</text>
              <text x="18" y="23" textAnchor="middle" style={{ fontSize: 4, fill: "#6b7280" }}>/100</text>
            </svg>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
              {readinessBars.map((item) => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 110, fontSize: 12, color: "#4b5563" }}>{item.label}</span>
                  <MiniBar value={item.val} color={item.color} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#1f2937", minWidth: 30, textAlign: "right" }}>
                    {item.val}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ ...s.card, flex: 1 }}>
          <div style={s.cardHeader}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Sparkles size={17} color="#8b5cf6" />
              <p style={s.cardTitle}>AI Academic Insights</p>
            </div>
            <span style={s.betaBadge}>Beta</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
            {insights.map((ins, i) => (
              <div key={i} style={s.insightRow}>
                {ins.type === "good" && <CheckCircle size={15} color="#10b981" style={{ flexShrink: 0 }} />}
                {ins.type === "bad" && <XCircle size={15} color="#ef4444" style={{ flexShrink: 0 }} />}
                {(ins.type === "warn" || ins.type === "info") && <AlertCircle size={15} color="#f59e0b" style={{ flexShrink: 0 }} />}
                <span>{ins.text}</span>
              </div>
            ))}
          </div>
          <div style={s.recommendBox}>
            <strong>Recommended Action</strong><br />
            {recommendedAction}
          </div>
        </div>

        <div style={{ ...s.card, flex: 1 }}>
          <p style={s.cardTitle}>Upcoming Milestones</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 20 }}>
            {milestones.map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: m.color, marginTop: 4, flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: "#1f2937" }}>{m.title}</span>
                <span style={{ fontSize: 12, color: "#6b7280", whiteSpace: "nowrap" }}>{m.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const s = {
  page:        { display: "flex", flexDirection: "column", gap: 24 },
  pageHeader:  { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 },
  breadcrumb:  { fontSize: 13, color: "#6b7280", marginBottom: 6 },
  breadcrumbLink: { color: "#3b82f6", textDecoration: "none", fontWeight: 500 },
  pageTitle:   { fontSize: 26, fontWeight: 700, color: "#111827", marginBottom: 4 },
  pageSubtitle:{ fontSize: 14, color: "#6b7280" },

  // Corner Section with Switcher
  headerCornerSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 8,
  },
  cornerSelectorBox: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: 12,
    padding: "5px 10px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    maxWidth: "420px",
  },
  cornerSelectorLabel: {
    display: "flex",
    alignItems: "center",
    gap: 5,
    fontSize: "12px",
    fontWeight: 700,
    color: "#374151",
    whiteSpace: "nowrap",
  },
  cornerScrollStrip: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    overflowX: "auto",
    maxWidth: "270px",
    paddingBottom: 2,
    scrollbarWidth: "thin",
  },
  cornerAvatarBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 1,
    background: "none",
    border: "1.5px solid transparent",
    borderRadius: 6,
    padding: "2px 4px",
    cursor: "pointer",
    flexShrink: 0,
    transition: "all 0.15s ease",
  },
  cornerAvatarWrap: {
    position: "relative",
    width: 28,
    height: 28,
  },
  cornerAvatarImg: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    objectFit: "cover",
    backgroundColor: "#E0E7FF",
  },
  cornerActiveBadge: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 11,
    height: 11,
    borderRadius: "50%",
    backgroundColor: "#2563EB",
    border: "1px solid #FFFFFF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cornerAvatarName: {
    fontSize: "10px",
    maxWidth: "44px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  // Header button row
  headerBtnRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  backBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 14px",
    backgroundColor: "#F3F4F6",
    border: "1px solid #E5E7EB",
    borderRadius: 8,
    fontSize: 12.5,
    fontWeight: 600,
    color: "#374151",
    textDecoration: "none",
    cursor: "pointer",
    transition: "background-color 0.15s ease",
  },
  dlBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 16px",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: 8,
    fontSize: 12.5,
    fontWeight: 500,
    color: "#374151",
    boxShadow: "0 1px 2px rgba(0,0,0,.05)",
    cursor: "pointer",
  },

  // Existing Profile Layout Styles
  row1: { display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 20 },
  profileCard: {
    backgroundColor: "#fff", borderRadius: 16, padding: 20,
    display: "flex", flexDirection: "column", gap: 16,
    boxShadow: "0 1px 3px rgba(0,0,0,.06)",
  },
  profileTop:  { display: "flex", gap: 14, position: "relative", alignItems: "flex-start" },
  avatar:      { width: 60, height: 60, borderRadius: "50%", objectFit: "cover", backgroundColor: "#e5e7eb" },
  studentName: { fontSize: 17, fontWeight: 700, color: "#111827", marginBottom: 4 },
  studentMeta: { fontSize: 12, color: "#6b7280", marginBottom: 2 },
  semBadge: {
    position: "absolute", top: 0, right: 0,
    backgroundColor: "#eff6ff", color: "#2563eb",
    fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 12,
  },
  quoteBox: {
    backgroundColor: "#f8fafc", padding: "12px 14px",
    borderRadius: 8, fontSize: 13, color: "#475569",
    fontStyle: "italic", borderLeft: "3px solid #3b82f6",
  },
  statCard: {
    backgroundColor: "#fff", borderRadius: 16, padding: 20,
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", boxShadow: "0 1px 3px rgba(0,0,0,.06)",
  },
  statIcon: {
    width: 46, height: 46, borderRadius: 12,
    display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12,
  },
  statValue: { fontSize: 24, fontWeight: 700, color: "#111827" },
  statMax:   { fontSize: 14, color: "#6b7280", fontWeight: 400 },
  statLabel: { fontSize: 13, color: "#6b7280", marginTop: 4 },
  card: {
    backgroundColor: "#fff", borderRadius: 16, padding: 24,
    boxShadow: "0 1px 3px rgba(0,0,0,.06)", display: "flex", flexDirection: "column",
  },
  row:       { display: "flex", gap: 20 },
  cardHeader:{ display: "flex", justifyContent: "space-between", alignItems: "center" },
  cardTitle: { fontSize: 15, fontWeight: 600, color: "#111827" },
  link:      { fontSize: 13, color: "#3b82f6", cursor: "pointer", fontWeight: 500 },
  improveBadge: {
    backgroundColor: "#ecfdf5", color: "#059669",
    padding: "10px 14px", borderRadius: 8, fontSize: 12,
    display: "flex", alignItems: "center", gap: 8, fontWeight: 500, lineHeight: 1.5,
  },
  trophyBox: {
    marginTop: "auto", backgroundColor: "#f0f9ff",
    padding: 12, borderRadius: 8, fontSize: 13,
    color: "#0369a1", fontWeight: 500, textAlign: "center",
  },
  barTrack: { flex: 1, height: 8, backgroundColor: "#e5e7eb", borderRadius: 4 },
  barFill:  { height: "100%", borderRadius: 4, transition: "width .4s ease" },
  table:    { width: "100%", borderCollapse: "collapse", marginTop: 20 },
  th:       { textAlign: "left", padding: "10px 0", fontSize: 12, color: "#6b7280", fontWeight: 500, borderBottom: "1px solid #e5e7eb" },
  tr:       { borderBottom: "1px solid #f3f4f6" },
  td:       { padding: "12px 0", fontSize: 13, color: "#4b5563" },
  subIcon:  { width: 24, height: 24, borderRadius: 4, backgroundColor: "#e0e7ff", display: "flex", alignItems: "center", justifyContent: "center" },
  betaBadge:{ backgroundColor: "#f3e8ff", color: "#7e22ce", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 12 },
  insightRow:{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "#4b5563", lineHeight: 1.5 },
  recommendBox: { marginTop: "auto", backgroundColor: "#fffbeb", padding: 16, borderRadius: 8, fontSize: 13, color: "#b45309", lineHeight: 1.6 },
};

export default StudentProfile;
