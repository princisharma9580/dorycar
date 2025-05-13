import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import rideService from "../../services/rideService";
import { toast } from "react-toastify";
import RideList from "./RideList";
import { useAuth } from "../../context/AuthContext";

const RideResults = () => {
   const user = useAuth()
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
    <Container sx={{ mt: 15 }}>
      <Typography variant="h5" gutterBottom>
        Available Rides
      </Typography>

      <RideList currentUser={user} searchResults={rides} />
    </Container>
  );
};

export default RideResults;
