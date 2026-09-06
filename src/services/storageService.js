// ============================================================
//  storageService.js
//  Central LocalStorage abstraction layer.
//  NO component should call localStorage directly —
//  use these helpers. Swap them for fetch() later to go live.
// ============================================================

import { initialMockData } from "../data/mockDb";

const DB_KEY = "sih_student_portal_db";

// ── Bootstrap ─────────────────────────────────────────────
/**
 * Called once on app mount.
 * Seeds LocalStorage with mock data only if it is empty.
 */
export const initializeData = () => {
  if (!localStorage.getItem(DB_KEY)) {
    localStorage.setItem(DB_KEY, JSON.stringify(initialMockData));
    console.info("[StorageService] Mock DB seeded into LocalStorage.");
  }
};

// ── Core CRUD ─────────────────────────────────────────────
/**
 * Returns the entire DB object.
 */
export const getData = () => {
  try {
    const raw = localStorage.getItem(DB_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error("[StorageService] getData failed:", e);
    return null;
  }
};

/**
 * Saves the entire DB object back.
 */
const saveData = (data) => {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("[StorageService] saveData failed:", e);
  }
};

/**
 * Overwrite a top-level module (e.g. "mentors", "events").
 */
export const updateModuleData = (moduleName, newData) => {
  const db = getData();
  if (!db) return;
  db[moduleName] = newData;
  saveData(db);
};

// ── userState helpers ─────────────────────────────────────
/**
 * Read a key from userState (e.g. "mentorBookings").
 */
export const getUserState = (key) => {
  const db = getData();
  return db?.userState?.[key] ?? null;
};

/**
 * Write a key into userState.
 */
export const setUserState = (key, value) => {
  const db = getData();
  if (!db) return;
  db.userState[key] = value;
  saveData(db);
};

// ── Mentor Bookings (legacy - kept for compatibility) ─────────
/**
 * Book a mentor session.
 * @param {Object} booking - { mentorId, mentorName, date, time, mode }
 */
export const bookMentorSession = (booking) => {
  const bookings = getUserState("mentorBookings") || [];
  const newBooking = {
    ...booking,
    id:     `BK-${Date.now()}`,
    status: "Confirmed",
    bookedOn: new Date().toISOString().split("T")[0]
  };
  bookings.push(newBooking);
  setUserState("mentorBookings", bookings);
  return newBooking;
};

/**
 * Get all booked mentor sessions.
 */
export const getMentorBookings = () => getUserState("mentorBookings") || [];

/**
 * Cancel a booking by id.
 */
export const cancelMentorBooking = (bookingId) => {
  const bookings = getMentorBookings().filter((b) => b.id !== bookingId);
  setUserState("mentorBookings", bookings);
};

// ── Mentor–Student Assignments (college assigns mentor to student) ──
/**
 * Assign a mentor to a student.
 * @param {{ mentorId, mentorName, studentId, studentName, note }} assignment
 */
export const assignMentorToStudent = (assignment) => {
  const all = getUserState("mentorAssignments") || [];
  const newAssignment = {
    ...assignment,
    id: `MA-${Date.now()}`,
    assignedOn: new Date().toISOString().split("T")[0],
    status: "Active",
  };
  all.push(newAssignment);
  setUserState("mentorAssignments", all);
  return newAssignment;
};

/**
 * Get all assignments for a specific student.
 */
export const getAssignmentsForStudent = (studentId) => {
  return (getUserState("mentorAssignments") || []).filter(
    (a) => a.studentId === studentId
  );
};

/**
 * Get all mentor assignments across all students (for overview).
 */
export const getAllMentorAssignments = () =>
  getUserState("mentorAssignments") || [];

/**
 * Remove a mentor assignment by id.
 */
export const removeMentorAssignment = (assignmentId) => {
  const updated = (getUserState("mentorAssignments") || []).filter(
    (a) => a.id !== assignmentId
  );
  setUserState("mentorAssignments", updated);
};

/**
 * Check if a mentor is already assigned to a specific student.
 */
export const isMentorAssigned = (mentorId, studentId) => {
  return (getUserState("mentorAssignments") || []).some(
    (a) => a.mentorId === mentorId && a.studentId === studentId && a.status === "Active"
  );
};

// ── Event Registrations ───────────────────────────────────
/**
 * Register for an event by event ID.
 */
export const registerForEvent = (eventId) => {
  const registrations = getUserState("eventRegistrations") || [];
  if (!registrations.includes(eventId)) {
    registrations.push(eventId);
    setUserState("eventRegistrations", registrations);
  }
};

/**
 * Unregister from an event.
 */
export const unregisterFromEvent = (eventId) => {
  const updated = (getUserState("eventRegistrations") || []).filter((id) => id !== eventId);
  setUserState("eventRegistrations", updated);
};

/**
 * Check if registered for a specific event.
 */
export const isRegisteredForEvent = (eventId) => {
  return (getUserState("eventRegistrations") || []).includes(eventId);
};

// ── Opportunities ─────────────────────────────────────────
/**
 * Mark an opportunity as applied.
 */
export const applyForOpportunity = (opportunityId) => {
  const applied = getUserState("appliedOpportunities") || [];
  if (!applied.includes(opportunityId)) {
    applied.push(opportunityId);
    setUserState("appliedOpportunities", applied);
  }
};

/**
 * Check if already applied to an opportunity.
 */
export const hasApplied = (opportunityId) => {
  return (getUserState("appliedOpportunities") || []).includes(opportunityId);
};

// ── Notifications ─────────────────────────────────────────
/**
 * Mark a single notification as read.
 */
export const markNotificationRead = (notificationId) => {
  const notifications = getUserState("notifications") || [];
  const updated = notifications.map((n) =>
    n.id === notificationId ? { ...n, isRead: true } : n
  );
  setUserState("notifications", updated);
};

/**
 * Mark ALL notifications as read.
 */
export const markAllNotificationsRead = () => {
  const notifications = (getUserState("notifications") || []).map((n) => ({ ...n, isRead: true }));
  setUserState("notifications", notifications);
};

/**
 * Get count of unread notifications.
 */
export const getUnreadCount = () => {
  return (getUserState("notifications") || []).filter((n) => !n.isRead).length;
};

// ── Portfolio ─────────────────────────────────────────────
/**
 * Add a new project to portfolio.
 */
export const addProject = (project) => {
  const db = getData();
  if (!db) return;
  const newProject = { ...project, id: `P-${Date.now()}` };
  db.studentProfile.projects = [...(db.studentProfile.projects || []), newProject];
  saveData(db);
  return newProject;
};

/**
 * Add a new certification to portfolio.
 */
export const addCertification = (cert) => {
  const db = getData();
  if (!db) return;
  const newCert = { ...cert, id: `C-${Date.now()}`, verified: false };
  db.studentProfile.certifications = [...(db.studentProfile.certifications || []), newCert];
  saveData(db);
  return newCert;
};

// ── Opportunity Skill Match (Local Algorithm) ─────────────
/**
 * Compute match % between student skills and required skills.
 * @param {string[]} studentSkillNames  - e.g. ["React","Python","Git"]
 * @param {string[]} requiredSkills     - from opportunity object
 * @returns {number} 0–100
 */
export const computeMatchScore = (studentSkillNames, requiredSkills) => {
  if (!requiredSkills || requiredSkills.length === 0) return 100;
  const lower = studentSkillNames.map((s) => s.toLowerCase());
  const matched = requiredSkills.filter((req) =>
    lower.some((sk) => sk.includes(req.toLowerCase()) || req.toLowerCase().includes(sk))
  );
  return Math.round((matched.length / requiredSkills.length) * 100);
};

// ── Academic Risk Detection (Local Rules) ─────────────────
/**
 * Runs rule-based risk checks on student data.
 * Returns array of { type, message, severity }
 */
export const detectAcademicRisks = (studentProfile) => {
  const risks = [];

  // Attendance risk
  if (studentProfile.overallAttendance < 75) {
    risks.push({ type: "Attendance Risk", message: "Overall attendance is below 75%. You may be de-barred from exams.", severity: "high" });
  }

  // Subject-level checks
  (studentProfile.subjects || []).forEach((sub) => {
    if (sub.marks < 60 && sub.semester === studentProfile.semester) {
      risks.push({ type: "Performance Risk", message: `${sub.name} marks (${sub.marks}%) are below 60%.`, severity: "high" });
    }
    if (sub.attendance < 75 && sub.semester === studentProfile.semester) {
      risks.push({ type: "Attendance Risk", message: `Attendance in ${sub.name} is ${sub.attendance}% — below 75%.`, severity: "medium" });
    }
  });

  // Declining CGPA
  const trends = studentProfile.semesterTrends || [];
  if (trends.length >= 3) {
    const last = trends[trends.length - 1];
    const prev = trends[trends.length - 2];
    const pprev= trends[trends.length - 3];
    if (last.sgpa < prev.sgpa && prev.sgpa < pprev.sgpa) {
      risks.push({ type: "Declining Performance", message: "CGPA has declined for two consecutive semesters.", severity: "high" });
    }
  }

  // Skill gaps
  (studentProfile.skills || []).forEach((sk) => {
    if (sk.required - sk.current > 20) {
      risks.push({ type: "Skill Gap", message: `${sk.name} has a gap of ${sk.required - sk.current} points below industry requirement.`, severity: "medium" });
    }
  });

  return risks;
};

// ── Personalised Recommendations (Local Rules) ────────────
/**
 * Returns an array of recommendation strings based on student data.
 */
export const generateRecommendations = (studentProfile) => {
  const recs = [];
  const current = studentProfile.subjects?.filter(s => s.semester === studentProfile.semester) || [];

  current.forEach((sub) => {
    if (sub.marks < 60) recs.push(`Revise ${sub.name} fundamentals — marks are critically low.`);
    else if (sub.marks < 70) recs.push(`Focus on ${sub.name} — marks below class average.`);
  });

  (studentProfile.skills || []).forEach((sk) => {
    const gap = sk.required - sk.current;
    if (gap > 15) recs.push(`Enrol in: ${sk.resources} to improve ${sk.name} (+${gap} gap).`);
  });

  if (studentProfile.overallAttendance < 80) {
    recs.push("Improve overall attendance — risk of falling below 75% threshold.");
  }

  const strongSubject = current.find(s => s.marks >= 80);
  if (strongSubject) recs.push(`Strong ${strongSubject.name} score — consider applying for related internships.`);

  return recs;
};

// ── Dev Utility ───────────────────────────────────────────
/**
 * Hard-reset: clears DB and re-seeds with fresh mock data.
 * Useful during development.
 */
export const resetData = () => {
  localStorage.removeItem(DB_KEY);
  localStorage.setItem(DB_KEY, JSON.stringify(initialMockData));
  console.info("[StorageService] DB reset to mock data.");
  window.location.reload();
};
