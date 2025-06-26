// src/admin/components/DashboardCard.jsx
import { Card, CardContent, Grid, Typography, Box, Avatar } from "@mui/material";

const DashboardCard = ({
  title,
  value,
  subtitle,
  icon,
  change,
  bgColor,
  isPrimary = false,
  onClick,
}) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Box
        onClick={onClick}
        sx={{
          cursor: onClick ? "pointer" : "default",
          transition: "transform 0.2s ease-in-out",
          '&:hover': {
            transform: onClick ? "scale(1.02)" : "none",
          },
        }}
      >
        <Card
          elevation={3}
          sx={{
            borderRadius: 3,
            minHeight: 160,
            bgcolor: isPrimary ? bgColor : "#fff",
            color: isPrimary ? "#fff" : "inherit",
            boxShadow: 3,
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              height: "100%",
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar
                sx={{
                  bgcolor: isPrimary ? "#fff" : bgColor,
                  color: isPrimary ? bgColor : "#fff",
                  width: 56,
                  height: 56,
                }}
              >
                {icon}
              </Avatar>
              <Box>
                <Typography
                  variant="subtitle2"
                  color={isPrimary ? "#fff" : "text.secondary"}
                >
                  {title}
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {value}
                </Typography>
              </Box>
            </Box>
            <Box mt="auto">
              <Typography
                variant="body2"
                fontWeight="medium"
                color={isPrimary ? "#fff" : "success.main"}
              >
                {change}
              </Typography>
              <Typography
                variant="caption"
                color={isPrimary ? "#fff" : "text.secondary"}
              >
                {subtitle}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
};

export default DashboardCard;
