import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const RevenueTrend = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRevenueStats = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await fetch(`${API_BASE_URL}/admin/monthly-stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch monthly stats");
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueStats();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={4}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" mt={2}>
        Error: {error}
      </Typography>
    );
  }

  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
  const avgRevenue = Math.round(totalRevenue / data.length);
  const growthRate = "+13.5%"; 

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          Revenue Trend <Typography variant="caption">Last 6 months</Typography>
        </Typography>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={6} md={3}>
            <Box bgcolor="#d1fae5" p={2} borderRadius={2}>
              <Typography variant="body2">Total Revenue</Typography>
              <Typography fontWeight="bold" variant="h6">
                ₹{totalRevenue.toLocaleString()}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box bgcolor="#e0f2fe" p={2} borderRadius={2}>
              <Typography variant="body2">Total Rides</Typography>
              <Typography fontWeight="bold" variant="h6">
                1,452
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box bgcolor="#f3e8ff" p={2} borderRadius={2}>
              <Typography variant="body2">Avg Revenue/Month</Typography>
              <Typography fontWeight="bold" variant="h6">
                ₹{avgRevenue.toLocaleString()}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box bgcolor="#fff7ed" p={2} borderRadius={2}>
              <Typography variant="body2">Growth Rate</Typography>
              <Typography fontWeight="bold" variant="h6" color="green">
                {growthRate}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box mt={3} height={200}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(val) => `Revenue : ₹${val}`} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RevenueTrend;
