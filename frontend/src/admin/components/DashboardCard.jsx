// src/admin/components/DashboardCard.jsx
import { Card, CardContent, Grid, Typography, Box, Avatar } from "@mui/material";

const DashboardCard = ({ title, value, subtitle, icon, change, bgColor, isPrimary = false }) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card
        elevation={3}
        sx={{
          transition: "all 0.3s ease",
          transform: "translateY(0px)",
          '&:hover': {
            transform: "translateY(-6px)",
            boxShadow: 6,
          },
          borderRadius: 3,
          minHeight: 160,
          bgcolor: isPrimary ? bgColor : "white",
          color: isPrimary ? "white" : "inherit"
        }}
      >
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: "100%" }}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: isPrimary ? "white" : bgColor, color: isPrimary ? bgColor : "white", width: 56, height: 56 }}>
              {icon}
            </Avatar>
            <Box>
              <Typography variant="subtitle2" color={isPrimary ? "white" : "text.secondary"}>
                {title}
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {value}
              </Typography>
            </Box>
          </Box>
          <Box mt="auto">
            <Typography variant="body2" fontWeight="medium" color={isPrimary ? "white" : "success.main"}>
              {change}
            </Typography>
            <Typography variant="caption" color={isPrimary ? "white" : "text.secondary"}>
              {subtitle}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
    
  );
};

export default DashboardCard;
