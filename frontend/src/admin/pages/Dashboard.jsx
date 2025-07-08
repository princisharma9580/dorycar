import { useEffect, useState } from "react";
import {
  FaCarSide,
  FaUsers,
  FaMoneyBillWave,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaStar,
  FaRoute,
  FaCar,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import adminAuthService from "../services/adminAuthService";
import DashboardCard from "../components/DashboardCard";
import AnalyticsSection from "../components/AnalyticsSection";
import GeographicInsights from "../components/GeographicInsights";
import { useNavigate } from "react-router-dom";
import StatusAndPeakHours from "../components/StatusAndPeakHours";
import RevenueTrend from "../components/RevenueTrend";
import RecentActivity from "../components/RecentActivity";
import MonthlyRidesAnalytics from "../components/MonthlyRidesAnalytics";
import { useOutletContext } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [rides, setRides] = useState({});
  const [users, setUsers] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [avgRating, setAvgRating] = useState("N/A");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { toggleSidebar } = useOutletContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = adminAuthService.getToken();
        if (!token) throw new Error("No token found");

        const [rideRes, userRes, driverRes] = await Promise.all([
          fetch(`${API_BASE_URL}/admin/ride-stats`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE_URL}/admin/user-stats`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${API_BASE_URL}/admin/drivers`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        if (!rideRes.ok || !userRes.ok || !driverRes.ok) {
          throw new Error("Failed to fetch one or more resources");
        }

        const rideData = await rideRes.json();
        const userData = await userRes.json();
        const driverData = await driverRes.json();

        setRides(rideData);
        setUsers(userData);
        setDrivers(driverData);

        const validRatings = driverData.map(d => d.averageRating).filter(r => typeof r === "number");
        const avg = validRatings.length > 0 ? (validRatings.reduce((a, b) => a + b, 0) / validRatings.length).toFixed(1) : "N/A";
        setAvgRating(avg);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress color="success" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={10}>
        <Typography color="error" variant="h6">
          Oops! Something went wrong.
        </Typography>
        <Typography>{error}</Typography>
      </Box>
    );
  }

  return (
    <div className="p-6">
    <Box>
    <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        mb={2}
      >
        {/* Left: Menu + Heading */}
        <Box display="flex" alignItems="center" mb={{ xs: 2, md: 0 }}>
          <button
            onClick={toggleSidebar}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: "8px",
              backgroundColor: "#f4f4f5",
              marginRight: 12,
              border: "none",
              cursor: "pointer"
            }}
            aria-label="Toggle Sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              style={{ width: 20, height: 20, color: "#000" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Box>
            <Typography variant="h4" fontWeight="bold">
              DoryCar Admin Dashboard
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Comprehensive platform analytics and insights
            </Typography>
          </Box>
        </Box>

        {/* Right: System Healthy + Last Updated */}
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            sx={{
              backgroundColor: "#ecfdf5",
              color: "#10b981",
              px: 2,
              py: 1,
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              style={{ width: 18, height: 18, marginRight: 6 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            System Healthy
          </Box>

          <Box
            sx={{
              backgroundColor: "#fff",
              border: "1px solid #e5e7eb",
              px: 2,
              py: 1,
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: "400",
              color: "#374151",
            }}
          >
            Last updated: {new Date().toLocaleString()}
          </Box>
        </Box>
      </Box>



      <Grid container spacing={3} justifyContent="center">
  <Grid item xs={12} sm={6} md={4}>
    <DashboardCard
      title="Total Rides"
      value={rides?.totalRides ?? 0}
      subtitle="This month"
      icon={<FaCarSide size={20} />}
      change="+12%"
      bgColor="#10b981"
      isPrimary
      onClick={() => navigate("/admin/rides")}
    />
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <DashboardCard
      title="Total Users"
      value={users?.totalUsers ?? 0}
      subtitle="Registered users"
      icon={<FaUsers size={20} />}
      change="+8%"
      onClick={() => navigate("/admin/users")}
    />
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <DashboardCard
      title="Completed Rides"
      value={rides?.statusCounts?.completed ?? 0}
      subtitle="Success rate: 80%"
      icon={<FaCheckCircle size={20} />}
      change="+15%"
      bgColor="#22c55e"
      onClick={() => navigate("/admin/rides")}
    />
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <DashboardCard
      title="Pending Rides"
      value={rides?.statusCounts?.pending ?? 0}
      subtitle="Awaiting drivers"
      icon={<FaClock size={20} />}
      change="-5%"
      bgColor="#6b7280"
      onClick={() => navigate("/admin/rides")}
    />
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <DashboardCard
      title="Cancelled Rides"
      value={rides?.statusCounts?.cancelled ?? 0}
      subtitle="Cancellation rate: 11%"
      icon={<FaTimesCircle size={20} />}
      change="+3%"
      bgColor="#ef4444"
      onClick={() => navigate("/admin/rides")}
    />
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <DashboardCard
      title="Avg Rating"
      value={avgRating}
      subtitle="Driver rating"
      icon={<FaStar size={20} />}
      change="+0.2"
      bgColor="#facc15"
      onClick={() => navigate("/admin/drivers")}
    />
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <DashboardCard
      title="Coverage Area"
      value={rides?.coverageZones ?? 0}
      subtitle="Active zones"
      icon={<FaMapMarkerAlt size={20} />}
      change="+2"
      bgColor="#10b981"
      onClick={() => navigate("/admin/Dashboard")}
    />
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <DashboardCard
      title="Peak Hour Performance"
      value={rides?.peakHour ?? "N/A"}
      subtitle="Highest demand period"
      icon={<FaClock size={20} />}
      change="+32%"
      bgColor="#3b82f6"
      onClick={() => navigate("/admin/Dashboard")}
    />
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <DashboardCard
      title="Avg Trip Distance"
      value={`${rides?.avgDistance ?? "N/A"} km`}
      subtitle="Monthly average"
      icon={<FaRoute size={20} />}
      change="+8%"
      bgColor="#10b981"
      onClick={() => navigate("/admin/Dashboard")}
    />
  </Grid>
</Grid>



 <GeographicInsights
   popularRoutes={[
    { name: "Airport → City Center", rides: 145, avgFare: 150, revenue: 21750 },
    { name: "Business District → Mall", rides: 128, avgFare: 150, revenue: 19200 },
    { name: "University → Tech Park", rides: 98, avgFare: 150, revenue: 14700 },
    { name: "Railway Station → Hotel Zone", rides: 87, avgFare: 150, revenue: 13050 },
    { name: "Residential Area → Shopping Center", rides: 76, avgFare: 150, revenue: 11400 },
  ]}
   zonePerformance={[
     { name: "Zone A - Central", rides: 487, revenue: 73050, growth: 15 },
     { name: "Zone B - North", rides: 356, revenue: 53400, growth: 8 },
     { name: "Zone C - South", rides: 298, revenue: 44700, growth: 12 },
     { name: "Zone D - East", rides: 234, revenue: 35100, growth: 5 },
     { name: "Zone E - West", rides: 189, revenue: 28350, growth: 18 },
   ]}
   stats={{
     revenueGrowth: 24,
     activeUsers: 8,
     totalUsers: 11,
     userRate: 72,
     activeDrivers: 6,
     avgDistance: 12.5,
   }}
 />
<Grid container spacing={3} mt={1}>
  <Grid item xs={12}>
    <StatusAndPeakHours />
  </Grid>
</Grid>

<Grid container spacing={3} mt={1}>
  <Grid item xs={12} md={8}>
    <MonthlyRidesAnalytics />
  </Grid>
  <Grid item xs={12} md={4}>
    <RecentActivity />
  </Grid>
</Grid>

      
    </Box>
    </div>
  );
};

export default Dashboard;
