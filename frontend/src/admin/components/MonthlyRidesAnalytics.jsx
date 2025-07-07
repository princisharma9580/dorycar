// import React, { useEffect, useState } from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";
// import adminAuthService from "../services/adminAuthService";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const MonthlyRidesAnalytics = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMonthlyStats = async () => {
//       try {
//         const token = adminAuthService.getToken();
//         const res = await fetch(`${API_BASE_URL}/admin/monthly-ride-stats`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) throw new Error("Failed to fetch monthly stats");
//         const result = await res.json();

//         const formattedData = result?.monthlyStats ?? result; // support both formats
//         setData(formattedData);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMonthlyStats();
//   }, []);

//   if (loading) return <p>Loading chart...</p>;
//   if (error) return <p className="text-red-500">Error: {error}</p>;

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
//       <h3 className="text-xl font-bold text-gray-800 mb-2">
//         Rides Analytics <span className="text-sm font-normal text-gray-500">Monthly comparison</span>
//       </h3>
//       <ResponsiveContainer width="100%" height={350}>
//         <BarChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="completed" stackId="a" fill="#10b981" name="Completed" />
//           <Bar dataKey="pending" stackId="a" fill="#f59e0b" name="Pending" />
//           <Bar dataKey="cancelled" stackId="a" fill="#ef4444" name="Cancelled" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default MonthlyRidesAnalytics;
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Paper, Typography, Box } from "@mui/material";

const staticData = [
  { month: "Jul", completed: 150, pending: 10, cancelled: 10 },
  { month: "Aug", completed: 165, pending: 15, cancelled: 15 },
  { month: "Sep", completed: 155, pending: 20, cancelled: 10 },
  { month: "Oct", completed: 200, pending: 25, cancelled: 25 },
  { month: "Nov", completed: 215, pending: 20, cancelled: 25 },
  { month: "Dec", completed: 225, pending: 25, cancelled: 25 },
];

const MonthlyRidesAnalytics = () => {
  return (
    <Paper elevation={3} sx={{ borderRadius: 3, p: 3, height: "100%" }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Rides Analytics{" "}
        <Typography component="span" variant="body2" color="text.secondary">
          Monthly comparison
        </Typography>
      </Typography>
      <Box height={350}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={staticData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="completed" stackId="a" fill="#10b981" name="Completed" />
            <Bar dataKey="pending" stackId="a" fill="#f59e0b" name="Pending" />
            <Bar dataKey="cancelled" stackId="a" fill="#ef4444" name="Cancelled" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default MonthlyRidesAnalytics;
