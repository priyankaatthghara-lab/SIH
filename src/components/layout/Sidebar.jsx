import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, TrendingUp, BookOpen, Target,
  Users, Zap, Calendar, Bell, ChevronLeft, ChevronRight
} from "lucide-react";

const navItems = [
  { path: "/",                      label: "Dashboard",           icon: LayoutDashboard },
  { path: "/academic-performance",  label: "Academic Performance",icon: TrendingUp },
 
  { path: "/skills",                label: "Skills & Skill Gap",  icon: Target },
  { path: "/mentors",               label: "Mentors",             icon: Users },
  
 
 
];

const Sidebar = ({ collapsed, onToggle }) => {
  return (
    <aside style={{
      ...s.sidebar,
      width: collapsed ? "72px" : "260px",
    }}>

      {/* ── Logo area ── */}
      <div style={s.logoRow}>
        {!collapsed && (
          <div>
            <p style={s.logoText}>InternSetu</p>
            <p style={s.logoSub}>Academic-Industry Hub</p>
          </div>
        )}
        {/* Toggle button */}
        <button onClick={onToggle} style={{
          ...s.toggleBtn,
          marginLeft: collapsed ? "auto" : "auto",
        }} title={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
          {collapsed
            ? <ChevronRight size={18} color="#9CA3AF" />
            : <ChevronLeft  size={18} color="#9CA3AF" />
          }
        </button>
      </div>

      {/* ── Nav items ── */}
      <nav style={s.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            title={collapsed ? item.label : undefined}
            style={({ isActive }) => ({
              ...s.navItem,
              justifyContent: collapsed ? "center" : "flex-start",
              ...(isActive ? s.activeItem : {}),
            })}
          >
            <item.icon size={20} style={{ flexShrink: 0 }} />
            {!collapsed && <span style={s.label}>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* ── Footer ── */}
      {!collapsed && (
        <div style={s.footer}>
          
          <p style={s.footerText}>Academia–Industry Portal</p>
        </div>
      )}
    </aside>
  );
};

const s = {
  sidebar: {
    backgroundColor: "#111827",
    height: "100vh",
    position: "fixed",
    top: 0, left: 0,
    display: "flex",
    flexDirection: "column",
    transition: "width 0.25s ease",
    overflow: "hidden",
    zIndex: 100,
    flexShrink: 0,
  },
  logoRow: {
    display: "flex",
    alignItems: "center",
    padding: "20px 16px",
    borderBottom: "1px solid #1F2937",
    minHeight: "72px",
    gap: "8px",
  },
  logoText: { color: "#FFFFFF", fontSize: "18px", fontWeight: 700, lineHeight: 1.2 },
  logoSub:  { color: "#6B7280", fontSize: "11px", marginTop: "2px" },
  toggleBtn: {
    background: "#1F2937",
    border: "1px solid #374151",
    borderRadius: "6px",
    width: "28px", height: "28px",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  },
  nav: {
    flex: 1,
    padding: "12px 8px",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    overflowY: "auto",
    overflowX: "hidden",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "11px 12px",
    color: "#9CA3AF",
    fontSize: "13.5px",
    fontWeight: 500,
    borderRadius: "8px",
    transition: "all 0.15s ease",
    whiteSpace: "nowrap",
    textDecoration: "none",
  },
  activeItem: {
    backgroundColor: "#3B82F6",
    color: "#FFFFFF",
  },
  label: { overflow: "hidden", textOverflow: "ellipsis" },
  footer: {
    padding: "16px",
    borderTop: "1px solid #1F2937",
  },
  footerText: { color: "#4B5563", fontSize: "11px", lineHeight: 1.6 },
};

export default Sidebar;
