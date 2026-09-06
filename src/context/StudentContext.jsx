import React, { createContext, useContext, useState, useEffect } from "react";
import { ALL_STUDENTS } from "../data/allStudentsDb";
import { getData, updateModuleData } from "../services/storageService";

const StudentContext = createContext();

const ACTIVE_STUDENT_KEY = "sih_active_student_id";

export const StudentProvider = ({ children }) => {
  const [studentId, setStudentId] = useState(() => {
    try {
      const savedId = localStorage.getItem(ACTIVE_STUDENT_KEY);
      if (savedId && ALL_STUDENTS.some((s) => s.id === savedId)) {
        return savedId;
      }
      const db = getData();
      if (db?.studentProfile?.id && ALL_STUDENTS.some((s) => s.id === db.studentProfile.id)) {
        return db.studentProfile.id;
      }
    } catch (e) {
      console.error(e);
    }
    return ALL_STUDENTS[0].id;
  });

  const activeStudent = ALL_STUDENTS.find((s) => s.id === studentId) || ALL_STUDENTS[0];

  const selectStudent = (newStudentOrId) => {
    const id = typeof newStudentOrId === "string" ? newStudentOrId : newStudentOrId?.id;
    const target = ALL_STUDENTS.find((s) => s.id === id);
    if (target) {
      setStudentId(target.id);
      try {
        localStorage.setItem(ACTIVE_STUDENT_KEY, target.id);
      } catch (e) {
        console.error(e);
      }
      updateModuleData("studentProfile", target);
    }
  };

  useEffect(() => {
    const db = getData();
    if (!db?.studentProfile || db.studentProfile.id !== activeStudent.id) {
      updateModuleData("studentProfile", activeStudent);
    }
    try {
      localStorage.setItem(ACTIVE_STUDENT_KEY, activeStudent.id);
    } catch (e) {
      console.error(e);
    }
  }, [activeStudent]);

  return (
    <StudentContext.Provider
      value={{
        student: activeStudent,
        studentId,
        selectStudent,
        allStudents: ALL_STUDENTS,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudent must be used within a StudentProvider");
  }
  return context;
};