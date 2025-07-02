import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Paper,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { FaStar, FaChartLine } from "react-icons/fa";
import adminAuthService from "../services/adminAuthService";

// Default Data
const samplePerformers = [
  { name: "Rajesh Kumar", earnings: 15680, rating: 4.9, rides: 156 },
  { name: "Amit Singh", earnings: 14250, rating: 4.8, rides: 142 },
  { name: "Priya Sharma", earnings: 13890, rating: 4.9, rides: 138 },
  { name: "Mohammed Ali", earnings: 13420, rating: 4.7, rides: 134 },
];

const peakHourData = [
  { time: "6 AM", value: 14 },
  { time: "8 AM", value: 45 },
  { time: "10 AM", value: 28 },
  { time: "12 PM", value: 33 },
  { time: "2 PM", value: 29 },
  { time: "4 PM", value: 44 },
  { time: "6 PM", value: 55 },
  { time: "8 PM", value: 32 },
];

const COLORS = {
  Completed: "#10b981",
  Pending: "#facc15", // Yellow
  Cancelled: "#ef4444",
  Accepted: "#3b82f6",
};

const StatusAndPeakHours = () => {
  const [rideData, setRideData] = useState({
    Completed: 0,
    Pending: 0,
    Cancelled: 0,
    Accepted: 0,
  });

  useEffect(() => {
  const fetchRideStats = async () => {
    try {
      const token = adminAuthService.getToken();
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/rides/status-summary`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Ride status data:", data);

      setRideData({
        Completed: data.Completed || 0,
        Pending: data.Pending || 0,
        Cancelled: data.Cancelled || 0,
        Accepted: data.Accepted || 0,
      });
    } catch (error) {
      console.error("Failed to fetch ride status:", error);
    }
  };

  fetchRideStats();
}, []);


  const total = Object.values(rideData).reduce((acc, val) => acc + val, 0);
  const rideStatusData = Object.keys(rideData).map((key) => ({
    name: key,
    value: rideData[key],
    color: COLORS[key],
  }));

  return (
    <Grid container spacing={3} mt={1}>
      {/* Top Performers */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <FaChartLine color="green" />
            <Typography variant="h6" fontWeight="bold">
              Top Performers
            </Typography>
          </Box>

          {samplePerformers.map((p, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              py={1}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ bgcolor: "#d1fae5", color: "#047857" }}>
                  {p.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .toUpperCase()}
                </Avatar>
                <Box>
                  <Typography fontWeight="bold">{p.name}</Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <FaStar size={14} color="gold" />
                    <Typography variant="body2">
                      {p.rating} • {p.rides} rides
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box textAlign="right">
                <Typography fontWeight="bold">₹{p.earnings}</Typography>
                <Typography variant="caption">This month</Typography>
              </Box>
            </Box>
          ))}
        </Paper>
      </Grid>

      {/* Ride Status & Peak Analysis */}
      <Grid item xs={12} md={8} lg={9}>
        <Grid container spacing={2}>
          {/* Donut Chart */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Ride Status Distribution{" "}
                  <Typography variant="caption" color="text.secondary">
                    Last 30 days
                  </Typography>
                </Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={rideStatusData}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      label={false}
                    >
                      {rideStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [`${value} rides`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>

                <Grid container spacing={2} justifyContent="center">
                  {rideStatusData.map((entry) => (
                    <Grid item key={entry.name}>
                      <Typography
                        variant="body2"
                        sx={{ color: entry.color, fontWeight: "bold" }}
                      >
                        ● {entry.name} (
                        {total === 0
                          ? "0"
                          : Math.round((entry.value / total) * 100)}
                        %)
                      </Typography>
                    </Grid>
                  ))}
                </Grid>

                <Grid container spacing={2} justifyContent="center" mt={1}>
                  {rideStatusData.map((entry) => (
                    <Grid item key={entry.name}>
                      <Typography align="center" fontWeight="bold">
                        {entry.value}
                        <br />
                        <Typography variant="body2">{entry.name}</Typography>
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Line Chart */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Peak Hours Analysis{" "}
                  <Typography variant="caption" color="text.secondary">
                    Today
                  </Typography>
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={peakHourData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StatusAndPeakHours;
