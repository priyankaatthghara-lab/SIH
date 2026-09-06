import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { initializeData } from './services/storageService';
import { StudentProvider } from './context/StudentContext';
import DashboardLayout from './components/layout/DashboardLayout';

// Real Pages
import Dashboard from './pages/Dashboard';
import AcademicPerformance from './pages/AcademicPerformance';
import SkillsGap from './pages/SkillsGap';
import Mentors from './pages/Mentors';

// Placeholder Pages (to be replaced one by one)
const Subjects            = () => <div style={{padding:32}}><h2>Subjects — Coming Soon</h2></div>;
const Opportunities       = () => <div style={{padding:32}}><h2>Opportunities — Coming Soon</h2></div>;
const Events              = () => <div style={{padding:32}}><h2>Events — Coming Soon</h2></div>;
const Notifications       = () => <div style={{padding:32}}><h2>Notifications — Coming Soon</h2></div>;

function App() {
  // Seed LocalStorage with mock data on first load
  useEffect(() => {
    initializeData();
  }, []);

  return (
    <BrowserRouter>
      <StudentProvider>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index                        element={<Dashboard />} />
            <Route path="academic-performance"  element={<AcademicPerformance />} />
            <Route path="subjects"              element={<Subjects />} />
            <Route path="skills"               element={<SkillsGap />} />
            <Route path="mentors"              element={<Mentors />} />
            <Route path="opportunities"        element={<Opportunities />} />
            <Route path="events"               element={<Events />} />
            <Route path="notifications"        element={<Notifications />} />
          </Route>
        </Routes>
      </StudentProvider>
    </BrowserRouter>
  );
}

export default App;

