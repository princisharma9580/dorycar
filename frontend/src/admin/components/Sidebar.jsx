// import { Link, useLocation, useNavigate } from "react-router-dom";
// import adminAuthService from "../services/adminAuthService";
// import {
//   FaTachometerAlt,
//   FaCar,
//   FaUserTie,
//   FaUsers,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import { FaBell, FaCogs, FaSearch, FaShieldAlt } from "react-icons/fa";

// const Sidebar = ({ collapsed }) => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     adminAuthService.logout();
//     navigate("/admin/login");
//   };

//   const linkClass = (path) =>
//     `flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${
//       pathname === path
//         ? "bg-green-200 text-green-900 font-semibold border-l-4 border-green-600"
//         : "text-gray-700 hover:bg-green-50 hover:text-green-700"
//     } ${collapsed ? "justify-center px-0" : ""}`;

// const icons = {
//     dashboard: <FaTachometerAlt className="text-xl" />,
//     rides: <FaCar className="text-xl" />,
//     drivers: <FaUserTie className="text-xl" />,
//     users: <FaUsers className="text-xl" />,
//     logout: <FaSignOutAlt className="text-xl" />,
//   };

//   return (
//     <div
//       className={`bg-white shadow-lg h-screen fixed top-0 left-0 pt-6 flex flex-col justify-between transition-all duration-300 ease-in-out z-40
//         ${collapsed ? "w-16" : "w-64"}`}
//     >
//       {/* Top section */}
//       <div>
//         <div className="flex items-center justify-center mb-8">
//           {!collapsed ? (
//             <img
//               alt="Dorycar Logo"
//               src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dorycar%20Logo.jpg-SGfzcdQoinHDU12n2Hb0Mqcqz0k8Ja.jpeg"
//               className="h-10 mx-auto"
//             />
//           ) : (
//             <img
//               alt="Logo"
//               src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dorycar%20Logo.jpg-SGfzcdQoinHDU12n2Hb0Mqcqz0k8Ja.jpeg"
//               className="h-8 mx-auto rounded-full"
//             />
//           )}
//         </div>

//         {/* Core Operations */}
// {!collapsed && (
//   <p className="text-xs text-gray-400 px-4 pb-1">Core Operations</p>
// )}
// <nav className="space-y-2 pb-1">
//   <Link to="/admin/dashboard" className={linkClass("/admin/dashboard")}>
//     <span className="text-xl">{icons.dashboard}</span>
//     {!collapsed && <span>Dashboard</span>}
//   </Link>
//   <Link to="/admin/rides" className={linkClass("/admin/rides")}>
//     <span className="text-xl">{icons.rides}</span>
//     {!collapsed && <span>Rides</span>}
//   </Link>
//   <Link to="/admin/drivers" className={linkClass("/admin/drivers")}>
//     <span className="text-xl">{icons.drivers}</span>
//     {!collapsed && <span>Drivers</span>}
//   </Link>
//   <Link to="/admin/users" className={linkClass("/admin/users")}>
//     <span className="text-xl">{icons.users}</span>
//     {!collapsed && <span>Users</span>}
//   </Link>
// </nav>

//       </div>

      


// {/* Growth & Engagement */}
// <p className="text-xs text-gray-400 px-4 pt-4">Growth & Engagement</p>
// <ul className="space-y-1">
//   <li className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md cursor-default">
//     <FaTachometerAlt className="text-sm" />
//     <span>Reports & Analytics</span>
//   </li>
//   <li className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md cursor-default">
//     <FaUsers className="text-sm" />
//     <span>Customer Support</span>
//   </li>
//   <li className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md cursor-default">
//     <FaBell className="text-sm" />
//     <span>Notifications</span>
//   </li>
// </ul>

// {/* Setup & Customization */}
// <p className="text-xs text-gray-400 px-4 pt-4">Setup & Customization</p>
// <ul className="space-y-1">
//   <li className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md cursor-default">
//     <FaCogs className="text-sm" />
//     <span>Site Configuration</span>
//   </li>
//   <li className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md cursor-default">
//     <FaSearch className="text-sm" />
//     <span>SEO & Meta Settings</span>
//   </li>
//   <li className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md cursor-default">
//     <FaShieldAlt className="text-sm" />
//     <span>Access Logs</span>
//   </li>
// </ul>





//       {/* Logout button */}
//       <div className="p-4">
//         <button
//           onClick={handleLogout}
//           className={`w-full flex items-center gap-3 px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600 transition duration-200 ${
//             collapsed ? "justify-center px-0" : "justify-start"
//           }`}
//         >
//           {icons.logout}
//           {!collapsed && <span>Logout</span>}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


   


import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCar,
  FaUsers,
  FaSignOutAlt,
  FaBell,
  FaCogs,
  FaSearch,
  FaShieldAlt,
  FaCog,
} from "react-icons/fa";
import adminAuthService from "../services/adminAuthService";

const Sidebar = ({ collapsed }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    adminAuthService.logout();
    navigate("/admin/login");
  };

  const linkClass = (path) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-md transition-all duration-200 text-sm ${
      pathname === path
        ? "bg-green-100 text-green-900 font-medium"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-white shadow-md flex flex-col justify-between z-50 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } overflow-hidden`}
    >
      {/* Header */}
      <div>
        <div className="px-4 py-4 border-b flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-full">
            <FaCar className="text-green-600 text-base" />
          </div>
          {!collapsed && (
            <div>
              <p className="text-base font-semibold text-green-600">DoryCar</p>
              <p className="text-xs text-gray-500">Admin Portal</p>
            </div>
          )}
        </div>

        {/* Core Operations */}
        {!collapsed && (
          <div className="mt-3 px-4 text-xs text-gray-400">Core Operations</div>
        )}
        <nav className="mt-1 space-y-0.5">
          <Link to="/admin/dashboard" className={linkClass("/admin/dashboard")}>
            <FaTachometerAlt className="text-sm" />
            {!collapsed && <span>Dashboard</span>}
          </Link>
          <Link to="/admin/users" className={linkClass("/admin/users")}>
            <FaUsers className="text-sm" />
            {!collapsed && <span>User Management</span>}
          </Link>
          <Link to="/admin/vehicles" className={linkClass("/admin/vehicles")}>
            <FaCar className="text-sm" />
            {!collapsed && <span>Vehicle Listings</span>}
          </Link>

          <Link to="/admin/rides" className={linkClass("#")}>
            <FaTachometerAlt className="text-sm" />
            {!collapsed && <span>Bookings</span>}
          </Link>
          {/* <Link to="#" className={linkClass("#")}>
            <FaUsers className="text-sm" />
            {!collapsed && <span>Payments & Refunds</span>}
          </Link> */}
        </nav>

        {/* Growth & Engagement */}
        {!collapsed && (
          <div className="mt-4 px-4 text-xs text-gray-400">Growth & Engagement</div>
        )}
        <nav className="mt-1 space-y-0.5">
          <Link to="#" className={linkClass("#")}>
            <FaTachometerAlt className="text-sm" />
            {!collapsed && <span>Reports & Analytics</span>}
          </Link>
          <Link to="#" className={linkClass("#")}>
            <FaUsers className="text-sm" />
            {!collapsed && <span>Customer Support</span>}
          </Link>
          <Link to="#" className={linkClass("#")}>
            <FaBell className="text-sm" />
            {!collapsed && <span>Notifications</span>}
          </Link>
        </nav>

        {/* Setup & Customization */}
        {!collapsed && (
          <div className="mt-4 px-4 text-xs text-gray-400">Setup & Customization</div>
        )}
        <nav className="mt-1 space-y-0.5">
          {/* <Link to="#" className={linkClass("#")}>
            <FaCogs className="text-sm" />
            {!collapsed && <span>Site Configuration</span>}
          </Link>
          <Link to="#" className={linkClass("#")}>
            <FaSearch className="text-sm" />
            {!collapsed && <span>SEO & Meta Settings</span>}
          </Link> */}
          <Link to="#" className={linkClass("#")}>
            <FaShieldAlt className="text-sm" />
            {!collapsed && <span>Access Logs</span>}
          </Link>
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="px-4 py-3 border-t pt-4">
        <ul className="space-y-1">
          <li className="flex items-center gap-3 px-2 py-2 text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
            <FaCog className="text-sm" />
            {!collapsed && <span>Settings</span>}
          </li>
        </ul>

        <ul className="space-y-1 mt-0">
          <li>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-2 py-2 rounded-md text-red-600 hover:bg-red-100 hover:text-red-700 transition duration-200"
            >
              <FaSignOutAlt className="text-sm" />
              {!collapsed && <span>Logout</span>}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

















// import {
//   FaChartBar,
//   FaUserFriends,
//   FaCar,
//   FaClipboardList,
//   FaMoneyCheckAlt,
//   FaChartLine,
//   FaHeadset,
//   FaBell,
//   FaCogs,
//   FaSearch,
//   FaKey,
//   FaSignOutAlt,
// } from "react-icons/fa";

// const Sidebar = ({ activePage, onNavigate }) => {
//   const Section = ({ title }) => (
//     <div className="text-gray-500 uppercase text-xs font-semibold mt-6 mb-2 px-4">
//       {title}
//     </div>
//   );

//   const MenuItem = ({ icon, label, page }) => (
//     <button
//       onClick={() => onNavigate(page)}
//       className={`flex items-center gap-3 py-2.5 px-4 w-full text-left text-sm font-medium rounded-lg transition-colors ${
//         activePage === page
//           ? "bg-green-100 text-green-700"
//           : "text-gray-700 hover:bg-gray-100"
//       }`}
//     >
//       <span className="text-lg">{icon}</span>
//       {label}
//     </button>
//   );

//   return (
//     <div className="w-64 min-h-screen bg-white border-r shadow-sm flex flex-col justify-between">
//       <div>
//         {/* Logo */}
//         <div className="flex items-center gap-2 px-4 py-5">
//           <div className="bg-green-500 rounded-md p-2">
//             <FaCar className="text-white text-lg" />
//           </div>
//           <div>
//             <p className="font-bold text-lg leading-tight">DoryCar</p>
//             <p className="text-sm text-gray-500 -mt-1">Admin Portal</p>
//           </div>
//         </div>

//         {/* Menu */}
//         <Section title="Core Operations" />
//         <MenuItem icon={<FaChartBar />} label="Dashboard" page="dashboard" />
//         <MenuItem icon={<FaUserFriends />} label="User Management" page="users" />
//         <MenuItem icon={<FaCar />} label="Vehicle Listings" page="vehicles" />
//         <MenuItem icon={<FaClipboardList />} label="Bookings" page="bookings" />
//         <MenuItem icon={<FaMoneyCheckAlt />} label="Payments & Refunds" page="payments" />

//         <Section title="Growth & Engagement" />
//         <MenuItem icon={<FaChartLine />} label="Reports & Analytics" page="reports" />
//         <MenuItem icon={<FaHeadset />} label="Customer Support" page="support" />
//         <MenuItem icon={<FaBell />} label="Notifications" page="notifications" />

//         <Section title="Setup & Customization" />
//         <MenuItem icon={<FaCogs />} label="Site Configuration" page="config" />
//         <MenuItem icon={<FaSearch />} label="SEO & Meta Settings" page="seo" />
//         <MenuItem icon={<FaKey />} label="Access Logs" page="logs" />
//       </div>

//       {/* Footer */}
//       <div className="px-4 py-4 border-t">
//         <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600">
//           <FaSignOutAlt className="text-base" />
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
