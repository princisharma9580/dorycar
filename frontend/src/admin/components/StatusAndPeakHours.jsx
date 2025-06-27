import { Card, CardContent, Grid, Typography } from "@mui/material";
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
  CartesianGrid
} from "recharts";

const rideStatusData = [
  { name: "Completed", value: 198, color: "#10b981" },
  { name: "Pending", value: 23, color: "#f59e0b" },
  { name: "Cancelled", value: 26, color: "#ef4444" },
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

const StatusAndPeakHours = () => {
  return (
    <Grid container spacing={3} mt={1}>
      {/* Donut Chart */}
      <Grid item xs={12} md={6}>
        <Card sx={{ height: "100%" }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold">
              Ride Status Distribution{" "}
              <Typography variant="caption" color="text.secondary">Last 30 days</Typography>
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
                    ● {entry.name} ({Math.round((entry.value / 247) * 100)}%)
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
              <Typography variant="caption" color="text.secondary">Today</Typography>
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
  );
};

export default StatusAndPeakHours;
