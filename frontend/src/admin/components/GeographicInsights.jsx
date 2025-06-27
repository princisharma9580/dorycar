import { Box, Typography, Grid, Paper } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import RoomIcon from "@mui/icons-material/Room";

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
            <Box display="flex" flexDirection="column" gap={2}>
              {popularRoutes.map((route, i) => (
                <Paper key={i} elevation={1} sx={{ p: 2 }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Typography fontWeight="bold">{route.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {route.rides} rides • Avg: ₹{route.avgFare}
                      </Typography>
                    </Box>
                    <Box textAlign="right">
                      <Typography fontWeight="bold" color="green">
                        ₹{route.revenue}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        #{i + 1}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Zone Performance */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Zone Performance
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              {zonePerformance.map((zone, i) => (
                <Paper key={i} elevation={1} sx={{ p: 2 }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box>
                      <Typography fontWeight="bold">{zone.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {zone.rides} rides completed
                      </Typography>
                    </Box>
                    <Box textAlign="right">
                      <Typography fontWeight="bold" color="green">
                        ₹{zone.revenue}
                      </Typography>
                      <Typography variant="caption" color="green">
                        +{zone.growth}%
                      </Typography>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Bottom Stats */}
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, bgcolor: "#3b82f6", color: "#fff" }}>
            <Box display="flex" alignItems="center" gap={1}>
              <TrendingUpIcon />
              <Typography>Revenue Growth</Typography>
            </Box>
            <Typography variant="h6" fontWeight="bold">
              +{stats.revenueGrowth}%
            </Typography>
            <Typography variant="caption">vs last month</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, bgcolor: "#10b981", color: "#fff" }}>
            <Box display="flex" alignItems="center" gap={1}>
              <PeopleIcon />
              <Typography>Active Users</Typography>
            </Box>
            <Typography variant="h6" fontWeight="bold">
              {stats.activeUsers}/{stats.totalUsers}
            </Typography>
            <Typography variant="caption">{stats.userRate}% active rate</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, bgcolor: "#8b5cf6", color: "#fff" }}>
            <Box display="flex" alignItems="center" gap={1}>
              <LocalTaxiIcon />
              <Typography>Active Drivers</Typography>
            </Box>
            <Typography variant="h6" fontWeight="bold">
              {stats.activeDrivers}
            </Typography>
            <Typography variant="caption">Available now</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, bgcolor: "#f97316", color: "#fff" }}>
            <Box display="flex" alignItems="center" gap={1}>
              <RoomIcon />
              <Typography>Avg Distance</Typography>
            </Box>
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
