import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div className="flex min-h-screen">
      <Sidebar collapsed={collapsed} />
      <div
        className={`flex-1 flex flex-col transition-margin duration-300 ease-in-out`}
        style={{ marginLeft: collapsed ? 64 : 256 }} // adjust this to sidebar width in px
      >
        <Topbar onToggleSidebar={toggleSidebar} isSidebarCollapsed={collapsed} />
        <main className="p-6 bg-gray-100 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
