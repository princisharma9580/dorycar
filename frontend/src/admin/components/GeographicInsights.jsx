import { Box, Typography, Grid, Paper, Divider } from "@mui/material";

const GeographicInsights = ({ popularRoutes, zonePerformance, stats }) => {
  return (
    <Box mt={6}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Geographic Insights
      </Typography>

      <Grid container spacing={3}>
        {/* Popular Routes */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Popular Routes
            </Typography>
            {popularRoutes.map((route, i) => (
              <Box
                key={i}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                py={1}
              >
                <Box>
                  <Typography fontWeight="bold">{route.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {route.rides} rides • Avg: ₹{route.avgFare}
                  </Typography>
                </Box>
                <Box textAlign="right">
                  <Typography fontWeight="bold">₹{route.revenue}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    #{i + 1}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>

        {/* Zone Performance */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Zone Performance
            </Typography>
            {zonePerformance.map((zone, i) => (
              <Box
                key={i}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                py={1}
              >
                <Box>
                  <Typography fontWeight="bold">{zone.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {zone.rides} rides completed
                  </Typography>
                </Box>
                <Box textAlign="right">
                  <Typography fontWeight="bold">₹{zone.revenue}</Typography>
                  <Typography variant="caption" color="green">
                    +{zone.growth}%
                  </Typography>
                </Box>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>

      {/* Bottom Stats */}
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, bgcolor: "#3b82f6", color: "#fff" }}>
            <Typography>Revenue Growth</Typography>
            <Typography variant="h6" fontWeight="bold">
              +{stats.revenueGrowth}%
            </Typography>
            <Typography variant="caption">vs last month</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, bgcolor: "#10b981", color: "#fff" }}>
            <Typography>Active Users</Typography>
            <Typography variant="h6" fontWeight="bold">
              {stats.activeUsers}/{stats.totalUsers}
            </Typography>
            <Typography variant="caption">{stats.userRate}% active rate</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, bgcolor: "#8b5cf6", color: "#fff" }}>
            <Typography>Active Drivers</Typography>
            <Typography variant="h6" fontWeight="bold">
              {stats.activeDrivers}
            </Typography>
            <Typography variant="caption">Available now</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, bgcolor: "#f97316", color: "#fff" }}>
            <Typography>Avg Distance</Typography>
            <Typography variant="h6" fontWeight="bold">
              {stats.avgDistance}km
            </Typography>
            <Typography variant="caption">per ride</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GeographicInsights;
