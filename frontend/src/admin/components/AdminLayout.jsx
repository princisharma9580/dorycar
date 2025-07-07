// import { useState } from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";

// const AdminLayout = () => {
//   const [collapsed, setCollapsed] = useState(false);

//   const toggleSidebar = () => setCollapsed(!collapsed);

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar collapsed={collapsed} />
//       <div
//         className={`flex-1 flex flex-col transition-margin duration-300 ease-in-out`}
//         style={{ marginLeft: collapsed ? 64 : 256 }} // adjust this to sidebar width in px
//       >
//         <Topbar onToggleSidebar={toggleSidebar} isSidebarCollapsed={collapsed} />
//         <main className="p-6 bg-gray-100 flex-1 overflow-auto">
//           <Outlet context={{ toggleSidebar, collapsed }} />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;



import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <div className="flex h-screen">
      <Sidebar collapsed={!isSidebarOpen} />
      <div className={`flex flex-col flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-16"}`}>
        <Outlet context={{ isSidebarOpen, toggleSidebar }} />
      </div>
    </div>
  );
};

export default AdminLayout;
