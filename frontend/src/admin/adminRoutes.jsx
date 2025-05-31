import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Rides from "./pages/rides";
import Drivers from "./pages/drivers";
import Users from "./pages/users";
import Payouts from "./pages/payouts";

const AdminRoutes = () => (
  <Routes>
    <Route path="/admin/login" element={<Login />} />

    <Route
      path="/admin"
      element={
        <PrivateRoute>
          <AdminLayout />
        </PrivateRoute>
      }
    >
      <Route index element={<Navigate to="dashboard" />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="rides" element={<Rides />} />
      <Route path="drivers" element={<Drivers />} />
      <Route path="users" element={<Users />} />
      <Route path="payouts" element={<Payouts />} />
    </Route>
  </Routes>
);

export default AdminRoutes;
