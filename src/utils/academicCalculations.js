// ============================================================
//  academicCalculations.js
//  Pure calculation and helper functions for Academic Analytics
// ============================================================

export const getSemesterStatus = (sgpa, attendance, backlogs = 0) => {
  if (backlogs > 0 || sgpa < 6.5 || attendance < 75) return "At Risk";
  if (sgpa < 7.5 || attendance < 80) return "Needs Attention";
  if (sgpa >= 8.5 && attendance >= 85) return "Excellent";
  return "Good";
};

export const getSubjectStatus = (marks) => {
  if (marks >= 80) return "Strong";
  if (marks >= 70) return "Good";
  if (marks >= 60) return "Average";
  return "Needs Attention";
};

export const getStatusBadgeStyle = (status) => {
  switch (status) {
    case "Excellent":
    case "Strong":
      return { bg: "#DCFCE7", text: "#15803D", border: "#BBF7D0" };
    case "Good":
      return { bg: "#EFF6FF", text: "#1D4ED8", border: "#BFDBFE" };
    case "Average":
      return { bg: "#FEF3C7", text: "#B45309", border: "#FDE68A" };
    case "Needs Attention":
    case "At Risk":
    default:
      return { bg: "#FEE2E2", text: "#B91C1C", border: "#FECACA" };
  }
};

export const calculateGradeDistribution = (subjects = []) => {
  const counts = { "A+": 0, "A": 0, "A-": 0, "B+": 0, "B": 0, "B-": 0, "C+": 0, "C": 0, "D": 0, "F": 0 };
  subjects.forEach((s) => {
    const grade = s.grade || "B";
    if (counts[grade] !== undefined) counts[grade]++;
    else counts[grade] = 1;
  });

  return Object.keys(counts)
    .filter((g) => counts[g] > 0)
    .map((g) => ({ grade: g, count: counts[g] }));
};

export const calculateAcademicTrend = (semesterTrends = []) => {
  if (semesterTrends.length < 2) return { text: "Steady →", direction: "neutral" };
  const last = semesterTrends[semesterTrends.length - 1];
  const prev = semesterTrends[semesterTrends.length - 2];
  const diff = Number((last.sgpa - prev.sgpa).toFixed(2));

  if (diff > 0.1) return { text: `Improving ↑ (+${diff})`, direction: "up" };
  if (diff < -0.1) return { text: `Declining ↓ (${diff})`, direction: "down" };
  return { text: "Consistent →", direction: "neutral" };
};

export const generateTrendInsight = (semesterTrends = []) => {
  if (!semesterTrends || semesterTrends.length < 2) {
    return "Consistent academic performance maintained across semesters.";
  }
  const len = semesterTrends.length;
  const recent = semesterTrends.slice(-3);
  let improvingCount = 0;
  for (let i = 1; i < recent.length; i++) {
    if (recent[i].sgpa >= recent[i - 1].sgpa) improvingCount++;
  }

  if (improvingCount === recent.length - 1 && recent.length >= 2) {
    return `Performance has improved consistently over the last ${recent.length} semesters with SGPA reaching ${recent[recent.length - 1].sgpa}.`;
  }
  const last = semesterTrends[len - 1];
  const prev = semesterTrends[len - 2];
  if (last.sgpa > prev.sgpa) {
    return `Semester ${last.semester} showed positive recovery with SGPA advancing by ${(last.sgpa - prev.sgpa).toFixed(2)} points.`;
  }
  return `Stable academic track across ${len} completed semesters with an overall CGPA of ${last.cgpa}.`;
};

export const generateAcademicInsights = (student) => {
  if (!student) return [];
  const insights = [];
  const subjects = student.subjects || [];
  const trends = student.semesterTrends || [];

  // Trend Insight
  if (trends.length >= 2) {
    const last = trends[trends.length - 1];
    const prev = trends[trends.length - 2];
    if (last.sgpa >= prev.sgpa) {
      insights.push({
        title: "Improving Performance",
        description: `SGPA increased to ${last.sgpa} in Semester ${last.semester}, reflecting sustained upward momentum.`,
        type: "positive",
      });
    } else {
      insights.push({
        title: "Semester SGPA Dip",
        description: `Semester ${last.semester} SGPA dropped by ${(prev.sgpa - last.sgpa).toFixed(2)} points. Early intervention recommended.`,
        type: "warning",
      });
    }
  }

  // Strongest subject
  const sorted = [...subjects].sort((a, b) => b.marks - a.marks);
  if (sorted.length > 0) {
    const top = sorted.slice(0, 2).map((s) => s.name).join(" and ");
    insights.push({
      title: "Core Subject Mastery",
      description: `${top} are among the student's highest scoring disciplines (${sorted[0].marks}%).`,
      type: "positive",
    });
  }

  // Weakest subject
  const weak = sorted.filter((s) => s.marks < 68);
  if (weak.length > 0) {
    insights.push({
      title: "Attention Required",
      description: `${weak[0].name} marks (${weak[0].marks}%) are below class benchmark. Remedial practice suggested.`,
      type: "negative",
    });
  }

  // Attendance
  if (student.overallAttendance >= 85) {
    insights.push({
      title: "Strong Classroom Attendance",
      description: `Attendance is robust at ${student.overallAttendance}%, well exceeding the 75% exam eligibility threshold.`,
      type: "positive",
    });
  } else if (student.overallAttendance < 75) {
    insights.push({
      title: "Attendance Warning",
      description: `Overall attendance (${student.overallAttendance}%) is critical. Student risks exam debarment.`,
      type: "negative",
    });
  }

  // Overall trajectory
  insights.push({
    title: "Overall Academic Standing",
    description: `Ranked #${student.departmentRank || 1} in CSE batch. Projected for successful on-campus placements.`,
    type: "info",
  });

  return insights;
};

export const generateComparisonSummary = (studentA, studentB, semSubjectsA = [], semSubjectsB = []) => {
  if (!studentA || !studentB) return "";

  const nameA = studentA.name.split(" ")[0];
  const nameB = studentB.name.split(" ")[0];

  const cgpaDiff = (studentA.currentCgpa - studentB.currentCgpa).toFixed(2);
  const attDiff = studentA.overallAttendance - studentB.overallAttendance;

  let intro = "";
  if (cgpaDiff > 0) {
    intro = `${nameA} leads overall with a CGPA of ${studentA.currentCgpa} (+${cgpaDiff} vs ${nameB})`;
  } else if (cgpaDiff < 0) {
    intro = `${nameB} leads overall with a CGPA of ${studentB.currentCgpa} (+${Math.abs(cgpaDiff)} vs ${nameA})`;
  } else {
    intro = `Both ${nameA} and ${nameB} share identical CGPA of ${studentA.currentCgpa}`;
  }

  if (attDiff !== 0) {
    intro += ` and ${attDiff > 0 ? `${nameA} has higher attendance (+${attDiff}%)` : `${nameB} has higher attendance (+${Math.abs(attDiff)}%)`}.`;
  } else {
    intro += ` and equal attendance records.`;
  }

  // Subject level comparison
  let subjectDetail = "";
  const leadA = [];
  const leadB = [];

  semSubjectsA.forEach((subA) => {
    const subB = semSubjectsB.find((s) => s.code === subA.code || s.name.toLowerCase() === subA.name.toLowerCase());
    if (subB) {
      if (subA.marks > subB.marks) leadA.push(subA.code);
      else if (subB.marks > subA.marks) leadB.push(subB.code);
    }
  });

  if (leadA.length && leadB.length) {
    subjectDetail = ` In this semester, ${nameA} has stronger scores in ${leadA.slice(0, 2).join(", ")}, while ${nameB} excels in ${leadB.slice(0, 2).join(", ")}.`;
  } else if (leadA.length) {
    subjectDetail = ` ${nameA} outperforms ${nameB} across all compared subjects including ${leadA.slice(0, 3).join(", ")}.`;
  } else if (leadB.length) {
    subjectDetail = ` ${nameB} demonstrates superior subject scores in ${leadB.slice(0, 3).join(", ")}.`;
  }

  return intro + subjectDetail;
};
