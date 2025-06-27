// import { useEffect, useState } from "react";
// import adminAuthService from "../services/adminAuthService";
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const Dashboard = () => {
//   const [loading, setLoading] = useState(true);
//   const [rides, setRides] = useState({});
//   const [users, setUsers] = useState(null);

//   useEffect(() => {
//     const fetchRides = async () => {
//       try {
//         const token = adminAuthService.getToken();
//         const res = await fetch(`${API_BASE_URL}/admin/ride-stats`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) throw new Error("Failed to fetch ride stats");

//         const data = await res.json();
//         setRides(data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching rides:", err.message);
//         setLoading(false);
//       }
//     };

//     fetchRides();
//   }, []);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const token = adminAuthService.getToken();
//         const res = await fetch(`${API_BASE_URL}/admin/user-stats`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) throw new Error("Failed to fetch ride stats");

//         const data = await res.json();
//         setUsers(data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching users:", err.message);
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//         {/* Total Rides card */}
//         <div className="bg-white p-4 rounded shadow text-center">
//           <p className="text-gray-500">Total Rides</p>
//           <p className="text-2xl font-bold">{rides?.totalRides ?? 0}</p>
//         </div>
//         {rides?.statusCounts &&
//           Object.entries(rides.statusCounts).map(([status, count]) => (
//             <div
//               key={status}
//               className="bg-white p-4 rounded shadow text-center"
//             >
//               <p className="text-gray-500">
//                 {status.charAt(0).toUpperCase() + status.slice(1)} Rides
//               </p>
//               <p className="text-2xl font-bold">{count}</p>
//             </div>
//           ))}
//         <div className="bg-white p-4 rounded shadow text-center">
//           <p className="text-gray-500">Registered Users</p>
//           <p className="text-2xl font-bold">{users?.totalUsers ?? 0}</p>
//         </div>
//         <div className="bg-white p-4 rounded shadow text-center">
//           <p className="text-gray-500">Total Transactions</p>
//           <p className="text-2xl font-bold">₹{rides?.totalEarnings ?? 0}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


// import { useEffect, useState } from "react";
// import adminAuthService from "../services/adminAuthService";
// import { FaCarSide, FaUsers, FaMoneyBillWave, FaSpinner } from "react-icons/fa";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const Dashboard = () => {
//   const [loading, setLoading] = useState(true);
//   const [rides, setRides] = useState({});
//   const [users, setUsers] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const token = adminAuthService.getToken();
//         if (!token) throw new Error("Unauthorized");

//         const rideRes = await fetch(`${API_BASE_URL}/admin/ride-stats`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!rideRes.ok) throw new Error("Failed to fetch ride stats");
//         const rideData = await rideRes.json();

//         const userRes = await fetch(`${API_BASE_URL}/admin/user-stats`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!userRes.ok) throw new Error("Failed to fetch user stats");
//         const userData = await userRes.json();

//         setRides(rideData);
//         setUsers(userData);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const chartData = rides.statusCounts
//     ? Object.entries(rides.statusCounts).map(([status, count]) => ({
//         name: status.charAt(0).toUpperCase() + status.slice(1),
//         rides: count,
//       }))
//     : [];

//   return (
//     <div
//       className="min-h-screen p-8 bg-gradient-to-tr from-green-50 to-green-100 font-sans"
//       style={{ fontFamily: "'Inter', sans-serif" }}
//     >
//       <h2 className="text-4xl font-extrabold mb-8 text-gray-900 tracking-wide">
//         Dashboard
//       </h2>

//       {loading ? (
//         <div className="flex justify-center items-center h-48">
//           <FaSpinner className="animate-spin text-green-600 text-6xl" />
//         </div>
//       ) : error ? (
//         <div className="text-red-600 font-semibold text-center py-10 text-lg">
//           {error}
//         </div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
//             {/* Card component */}
//             {[
//               {
//                 label: "Total Rides",
//                 value: rides?.totalRides ?? 0,
//                 icon: FaCarSide,
//                 iconBg: "bg-gradient-to-br from-green-400 to-green-600",
//               },
//               ...(chartData.length
//                 ? chartData.map(({ name, rides }) => ({
//                     label: `${name} Rides`,
//                     value: rides,
//                     icon: FaCarSide,
//                     iconBg: "bg-gradient-to-br from-green-300 to-green-500",
//                   }))
//                 : []),
//               {
//                 label: "Registered Users",
//                 value: users?.totalUsers ?? 0,
//                 icon: FaUsers,
//                 iconBg: "bg-gradient-to-br from-green-400 to-green-600",
//               },
//               {
//                 label: "Total Earnings",
//                 value: `₹${rides?.totalEarnings ?? 0}`,
//                 icon: FaMoneyBillWave,
//                 iconBg: "bg-gradient-to-br from-green-400 to-green-600",
//               },
//             ].map(({ label, value, icon: Icon, iconBg }, i) => (
//               <div
//                 key={i}
//                 className="relative bg-white bg-opacity-70 backdrop-blur-md rounded-2xl shadow-lg border border-green-200 p-6 flex items-center space-x-6 transition-transform hover:scale-[1.03] hover:shadow-2xl cursor-pointer"
//               >
//                 <div
//                   className={`${iconBg} text-white p-4 rounded-full shadow-lg flex items-center justify-center`}
//                   style={{ minWidth: 56, minHeight: 56 }}
//                 >
//                   <Icon className="text-2xl" />
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-green-700 tracking-widest mb-1">
//                     {label.toUpperCase()}
//                   </p>
//                   <p className="text-3xl font-extrabold text-gray-900">{value}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="bg-white bg-opacity-70 backdrop-blur-md rounded-2xl shadow-lg border border-green-200 p-8">
//             <h3 className="text-2xl font-bold mb-6 text-gray-900 tracking-wide">
//               Ride Status Breakdown
//             </h3>
//             {chartData.length > 0 ? (
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={chartData} barCategoryGap="25%">
//                   <XAxis
//                     dataKey="name"
//                     tick={{ fill: "#065f46", fontWeight: "600" }}
//                     axisLine={{ stroke: "#34d399" }}
//                     tickLine={false}
//                     style={{ letterSpacing: 0.5 }}
//                   />
//                   <YAxis
//                     tick={{ fill: "#065f46", fontWeight: "600" }}
//                     tickLine={false}
//                   />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "#d1fae5",
//                       borderRadius: 10,
//                       boxShadow: "0 4px 12px rgba(16,185,129,0.2)",
//                     }}
//                     itemStyle={{ color: "#065f46" }}
//                   />
//                   <Bar
//                     dataKey="rides"
//                     fill="url(#colorRide)"
//                     radius={[8, 8, 0, 0]}
//                     animationDuration={700}
//                     animationEasing="ease-in-out"
//                   />
//                   <defs>
//                     <linearGradient id="colorRide" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
//                       <stop offset="95%" stopColor="#059669" stopOpacity={0.6} />
//                     </linearGradient>
//                   </defs>
//                 </BarChart>
//               </ResponsiveContainer>
//             ) : (
//               <p className="text-green-700 text-center text-lg">
//                 No ride status data available.
//               </p>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Dashboard;




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
import TopPerformers from "../components/TopPerformers";
import StatusAndPeakHours from "../components/StatusAndPeakHours";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [rides, setRides] = useState({});
  const [users, setUsers] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [avgRating, setAvgRating] = useState("N/A");
  const navigate = useNavigate();
  const handleTotalRidesClick = () => {
  navigate("/admin/rides"); 
  };
  //const [revenueStats, setRevenueStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //setError(null);
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
          }),
          //fetch(`${API_BASE_URL}/admin/revenue-stats`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        if (!rideRes.ok) throw new Error("Failed to fetch ride stats");
        if (!userRes.ok) throw new Error("Failed to fetch user stats");
        if (!driverRes.ok) throw new Error("Failed to fetch driver stats");
        //if (!revenueRes.ok) throw new Error("Failed to fetch revenue stats");
        
        const rideData = await rideRes.json();
        const userData = await userRes.json();
        const driverData = await driverRes.json();
        //const revenueData = await revenueRes.json();

        setRides(rideData);
        setUsers(userData);
        setDrivers(driverData);
        //setRevenueStats(revenueData);
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
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        DoryCar Admin Dashboard
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Comprehensive platform analytics and insights
      </Typography>

      <Grid container spacing={3} mt={2}>
        <DashboardCard title="Total Rides" value={rides?.totalRides ?? 0} subtitle="This month" icon={<FaCarSide />} change="+12%" bgColor="#10b981" isPrimary onClick={() => navigate("/admin/rides")}/>
        <DashboardCard title="Total Users" value={users?.totalUsers ?? 0} subtitle="Registered users" icon={<FaUsers />} change="+8%" bgColor="#6b7280" />
        <DashboardCard title="Revenue" value={`₹${rides?.totalEarnings ?? 0}`} subtitle="This month" icon={<FaMoneyBillWave />} change="+24%" bgColor="#6366f1" />
        <DashboardCard title="Completed Rides" value={rides?.statusCounts?.completed ?? 0} subtitle="Success rate: 80%" icon={<FaCheckCircle />} change="+15%" bgColor="#22c55e" />
        <DashboardCard title="Pending Rides" value={rides?.statusCounts?.pending ?? 0} subtitle="Awaiting drivers" icon={<FaClock />} change="-5%" bgColor="#6b7280" />
        <DashboardCard title="Cancelled Rides" value={rides?.statusCounts?.cancelled ?? 0} subtitle="Cancellation rate: 11%" icon={<FaTimesCircle />} change="+3%" bgColor="#ef4444" />
        <DashboardCard title="Avg Rating" value={avgRating} subtitle="Driver rating" icon={<FaStar />} change="+0.2" bgColor="#facc15"/>
        <DashboardCard title="Coverage Area" value={rides?.coverageZones ?? 0} subtitle="Active zones" icon={<FaMapMarkerAlt />} change="+2" bgColor="#10b981" />
        <DashboardCard title="Peak Hour Performance" value={rides?.peakHour ?? "N/A"} subtitle="Highest demand period" icon={<FaClock />} change="+32%" bgColor="#3b82f6" />
        <DashboardCard title="Average Trip Distance" value={`${rides?.avgDistance ?? "N/A"} km`} subtitle="Monthly average" icon={<FaRoute />} change="+8%" bgColor="#10b981" />
        <DashboardCard title="Driver Utilization" value={`${rides?.driverUtilization ?? 0}%`} subtitle="Active drivers ratio" icon={<FaCar />} change="-3%" bgColor="#8b5cf6" />
        <DashboardCard title="Customer Satisfaction" value={`${rides?.customerSatisfaction ?? "N/A"}/5`} subtitle="Average rating" icon={<FaStar />} change="+0.2" bgColor="#facc15" />
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
  <TopPerformers />
</Grid> 

<Grid item xs={12} md={4}>
    <StatusAndPeakHours /> {/* Renders Ride Status Distribution */}
  </Grid>
  



    </Box>
  );
};

export default Dashboard;
















{/*UPDATING*/}
// import { useEffect, useState } from "react";
// import {
//   FaCarSide,
//   FaUsers,
//   FaMoneyBillWave,
//   FaCheckCircle,
//   FaChartBar,
//   FaChartLine,
// } from "react-icons/fa";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   LineChart,
//   Line,
// } from "recharts";
// import adminAuthService from "../services/adminAuthService";
// import CountUp from 'react-countup';
// // import { Tooltip } from 'react-tooltip'; 

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const COLORS = ["#4F46E5", "#2563EB", "#10B981", "#F59E0B", "#EF4444"];

// const Dashboard = () => {
//   const [loading, setLoading] = useState(true);
//   const [rides, setRides] = useState({});
//   const [users, setUsers] = useState(null);
//   const [error, setError] = useState(null);
//   const [chartType, setChartType] = useState("bar");
// const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setError(null);
//         const token = adminAuthService.getToken();
//         if (!token) throw new Error("No token found");

//         const [rideRes, userRes] = await Promise.all([
//           fetch(`${API_BASE_URL}/admin/ride-stats`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           fetch(`${API_BASE_URL}/admin/user-stats`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
          
//         ]);

//         if (!rideRes.ok) throw new Error("Failed to fetch ride stats");
//         if (!userRes.ok) throw new Error("Failed to fetch user stats");

//         const rideData = await rideRes.json();
//         const userData = await userRes.json();

      


//         setRides(rideData);
//         setUsers(userData);
//       } catch (err) {
//         console.error(err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const earningsTrendData = [
//     { month: "Jan", earnings: 5000 },
//     { month: "Feb", earnings: 7000 },
//     { month: "Mar", earnings: 6000 },
//     { month: "Apr", earnings: 8000 },
//     { month: "May", earnings: 7500 },
//     { month: "Jun", earnings: 9000 },
//   ];

//   const monthlyRideData = [
//   { date: "Jan", rides: 500 },
//   { date: "Feb", rides: 600 },
//   { date: "Mar", rides: 700 },
//   { date: "Apr", rides: 800 },
//   { date: "May", rides: 900 },
//   { date: "Jun", rides: 1000 },
//   { date: "Jul", rides: 750 },
//   { date: "Aug", rides: 870 },
//   { date: "Sep", rides: 950 },
//   { date: "Oct", rides: 1200 },
//   { date: "Nov", rides: 980 },
//   { date: "Dec", rides: 1100 },
// ];

// const currentData = [monthlyRideData[currentMonthIndex]];

//   // Pie chart data from API
//   const statusData = rides.statusCounts
//     ? Object.entries(rides.statusCounts).map(([status, value], i) => ({
//         name: status.charAt(0).toUpperCase() + status.slice(1),
//         value,
//         color: COLORS[i % COLORS.length],
//       }))
//     : [];

//   // Loading spinner + message
//   if (loading) {
//     return (
//       <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-indigo-50 via-white to-green-50 font-poppins">
//         <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mb-4"></div>
//         <p className="text-green-700 text-lg font-semibold">Loading dashboard...</p>
//       </div>
//     );
//   }

//   // Error UI
//   if (error) {
//     return (
//       <div className="flex flex-col justify-center items-center h-screen bg-red-50 font-poppins">
//         <p className="text-red-600 font-bold text-xl mb-2">Oops! Something went wrong.</p>
//         <p className="text-red-400">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-8 bg-gradient-to-r from-indigo-50 via-white to-green-50 min-h-screen font-poppins text-gray-900">
//             <h2 className="text-4xl font-extrabold mb-10 tracking-wide text-green-600 drop-shadow-md">
//         Admin Dashboard
//       </h2>

// <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
//   {/* Total Rides */}
//   <div className="flex items-center bg-green-500 shadow-md rounded-xl p-6 text-white hover:shadow-lg hover:shadow-green-700 transition duration-300">
//     <FaCarSide title="Total Rides - All time" className="text-white text-4xl mr-4 cursor-pointer" />
//     <div>
//       <p className="text-sm uppercase tracking-wider font-medium opacity-90">Total Rides</p>
//       <p className="text-3xl font-bold">
//         <CountUp end={rides.totalRides ?? 0} duration={2} separator="," />
//       </p>
//     </div>
//   </div>

//   {/* Registered Users */}
//   <div className="flex items-center bg-white shadow-md rounded-xl p-6 border border-green-300 hover:shadow-lg hover:shadow-green-500 transition duration-300">
//     <FaUsers title="Total Registered Users" className="text-green-600 text-4xl mr-4 cursor-pointer" />
//     <div>
//       <p className="text-sm uppercase tracking-wider text-green-600 font-medium mb-1">Users</p>
//       <p className="text-3xl font-bold text-green-700">
//         <CountUp end={users?.totalUsers ?? 0} duration={2} separator="," />
//       </p>
//     </div>
//   </div>

//   {/* Total Earnings */}
//   <div className="flex items-center bg-white shadow-md rounded-xl p-6 border border-green-300 hover:shadow-lg hover:shadow-green-500 transition duration-300">
//     <FaMoneyBillWave title="Total Transaction Earnings" className="text-green-500 text-4xl mr-4 cursor-pointer" />
//     <div>
//       <p className="text-sm uppercase tracking-wider text-green-600 font-medium mb-1">Transactions</p>
//       <p className="text-3xl font-bold text-green-700">
//         ₹<CountUp end={rides?.totalEarnings ?? 0} duration={2} separator="," />
//       </p>
//     </div>
//   </div>

//   {/* Completed Rides */}
//   <div className="flex items-center bg-white shadow-md rounded-xl p-6 border border-green-300 hover:shadow-lg hover:shadow-green-500 transition duration-300">
//     <FaCheckCircle title="Total Completed Rides" className="text-green-600 text-4xl mr-4 cursor-pointer" />
//     <div>
//       <p className="text-sm uppercase tracking-wider text-green-600 font-medium mb-1">Completed Rides</p>
//       <p className="text-3xl font-bold text-green-700">
//         <CountUp end={rides.statusCounts?.completed ?? 0} duration={2} separator="," />
//       </p>
//     </div>
//   </div>
// </div>

// {/* Charts Section */}
// <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
//   {/* Pie Chart: Ride Status */}
//   <ChartCard title="Ride Status Distribution">
//     {statusData.length > 0 ? (
//       <ResponsiveContainer width="100%" height={300}>
//         <PieChart>
//           <Pie
//             data={statusData}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             outerRadius={100}
//             label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//             labelLine={false}
//           >
//             {statusData.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={entry.color} />
//             ))}
//           </Pie>
//           <Tooltip formatter={(value) => [value, "Rides"]} />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     ) : (
//       <p className="text-center text-gray-500">No data available</p>
//     )}
//   </ChartCard>

//   {/* Line Chart: Monthly Earnings */}
//   <ChartCard title="Monthly Earnings Trend">
//     <ResponsiveContainer width="100%" height={300}>
//       <LineChart data={earningsTrendData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="month" />
//         <YAxis />
//         <Tooltip formatter={(value) => `₹${value}`} />
//         <Line
//           type="monotone"
//           dataKey="earnings"
//           stroke="#F59E0B"
//           strokeWidth={3}
//           dot={{ r: 5 }}
//           activeDot={{ r: 8 }}
//         />
//       </LineChart>
//     </ResponsiveContainer>
//   </ChartCard>
// </div>

// {/* Monthly Rides Chart Section */}
// <div className="max-w-6xl mx-auto mt-10">
//   <div className="flex items-center justify-between mb-4">
//     <h3 className="text-xl font-semibold text-gray-700">Monthly Rides</h3>
//     <div className="flex items-center gap-4">
//       <button
//         onClick={() => setChartType(chartType === "bar" ? "line" : "bar")}
//         className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
//       >
//         {chartType === "bar" ? "Switch to Line" : "Switch to Bar"}
//       </button>
//       <button
//         onClick={() =>
//           setCurrentMonthIndex((prev) => (prev > 0 ? prev - 1 : monthlyRideData.length - 1))
//         }
//         className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
//       >
//         Prev
//       </button>
//       <span className="text-gray-600 font-medium">
//         {monthlyRideData[currentMonthIndex].date}
//       </span>
//       <button
//         onClick={() =>
//           setCurrentMonthIndex((prev) =>
//             prev < monthlyRideData.length - 1 ? prev + 1 : 0
//           )
//         }
//         className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
//       >
//         Next
//       </button>
//     </div>
//   </div>

//   <ChartCard title="">
//     <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-4 shadow-md border border-green-200 transition duration-300 hover:shadow-lg">
//       <ResponsiveContainer width="100%" height={300}>
//         {chartType === "bar" ? (
//           <BarChart data={currentData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Bar
//               dataKey="rides"
//               fill="#10B981"
//               animationDuration={800}
//               radius={[5, 5, 0, 0]}
//             />
//           </BarChart>
//         ) : (
//           <LineChart data={currentData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Line
//               type="monotone"
//               dataKey="rides"
//               stroke="#10B981"
//               strokeWidth={3}
//               activeDot={{ r: 8 }}
//               animationDuration={800}
//             />
//           </LineChart>
//         )}
//       </ResponsiveContainer>
//     </div>
//   </ChartCard>
// </div>
// </div>

//   );
// };

// // Reusable Card component with icon and hover animation
// const Card = ({ icon, iconColor, title, value }) => (
//   <div className="flex items-center bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-default">
//     <div className={`${iconColor} text-5xl mr-5 drop-shadow-md`}>{icon}</div>
//     <div>
//       <p className="text-sm uppercase tracking-widest text-gray-400 font-semibold mb-1">{title}</p>
//       <p className="text-4xl font-extrabold text-gray-800">{value}</p>
//     </div>
//   </div>
// );

// // Reusable Chart card wrapper
// const ChartCard = ({ children, title }) => (
//   <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
//     <h3 className="text-xl font-semibold mb-4 text-gray-700">{title}</h3>
//     {children}
//   </div>
// );

// export default Dashboard;
{/*UPDATING*/}





// import { useEffect, useState } from "react";
// import { FaCarSide, FaUsers, FaMoneyBillWave, FaCheckCircle } from "react-icons/fa";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";
// import adminAuthService from "../services/adminAuthService";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const COLORS = ["#4F46E5", "#2563EB", "#10B981", "#F59E0B", "#EF4444"];

// const Dashboard = () => {
//   const [loading, setLoading] = useState(true);
//   const [rides, setRides] = useState({});
//   const [users, setUsers] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = adminAuthService.getToken();
//         if (!token) throw new Error("No token found");

//         // Fetch ride stats
//         const rideRes = await fetch(`${API_BASE_URL}/admin/ride-stats`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!rideRes.ok) throw new Error("Failed to fetch ride stats");
//         const rideData = await rideRes.json();

//         // Fetch user stats
//         const userRes = await fetch(`${API_BASE_URL}/admin/user-stats`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!userRes.ok) throw new Error("Failed to fetch user stats");
//         const userData = await userRes.json();

//         setRides(rideData);
//         setUsers(userData);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-indigo-600"></div>
//       </div>
//     );
//   }

//   // Prepare data for pie chart
//   const statusData = rides.statusCounts
//     ? Object.entries(rides.statusCounts).map(([status, value], i) => ({
//         name: status.charAt(0).toUpperCase() + status.slice(1),
//         value,
//         color: COLORS[i % COLORS.length],
//       }))
//     : [];

//   return (
//     <div className="p-8 bg-gradient-to-r from-indigo-50 via-white to-green-50 min-h-screen font-sans text-gray-900">
//       <h2 className="text-4xl font-extrabold mb-10 tracking-wide text-indigo-700 drop-shadow-md">
//         Admin Dashboard
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
//         {/* Total Rides */}
//         <div className="flex items-center bg-white shadow-lg rounded-lg p-6 border border-indigo-200 hover:shadow-indigo-400 transition-shadow duration-300">
//           <FaCarSide className="text-indigo-600 text-4xl mr-4" />
//           <div>
//             <p className="text-sm uppercase tracking-widest text-indigo-500 font-semibold mb-1">
//               Total Rides
//             </p>
//             <p className="text-3xl font-bold text-indigo-700">{rides.totalRides ?? 0}</p>
//           </div>
//         </div>

//         {/* Registered Users */}
//         <div className="flex items-center bg-white shadow-lg rounded-lg p-6 border border-green-200 hover:shadow-green-400 transition-shadow duration-300">
//           <FaUsers className="text-green-600 text-4xl mr-4" />
//           <div>
//             <p className="text-sm uppercase tracking-widest text-green-500 font-semibold mb-1">
//               Registered Users
//             </p>
//             <p className="text-3xl font-bold text-green-700">{users?.totalUsers ?? 0}</p>
//           </div>
//         </div>

//         {/* Total Earnings */}
//         <div className="flex items-center bg-white shadow-lg rounded-lg p-6 border border-yellow-300 hover:shadow-yellow-400 transition-shadow duration-300">
//           <FaMoneyBillWave className="text-yellow-500 text-4xl mr-4" />
//           <div>
//             <p className="text-sm uppercase tracking-widest text-yellow-500 font-semibold mb-1">
//               Total Earnings
//             </p>
//             <p className="text-3xl font-bold text-yellow-600">
//               ₹{rides.totalEarnings ?? 0}
//             </p>
//           </div>
//         </div>

//         {/* Confirmed Rides */}
//         <div className="flex items-center bg-white shadow-lg rounded-lg p-6 border border-teal-300 hover:shadow-teal-400 transition-shadow duration-300">
//           <FaCheckCircle className="text-teal-600 text-4xl mr-4" />
//           <div>
//             <p className="text-sm uppercase tracking-widest text-teal-500 font-semibold mb-1">
//               completed Rides
//             </p>
//             <p className="text-3xl font-bold text-teal-700">
//               {rides.statusCounts?.completed ?? 0}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Pie chart for ride status */}
//       <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 max-w-4xl mx-auto">
//         <h3 className="text-xl font-semibold mb-4 text-gray-700">
//           Ride Status Distribution
//         </h3>
//         {statusData.length > 0 ? (
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={statusData}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={100}
//                 label={({ name, percent }) =>
//                   `${name}: ${(percent * 100).toFixed(0)}%`
//                 }
//                 labelLine={false}
//               >
//                 {statusData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Pie>
//               <Tooltip formatter={(value) => [value, "Rides"]} />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         ) : (
//           <p className="text-center text-gray-500">No data available</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


