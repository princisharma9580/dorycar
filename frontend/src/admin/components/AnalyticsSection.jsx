import { Box, Grid, Typography, Paper } from "@mui/material";
import { FaChartLine } from "react-icons/fa";

const AnalyticsSection = ({ kpi }) => {
  return (
    <Box mt={6}>
      <Typography variant="h5" fontWeight="bold" gutterBottom display="flex" alignItems="center">
        <FaChartLine style={{ marginRight: 8, color: "#10b981" }} />
        Key Performance Indicators
      </Typography>

      <Paper elevation={2} sx={{ mt: 2, p: 3, borderRadius: 3 }}>
        <Grid container spacing={2}>
          {kpi &&
            Object.entries(kpi).map(([key, item]) => (
              <Grid key={key} item xs={12} sm={6} md={3}>
                <Paper
                  elevation={0}
                  sx={{
                    textAlign: "center",
                    p: 2,
                    backgroundColor: "#f9fafb",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {item.label}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {item.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={item.change >= 0 ? "green" : "error"}
                    fontWeight="medium"
                  >
                    {item.change >= 0 ? `+${item.change}%` : `${item.change}%`}
                  </Typography>
                </Paper>
              </Grid>
            ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default AnalyticsSection;
