import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  Typography,
  Avatar,
  Box,
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
  Pending: "#facc15",
  Cancelled: "#ef4444",
  Accepted: "#3b82f6",
  Started: "#6366f1", 
};

const StatusAndPeakHours = () => {
  const [rideData, setRideData] = useState({
    Completed: 0,
    Pending: 0,
    Cancelled: 0,
    Accepted: 0,
    Started: 0,
  });

  useEffect(() => {
    const fetchRideStats = async () => {
      try {
        const token = adminAuthService.getToken();
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/admin/ride-stats`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await response.json();

        setRideData({
          Completed: data?.statusCounts?.completed || 0,
          Pending: data?.statusCounts?.pending || 0,
          Cancelled: data?.statusCounts?.cancelled || 0,
          Accepted: data?.statusCounts?.accepted || 0,
          Started: data?.statusCounts?.started || 0, 
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
    <Box sx={{ mt: 2, px: 2 }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={12} md={4}>
          <Card sx={{ borderRadius: 3, p: 3, height: "100%", minHeight: 330 }}>
            <Typography variant="h6" fontWeight="bold" mb={1}>
              Ride Status Distribution{" "}
              <Typography component="span" variant="caption" color="text.secondary">
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
                >
                  {rideStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} rides`, name]} />
              </PieChart>
            </ResponsiveContainer>

            <Grid container spacing={1} justifyContent="center">
              {rideStatusData.map((entry) => (
                <Grid item key={entry.name}>
                  <Typography variant="body2" sx={{ color: entry.color, fontWeight: "bold" }}>
                    ● {entry.name} ({total === 0 ? "0" : Math.round((entry.value / total) * 100)}%)
                  </Typography>
                </Grid>
              ))}
            </Grid>

            <Grid container spacing={1} justifyContent="center" mt={1}>
              {rideStatusData.map((entry) => (
                <Grid item key={entry.name}>
                  <Typography align="center" fontWeight="bold">
                    {entry.value}
                    <br />
                    <Typography variant="body2" component="span">
                      {entry.name}
                    </Typography>
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <Card sx={{ borderRadius: 3, p: 3, height: "100%", minHeight: 330 }}>
            <Typography variant="h6" fontWeight="bold" mb={1}>
              Peak Hours Analysis{" "}
              <Typography component="span" variant="caption" color="text.secondary">
                Today
              </Typography>
            </Typography>
            <ResponsiveContainer width="100%" height={230}>
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
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <Card sx={{ borderRadius: 3, p: 3, height: "100%", minHeight: 330 }}>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <FaChartLine color="#22c55e" size={20} />
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
                  <Typography fontWeight="bold">₹{p.earnings.toLocaleString()}</Typography>
                  <Typography variant="caption">This month</Typography>
                </Box>
              </Box>
            ))}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StatusAndPeakHours;
