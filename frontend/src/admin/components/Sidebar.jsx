import { Link, useLocation, useNavigate } from "react-router-dom";
import adminAuthService from "../services/adminAuthService";
import {
  FaTachometerAlt,
  FaCar,
  FaUserTie,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ collapsed }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    adminAuthService.logout();
    navigate("/admin/login");
  };

  const linkClass = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
      pathname === path
        ? "bg-green-200 text-green-900 font-semibold border-l-4 border-green-600"
        : "text-gray-700 hover:bg-green-50 hover:text-green-700"
    } ${collapsed ? "justify-center px-0" : ""}`;

const icons = {
    dashboard: <FaTachometerAlt className="text-xl" />,
    rides: <FaCar className="text-xl" />,
    drivers: <FaUserTie className="text-xl" />,
    users: <FaUsers className="text-xl" />,
    logout: <FaSignOutAlt className="text-xl" />,
  };

  return (
    <div
      className={`bg-white shadow-lg h-screen fixed top-0 left-0 pt-6 flex flex-col justify-between transition-all duration-300 ease-in-out z-40
        ${collapsed ? "w-16" : "w-64"}`}
    >
      {/* Top section */}
      <div>
        <div className="flex items-center justify-center mb-8">
          {!collapsed ? (
            <img
              alt="Dorycar Logo"
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dorycar%20Logo.jpg-SGfzcdQoinHDU12n2Hb0Mqcqz0k8Ja.jpeg"
              className="h-10 mx-auto"
            />
          ) : (
            <img
              alt="Logo"
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dorycar%20Logo.jpg-SGfzcdQoinHDU12n2Hb0Mqcqz0k8Ja.jpeg"
              className="h-8 mx-auto rounded-full"
            />
          )}
        </div>

        <nav className="space-y-2">
          <Link to="/admin/dashboard" className={linkClass("/admin/dashboard")}>
            <span className="text-xl">{icons.dashboard}</span>
            {!collapsed && <span>Dashboard</span>}
          </Link>
          <Link to="/admin/rides" className={linkClass("/admin/rides")}>
            <span className="text-xl">{icons.rides}</span>
            {!collapsed && <span>Rides</span>}
          </Link>
          <Link to="/admin/drivers" className={linkClass("/admin/drivers")}>
            <span className="text-xl">{icons.drivers}</span>
            {!collapsed && <span>Drivers</span>}
          </Link>
          <Link to="/admin/users" className={linkClass("/admin/users")}>
            <span className="text-xl">{icons.users}</span>
            {!collapsed && <span>Users</span>}
          </Link>
        </nav>
      </div>

      {/* Logout button */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600 transition duration-200 ${
            collapsed ? "justify-center px-0" : "justify-start"
          }`}
        >
          {icons.logout}
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
