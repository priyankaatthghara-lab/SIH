import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell, Legend
} from "recharts";
import {
  Target, CheckCircle2, AlertTriangle, AlertCircle,
  BookOpen, ExternalLink, Filter, Zap, UserCheck, TrendingUp
} from "lucide-react";
import { useStudent } from "../../context/StudentContext";
import { getAssignmentsForStudent } from "../../services/storageService";

// ── Gap classification ────────────────────────────────────────
const getGapInfo = (current, required) => {
  const gap = required - current;
  if (gap <= 0)  return { label: "Met",           severity: "met",      color: "#15803D", bg: "#DCFCE7", border: "#BBF7D0" };
  if (gap <= 10) return { label: "Minor Gap",     severity: "minor",    color: "#2563EB", bg: "#EFF6FF", border: "#BFDBFE" };
  if (gap <= 20) return { label: "Moderate Gap",  severity: "moderate", color: "#D97706", bg: "#FEF3C7", border: "#FDE68A" };
  return              { label: "Critical Gap",    severity: "critical", color: "#DC2626", bg: "#FEE2E2", border: "#FECACA" };
};

// ── Skill Card (admin view) ───────────────────────────────────
const SkillCard = ({ skill, assignment }) => {
  const [expanded, setExpanded] = useState(false);
  const gap = skill.required - skill.current;
  const gapInfo = getGapInfo(skill.current, skill.required);

  return (
    <div
      style={{
        ...s.skillCard,
        borderLeft: `4px solid ${gapInfo.color}`,
        cursor: "pointer",
      }}
      onClick={() => setExpanded((p) => !p)}
      title="Click to view recommended resources"
    >
      {/* Top row */}
      <div style={s.skillCardTop}>
        <div style={s.skillLeft}>
          <div style={s.skillName}>{skill.name}</div>
          <span style={{ ...s.catBadge }}>{skill.category}</span>
        </div>
        <span style={{
          ...s.gapBadge,
          backgroundColor: gapInfo.bg,
          color: gapInfo.color,
          border: `1px solid ${gapInfo.border}`,
        }}>
          {gap <= 0 ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
          {gapInfo.label}
        </span>
      </div>

      {/* Progress bar */}
      <div style={s.barSection}>
        <div style={s.barLabels}>
          <span style={s.barLbl}>Current Proficiency</span>
          <span style={s.barLbl}>
            <span style={{ color: gapInfo.color, fontWeight: 700 }}>{skill.current}</span>
            <span style={{ color: "#9CA3AF" }}> / {skill.required} required</span>
          </span>
        </div>
        <div style={s.barTrack}>
          <div style={{
            ...s.barFill,
            width: `${skill.current}%`,
            backgroundColor: gapInfo.color,
          }} />
          {/* Required threshold line */}
          <div style={{
            position: "absolute",
            left: `${skill.required}%`,
            top: 0, bottom: 0, width: "2px",
            backgroundColor: "#374151",
            borderRadius: "2px",
          }} />
        </div>
        <div style={s.barFooter}>
          <span style={s.pctLabel}>
            {Math.min(100, Math.round((skill.current / skill.required) * 100))}% of industry target
          </span>
          {gap > 0
            ? <span style={{ ...s.pctLabel, color: gapInfo.color, fontWeight: 700 }}>
                ↑ {gap} pts deficit
              </span>
            : <span style={{ ...s.pctLabel, color: "#15803D", fontWeight: 700 }}>
                +{Math.abs(gap)} above target
              </span>
          }
        </div>
      </div>

      {/* Expanded: recommended learning resources */}
      {expanded && (
        <div style={s.expandedSection}>
          <div style={s.resourceHeader}>
            <BookOpen size={13} color="#2563EB" />
            <span style={s.resourceLabel}>Recommended Learning Resources for Student</span>
          </div>
          <div style={s.resourceList}>
            {skill.resources.split(",").map((r, i) => (
              <span key={i} style={s.resourceChip}>
                <ExternalLink size={11} />
                {r.trim()}
              </span>
            ))}
          </div>
          {gap > 10 && (
            <div style={s.mentorHint}>
              <UserCheck size={12} color="#7C3AED" />
              <span>Consider assigning a mentor with expertise in <strong>{skill.category}</strong></span>
            </div>
          )}
        </div>
      )}
      {assignment && (
        <div style={s.assignedBanner}>
          <UserCheck size={13} color="#15803D" />
          <span>
            Already assigned: <strong>{assignment.mentorName}</strong> ({assignment.mentorCompany})
          </span>
        </div>
      )}
    </div>
  );
};

// ── Chart tooltip ─────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={s.tooltip}>
      <p style={s.tooltipLabel}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ ...s.tooltipVal, color: p.color }}>
          {p.name}: <strong>{p.value}</strong>
        </p>
      ))}
    </div>
  );
};

// ── Summary Stats ─────────────────────────────────────────────
const SummaryStrip = ({ skills }) => {
  const met      = skills.filter(sk => sk.required - sk.current <= 0).length;
  const moderate = skills.filter(sk => { const g = sk.required - sk.current; return g > 10 && g <= 20; }).length;
  const critical = skills.filter(sk => sk.required - sk.current > 20).length;
  const avgCurrent = skills.length
    ? Math.round(skills.reduce((acc, sk) => acc + sk.current, 0) / skills.length)
    : 0;

  const items = [
    { label: "Skills Met",        count: `${met}/${skills.length}`,  color: "#15803D", bg: "#DCFCE7", icon: <CheckCircle2 size={18} color="#15803D" /> },
    { label: "Critical Gaps",     count: critical,                   color: "#DC2626", bg: "#FEE2E2", icon: <AlertCircle size={18} color="#DC2626" /> },
    { label: "Moderate Gaps",     count: moderate,                   color: "#D97706", bg: "#FEF3C7", icon: <AlertTriangle size={18} color="#D97706" /> },
    { label: "Avg. Proficiency",  count: `${avgCurrent}/100`,        color: "#2563EB", bg: "#EFF6FF", icon: <TrendingUp size={18} color="#2563EB" /> },
  ];

  return (
    <div style={s.summaryStrip}>
      {items.map(item => (
        <div key={item.label} style={{ ...s.summaryItem, backgroundColor: item.bg }}>
          {item.icon}
          <div>
            <div style={{ ...s.summaryCount, color: item.color }}>{item.count}</div>
            <div style={{ ...s.summaryDesc, color: item.color }}>{item.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────────
const ALL_CATS = "All";

const SkillsGap = () => {
  const { student } = useStudent();
  const skills = student?.skills || [];
  const studentName = student?.name || "Student";
  const assignments = getAssignmentsForStudent(student?.id);

  const categories = useMemo(() => {
    const cats = [...new Set(skills.map(sk => sk.category))];
    return [ALL_CATS, ...cats];
  }, [skills]);

  const [activeCategory, setActiveCategory] = useState(ALL_CATS);
  const [sortBy, setSortBy] = useState("gap");

  const filtered = useMemo(() => {
    let list = activeCategory === ALL_CATS ? skills : skills.filter(sk => sk.category === activeCategory);
    if (sortBy === "gap")     list = [...list].sort((a, b) => (b.required - b.current) - (a.required - a.current));
    if (sortBy === "current") list = [...list].sort((a, b) => b.current - a.current);
    if (sortBy === "name")    list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [skills, activeCategory, sortBy]);

  const chartData = useMemo(() =>
    skills.map(sk => ({
      name: sk.name.length > 14 ? sk.name.slice(0, 14) + "…" : sk.name,
      "Current": sk.current,
      "Required": sk.required,
    }))
  , [skills]);

  const criticalGaps = skills.filter(sk => (sk.required - sk.current) > 20);
  const metSkills    = skills.filter(sk => (sk.required - sk.current) <= 0);

  if (!skills.length) {
    return (
      <div style={s.page}>
        <p style={{ color: "#9CA3AF", padding: 32 }}>No skill data available for {studentName}.</p>
      </div>
    );
  }

  return (
    <div style={s.page}>

      {/* ── Page Header ── */}
      <div style={s.pageHeader}>
        <div>
          <p style={s.breadcrumb}>
            <Link to="/" style={s.homeLink}>Home</Link> &rsaquo; Skills &amp; Skill Gap
          </p>
          <h1 style={s.pageTitle}>Skills &amp; Skill Gap Analysis</h1>
          <p style={s.pageSubtitle}>
            Analysing <strong>{studentName}</strong>'s industry readiness — proficiency vs. required standards
          </p>
        </div>
      </div>

      {/* ── Summary Strip ── */}
      <SummaryStrip skills={skills} />

      {/* ── Context info banner (if critical gaps) ── */}
      {criticalGaps.length > 0 && (
        <div style={s.alertBanner}>
          <AlertCircle size={16} color="#DC2626" />
          <span style={{ fontSize: 13, color: "#991B1B" }}>
            <strong>{studentName}</strong> has <strong>{criticalGaps.length} critical skill gap{criticalGaps.length > 1 ? "s" : ""}</strong> — areas more than 20 points below industry standard.
            Consider assigning a mentor from the <Link to="/mentors" style={{ color: "#DC2626", fontWeight: 700 }}>Mentors page</Link>.
          </span>
        </div>
      )}

      {/* ── Filter + Sort Bar ── */}
      <div style={s.filterRow}>
        <div style={s.pillsGroup}>
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              style={{
                ...s.pill,
                backgroundColor: activeCategory === cat ? "#2563EB" : "#F3F4F6",
                color: activeCategory === cat ? "#fff" : "#4B5563",
              }}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div style={s.sortGroup}>
          <Filter size={13} color="#6B7280" />
          <span style={s.sortLabel}>Sort:</span>
          {[["gap", "Largest Gap"], ["current", "Proficiency"], ["name", "A–Z"]].map(([val, lbl]) => (
            <button
              key={val}
              type="button"
              style={{
                ...s.sortBtn,
                backgroundColor: sortBy === val ? "#2563EB" : "transparent",
                color: sortBy === val ? "#fff" : "#6B7280",
                border: `1px solid ${sortBy === val ? "#2563EB" : "#E5E7EB"}`,
              }}
              onClick={() => setSortBy(val)}
            >
              {lbl}
            </button>
          ))}
        </div>
      </div>

      {/* ── Skill Cards Grid ── */}
      <div style={s.skillsGrid}>
        {filtered.map(sk => (
          <SkillCard
            key={sk.id}
            skill={sk}
            assignment={assignments.find((assignment) => assignment.skillId === sk.id && assignment.status === "Active")}
          />
        ))}
        {filtered.length === 0 && (
          <p style={{ color: "#9CA3AF", fontSize: 14, padding: 20 }}>No skills in this category.</p>
        )}
      </div>

      {/* ── Bar Chart ── */}
      <div style={s.chartCard}>
        <div style={s.chartHeader}>
          <Target size={18} color="#2563EB" />
          <div>
            <h2 style={s.chartTitle}>{studentName}'s Proficiency vs. Industry Standard</h2>
            <p style={s.chartSubtitle}>
              The vertical marker on each bar represents the industry requirement threshold.
            </p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData} margin={{ top: 8, right: 20, left: 0, bottom: 55 }}>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: "#6B7280" }}
              angle={-35}
              textAnchor="end"
              interval={0}
            />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#6B7280" }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
            <Bar dataKey="Required" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Current" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, i) => {
                const orig = skills[i];
                if (!orig) return <Cell key={i} fill="#2563EB" />;
                return <Cell key={i} fill={getGapInfo(orig.current, orig.required).color} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Two-column: Action Required + Strengths ── */}
      <div style={s.twoCol}>

        {/* Critical Gaps — action panel */}
        <div style={s.panelCard}>
          <div style={s.panelHeader}>
            <div style={{ ...s.panelIconBox, backgroundColor: "#FEE2E2" }}>
              <AlertCircle size={17} color="#DC2626" />
            </div>
            <div>
              <h3 style={s.panelTitle}>Action Required — Critical Gaps</h3>
              <p style={s.panelSub}>Skills &gt;20 pts below industry standard — assign a mentor</p>
            </div>
          </div>
          {criticalGaps.length === 0 ? (
            <div style={s.emptyPanel}>
              <CheckCircle2 size={22} color="#15803D" />
              <span style={{ color: "#15803D", fontWeight: 600, fontSize: 13 }}>
                No critical gaps — {studentName} is in good standing!
              </span>
            </div>
          ) : (
            <div style={s.panelList}>
              {criticalGaps.map(sk => (
                <div key={sk.id} style={s.panelItem}>
                  <div style={s.panelItemLeft}>
                    <span style={s.panelItemName}>{sk.name}</span>
                    <span style={s.panelItemCat}>{sk.category}</span>
                  </div>
                  <div style={s.panelItemRight}>
                    <span style={s.redVal}>{sk.current} / {sk.required}</span>
                    <span style={s.redGap}>↑ {sk.required - sk.current} pts deficit</span>
                    {assignments.some((assignment) => assignment.skillId === sk.id && assignment.status === "Active") && (
                      <span style={s.assignedSmall}><UserCheck size={11} /> Mentor already assigned</span>
                    )}
                  </div>
                </div>
              ))}
              <Link to="/mentors" style={s.assignMentorBtn}>
                <UserCheck size={14} />
                Assign a Mentor to {studentName.split(" ")[0]}
              </Link>
            </div>
          )}
        </div>

        {/* Met Skills */}
        <div style={s.panelCard}>
          <div style={s.panelHeader}>
            <div style={{ ...s.panelIconBox, backgroundColor: "#DCFCE7" }}>
              <CheckCircle2 size={17} color="#15803D" />
            </div>
            <div>
              <h3 style={s.panelTitle}>Industry Standards Met</h3>
              <p style={s.panelSub}>{studentName} meets or exceeds requirement in these areas</p>
            </div>
          </div>
          {metSkills.length === 0 ? (
            <div style={s.emptyPanel}>
              <Zap size={22} color="#2563EB" />
              <span style={{ color: "#2563EB", fontWeight: 600, fontSize: 13 }}>
                Focus on improving skill proficiency across all areas.
              </span>
            </div>
          ) : (
            <div style={s.panelList}>
              {metSkills.map(sk => (
                <div key={sk.id} style={s.panelItem}>
                  <div style={s.panelItemLeft}>
                    <span style={s.panelItemName}>{sk.name}</span>
                    <span style={s.panelItemCat}>{sk.category}</span>
                  </div>
                  <div style={s.panelItemRight}>
                    <span style={s.greenVal}>{sk.current} / {sk.required}</span>
                    <span style={s.greenBadge}>+{sk.current - sk.required} above</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Styles ────────────────────────────────────────────────────
const s = {
  page: { display: "flex", flexDirection: "column", gap: 24, paddingBottom: 40 },
  pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap" },
  breadcrumb: { fontSize: 13, color: "#6B7280", marginBottom: 4 },
  homeLink: { color: "#2563EB", textDecoration: "none", fontWeight: 500 },
  pageTitle: { fontSize: 26, fontWeight: 700, color: "#111827", margin: "0 0 4px 0", letterSpacing: "-0.5px" },
  pageSubtitle: { fontSize: 13.5, color: "#6B7280", margin: 0 },

  summaryStrip: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: 12,
  },
  summaryItem: {
    display: "flex", alignItems: "center", gap: 12,
    padding: "16px 18px", borderRadius: 14,
  },
  summaryCount: { fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px" },
  summaryDesc: { fontSize: 11.5, fontWeight: 600 },

  alertBanner: {
    display: "flex", alignItems: "center", gap: 10,
    backgroundColor: "#FEF2F2", border: "1px solid #FECACA",
    borderRadius: 12, padding: "12px 18px",
  },

  filterRow: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    flexWrap: "wrap", gap: 12,
    backgroundColor: "#FFFFFF", border: "1px solid #F3F4F6",
    borderRadius: 12, padding: "14px 18px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  },
  pillsGroup: { display: "flex", gap: 6, flexWrap: "wrap" },
  pill: {
    border: "none", padding: "6px 14px", borderRadius: 8,
    fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
  },
  sortGroup: { display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" },
  sortLabel: { fontSize: 12, color: "#6B7280", fontWeight: 500 },
  sortBtn: {
    padding: "5px 10px", borderRadius: 7,
    fontSize: 11.5, fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
  },

  skillsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 14,
  },
  skillCard: {
    backgroundColor: "#FFFFFF", borderRadius: 14,
    padding: "18px 18px 14px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)", border: "1px solid #F3F4F6",
    display: "flex", flexDirection: "column", gap: 12,
    userSelect: "none",
  },
  skillCardTop: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, flexWrap: "wrap"
  },
  skillLeft: { display: "flex", flexDirection: "column", gap: 4 },
  skillName: { fontSize: 14.5, fontWeight: 700, color: "#111827" },
  catBadge: {
    fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 6,
    backgroundColor: "#F3F4F6", color: "#4B5563", display: "inline-block", width: "fit-content",
  },
  gapBadge: {
    display: "inline-flex", alignItems: "center", gap: 5,
    fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 20, flexShrink: 0,
  },
  barSection: { display: "flex", flexDirection: "column", gap: 5 },
  barLabels: { display: "flex", justifyContent: "space-between" },
  barLbl: { fontSize: 11, color: "#6B7280", fontWeight: 500 },
  barTrack: {
    position: "relative", height: 10,
    backgroundColor: "#F3F4F6", borderRadius: 5, overflow: "visible",
  },
  barFill: { height: "100%", borderRadius: 5, transition: "width 0.4s ease" },
  barFooter: { display: "flex", justifyContent: "space-between" },
  pctLabel: { fontSize: 10.5, color: "#9CA3AF", fontWeight: 500 },

  expandedSection: { paddingTop: 10, borderTop: "1px solid #F3F4F6" },
  resourceHeader: { display: "flex", alignItems: "center", gap: 6, marginBottom: 8 },
  resourceLabel: { fontSize: 12, fontWeight: 600, color: "#2563EB" },
  resourceList: { display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 },
  resourceChip: {
    display: "inline-flex", alignItems: "center", gap: 5,
    fontSize: 11.5, fontWeight: 600, backgroundColor: "#EFF6FF", color: "#2563EB",
    border: "1px solid #BFDBFE", padding: "3px 9px", borderRadius: 20,
  },
  mentorHint: {
    display: "flex", alignItems: "center", gap: 6,
    backgroundColor: "#F5F3FF", border: "1px solid #DDD6FE",
    borderRadius: 8, padding: "7px 10px",
    fontSize: 12, color: "#5B21B6",
  },
  assignedBanner: {
    display: "flex", alignItems: "center", gap: 6,
    backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0",
    borderRadius: 8, padding: "7px 10px", fontSize: 12, color: "#166534",
  },
  assignedSmall: {
    display: "inline-flex", alignItems: "center", gap: 4,
    color: "#15803D", fontSize: 10.5, fontWeight: 700,
  },

  chartCard: {
    backgroundColor: "#FFFFFF", border: "1px solid #F3F4F6",
    borderRadius: 16, padding: "22px 24px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  chartHeader: { display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 18 },
  chartTitle: { fontSize: 15, fontWeight: 700, color: "#111827", margin: "0 0 3px 0" },
  chartSubtitle: { fontSize: 12.5, color: "#6B7280", margin: 0 },
  tooltip: {
    backgroundColor: "#1F2937", borderRadius: 8,
    padding: "10px 14px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
  tooltipLabel: { fontSize: 12, fontWeight: 700, color: "#F9FAFB", margin: "0 0 4px 0" },
  tooltipVal: { fontSize: 12, margin: "2px 0" },

  twoCol: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 16,
  },
  panelCard: {
    backgroundColor: "#FFFFFF", border: "1px solid #F3F4F6",
    borderRadius: 16, padding: "22px 22px 18px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  panelHeader: { display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 18 },
  panelIconBox: {
    width: 40, height: 40, borderRadius: 10,
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  panelTitle: { fontSize: 14.5, fontWeight: 700, color: "#111827", margin: "0 0 2px 0" },
  panelSub: { fontSize: 12, color: "#6B7280", margin: 0 },
  panelList: { display: "flex", flexDirection: "column", gap: 10 },
  panelItem: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "10px 12px", backgroundColor: "#F9FAFB", borderRadius: 10,
  },
  panelItemLeft: { display: "flex", flexDirection: "column", gap: 2 },
  panelItemName: { fontSize: 13, fontWeight: 600, color: "#111827" },
  panelItemCat: { fontSize: 11, color: "#9CA3AF" },
  panelItemRight: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 },
  redVal: { fontSize: 13, fontWeight: 700, color: "#DC2626" },
  redGap: { fontSize: 10.5, color: "#EF4444", fontWeight: 600 },
  greenVal: { fontSize: 13, fontWeight: 700, color: "#15803D" },
  greenBadge: {
    fontSize: 10.5, fontWeight: 700, color: "#15803D",
    backgroundColor: "#DCFCE7", padding: "1px 6px", borderRadius: 20,
  },
  emptyPanel: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "16px 14px", backgroundColor: "#F9FAFB", borderRadius: 10,
  },
  assignMentorBtn: {
    display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
    backgroundColor: "#7C3AED", color: "#FFFFFF", textDecoration: "none",
    border: "none", borderRadius: 10, padding: "10px 14px",
    fontSize: 13, fontWeight: 700, cursor: "pointer", marginTop: 4,
  },
};

export default SkillsGap;
