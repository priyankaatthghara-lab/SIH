# 🎓 InternSetu — Academia–Industry Bridge & Academic Portal

[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-7.1-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Recharts](https://img.shields.io/badge/Recharts-3.10-22B5BF?style=for-the-badge&logo=d3.js&logoColor=white)](https://recharts.org/)
[![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-1.41-F56565?style=for-the-badge&logo=lucide&logoColor=white)](https://lucide.dev/)
[![Storage](https://img.shields.io/badge/Persistence-LocalStorage-F59E0B?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

> **InternSetu** is an intelligent, full-featured academic and industry bridge platform designed for the **Smart India Hackathon (SIH)**. It enables university administrators, faculty, and students to track holistic academic performance, detect learning risks, identify industry skill gaps, and connect students directly with expert industry mentors.

---

## 📌 Table of Contents

- [Key Highlights](#-key-highlights)
- [System Architecture & Modules](#-system-architecture--modules)
  - [1. Institute Dashboard](#1-institute-dashboard-)
  - [2. 360° Student Profile](#2-360-student-profile-)
  - [3. Academic Performance Analytics](#3-academic-performance-analytics-)
  - [4. Skills & Skill Gap Diagnostics](#4-skills--skill-gap-diagnostics-)
  - [5. Industry Mentors & Assignment Hub](#5-industry-mentors--assignment-hub-)
- [Technology Stack](#-technology-stack)
- [Intelligent Algorithms & Novelty Features](#-intelligent-algorithms--novelty-features)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
  - [Available Scripts](#available-scripts)
- [Data Layer & Persistence Model](#-data-layer--persistence-model)
- [Roadmap & Future Extensions](#-roadmap--future-extensions)

---

## ✨ Key Highlights

- 🏢 **Multi-Faculty & Course Directory**: Institute-level visibility across **Engineering (B.Tech)**, **Management (BBA, MBA)**, **Computer Applications (BCA, MCA)**, **Commerce (B.Com, M.Com)**, and **Humanities (BA, MA)**.
- 🎯 **Skill Gap Diagnostics**: Real-time gap analysis comparing student academic competencies against modern industry benchmarks.
- 🧑‍🏫 **Faculty Mentor Assignment**: Direct matching of struggling students with vetted corporate mentors with built-in duplicate assignment protection and simulated email notifications.
- 📊 **Rich Interactive Visualizations**: Performance trends, percentile ranks, attendance analytics, and dynamic SVG gauges powered by Recharts.
- 🤖 **AI-Driven Academic Insights**: Automatic rule-based generation of strengths, academic risk alerts, and personalized career recommendations.
- 📄 **One-Click Academic Report Generator**: Instant downloadable academic health summaries.
- ⚡ **Zero-Backend Lightweight Architecture**: Complete client-side state management with instant hydration from browser `LocalStorage`.

---

## 🏛 System Architecture & Modules

```
                    ┌─────────────────────────────────────────────────────────┐
                    │                   InternSetu Portal                     │
                    └────────────────────────────┬────────────────────────────┘
                                                 │
            ┌─────────────────────┬──────────────┴───────┬────────────────────┬─────────────────────┐
            │                     │                      │                    │                     │
    ┌───────▼────────┐   ┌────────▼─────────┐   ┌────────▼────────┐   ┌───────▼─────────┐   ┌───────▼─────────┐
    │   Institute    │   │  360° Student    │   │    Academic     │   │  Skills & Skill │   │    Industry     │
    │   Dashboard    │   │     Profile      │   │   Performance   │   │  Gap Diagnostics│   │  Mentorship Hub │
    │      (/)       │   │    (/profile)    │   │  (/performance) │   │    (/skills)    │   │   (/mentors)    │
    └────────────────┘   └──────────────────┘   └─────────────────┘   └─────────────────┘   └─────────────────┘
```

### 1. Institute Dashboard (`/`)
- **University Overview**: Metric cards displaying Total Academic Courses, Departments, Total Enrolled Students, and Active University Batches.
- **Horizontal Search & Filter Bar**: Instant filtering by course name, department discipline (Engineering, Management, Computer Applications, Commerce, Humanities), and degree level (Undergraduate / Postgraduate).
- **Course Directory Cards**: Displays course title, department, duration, and enrolled student counts.
- **Privacy-Conscious Student Directory**: Clicking **"View Students"** opens a lightweight modal displaying enrolled students with **avatar and name only** for privacy-compliant quick access.

### 2. 360° Student Profile (`/profile`)
- **Profile Summary**: Student metadata, avatar, roll number, semester badge, and personal motto.
- **Corner Quick-Switcher**: Compact horizontal scrollable student switcher located in the top-right corner to easily toggle between student records across all institute departments.
- **Academic KPI Cards**: Real-time display of CGPA, Overall Attendance %, Active Backlogs count, and Current Semester.
- **CGPA Trend & Growth Score**: Interactive spline area chart illustrating semester-by-semester SGPA progression alongside an SVG circular gauge indicating the student's *Academic Growth Score*.
- **Department Rank & Comparison**: Visual bar comparison showing the student's CGPA vs. the Department Average and Peer Percentile.
- **Subject Strength Analysis**: Color-coded proficiency progress bars for each registered subject.
- **Skill-Academic Correlation Matrix**: Maps theoretical subjects to industry-relevant technical competencies and career pathways.
- **AI Academic Insights**: Dynamic diagnostic recommendations suggesting revisions for weak areas and internship applications for strong subjects.
- **Downloadable Academic Report**: Generates formatted student summary reports.

### 3. Academic Performance Analytics (`/academic-performance`)
- In-depth semester-wise breakdown with credit points and grades.
- Class distribution charts comparing student scores with class benchmarks.
- Subject-by-subject strength and weakness categorization.
- Interactive student-to-student comparison modal.

### 4. Skills & Skill Gap Diagnostics (`/skills`)
- Categorized skill breakdown (Core CS, AI/ML, Frontend, Backend, Database, Architecture, Tools, Soft Skills).
- Visual skill gap indicator comparing student proficiency against industry requirements (`Gap = Required - Current`).
- Direct action link to assign a qualified mentor for specific skill deficits.

### 5. Industry Mentors & Assignment Hub (`/mentors`)
- Comprehensive mentor directory with company affiliation, years of experience, ratings, and skill specializations.
- **College-to-Student Assignment Workflow**: Assigns a mentor to address a student's particular skill gap with custom faculty notes.
- **Duplicate Protection**: Prevents duplicate active assignments for the same student and skill.
- **Simulated Outbox**: Records automated notification emails in the local mock outbox.

---

## 🛠 Technology Stack

### Frontend Core
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **React** | `^19.2.8` | Declarative UI component library with Hooks and modern Context API |
| **Vite** | `^8.2.2` | High-performance build tool and lightning-fast HMR dev server |
| **React Router DOM** | `^7.18.3` | Client-side routing with nested layouts and active navigation tracking |
| **JavaScript (ES6+)** | Modern | Clean, modular JavaScript logic with async storage abstraction |

### Data Visualization & Icons
| Library | Version | Purpose |
| :--- | :--- | :--- |
| **Recharts** | `^3.10.1` | Composable charting library (`AreaChart`, `BarChart`, `ResponsiveContainer`, etc.) |
| **Lucide React** | `^1.41.0` | Sleek, customizable icons throughout all navigation and data cards |

### State & Storage Architecture
| Component | Architecture | Purpose |
| :--- | :--- | :--- |
| **`StudentContext`** | React Context + Hooks | Global active student state provider across all modules |
| **`storageService`** | LocalStorage Layer | Centralized CRUD service with local database initialization and seed fallbacks |

---

## 🧠 Intelligent Algorithms & Novelty Features

```javascript
// 1. Academic Risk Detection Algorithm (Rule-Based Engine)
detectAcademicRisks(studentProfile) => [
  AttendanceRisk (< 75%),
  PerformanceRisk (Subject marks < 60%),
  DecliningCGPA (2 consecutive semester drops),
  CriticalSkillGap ((Required - Current) > 20)
]

// 2. Opportunity & Skill Match Scoring
computeMatchScore(studentSkills, requiredSkills) => 
  Math.round((matchedSkills.length / requiredSkills.length) * 100)

// 3. Automated Personalized Recommendations
generateRecommendations(studentProfile) => 
  Domain-specific career & course advice tailored to highest & lowest subject scores
```

---

## 📂 Project Directory Structure

```text
internsetu2/
├── public/
│   └── favicon.svg              # Application favicon
├── src/
│   ├── assets/                  # Static assets and media
│   ├── components/
│   │   └── layout/
│   │       ├── DashboardLayout.jsx  # Main portal wrapper layout
│   │       ├── Header.jsx           # Top header with global search & institute emblem
│   │       └── Sidebar.jsx          # Collapsible navigation sidebar
│   ├── context/
│   │   └── StudentContext.jsx   # Global student provider with persistence
│   ├── data/
│   │   ├── allStudentsDb.js     # Multi-program institute student database
│   │   └── mockDb.js            # Initial database schema and seed data
│   ├── pages/
│   │   ├── AcademicPerformance/ # In-depth academic performance analytics
│   │   │   ├── AcademicInsights.jsx
│   │   │   ├── AcademicSummaryCards.jsx
│   │   │   ├── ClassComparison.jsx
│   │   │   ├── CompareStudentModal.jsx
│   │   │   ├── PerformanceTrendChart.jsx
│   │   │   └── index.jsx
│   │   ├── Dashboard.jsx        # Institute Course Directory & Overview
│   │   ├── Mentors/             # Industry mentor directory & assignment
│   │   │   └── index.jsx
│   │   ├── SkillsGap/           # Skill diagnostics & industry benchmarking
│   │   │   └── index.jsx
│   │   └── StudentProfile.jsx   # Full 360° individual student profile
│   ├── services/
│   │   └── storageService.js    # LocalStorage CRUD & business logic service
│   ├── utils/
│   │   └── reportGenerator.js   # PDF / Text academic summary generator
│   ├── App.css                  # Global application styling
│   ├── App.jsx                  # Main routes declaration
│   ├── index.css                # Base typography and CSS resets
│   └── main.jsx                 # React root entry point
├── package.json                 # Project dependencies and build scripts
├── vite.config.js               # Vite bundler configuration
└── README.md                    # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/internsetu2.git
   cd internsetu2
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open your browser and navigate to:
   ```text
   http://localhost:5173
   ```

### Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR) |
| `npm run build` | Compiles and bundles production-optimized assets into `/dist` |
| `npm run preview` | Locally previews the production build |
| `npm run lint` | Runs ESLint to verify code quality and style consistency |

---

## 💾 Data Layer & Persistence Model

All application data is securely initialized and persisted in browser `LocalStorage` under the key:

```text
sih_student_portal_db
```

The data structure includes:
- **`studentProfile`**: Active student metadata, semester trends, subjects, and digital portfolio.
- **`mentors`**: Directory of industry professionals with domains and ratings.
- **`opportunities`**: Internship and industry project postings with required skill sets.
- **`events`**: Technical hackathons, workshops, and recruitment webinars.
- **`userState`**: Dynamic session data including `mentorAssignments`, `mentorBookings`, `notifications`, and `assignmentEmails`.

> 💡 **Tip:** To reset all mock data back to factory defaults at any time, run `localStorage.clear()` in your browser console and refresh the page.

---

## 🔮 Roadmap & Future Extensions

- [ ] **Backend Integration**: Plug-and-play RESTful / GraphQL API endpoints using Node.js/Express or FastAPI.
- [ ] **Authentication & RBAC**: Role-Based Access Control distinguishing Student, Faculty/Dean, and Industry Mentor logins.
- [ ] **Live Video Mentorship**: WebRTC-based 1-on-1 virtual mentoring sessions.
- [ ] **Real-Time Notification Engine**: Push notifications and SMTP email delivery for mentor assignment alerts.
- [ ] **Automated Resume Parsing**: Extracting student skills automatically from uploaded PDF resumes.

---

## 📄 License

This project is developed for educational and hackathon demonstration purposes under the **MIT License**.

---

<div align="center">
  <sub>Built with ❤️ for <strong>Smart India Hackathon (SIH)</strong> &middot; Empowering the Next Generation of Industry-Ready Engineers</sub>
</div>
