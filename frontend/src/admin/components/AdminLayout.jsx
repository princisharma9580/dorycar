import { Outlet } from "react-router-dom";

const AdminLayout = () => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1">
      <Topbar />
      <div className="p-6">
        <Outlet />   {/*  Required to render child routes */}
      </div>
    </div>
  </div>
);

export default AdminLayout;
