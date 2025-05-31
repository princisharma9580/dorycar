// src/admin/components/Sidebar.jsx
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `block px-4 py-2 rounded hover:bg-blue-100 ${
      pathname === path ? "bg-blue-200 font-semibold" : ""
    }`;

  return (
    <div className="w-64 bg-white h-screen shadow-md p-4 fixed pt-20">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="space-y-2">
        <Link to="/admin/dashboard" className={linkClass("/admin/dashboard")}>
          Dashboard
        </Link>
        <Link to="/admin/rides" className={linkClass("/admin/rides")}>
          Rides
        </Link>
        <Link to="/admin/drivers" className={linkClass("/admin/drivers")}>
          Drivers
        </Link>
        <Link to="/admin/users" className={linkClass("/admin/users")}>
          Users
        </Link>
        <Link to="/admin/payouts" className={linkClass("/admin/payouts")}>
          Payouts
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
