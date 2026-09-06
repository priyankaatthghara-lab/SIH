import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header  from "./Header";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const sidebarWidth = collapsed ? "72px" : "260px";

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      {/* Shift main area when sidebar expands / collapses */}
      <div style={{
        flex: 1,
        marginLeft: sidebarWidth,
        transition: "margin-left 0.25s ease",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#F9FAFB"
      }}>
        <Header />
        <main style={{ padding: "24px 32px", flex: 1, overflowY: "auto" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
