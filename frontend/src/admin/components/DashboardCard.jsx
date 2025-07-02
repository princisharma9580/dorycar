// src/admin/components/DashboardCard.jsx
{/*import { Card, CardContent, Grid, Typography, Box, Avatar } from "@mui/material";

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

export default DashboardCard;*/}




import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const DashboardCard = ({
  title,
  value,
  subtitle,
  icon,
  change,
  bgColor = "#ffffff",
  isPrimary = false,
  onClick,
}) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        minHeight: 160,
        cursor: onClick ? "pointer" : "default",
        backgroundColor: isPrimary ? bgColor : "#fff",
        boxShadow: 3,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        transition: "all 0.3s ease-in-out", 
        "&:hover": {
          transform: "translateY(-6px)",    
          boxShadow: "0 10px 20px rgba(0,0,0,0.1)", 
        },
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box
          sx={{
            backgroundColor: isPrimary ? "rgba(255, 255, 255, 0.15)" : "#f3f4f6",
            color: isPrimary ? "#fff" : "#374151",
            borderRadius: 2,
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
          }}
        >
          {icon}
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: change?.startsWith("-") ? "#ef4444" : "#10b981",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          {change}
        </Typography>
      </Box>

      <CardContent sx={{ px: 0, pt: 1.5, pb: 0 }}>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 600,
            textTransform: "uppercase",
            color: isPrimary ? "#ffffff" : "#6b7280",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mt: 0.5,
            color: isPrimary ? "#ffffff" : "#111827",
          }}
        >
          {value}
        </Typography>

        <Typography
          sx={{
            fontSize: 12,
            mt: 0.2,
            color: isPrimary ? "#ffffff" : "#6b7280",
          }}
        >
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
