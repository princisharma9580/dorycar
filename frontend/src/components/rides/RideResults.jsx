import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Typography, Box } from "@mui/material";
import rideService from "../../services/rideService";
import { toast } from "react-toastify";
import RideList from "./RideList";
import { useAuth } from "../../context/AuthContext";

const RideResults = () => {
  const user = useAuth();
  const location = useLocation();
  const searchParams = location.state || {};
  const [rides, setRides] = useState([]);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const results = await rideService.searchRides(searchParams);
        setRides(results);
      } catch (err) {
        console.error(err);
        toast.error("Error fetching ride results");
      }
    };

    if (searchParams) fetchRides();
  }, [JSON.stringify(searchParams)]);

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: { xs: 10, md: 15 },   // Less top margin on mobile
        mb: { xs: 6, md: 10 },   // Less bottom margin on mobile
        px: { xs: 2, sm: 3, md: 6 },  // Responsive horizontal padding
        fontFamily: "'Poppins', sans-serif",
        userSelect: "none",
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: 800,
          color: "success.dark",
          textAlign: "center",
          mb: { xs: 3, md: 5 },
          letterSpacing: 2,
          textTransform: "uppercase",
          textShadow:
            "0 1px 3px rgba(34, 197, 94, 0.7), 0 0 10px rgba(34, 197, 94, 0.4)",
          fontSize: { xs: "1.8rem", md: "3rem" }, // Responsive font size
        }}
      >
        Available Rides
      </Typography>

      <Box
        sx={{
          borderRadius: 3,
          bgcolor: "background.paper",
          boxShadow:
            "0 8px 20px rgba(34, 197, 94, 0.15), 0 0 10px rgba(34, 197, 94, 0.1)",
          p: { xs: 0.5, sm: 2, md: 4 },
          minHeight: "60vh",
          transition: "all 0.3s ease-in-out",
          boxShadow: "0 6px 24px rgba(0,230,118,0.5)",
          overflowX: "auto",
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <RideList currentUser={user} searchResults={rides} />
      </Box>
    </Container>
  );
};

export default RideResults;
