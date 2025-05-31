// src/admin/components/Topbar.jsx
import adminAuthService from "../services/adminAuthService";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    adminAuthService.logout();
    navigate("/admin/login");
  };

  return (
    <div className="h-16 bg-white flex justify-between items-center px-6 border-b sticky top-0 z-10">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Topbar;
