// ============================================================
//  SIH Student Academic Portal — Full Mock Database
//  Persistence : Browser LocalStorage only (no backend)
//  This file is the "seed" — loaded once if LS is empty.
// ============================================================

export const initialMockData = {

  // ──────────────────────────────────────────────────────────
  // STUDENT PROFILE
  // ──────────────────────────────────────────────────────────
  studentProfile: {
    id:              "STU-2024-0891",
    name:            "Aditya Kumar Singh",
    avatar:          "https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya",
    program:         "B.Tech",
    branch:          "Computer Science & Engineering",
    semester:        5,
    batch:           "2022-2026",
    email:           "aditya.singh@abcuniversity.edu",
    phone:           "+91 98765 43210",
    rollNo:          "23CSE1024",
    institution:     "ABC Institute of Technology",
    address:         "Pune, Maharashtra",
    dob:             "2004-08-14",

    // Computed / Novelty Metrics
    currentCgpa:          8.7,
    totalCredits:         96,
    overallAttendance:    91,
    backlogs:             0,
    academicHealthScore:  86,   // Custom Novelty Metric  (0–100)
    skillReadinessScore:  75,   // Custom Novelty Metric  (0–100)
    internshipReadiness:  78,   // Custom Novelty Metric  (0–100)
    departmentRank:       3,
    totalStudents:        120,
    percentile:           82,

    motivationalQuote: "Consistent effort leads to great progress.",

    // ── Semester-wise Trends ──────────────────────────────
    semesterTrends: [
      { semester: 1, sgpa: 7.8, cgpa: 7.8,  credits: 22, attendance: 88 },
      { semester: 2, sgpa: 8.1, cgpa: 7.95, credits: 22, attendance: 85 },
      { semester: 3, sgpa: 8.5, cgpa: 8.13, credits: 24, attendance: 90 },
      { semester: 4, sgpa: 8.4, cgpa: 8.20, credits: 24, attendance: 92 },
      { semester: 5, sgpa: 8.7, cgpa: 8.36, credits: 24, attendance: 91 }
    ],

    // ── All Subjects (across semesters) ───────────────────
    subjects: [
      // Semester 1
      { id:"CS101", semester:1, name:"Engineering Mathematics I",       code:"EM1",  faculty:"Dr. P. Joshi",   marks:78, grade:"B+", attendance:88, classAverage:72, credits:4, status:"Good" },
      { id:"CS102", semester:1, name:"Programming in C",                code:"PC",   faculty:"Prof. R. Mehta", marks:85, grade:"A",  attendance:90, classAverage:70, credits:4, status:"Strong" },
      { id:"CS103", semester:1, name:"Digital Electronics",             code:"DE",   faculty:"Dr. S. Nair",    marks:72, grade:"B",  attendance:86, classAverage:68, credits:3, status:"Good" },
      { id:"CS104", semester:1, name:"Engineering Physics",             code:"EP",   faculty:"Prof. A. Roy",   marks:68, grade:"B-", attendance:88, classAverage:65, credits:3, status:"Average" },

      // Semester 2
      { id:"CS201", semester:2, name:"Engineering Mathematics II",      code:"EM2",  faculty:"Dr. P. Joshi",   marks:80, grade:"A-", attendance:84, classAverage:73, credits:4, status:"Strong" },
      { id:"CS202", semester:2, name:"Object Oriented Programming",     code:"OOP",  faculty:"Prof. R. Mehta", marks:88, grade:"A",  attendance:87, classAverage:74, credits:4, status:"Strong" },
      { id:"CS203", semester:2, name:"Discrete Mathematics",            code:"DM",   faculty:"Dr. K. Sharma",  marks:76, grade:"B+", attendance:83, classAverage:70, credits:3, status:"Good" },
      { id:"CS204", semester:2, name:"Digital Logic Design",            code:"DLD",  faculty:"Prof. M. Gupta", marks:82, grade:"A-", attendance:85, classAverage:71, credits:3, status:"Strong" },

      // Semester 3
      { id:"CS301", semester:3, name:"Data Structures",                 code:"DS",   faculty:"Dr. A. Kumar",   marks:90, grade:"A+", attendance:92, classAverage:75, credits:4, status:"Strong" },
      { id:"CS302", semester:3, name:"Computer Organization",           code:"CO",   faculty:"Dr. R. Verma",   marks:79, grade:"B+", attendance:88, classAverage:72, credits:4, status:"Good" },
      { id:"CS303", semester:3, name:"Probability & Statistics",        code:"PS",   faculty:"Prof. S. Das",   marks:74, grade:"B",  attendance:90, classAverage:69, credits:3, status:"Good" },
      { id:"CS304", semester:3, name:"Web Technologies",               code:"WT",   faculty:"Prof. N. Shah",  marks:86, grade:"A",  attendance:91, classAverage:73, credits:3, status:"Strong" },

      // Semester 4
      { id:"CS401", semester:4, name:"Design & Analysis of Algorithms", code:"DAA",  faculty:"Dr. A. Kumar",   marks:84, grade:"A",  attendance:93, classAverage:70, credits:4, status:"Strong" },
      { id:"CS402", semester:4, name:"Operating Systems",              code:"OS",   faculty:"Dr. R. Verma",   marks:80, grade:"A-", attendance:89, classAverage:74, credits:4, status:"Strong" },
      { id:"CS403", semester:4, name:"Software Engineering",           code:"SE",   faculty:"Prof. V. Singh",  marks:77, grade:"B+", attendance:88, classAverage:73, credits:3, status:"Good" },
      { id:"CS404", semester:4, name:"Theory of Computation",         code:"TOC",  faculty:"Dr. K. Sharma",  marks:71, grade:"B",  attendance:86, classAverage:68, credits:3, status:"Average" },

      // Semester 5 (current)
      { id:"CS501", semester:5, name:"Data Structures & Algorithms",   code:"DSA",  faculty:"Dr. A. Kumar",   marks:87, grade:"A",  attendance:85, classAverage:72, credits:4, status:"Strong" },
      { id:"CS502", semester:5, name:"Database Management Systems",    code:"DBMS", faculty:"Prof. S. Singh",  marks:58, grade:"C",  attendance:65, classAverage:70, credits:4, status:"Needs Attention" },
      { id:"CS503", semester:5, name:"Computer Networks",              code:"CN",   faculty:"Prof. M. Das",   marks:82, grade:"A-", attendance:80, classAverage:74, credits:4, status:"Strong" },
      { id:"CS504", semester:5, name:"Machine Learning",               code:"ML",   faculty:"Dr. P. Gupta",   marks:76, grade:"B+", attendance:78, classAverage:71, credits:3, status:"Good" },
      { id:"CS505", semester:5, name:"Mathematics for Computing",      code:"MC",   faculty:"Dr. S. Das",     marks:71, grade:"B",  attendance:82, classAverage:68, credits:3, status:"Average" }
    ],

    // ── Skill Gap Analysis ────────────────────────────────
    skills: [
      { id:"SK1",  name:"Data Structures & Algorithms", current:87, required:90, category:"Core CS",    resources:"LeetCode, GeeksforGeeks" },
      { id:"SK2",  name:"SQL & Database",               current:58, required:85, category:"Database",   resources:"SQLZoo, Mode Analytics" },
      { id:"SK3",  name:"Python",                       current:80, required:85, category:"Programming", resources:"Real Python, Python Docs" },
      { id:"SK4",  name:"React.js",                     current:72, required:80, category:"Frontend",   resources:"React Docs, Scrimba" },
      { id:"SK5",  name:"JavaScript",                   current:75, required:85, category:"Frontend",   resources:"javascript.info, MDN" },
      { id:"SK6",  name:"System Design",                current:50, required:80, category:"Architecture",resources:"Grokking System Design" },
      { id:"SK7",  name:"Git & Version Control",        current:82, required:80, category:"Tools",      resources:"Pro Git Book" },
      { id:"SK8",  name:"Linux / OS Concepts",          current:70, required:75, category:"Systems",    resources:"TLCL, Linux Journey" },
      { id:"SK9",  name:"Machine Learning Basics",      current:60, required:70, category:"AI/ML",      resources:"Andrew Ng Coursera, fast.ai" },
      { id:"SK10", name:"Communication & Soft Skills",  current:68, required:80, category:"Soft Skills", resources:"Toastmasters, LinkedIn Learning" }
    ],

    // ── Digital Portfolio ─────────────────────────────────
    projects: [
      { id:"P1", title:"Smart Attendance System", description:"Face-recognition based attendance using OpenCV and Python.", tech:["Python","OpenCV","Flask"], year:2025, link:"https://github.com/aditya/smart-attendance", status:"Completed" },
      { id:"P2", title:"E-Commerce Platform",    description:"Full-stack e-commerce app with React frontend and Node.js backend.", tech:["React","Node.js","MongoDB"], year:2025, link:"https://github.com/aditya/ecommerce", status:"Completed" },
      { id:"P3", title:"ML Price Predictor",     description:"House price prediction model using scikit-learn and regression.", tech:["Python","scikit-learn","Pandas"], year:2026, link:"", status:"In Progress" }
    ],

    certifications: [
      { id:"C1", name:"AWS Cloud Practitioner Essentials", issuer:"Amazon Web Services", date:"2025-08", credentialId:"AWS-2025-84921", verified:true },
      { id:"C2", name:"React – The Complete Guide",        issuer:"Udemy (Maximilian)",  date:"2025-03", credentialId:"UC-r84kj29s",    verified:true },
      { id:"C3", name:"Python for Data Science",           issuer:"IBM (Coursera)",       date:"2024-12", credentialId:"IBM-PY-00123",    verified:true },
      { id:"C4", name:"Google Data Analytics Certificate", issuer:"Google (Coursera)",    date:"2024-08", credentialId:"GDA-44892",       verified:false }
    ],

    achievements: [
      { id:"A1", title:"Smart India Hackathon 2025 – Finalist",         date:"2025-09", type:"Hackathon",   description:"Top 10 among 2000+ teams nationally." },
      { id:"A2", title:"Best Project Award – Departmental Exhibition",  date:"2025-04", type:"Award",       description:"Awarded for Smart Attendance System." },
      { id:"A3", title:"Dean's List – Semester 3",                     date:"2024-12", type:"Academic",    description:"Top 5% of the department." },
      { id:"A4", title:"Open Source Contributor – React Ecosystem",    date:"2025-06", type:"Open Source", description:"3 merged PRs in open-source React libraries." }
    ]
  },

  // ──────────────────────────────────────────────────────────
  // MENTORS
  // ──────────────────────────────────────────────────────────
  mentors: [
    {
      id:"M1", name:"Anil Desai",
      designation:"Senior Software Engineer", company:"Microsoft India",
      department:"Cloud & AI", expertise:["DSA","System Design","C++","Azure"],
      experience:8, rating:4.8, totalSessions:142, bio:"Ex-Google, BITS Pilani alumnus. Loves competitive programming and distributed systems.",
      avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=AnilDesai",
      availableSlots: [
        { date:"2026-09-10", time:"10:00 AM", mode:"Online" },
        { date:"2026-09-12", time:"4:00 PM",  mode:"Online" },
        { date:"2026-09-15", time:"11:00 AM", mode:"In-Person" }
      ]
    },
    {
      id:"M2", name:"Kavita Rao",
      designation:"Data Engineering Lead", company:"Amazon India",
      department:"Data Platform", expertise:["SQL","DBMS","AWS","Spark","Python"],
      experience:10, rating:4.9, totalSessions:210, bio:"IIT Bombay graduate. Passionate about data pipelines and mentoring women in tech.",
      avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=KavitaRao",
      availableSlots: [
        { date:"2026-09-11", time:"2:00 PM",  mode:"Online" },
        { date:"2026-09-13", time:"5:00 PM",  mode:"Online" },
        { date:"2026-09-17", time:"10:00 AM", mode:"In-Person" }
      ]
    },
    {
      id:"M3", name:"Rohit Malhotra",
      designation:"Frontend Architect", company:"Razorpay",
      department:"Engineering", expertise:["React","JavaScript","CSS","UI/UX","Node.js"],
      experience:6, rating:4.7, totalSessions:98, bio:"Full-stack developer, startup founder. Blogs about frontend performance.",
      avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=RohitM",
      availableSlots: [
        { date:"2026-09-09", time:"6:00 PM",  mode:"Online" },
        { date:"2026-09-14", time:"3:00 PM",  mode:"Online" },
        { date:"2026-09-20", time:"11:00 AM", mode:"In-Person" }
      ]
    },
    {
      id:"M4", name:"Dr. Sunita Patel",
      designation:"Associate Professor", company:"IIT Delhi",
      department:"CSE", expertise:["Machine Learning","Python","Research","AI"],
      experience:14, rating:4.9, totalSessions:320, bio:"PhD from NTU Singapore. Publishes in top ML conferences. Mentors research-oriented students.",
      avatar:"https://api.dicebear.com/7.x/avataaars/svg?seed=SunitaP",
      availableSlots: [
        { date:"2026-09-08", time:"9:00 AM",  mode:"In-Person" },
        { date:"2026-09-16", time:"2:00 PM",  mode:"Online" },
        { date:"2026-09-22", time:"4:00 PM",  mode:"Online" }
      ]
    }
  ],

  // ──────────────────────────────────────────────────────────
  // OPPORTUNITIES (Internships / Jobs / Projects)
  // ──────────────────────────────────────────────────────────
  opportunities: [
    { id:"O1", company:"TechNova Solutions", logo:"TN", role:"Frontend Developer Intern",     type:"Internship", location:"Bangalore (Hybrid)", stipend:"₹25,000/mo", duration:"3 months", requiredSkills:["React","JavaScript","CSS","Git"],        deadline:"2026-10-15", description:"Work on consumer-facing React applications." },
    { id:"O2", company:"DataSys Analytics",  logo:"DS", role:"Database Administrator Intern", type:"Internship", location:"Remote",             stipend:"₹20,000/mo", duration:"6 months", requiredSkills:["SQL","DBMS","Python","Linux"],           deadline:"2026-10-20", description:"Manage and optimise production databases." },
    { id:"O3", company:"InnoAI Labs",        logo:"IA", role:"ML Research Intern",            type:"Internship", location:"Pune (Onsite)",       stipend:"₹30,000/mo", duration:"6 months", requiredSkills:["Python","Machine Learning","Pandas","scikit-learn"], deadline:"2026-11-01", description:"Research projects on computer vision." },
    { id:"O4", company:"CodeCraft Inc.",     logo:"CC", role:"Full-Stack Developer",          type:"Job",        location:"Mumbai (Hybrid)",     stipend:"₹8 LPA",     duration:"Full-time", requiredSkills:["React","Node.js","SQL","Git","REST APIs"],deadline:"2026-09-30", description:"Building SaaS products end to end." },
    { id:"O5", company:"CloudBase Pvt Ltd",  logo:"CB", role:"Cloud Solutions Intern",        type:"Internship", location:"Remote",              stipend:"₹18,000/mo", duration:"3 months", requiredSkills:["AWS","Linux","Python","Networking"],     deadline:"2026-10-10", description:"AWS infrastructure management and automation." },
    { id:"O6", company:"OpenBridge",         logo:"OB", role:"Open Source Project Contributor",type:"Project",   location:"Remote (Open Source)",stipend:"Stipend+PPO",duration:"Ongoing",   requiredSkills:["Git","JavaScript","React","Documentation"],deadline:"2026-12-31", description:"Contribute to open-source EdTech tools." }
  ],

  // ──────────────────────────────────────────────────────────
  // EVENTS
  // ──────────────────────────────────────────────────────────
  events: [
    { id:"EV1", name:"AI in EdTech Hackathon 2026",           date:"2026-11-05", time:"9:00 AM",  type:"Hackathon",    organizer:"SIH National Committee",   location:"Online",              description:"48-hour hackathon focused on AI solutions for education.",    tags:["AI","EdTech","Hackathon"] },
    { id:"EV2", name:"Mastering System Design",               date:"2026-09-12", time:"4:00 PM",  type:"Guest Lecture",organizer:"Placement Cell, ABC Inst.", location:"Seminar Hall A",      description:"Industry expert talk on designing scalable distributed systems.", tags:["System Design","Interview","Career"] },
    { id:"EV3", name:"Full-Stack Web Dev Workshop",           date:"2026-09-20", time:"10:00 AM", type:"Workshop",     organizer:"CSE Department",           location:"Lab 203",             description:"Hands-on workshop covering React, Node.js and REST APIs.",      tags:["React","Node.js","Workshop"] },
    { id:"EV4", name:"Campus Placement Preparation Bootcamp", date:"2026-10-01", time:"9:00 AM",  type:"Placement",    organizer:"Training & Placement Cell",location:"Auditorium",          description:"3-day intensive bootcamp on aptitude, DSA and HR rounds.",      tags:["Placement","DSA","Aptitude"] },
    { id:"EV5", name:"Open Source Contribution Drive",        date:"2026-09-25", time:"2:00 PM",  type:"Workshop",     organizer:"GitHub Campus Experts",    location:"Online",              description:"Learn to contribute to open-source projects using Git.",         tags:["Git","Open Source","GitHub"] },
    { id:"EV6", name:"Industry 4.0 Guest Lecture Series",    date:"2026-10-08", time:"3:00 PM",  type:"Guest Lecture",organizer:"Industry Connect Cell",    location:"Seminar Hall B",      description:"Industry leaders talk about emerging tech in manufacturing.",    tags:["Industry 4.0","IoT","Career"] },
    { id:"EV7", name:"Data Science & ML Symposium",          date:"2026-10-15", time:"10:00 AM", type:"Symposium",    organizer:"CSE & Data Science Dept.", location:"Conference Centre",   description:"Paper presentations and keynotes on ML advances.",               tags:["ML","Data Science","Research"] }
  ],

  // ──────────────────────────────────────────────────────────
  // DYNAMIC USER STATE (persisted across sessions)
  // ──────────────────────────────────────────────────────────
  userState: {
    // Booked mentor sessions saved here
    mentorBookings: [],

    // Registered event IDs
    eventRegistrations: [],

    // Applied opportunity IDs
    appliedOpportunities: [],

    // In-app notifications
    notifications: [
      {
        id:"N1", type:"warning", isRead:false,
        date:"2026-09-01",
        title:"Academic Alert",
        message:"DBMS marks (58%) are below class average (70%). Consider booking a mentor session for DBMS."
      },
      {
        id:"N2", type:"info", isRead:false,
        date:"2026-09-05",
        title:"New Opportunity Match",
        message:"A new Frontend Intern role at TechNova Solutions matches 80% of your skill profile."
      },
      {
        id:"N3", type:"success", isRead:true,
        date:"2026-09-03",
        title:"Certification Verified",
        message:"Your AWS Cloud Practitioner certificate has been verified and added to your portfolio."
      },
      {
        id:"N4", type:"info", isRead:true,
        date:"2026-08-28",
        title:"Event Reminder",
        message:"System Design Guest Lecture is on 12 Sep. Register before 10 Sep to confirm your seat."
      },
      {
        id:"N5", type:"warning", isRead:false,
        date:"2026-09-06",
        title:"Skill Gap Detected",
        message:"SQL proficiency (58/100) is significantly below industry requirement (85/100). Enrol in Advanced SQL."
      }
    ],

    // Portfolio edits by student (start empty, filled via form)
    portfolioEdits: {}
  }
};
