import { Navigate } from "react-router-dom";
import adminAuthService from "../services/adminAuthService"; // or however you're checking token

const PrivateRoute = ({ children }) => {
  const isAuthenticated = adminAuthService.isAuthenticated(); // true/false
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
