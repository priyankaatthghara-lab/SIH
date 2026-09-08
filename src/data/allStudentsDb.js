// ============================================================
//  allStudentsDb.js
//  Full mock data for every student across diverse programs in the institute.
//  Used by StudentContext and Institute Dashboard.
// ============================================================

export const ALL_STUDENTS = [
  // ── Student 1 (B.Tech CSE - 3rd Year) ─────────────────────
  {
    id: "STU-2024-0891",
    name: "Aditya Kumar Singh",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya",
    program: "B.Tech", branch: "Computer Science & Engineering", semester: 5, year: "3rd Year", batch: "2022-2026",
    email: "aditya.singh@abcuniversity.edu", rollNo: "23CSE1024",
    institution: "ABC Institute of Technology", dob: "2004-08-14",
    currentCgpa: 8.7, totalCredits: 96, overallAttendance: 91, backlogs: 0,
    academicHealthScore: 86, skillReadinessScore: 75, internshipReadiness: 78,
    departmentRank: 3, totalStudents: 120, percentile: 82,
    motivationalQuote: "Consistent effort leads to great progress.",
    semesterTrends: [
      { semester: 1, sgpa: 7.8, cgpa: 7.80, credits: 22, attendance: 88 },
      { semester: 2, sgpa: 8.1, cgpa: 7.95, credits: 22, attendance: 85 },
      { semester: 3, sgpa: 8.5, cgpa: 8.13, credits: 24, attendance: 90 },
      { semester: 4, sgpa: 8.4, cgpa: 8.20, credits: 24, attendance: 92 },
      { semester: 5, sgpa: 8.7, cgpa: 8.36, credits: 24, attendance: 91 },
    ],
    subjects: [
      { id:"CS101", semester:1, name:"Engineering Mathematics I",       code:"EM1",  faculty:"Dr. P. Joshi",   marks:78, grade:"B+", attendance:88, classAverage:72, credits:4, status:"Good" },
      { id:"CS102", semester:1, name:"Programming in C",                code:"PC",   faculty:"Prof. R. Mehta", marks:85, grade:"A",  attendance:90, classAverage:70, credits:4, status:"Strong" },
      { id:"CS103", semester:1, name:"Digital Electronics",             code:"DE",   faculty:"Dr. S. Nair",    marks:72, grade:"B",  attendance:86, classAverage:68, credits:3, status:"Good" },
      { id:"CS104", semester:1, name:"Engineering Physics",             code:"EP",   faculty:"Prof. A. Roy",   marks:68, grade:"B-", attendance:88, classAverage:65, credits:3, status:"Average" },
      { id:"CS201", semester:2, name:"Engineering Mathematics II",      code:"EM2",  faculty:"Dr. P. Joshi",   marks:80, grade:"A-", attendance:84, classAverage:73, credits:4, status:"Strong" },
      { id:"CS202", semester:2, name:"Object Oriented Programming",     code:"OOP",  faculty:"Prof. R. Mehta", marks:88, grade:"A",  attendance:87, classAverage:74, credits:4, status:"Strong" },
      { id:"CS203", semester:2, name:"Discrete Mathematics",            code:"DM",   faculty:"Dr. K. Sharma",  marks:76, grade:"B+", attendance:83, classAverage:70, credits:3, status:"Good" },
      { id:"CS204", semester:2, name:"Digital Logic Design",            code:"DLD",  faculty:"Prof. M. Gupta", marks:82, grade:"A-", attendance:85, classAverage:71, credits:3, status:"Strong" },
      { id:"CS301", semester:3, name:"Data Structures",                 code:"DS",   faculty:"Dr. A. Kumar",   marks:90, grade:"A+", attendance:92, classAverage:75, credits:4, status:"Strong" },
      { id:"CS302", semester:3, name:"Computer Organization",           code:"CO",   faculty:"Dr. R. Verma",   marks:79, grade:"B+", attendance:88, classAverage:72, credits:4, status:"Good" },
      { id:"CS303", semester:3, name:"Probability & Statistics",        code:"PS",   faculty:"Prof. S. Das",   marks:74, grade:"B",  attendance:90, classAverage:69, credits:3, status:"Good" },
      { id:"CS304", semester:3, name:"Web Technologies",               code:"WT",   faculty:"Prof. N. Shah",  marks:86, grade:"A",  attendance:91, classAverage:73, credits:3, status:"Strong" },
      { id:"CS401", semester:4, name:"Design & Analysis of Algorithms", code:"DAA",  faculty:"Dr. A. Kumar",   marks:84, grade:"A",  attendance:93, classAverage:70, credits:4, status:"Strong" },
      { id:"CS402", semester:4, name:"Operating Systems",              code:"OS",   faculty:"Dr. R. Verma",   marks:80, grade:"A-", attendance:89, classAverage:74, credits:4, status:"Strong" },
      { id:"CS403", semester:4, name:"Software Engineering",           code:"SE",   faculty:"Prof. V. Singh",  marks:77, grade:"B+", attendance:88, classAverage:73, credits:3, status:"Good" },
      { id:"CS404", semester:4, name:"Theory of Computation",         code:"TOC",  faculty:"Dr. K. Sharma",  marks:71, grade:"B",  attendance:86, classAverage:68, credits:3, status:"Average" },
      { id:"CS501", semester:5, name:"Data Structures & Algorithms",   code:"DSA",  faculty:"Dr. A. Kumar",   marks:87, grade:"A",  attendance:85, classAverage:72, credits:4, status:"Strong" },
      { id:"CS502", semester:5, name:"Database Management Systems",    code:"DBMS", faculty:"Prof. S. Singh",  marks:58, grade:"C",  attendance:65, classAverage:70, credits:4, status:"Needs Attention" },
      { id:"CS503", semester:5, name:"Computer Networks",              code:"CN",   faculty:"Prof. M. Das",   marks:82, grade:"A-", attendance:80, classAverage:74, credits:4, status:"Strong" },
      { id:"CS504", semester:5, name:"Machine Learning",               code:"ML",   faculty:"Dr. P. Gupta",   marks:76, grade:"B+", attendance:78, classAverage:71, credits:3, status:"Good" },
      { id:"CS505", semester:5, name:"Mathematics for Computing",      code:"MC",   faculty:"Dr. S. Das",     marks:71, grade:"B",  attendance:82, classAverage:68, credits:3, status:"Average" }
    ],
    skills: [
      { id:"SK1", name:"Data Structures", current:87, required:90, category:"Core CS", resources:"LeetCode, GeeksforGeeks" },
      { id:"SK2", name:"SQL & Database", current:58, required:85, category:"Database", resources:"SQLZoo, Mode Analytics" },
      { id:"SK3", name:"Python", current:80, required:85, category:"Programming", resources:"Real Python, Python Docs" },
      { id:"SK4", name:"React.js", current:72, required:80, category:"Frontend", resources:"React Docs, Scrimba" },
      { id:"SK5", name:"System Design", current:50, required:80, category:"Architecture", resources:"Grokking System Design" },
      { id:"SK6", name:"Git", current:82, required:80, category:"Tools", resources:"Pro Git Book" },
    ],
    projects: [
      { id:"P1", title:"Smart Attendance System", tech:["Python","OpenCV","Flask"], year:2025, status:"Completed" },
      { id:"P2", title:"E-Commerce Platform", tech:["React","Node.js"], year:2025, status:"Completed" },
    ],
    certifications: [
      { id:"C1", name:"AWS Cloud Practitioner", issuer:"Amazon Web Services", date:"2025-08", verified:true },
      { id:"C2", name:"React – The Complete Guide", issuer:"Udemy", date:"2025-03", verified:true },
    ],
    achievements: [
      { id:"A1", title:"SIH 2025 – Finalist", date:"2025-09", type:"Hackathon" },
      { id:"A2", title:"Best Project Award – Dept Expo", date:"2025-04", type:"Award" },
    ],
    readinessBars: [
      { label:"Academics", val:86, color:"#10b981" },
      { label:"Technical Skills", val:74, color:"#3b82f6" },
      { label:"Projects", val:61, color:"#f59e0b" },
      { label:"Resume", val:92, color:"#8b5cf6" },
      { label:"Communication", val:68, color:"#ef4444" },
    ],
    growthScore: 86, growthImprovement: 12,
    internshipScore: 78,
    departmentAvgCgpa: 7.9, yourPercentileCgpa: 8.2,
  },

  // ── Student 2 (B.Tech AI & Data Science - 2nd Year) ───────
  {
    id: "STU-2024-0892",
    name: "Priya Sharma",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    program: "B.Tech", branch: "Artificial Intelligence & Data Science", semester: 3, year: "2nd Year", batch: "2023-2027",
    email: "priya.sharma@abcuniversity.edu", rollNo: "23AIDS1025",
    institution: "ABC Institute of Technology", dob: "2004-03-22",
    currentCgpa: 8.9, totalCredits: 52, overallAttendance: 92, backlogs: 0,
    academicHealthScore: 88, skillReadinessScore: 80, internshipReadiness: 82,
    departmentRank: 2, totalStudents: 95, percentile: 94,
    motivationalQuote: "Data tells stories if you know how to listen.",
    semesterTrends: [
      { semester: 1, sgpa: 8.7, cgpa: 8.70, credits: 24, attendance: 90 },
      { semester: 2, sgpa: 8.9, cgpa: 8.80, credits: 24, attendance: 93 },
      { semester: 3, sgpa: 9.1, cgpa: 8.90, credits: 24, attendance: 92 },
    ],
    subjects: [
      { id:"AI301", semester:3, name:"Data Structures & Algorithms", code:"DSA", faculty:"Dr. A. Kumar", marks:91, grade:"A+", attendance:94, classAverage:74, credits:4, status:"Strong" },
      { id:"AI302", semester:3, name:"Linear Algebra & Optimization", code:"LAO", faculty:"Dr. S. Das", marks:88, grade:"A", attendance:90, classAverage:70, credits:4, status:"Strong" },
      { id:"AI303", semester:3, name:"Python for Data Science", code:"PDS", faculty:"Prof. N. Shah", marks:94, grade:"A+", attendance:95, classAverage:76, credits:3, status:"Strong" },
      { id:"AI304", semester:3, name:"Database Management", code:"DBMS", faculty:"Prof. S. Singh", marks:83, grade:"A-", attendance:89, classAverage:72, credits:4, status:"Strong" },
    ],
    skills: [
      { id:"SK1", name:"Machine Learning", current:82, required:85, category:"AI/ML", resources:"Coursera Andrew Ng" },
      { id:"SK2", name:"Python & Pandas", current:90, required:85, category:"Programming", resources:"Real Python, Kaggle" },
      { id:"SK3", name:"SQL", current:80, required:80, category:"Database", resources:"SQLZoo" },
      { id:"SK4", name:"Data Visualization", current:85, required:80, category:"Analytics", resources:"Tableau & Seaborn Docs" },
      { id:"SK5", name:"Statistics", current:78, required:80, category:"Math", resources:"StatQuest" },
    ],
    projects: [
      { id:"P1", title:"Predictive Healthcare Model", tech:["Python","Scikit-learn","Flask"], year:2025, status:"Completed" },
    ],
    certifications: [
      { id:"C1", name:"Google Data Analytics Professional", issuer:"Coursera", date:"2025-06", verified:true },
    ],
    achievements: [
      { id:"A1", title:"1st Prize – Inter-College AI Hackathon", date:"2025-04", type:"Hackathon" },
    ],
    readinessBars: [
      { label:"Academics", val:90, color:"#10b981" },
      { label:"Technical Skills", val:82, color:"#3b82f6" },
      { label:"Projects", val:78, color:"#f59e0b" },
      { label:"Resume", val:88, color:"#8b5cf6" },
      { label:"Communication", val:80, color:"#ef4444" },
    ],
    growthScore: 88, growthImprovement: 10,
    internshipScore: 82,
    departmentAvgCgpa: 8.0, yourPercentileCgpa: 8.8,
  },

  // ── Student 3 (BBA Marketing - 2nd Year) ───────────────────
  {
    id: "STU-2024-0893",
    name: "Rahul Verma",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    program: "BBA", branch: "Marketing & Strategy", semester: 3, year: "2nd Year", batch: "2023-2026",
    email: "rahul.verma@abcuniversity.edu", rollNo: "23BBA1026",
    institution: "ABC Institute of Management", dob: "2004-11-05",
    currentCgpa: 7.9, totalCredits: 50, overallAttendance: 85, backlogs: 0,
    academicHealthScore: 78, skillReadinessScore: 72, internshipReadiness: 75,
    departmentRank: 12, totalStudents: 110, percentile: 72,
    motivationalQuote: "Marketing is telling a story that resonates.",
    semesterTrends: [
      { semester: 1, sgpa: 7.6, cgpa: 7.60, credits: 24, attendance: 82 },
      { semester: 2, sgpa: 7.9, cgpa: 7.75, credits: 24, attendance: 86 },
      { semester: 3, sgpa: 8.2, cgpa: 7.90, credits: 26, attendance: 87 },
    ],
    subjects: [
      { id:"BB301", semester:3, name:"Digital Marketing & SEO", code:"DMK", faculty:"Prof. K. Sen", marks:86, grade:"A", attendance:88, classAverage:72, credits:4, status:"Strong" },
      { id:"BB302", semester:3, name:"Consumer Behavior", code:"CB", faculty:"Dr. V. Kapoor", marks:79, grade:"B+", attendance:84, classAverage:71, credits:4, status:"Good" },
      { id:"BB303", semester:3, name:"Business Analytics", code:"BA", faculty:"Prof. R. Sen", marks:64, grade:"C+", attendance:78, classAverage:68, credits:3, status:"Average" },
      { id:"BB304", semester:3, name:"Financial Management", code:"FM", faculty:"Dr. P. Mathur", marks:73, grade:"B", attendance:82, classAverage:70, credits:4, status:"Good" },
    ],
    skills: [
      { id:"SK1", name:"Digital Marketing", current:85, required:80, category:"Marketing", resources:"Google Digital Garage" },
      { id:"SK2", name:"Brand Strategy", current:76, required:80, category:"Management", resources:"HubSpot Academy" },
      { id:"SK3", name:"Excel / Power BI", current:62, required:80, category:"Analytics", resources:"Power BI Microsoft Learn" },
      { id:"SK4", name:"Content Marketing", current:80, required:75, category:"Marketing", resources:"Copywriting Masterclass" },
      { id:"SK5", name:"Public Speaking", current:88, required:80, category:"Soft Skills", resources:"Toastmasters Club" },
    ],
    projects: [
      { id:"P1", title:"Campus Brand Campaign for EdTech", tech:["Canva","Meta Ads","Google Analytics"], year:2025, status:"Completed" },
    ],
    certifications: [
      { id:"C1", name:"HubSpot Inbound Marketing", issuer:"HubSpot", date:"2025-05", verified:true },
    ],
    achievements: [
      { id:"A1", title:"Best Presentation – National Management Fest", date:"2025-02", type:"Competition" },
    ],
    readinessBars: [
      { label:"Academics", val:76, color:"#10b981" },
      { label:"Technical Skills", val:70, color:"#3b82f6" },
      { label:"Projects", val:74, color:"#f59e0b" },
      { label:"Resume", val:82, color:"#8b5cf6" },
      { label:"Communication", val:90, color:"#ef4444" },
    ],
    growthScore: 78, growthImprovement: 6,
    internshipScore: 75,
    departmentAvgCgpa: 7.4, yourPercentileCgpa: 7.8,
  },

  // ── Student 4 (MBA Finance - 1st Year) ────────────────────
  {
    id: "STU-2024-0894",
    name: "Sneha Patil",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
    program: "MBA", branch: "Financial Analytics & Investment Banking", semester: 2, year: "1st Year", batch: "2024-2026",
    email: "sneha.patil@abcuniversity.edu", rollNo: "24MBA1027",
    institution: "ABC School of Business", dob: "2002-01-18",
    currentCgpa: 9.3, totalCredits: 36, overallAttendance: 96, backlogs: 0,
    academicHealthScore: 95, skillReadinessScore: 90, internshipReadiness: 94,
    departmentRank: 1, totalStudents: 80, percentile: 99,
    motivationalQuote: "Precision in finance creates enduring value.",
    semesterTrends: [
      { semester: 1, sgpa: 9.2, cgpa: 9.20, credits: 24, attendance: 95 },
      { semester: 2, sgpa: 9.4, cgpa: 9.30, credits: 24, attendance: 97 },
    ],
    subjects: [
      { id:"MB201", semester:2, name:"Corporate Valuation & M&A", code:"CVM", faculty:"Dr. H. Mehta", marks:95, grade:"A+", attendance:98, classAverage:76, credits:4, status:"Strong" },
      { id:"MB202", semester:2, name:"Financial Derivatives", code:"FD", faculty:"Prof. K. Singhal", marks:92, grade:"A+", attendance:96, classAverage:74, credits:4, status:"Strong" },
      { id:"MB203", semester:2, name:"Econometrics & Quantitative Finance", code:"EQF", faculty:"Dr. R. Bannerjee", marks:90, grade:"A", attendance:94, classAverage:71, credits:4, status:"Strong" },
      { id:"MB204", semester:2, name:"Strategic Management", code:"SM", faculty:"Prof. A. Nanda", marks:88, grade:"A", attendance:95, classAverage:78, credits:3, status:"Strong" },
    ],
    skills: [
      { id:"SK1", name:"Financial Modeling", current:94, required:90, category:"Finance", resources:"Wall Street Prep" },
      { id:"SK2", name:"Equity Research", current:90, required:85, category:"Finance", resources:"CFA Institute Materials" },
      { id:"SK3", name:"Python for Finance", current:84, required:80, category:"Programming", resources:"Quantopian / Coursera" },
      { id:"SK4", name:"Bloomberg Terminal", current:88, required:85, category:"Tools", resources:"Bloomberg BMC" },
      { id:"SK5", name:"Business Communication", current:92, required:90, category:"Leadership", resources:"Executive Presence Workshop" },
    ],
    projects: [
      { id:"P1", title:"LBO Valuation Model for Renewable Energy Firm", tech:["Excel","Python","Monte Carlo"], year:2025, status:"Completed" },
    ],
    certifications: [
      { id:"C1", name:"CFA Level 1 Passed", issuer:"CFA Institute", date:"2024-12", verified:true },
      { id:"C2", name:"Bloomberg Market Concepts (BMC)", issuer:"Bloomberg", date:"2025-02", verified:true },
    ],
    achievements: [
      { id:"A1", title:"National Winner – Inter-B-School Stock Pitch Competition", date:"2025-03", type:"Competition" },
    ],
    readinessBars: [
      { label:"Academics", val:96, color:"#10b981" },
      { label:"Technical Skills", val:92, color:"#3b82f6" },
      { label:"Projects", val:90, color:"#f59e0b" },
      { label:"Resume", val:98, color:"#8b5cf6" },
      { label:"Communication", val:94, color:"#ef4444" },
    ],
    growthScore: 95, growthImprovement: 15,
    internshipScore: 94,
    departmentAvgCgpa: 8.1, yourPercentileCgpa: 9.3,
  },

  // ── Student 5 (BCA Cloud & Web - 2nd Year) ─────────────────
  {
    id: "STU-2024-0895",
    name: "Amit Joshi",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit",
    program: "BCA", branch: "Cloud Computing & Web Applications", semester: 4, year: "2nd Year", batch: "2023-2026",
    email: "amit.joshi@abcuniversity.edu", rollNo: "23BCA1028",
    institution: "ABC Institute of Technology", dob: "2004-06-09",
    currentCgpa: 7.5, totalCredits: 68, overallAttendance: 79, backlogs: 1,
    academicHealthScore: 68, skillReadinessScore: 65, internshipReadiness: 66,
    departmentRank: 28, totalStudents: 105, percentile: 62,
    motivationalQuote: "Every line of code is a step toward mastery.",
    semesterTrends: [
      { semester: 1, sgpa: 7.2, cgpa: 7.20, credits: 22, attendance: 76 },
      { semester: 2, sgpa: 7.4, cgpa: 7.30, credits: 22, attendance: 78 },
      { semester: 3, sgpa: 7.6, cgpa: 7.40, credits: 24, attendance: 80 },
      { semester: 4, sgpa: 7.7, cgpa: 7.50, credits: 24, attendance: 82 },
    ],
    subjects: [
      { id:"BCA401", semester:4, name:"Full Stack Web Development", code:"FSW", faculty:"Prof. T. Sen", marks:84, grade:"A", attendance:86, classAverage:72, credits:4, status:"Strong" },
      { id:"BCA402", semester:4, name:"Cloud Infrastructure & AWS", code:"CIA", faculty:"Dr. P. Gupta", marks:76, grade:"B+", attendance:80, classAverage:70, credits:4, status:"Good" },
      { id:"BCA403", semester:4, name:"Relational Databases & SQL", code:"RDB", faculty:"Prof. S. Singh", marks:62, grade:"C+", attendance:74, classAverage:68, credits:3, status:"Average" },
      { id:"BCA404", semester:4, name:"Computer Network Security", code:"CNS", faculty:"Prof. M. Das", marks:58, grade:"C", attendance:70, classAverage:66, credits:3, status:"Needs Attention" },
    ],
    skills: [
      { id:"SK1", name:"JavaScript / React", current:78, required:80, category:"Frontend", resources:"Scrimba, React Docs" },
      { id:"SK2", name:"Node.js & Express", current:70, required:75, category:"Backend", resources:"The Odin Project" },
      { id:"SK3", name:"AWS Basics", current:60, required:75, category:"Cloud", resources:"AWS Free Tier Hands-on" },
      { id:"SK4", name:"SQL", current:55, required:80, category:"Database", resources:"SQLZoo" },
      { id:"SK5", name:"Git & GitHub", current:72, required:75, category:"Tools", resources:"GitHub Skills" },
    ],
    projects: [
      { id:"P1", title:"Cloud Task Manager App", tech:["React","Firebase","Node.js"], year:2025, status:"Completed" },
    ],
    certifications: [
      { id:"C1", name:"Postman API Fundamentals", issuer:"Postman", date:"2025-01", verified:true },
    ],
    achievements: [],
    readinessBars: [
      { label:"Academics", val:72, color:"#10b981" },
      { label:"Technical Skills", val:68, color:"#3b82f6" },
      { label:"Projects", val:60, color:"#f59e0b" },
      { label:"Resume", val:65, color:"#8b5cf6" },
      { label:"Communication", val:65, color:"#ef4444" },
    ],
    growthScore: 68, growthImprovement: 4,
    internshipScore: 66,
    departmentAvgCgpa: 7.2, yourPercentileCgpa: 7.4,
  },

  // ── Student 6 (MCA - 1st Year) ────────────────────────────
  {
    id: "STU-2024-0896",
    name: "Divya Menon",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Divya",
    program: "MCA", branch: "Software Systems & Architecture", semester: 2, year: "1st Year", batch: "2024-2026",
    email: "divya.menon@abcuniversity.edu", rollNo: "24MCA1029",
    institution: "ABC Institute of Technology", dob: "2003-09-30",
    currentCgpa: 8.8, totalCredits: 40, overallAttendance: 92, backlogs: 0,
    academicHealthScore: 88, skillReadinessScore: 84, internshipReadiness: 86,
    departmentRank: 3, totalStudents: 65, percentile: 92,
    motivationalQuote: "Clean architecture is the backbone of great software.",
    semesterTrends: [
      { semester: 1, sgpa: 8.6, cgpa: 8.60, credits: 24, attendance: 90 },
      { semester: 2, sgpa: 9.0, cgpa: 8.80, credits: 24, attendance: 94 },
    ],
    subjects: [
      { id:"MC201", semester:2, name:"Advanced Data Structures", code:"ADS", faculty:"Dr. A. Kumar", marks:92, grade:"A+", attendance:95, classAverage:74, credits:4, status:"Strong" },
      { id:"MC202", semester:2, name:"Distributed Systems & Microservices", code:"DSM", faculty:"Dr. R. Verma", marks:86, grade:"A", attendance:92, classAverage:72, credits:4, status:"Strong" },
      { id:"MC203", semester:2, name:"Enterprise Java & Spring Boot", code:"EJS", faculty:"Prof. V. Singh", marks:89, grade:"A", attendance:90, classAverage:73, credits:4, status:"Strong" },
      { id:"MC204", semester:2, name:"DevOps & Containerization", code:"DOC", faculty:"Prof. M. Das", marks:82, grade:"A-", attendance:88, classAverage:70, credits:3, status:"Strong" },
    ],
    skills: [
      { id:"SK1", name:"Java & Spring Boot", current:88, required:85, category:"Backend", resources:"Baeldung, Spring Docs" },
      { id:"SK2", name:"Docker & Kubernetes", current:78, required:80, category:"DevOps", resources:"Docker Mastery Udemy" },
      { id:"SK3", name:"Microservices Architecture", current:82, required:80, category:"Architecture", resources:"Martin Fowler Architecture" },
      { id:"SK4", name:"PostgreSQL", current:84, required:80, category:"Database", resources:"PostgreSQL Tutorial" },
      { id:"SK5", name:"DSA in Java", current:86, required:85, category:"Core CS", resources:"LeetCode" },
    ],
    projects: [
      { id:"P1", title:"Microservice-based Banking API", tech:["Java","Spring Boot","Docker","PostgreSQL"], year:2025, status:"Completed" },
    ],
    certifications: [
      { id:"C1", name:"Oracle Certified Associate - Java SE 11", issuer:"Oracle", date:"2024-11", verified:true },
    ],
    achievements: [
      { id:"A1", title:"2nd Place – TechFest Hackathon", date:"2025-02", type:"Competition" },
    ],
    readinessBars: [
      { label:"Academics", val:90, color:"#10b981" },
      { label:"Technical Skills", val:85, color:"#3b82f6" },
      { label:"Projects", val:82, color:"#f59e0b" },
      { label:"Resume", val:88, color:"#8b5cf6" },
      { label:"Communication", val:82, color:"#ef4444" },
    ],
    growthScore: 88, growthImprovement: 10,
    internshipScore: 86,
    departmentAvgCgpa: 7.8, yourPercentileCgpa: 8.7,
  },

  // ── Student 7 (B.Com - 3rd Year) ──────────────────────────
  {
    id: "STU-2024-0897",
    name: "Karan Malhotra",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karan",
    program: "B.Com", branch: "Accounting, Taxation & Audit", semester: 5, year: "3rd Year", batch: "2022-2025",
    email: "karan.malhotra@abcuniversity.edu", rollNo: "22BCM1030",
    institution: "ABC College of Commerce", dob: "2003-02-14",
    currentCgpa: 8.6, totalCredits: 92, overallAttendance: 90, backlogs: 0,
    academicHealthScore: 85, skillReadinessScore: 80, internshipReadiness: 82,
    departmentRank: 4, totalStudents: 140, percentile: 88,
    motivationalQuote: "Integrity and insight drive financial success.",
    semesterTrends: [
      { semester: 1, sgpa: 8.1, cgpa: 8.10, credits: 20, attendance: 88 },
      { semester: 2, sgpa: 8.4, cgpa: 8.25, credits: 20, attendance: 89 },
      { semester: 3, sgpa: 8.7, cgpa: 8.40, credits: 22, attendance: 91 },
      { semester: 4, sgpa: 8.8, cgpa: 8.50, credits: 22, attendance: 92 },
      { semester: 5, sgpa: 8.9, cgpa: 8.60, credits: 22, attendance: 90 },
    ],
    subjects: [
      { id:"BC501", semester:5, name:"Corporate Accounting & Standards", code:"CAS", faculty:"Dr. P. Roy", marks:90, grade:"A+", attendance:92, classAverage:74, credits:4, status:"Strong" },
      { id:"BC502", semester:5, name:"Direct & Indirect Taxation (GST)", code:"DIT", faculty:"Prof. N. Kulkarni", marks:88, grade:"A", attendance:90, classAverage:71, credits:4, status:"Strong" },
      { id:"BC503", semester:5, name:"Auditing Principles & Practices", code:"APP", faculty:"Dr. S. Nair", marks:85, grade:"A", attendance:88, classAverage:73, credits:3, status:"Strong" },
      { id:"BC504", semester:5, name:"Financial Analysis with Tally & Excel", code:"FAT", faculty:"Prof. R. Seth", marks:82, grade:"A-", attendance:90, classAverage:75, credits:3, status:"Strong" },
    ],
    skills: [
      { id:"SK1", name:"TallyPrime & GST Filing", current:90, required:85, category:"Accounting", resources:"Tally Education" },
      { id:"SK2", name:"Advanced MS Excel (VBA)", current:86, required:80, category:"Tools", resources:"ExcelIsFun, Chandoo" },
      { id:"SK3", name:"Financial Auditing", current:80, required:80, category:"Finance", resources:"ICAI Study Material" },
      { id:"SK4", name:"Corporate Law Compliance", current:78, required:75, category:"Law", resources:"Ministry of Corporate Affairs Portal" },
    ],
    projects: [
      { id:"P1", title:"GST Audit and Compliance Framework for MSMEs", tech:["Excel","Tally","Power BI"], year:2024, status:"Completed" },
    ],
    certifications: [
      { id:"C1", name:"Tally Certified Professional", issuer:"Tally Solutions", date:"2024-09", verified:true },
    ],
    achievements: [
      { id:"A1", title:"1st Prize – Inter-University Commerce Quiz", date:"2024-11", type:"Award" },
    ],
    readinessBars: [
      { label:"Academics", val:87, color:"#10b981" },
      { label:"Technical Skills", val:82, color:"#3b82f6" },
      { label:"Projects", val:78, color:"#f59e0b" },
      { label:"Resume", val:85, color:"#8b5cf6" },
      { label:"Communication", val:84, color:"#ef4444" },
    ],
    growthScore: 85, growthImprovement: 9,
    internshipScore: 82,
    departmentAvgCgpa: 7.6, yourPercentileCgpa: 8.5,
  },

  // ── Student 8 (M.Com - 2nd Year) ──────────────────────────
  {
    id: "STU-2024-0898",
    name: "Pooja Deshmukh",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pooja",
    program: "M.Com", branch: "International Business & Trade Finance", semester: 3, year: "2nd Year", batch: "2023-2025",
    email: "pooja.deshmukh@abcuniversity.edu", rollNo: "23MCM1031",
    institution: "ABC College of Commerce", dob: "2002-07-19",
    currentCgpa: 8.9, totalCredits: 62, overallAttendance: 94, backlogs: 0,
    academicHealthScore: 90, skillReadinessScore: 85, internshipReadiness: 88,
    departmentRank: 2, totalStudents: 50, percentile: 96,
    motivationalQuote: "Global trade thrives on sharp economic insight.",
    semesterTrends: [
      { semester: 1, sgpa: 8.7, cgpa: 8.70, credits: 24, attendance: 92 },
      { semester: 2, sgpa: 8.9, cgpa: 8.80, credits: 24, attendance: 95 },
      { semester: 3, sgpa: 9.1, cgpa: 8.90, credits: 24, attendance: 94 },
    ],
    subjects: [
      { id:"MC301", semester:3, name:"International Financial Management", code:"IFM", faculty:"Dr. V. Joshi", marks:92, grade:"A+", attendance:96, classAverage:75, credits:4, status:"Strong" },
      { id:"MC302", semester:3, name:"Global Supply Chain & Logistics", code:"GSL", faculty:"Prof. S. Iyer", marks:87, grade:"A", attendance:92, classAverage:72, credits:4, status:"Strong" },
      { id:"MC303", semester:3, name:"Forex Risk Management", code:"FRM", faculty:"Dr. H. Mehta", marks:89, grade:"A", attendance:94, classAverage:73, credits:4, status:"Strong" },
    ],
    skills: [
      { id:"SK1", name:"Trade Finance", current:88, required:85, category:"Finance", resources:"ICC Academy" },
      { id:"SK2", name:"Forex & Hedging", current:85, required:80, category:"Finance", resources:"Investopedia & Risk.net" },
      { id:"SK3", name:"Supply Chain Analytics", current:80, required:80, category:"Analytics", resources:"Coursera Logistics" },
      { id:"SK4", name:"SPSS / Statistical Analysis", current:82, required:80, category:"Research", resources:"SPSS Tutorials" },
    ],
    projects: [
      { id:"P1", title:"Hedging Strategies in Cross-Border E-Commerce", tech:["SPSS","Excel","R"], year:2024, status:"Completed" },
    ],
    certifications: [
      { id:"C1", name:"Certificate in Trade Finance (CTF)", issuer:"ICC", date:"2024-08", verified:true },
    ],
    achievements: [
      { id:"A1", title:"Best Paper Award – International Trade Conference", date:"2024-12", type:"Award" },
    ],
    readinessBars: [
      { label:"Academics", val:91, color:"#10b981" },
      { label:"Technical Skills", val:86, color:"#3b82f6" },
      { label:"Projects", val:85, color:"#f59e0b" },
      { label:"Resume", val:90, color:"#8b5cf6" },
      { label:"Communication", val:88, color:"#ef4444" },
    ],
    growthScore: 90, growthImprovement: 11,
    internshipScore: 88,
    departmentAvgCgpa: 8.0, yourPercentileCgpa: 8.9,
  },

  // ── Student 9 (BA Economics - 1st Year) ───────────────────
  {
    id: "STU-2024-0899",
    name: "Neha Gupta",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Neha",
    program: "BA", branch: "Economics & Public Policy", semester: 2, year: "1st Year", batch: "2024-2027",
    email: "neha.gupta@abcuniversity.edu", rollNo: "24BA1032",
    institution: "ABC College of Arts & Humanities", dob: "2005-04-27",
    currentCgpa: 8.3, totalCredits: 38, overallAttendance: 88, backlogs: 0,
    academicHealthScore: 82, skillReadinessScore: 74, internshipReadiness: 76,
    departmentRank: 5, totalStudents: 90, percentile: 85,
    motivationalQuote: "Understanding economic policy shapes a better society.",
    semesterTrends: [
      { semester: 1, sgpa: 8.2, cgpa: 8.20, credits: 20, attendance: 86 },
      { semester: 2, sgpa: 8.4, cgpa: 8.30, credits: 20, attendance: 90 },
    ],
    subjects: [
      { id:"BA201", semester:2, name:"Microeconomic Theory & Applications", code:"MTA", faculty:"Dr. A. Sen", marks:86, grade:"A", attendance:90, classAverage:72, credits:4, status:"Strong" },
      { id:"BA202", semester:2, name:"Statistical Methods for Economics", code:"SME", faculty:"Prof. M. Mukherjee", marks:82, grade:"A-", attendance:88, classAverage:69, credits:4, status:"Good" },
      { id:"BA203", semester:2, name:"Public Finance & Fiscal Policy", code:"PFF", faculty:"Dr. R. Bannerjee", marks:80, grade:"A-", attendance:86, classAverage:70, credits:4, status:"Good" },
    ],
    skills: [
      { id:"SK1", name:"Economic Analysis", current:84, required:80, category:"Economics", resources:"CoreEcon Open Textbook" },
      { id:"SK2", name:"R & Stata for Econometrics", current:72, required:80, category:"Data", resources:"DataCamp R for Economics" },
      { id:"SK3", name:"Policy Research & Writing", current:88, required:80, category:"Research", resources:"Policy Briefs Handbook" },
      { id:"SK4", name:"Data Visualization", current:76, required:75, category:"Analytics", resources:"ggplot2 Docs" },
    ],
    projects: [
      { id:"P1", title:"Impact of Digital Payment Adoption in Rural Retail", tech:["R","Survey Analysis","Excel"], year:2025, status:"Completed" },
    ],
    certifications: [
      { id:"C1", name:"Data Analysis for Public Policy", issuer:"J-PAL / MIT", date:"2025-01", verified:true },
    ],
    achievements: [
      { id:"A1", title:"Selected – National Youth Parliament", date:"2025-02", type:"Award" },
    ],
    readinessBars: [
      { label:"Academics", val:83, color:"#10b981" },
      { label:"Technical Skills", val:72, color:"#3b82f6" },
      { label:"Projects", val:75, color:"#f59e0b" },
      { label:"Resume", val:84, color:"#8b5cf6" },
      { label:"Communication", val:90, color:"#ef4444" },
    ],
    growthScore: 82, growthImprovement: 7,
    internshipScore: 76,
    departmentAvgCgpa: 7.5, yourPercentileCgpa: 8.2,
  },

  // ── Student 10 (MA Public Administration - 2nd Year) ──────
  {
    id: "STU-2024-0900",
    name: "Vikram Singhania",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
    program: "MA", branch: "Public Administration & Governance", semester: 3, year: "2nd Year", batch: "2023-2025",
    email: "vikram.singhania@abcuniversity.edu", rollNo: "23MAP1033",
    institution: "ABC College of Arts & Humanities", dob: "2001-10-12",
    currentCgpa: 8.7, totalCredits: 60, overallAttendance: 91, backlogs: 0,
    academicHealthScore: 86, skillReadinessScore: 82, internshipReadiness: 84,
    departmentRank: 2, totalStudents: 45, percentile: 95,
    motivationalQuote: "Good governance turns policy into tangible welfare.",
    semesterTrends: [
      { semester: 1, sgpa: 8.5, cgpa: 8.50, credits: 24, attendance: 90 },
      { semester: 2, sgpa: 8.8, cgpa: 8.65, credits: 24, attendance: 92 },
      { semester: 3, sgpa: 8.9, cgpa: 8.70, credits: 24, attendance: 91 },
    ],
    subjects: [
      { id:"MA301", semester:3, name:"Administrative Law & Governance", code:"ALG", faculty:"Dr. K. N. Rao", marks:90, grade:"A+", attendance:92, classAverage:74, credits:4, status:"Strong" },
      { id:"MA302", semester:3, name:"Urban Governance & Smart Cities", code:"UGSC", faculty:"Prof. T. Sen", marks:86, grade:"A", attendance:90, classAverage:72, credits:4, status:"Strong" },
      { id:"MA303", semester:3, name:"Public Project Monitoring & Evaluation", code:"PME", faculty:"Dr. S. Nair", marks:84, grade:"A-", attendance:90, classAverage:71, credits:4, status:"Strong" },
    ],
    skills: [
      { id:"SK1", name:"Public Policy Drafting", current:90, required:85, category:"Policy", resources:"NITI Aayog Policy Guidelines" },
      { id:"SK2", name:"Project Impact Evaluation", current:84, required:80, category:"Analytics", resources:"World Bank Impact Eval Guide" },
      { id:"SK3", name:"Stakeholder Management", current:88, required:85, category:"Management", resources:"Leadership in Governance" },
      { id:"SK4", name:"Data-Driven Governance", current:78, required:80, category:"Tools", resources:"GovTech Case Studies" },
    ],
    projects: [
      { id:"P1", title:"Municipal Waste Management Policy Assessment", tech:["GIS","Survey Data","Policy Matrix"], year:2024, status:"Completed" },
    ],
    certifications: [
      { id:"C1", name:"Certified Public Policy Analyst", issuer:"National Institute of Governance", date:"2024-10", verified:true },
    ],
    achievements: [
      { id:"A1", title:"Fellowship – State Policy Research Initiative", date:"2024-07", type:"Fellowship" },
    ],
    readinessBars: [
      { label:"Academics", val:88, color:"#10b981" },
      { label:"Technical Skills", val:80, color:"#3b82f6" },
      { label:"Projects", val:85, color:"#f59e0b" },
      { label:"Resume", val:90, color:"#8b5cf6" },
      { label:"Communication", val:94, color:"#ef4444" },
    ],
    growthScore: 86, growthImprovement: 8,
    internshipScore: 84,
    departmentAvgCgpa: 7.9, yourPercentileCgpa: 8.7,
  },
];
