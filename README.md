# InternSetu Academic-Industry Portal

InternSetu is a Smart India Hackathon project for helping academic institutions understand student performance, identify skill gaps, and connect students with suitable industry mentors.

The current application is a frontend prototype built with React and Vite. It uses browser LocalStorage as its data store and does not require a backend.

## Features

- Student dashboard with academic health, CGPA, attendance, readiness, subjects, and recommendations.
- Academic Performance section with semester trends, subject analysis, comparisons, and insights.
- Skills & Skill Gap Analysis showing current proficiency against industry requirements.
- Mentor directory with mentor expertise, company, experience, ratings, and booking slots.
- Institution-side mentor assignment for a specific student's skill gap.
- Duplicate assignment protection for the same student and skill gap.
- Assignment status shown on both the Skills and Mentors pages.
- Local email-outbox record created when a mentor is assigned.
- Header search for finding students by skill, skill category, name, or student ID.
- Selecting a search result opens that student's dashboard profile.
- Student selection persists between sessions.

## Technology

- React 19
- Vite
- React Router
- Recharts
- Lucide React
- Browser LocalStorage

## Getting Started

### Requirements

- Node.js 18 or newer
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open the URL shown by Vite, usually:

```text
http://localhost:5173
```

### Create a production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Project Structure

```text
src/
├── components/
│   └── layout/              Shared sidebar, header, and page layout
├── context/
│   └── StudentContext.jsx   Active student selection and persistence
├── data/
│   ├── allStudentsDb.js     Student selector database
│   └── mockDb.js            Initial LocalStorage seed data
├── pages/
│   ├── AcademicPerformance/ Academic analysis pages
│   ├── Mentors/             Mentor browsing, booking, and assignment
│   ├── SkillsGap/           Skill proficiency and gap analysis
│   └── Dashboard.jsx        Student overview dashboard
├── services/
│   └── storageService.js    LocalStorage CRUD and application actions
└── utils/                   Academic calculations and report helpers
```

## LocalStorage Data

The application stores its database under:

```text
sih_student_portal_db
```

The stored object contains:

- `studentProfile`
- `mentors`
- `opportunities`
- `events`
- `userState`

Dynamic user state includes mentor bookings, mentor assignments, notifications, event registrations, applied opportunities, and assignment email records.

To reset the local demo data, clear the `sih_student_portal_db` key from the browser's LocalStorage and reload the application.

## Mentor Assignment Flow

1. Open **Skills & Skill Gap** or **Mentors**.
2. Select a student using the student selector or header skill search.
3. From the Mentors page, choose **Assign to student**.
4. Select the skill gap and optionally add a note.
5. Confirm the assignment.
6. The assignment is saved in LocalStorage.
7. The student and skill show an assigned status.
8. An email notification is recorded in the local assignment email outbox.

## Scope Notes

- The Dashboard and Academic Performance sections remain separate from the mentor-assignment enhancement.
- Mock student and mentor data is provided for demonstration.
- This version is intended as a frontend prototype; authentication, server-side persistence, and real email delivery are future integrations.
