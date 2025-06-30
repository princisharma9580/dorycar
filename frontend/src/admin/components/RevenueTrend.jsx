import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const revenueData = [
  { month: "Jul", revenue: 29000 },
  { month: "Aug", revenue: 31000 },
  { month: "Sep", revenue: 29500 },
  { month: "Oct", revenue: 38000 },
  { month: "Nov", revenue: 41500 },
  { month: "Dec", revenue: 45000 },
];

const RevenueTrend = () => {
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
                ₹2,16,580
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
                ₹36,097
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box bgcolor="#fff7ed" p={2} borderRadius={2}>
              <Typography variant="body2">Growth Rate</Typography>
              <Typography fontWeight="bold" variant="h6" color="green">
                +13.5%
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box mt={3} height={200}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
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
