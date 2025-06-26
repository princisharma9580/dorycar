import { Box, Grid, Paper, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { FaChartPie } from "react-icons/fa";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b"]; // green, blue, yellow

const AnalyticsSection = ({ kpi, revenueData, dailyData }) => {
  return (
    <Box mt={6}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Revenue Analytics
      </Typography>

      <Grid container spacing={3}>
        {/* Pie Chart Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <FaChartPie style={{ color: "green", marginRight: 8 }} />
              <Typography variant="h6" fontWeight="bold">
                Revenue by Service Type
              </Typography>
            </Box>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={revenueData}
                  dataKey="value"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {revenueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
            {revenueData.map((item, index) => (
              <Typography key={index} mt={1}>
                <span style={{ color: COLORS[index], fontWeight: "bold" }}>{item.type}:</span> ₹{item.value.toLocaleString()} ({item.percentage}%)
              </Typography>
            ))}
          </Paper>
        </Grid>

        {/* Bar Chart Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Daily Revenue Trend
            </Typography>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <RechartsTooltip />
                <Bar dataKey="value" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsSection;
