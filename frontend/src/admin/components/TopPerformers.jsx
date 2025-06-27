import React from "react";
import { Box, Typography, Avatar, Paper, Grid } from "@mui/material";
import { FaStar, FaChartLine } from "react-icons/fa";

const samplePerformers = [
  { name: "Rajesh Kumar", earnings: 15680, rating: 4.9, rides: 156 },
  { name: "Amit Singh", earnings: 14250, rating: 4.8, rides: 142 },
  { name: "Priya Sharma", earnings: 13890, rating: 4.9, rides: 138 },
  { name: "Mohammed Ali", earnings: 13420, rating: 4.7, rides: 134 },
];

const TopPerformers = ({ performers = samplePerformers }) => {
  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <FaChartLine color="green" />
          <Typography variant="h6" fontWeight="bold">
            Top Performers
          </Typography>
        </Box>

        {performers.map((p, index) => (
          <Box key={index} display="flex" alignItems="center" justifyContent="space-between" py={1}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: "#d1fae5", color: "#047857" }}>
                {p.name.split(" ").map(w => w[0]).join("").toUpperCase()}
              </Avatar>
              <Box>
                <Typography fontWeight="bold">{p.name}</Typography>
                <Box display="flex" alignItems="center" gap={1}>
                  <FaStar size={14} color="gold" />
                  <Typography variant="body2">{p.rating} • {p.rides} rides</Typography>
                </Box>
              </Box>
            </Box>

            <Box textAlign="right">
              <Typography fontWeight="bold">₹{p.earnings}</Typography>
              <Typography variant="caption">This month</Typography>
            </Box>
          </Box>
        ))}
      </Paper>
    </Grid>
  );
};

export default TopPerformers;
