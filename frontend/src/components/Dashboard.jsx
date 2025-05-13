import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Rating,
  TextField,
  Chip,
  Avatar,
  Modal,
} from "@mui/material";

import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { toast } from "react-toastify";
import socket from "../services/socket";
import RideDetailsModal from "./rides/RideDetailsModal";
import RideChat from "./rides/RideChat";
import rideService from "../services/rideService";

const Dashboard = ({ currentUser }) => {
  console.log("current user", currentUser);
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [userRides, setUserRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRideForDetails, setSelectedRideForDetails] = useState(null);
  const [selectedRideForChat, setSelectedRideForChat] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleBookRide = async (rideId) => {
    try {
      await rideService.expressInterest(rideId);
      toast.success("Ride booked successfully!");
      navigate("/dashboard");
    } catch (error) {
      const message = error?.response?.data?.message;
      const redirectPath = error?.response?.data?.redirectTo;
      const missingFields = error?.response?.data?.missingFields;

      if (missingFields?.length > 0) {
        toast.error(
          `Please complete the following fields in your profile: ${missingFields.join(
            ", "
          )}`
        );
        navigate("/profile");
      } else {
        toast.error(message || "Failed to book ride");
        toast.error(missingFields);
      }

      // Optionally redirect if backend sends a path
      if (redirectPath) {
        setTimeout(() => navigate(redirectPath), 2000);
      }
    }
  };

  //   const handleChatClick = (ride) => {
  //   setSelectedRide(ride);
  //   setIsChatOpen(true);
  // };
  const handleChatClick = (ride) => {
    setSelectedRideForChat(ride);
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
    setSelectedRide(null);
  };

  const handleViewMap = (origin, destination) => {
    const mapUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
      origin
    )}&destination=${encodeURIComponent(destination)}`;
    window.open(mapUrl, "_blank");
  };

  const handleShareRide = (ride) => {
    const shareText = `Ride from ${ride.origin} to ${
      ride.destination
    } on ${new Date(ride.date).toLocaleDateString()} - ₹${
      ride.price
    } per seat.`;

    if (navigator.share) {
      navigator
        .share({
          title: "Ride on DoryCar",
          text: shareText,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(shareText + " " + window.location.href);
      toast.info("Ride details copied to clipboard!");
    }
  };

  const cancellationReasons = [
    "Change of plans",
    "Vehicle issue",
    "Passenger did not respond",
    "Emergency",
    "Other",
  ];

  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [rideToCancel, setRideToCancel] = useState(null);
  const [customReason, setCustomReason] = useState("");
  const [highlightedRideId, setHighlightedRideId] = useState(null);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [reviewRide, setReviewRide] = useState(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedRide, setSelectedRide] = useState(null);

  useEffect(() => {
    fetchUserRides();
    const handleRideUpdated = (updatedRide) => {
      const isUserInvolved =
        updatedRide.creator?._id === user._id ||
        updatedRide.creator === user._id ||
        updatedRide.acceptor?._id === user._id ||
        updatedRide.acceptor === user._id ||
        updatedRide.interestedUsers.some(
          (i) => i.user?._id === user._id || i.user === user._id
        );

      if (!isUserInvolved) return;

      setUserRides((prevRides) => {
        const idx = prevRides.findIndex((r) => r._id === updatedRide._id);
        if (idx !== -1) {
          const updated = [...prevRides];
          updated[idx] = updatedRide;
          return updated;
        } else {
          return [updatedRide, ...prevRides];
        }
      });
      setHighlightedRideId(updatedRide._id);
      setTimeout(() => setHighlightedRideId(null), 3000);
    };

    socket.on("ride-updated", handleRideUpdated);

    return () => socket.off("ride-updated", handleRideUpdated);
  }, [user]);

  const fetchUserRides = async () => {
    try {
      const rides = await rideService.getRides();
      const filtered = rides.filter(
        (ride) =>
          ride.creator?._id === user._id ||
          ride.creator === user._id ||
          ride.acceptor?._id === user._id ||
          ride.acceptor === user._id ||
          ride.interestedUsers.some(
            (i) => i.user?._id === user._id || i.user === user._id
          )
      );

      setUserRides(filtered);
    } catch (error) {
      console.error("Error fetching rides:", error);
      toast.error("Failed to fetch rides");
    } finally {
      setLoading(false);
    }
  };

  const openCancellationDialog = (rideId) => {
    setRideToCancel(rideId);
    setOpenCancelModal(true);
  };

  const openReviewDialog = (rideId) => {
    const ride = userRides.find((r) => r._id === rideId);
    if (ride) {
      setReviewRide(ride);

      // Check if the current user has already reviewed this ride's creator
      const existingReview = ride.creator?.ratings?.find(
        (review) =>
          review.ride === rideId &&
          (review.by === user._id || review.by?._id === user._id)
      );

      if (existingReview) {
        setRatingValue(existingReview.rating);
        setComment(existingReview.comment);
      } else {
        setRatingValue(0);
        setComment("");
      }

      setOpenReviewModal(true);
    } else {
      toast.error("Ride not found");
    }
  };

  const confirmCancel = async () => {
    if (!cancelReason) {
      toast.error("Please select a reason");
      return;
    }
    try {
      const reasonToSend =
        cancelReason === "Other" ? customReason.trim() : cancelReason;
      await rideService.cancelRide(rideToCancel, reasonToSend);
      toast.success("Ride cancelled successfully");
      setOpenCancelModal(false);
      setCancelReason("");
      setRideToCancel(null);
      fetchUserRides();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to cancel ride");
    }
  };

  const handleStatusChange = async (rideId, action, userId) => {
    try {
      switch (action) {
        case "accept":
          try {
            await rideService.acceptInterest(rideId, userId);
            toast.success("Ride accepted successfully");
          } catch (error) {
            console.error("Accept ride failed:", error);
            toast.error("Failed to accept user");
          }
          break;

        case "cancel":
          const reason = prompt("Please provide a reason for cancellation:");
          await rideService.cancelRide(rideId, reason);

          break;

        case "complete":
          try {
            const updatedRide = await rideService.completeRide(rideId);
            toast.success("Ride completed successfully");
            const isAcceptor =
              updatedRide.acceptor === user._id ||
              updatedRide.acceptor?._id === user._id;

            console.log(" Ride Completed:", updatedRide);
            console.log(" Is Acceptor:", isAcceptor);

            if (isAcceptor) {
              setReviewRide(updatedRide);
              setOpenReviewModal(true);
            }
            setTimeout(() => {
              fetchUserRides();
            }, 1500);
          } catch (error) {
            console.error(" Failed to complete ride:", error);
            toast.error(
              error?.response?.data?.message || "Failed to complete ride"
            );
          }
          break;

        case "start":
          await rideService.startRide(rideId);
          break;

        default:
          return;
      }
      toast.success(`Ride ${action}ed successfully`);
      toast.info(
        `Passengers have been notified that the ride is now ${action}ed`
      );
      fetchUserRides();
    } catch (error) {
      console.error(`Error ${action}ing ride:`, error);
      toast.error(`Failed to ${action} ride`);
    }
  };
  const RideCard = ({ ride }) => {
    const [isUpdated, setIsUpdated] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);

    const handleDetailsOpen = (userId) => setOpenDetails(userId);
    const handleDetailsClose = () => setOpenDetails(null);
    const departure = new Date(ride.departureTime);
    const arrival = new Date(ride.arrivalTime);
    const diffMs = arrival - departure;
    const diffMin = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMin / 60);
    const minutes = diffMin % 60;
    const durationText = `${hours}h ${minutes}m`;

    const alreadyReviewed = ride.creator?.ratings?.some(
      (review) =>
        review.ride === ride._id &&
        (review.by === user._id || review.by?._id === user._id)
    );

    const rideStatus = ride?.status?.toLowerCase().trim();

    useEffect(() => {
      setIsUpdated(true);
      const timer = setTimeout(() => setIsUpdated(false), 2000);
      return () => clearTimeout(timer);
    }, [ride.updatedAt]);

    const isCreator =
      ride.creator?._id === user._id || ride.creator === user._id;
    const [elapsedTime, setElapsedTime] = useState("");
    const timerRef = useRef(null);

    const userInterest = ride.interestedUsers.find(
      (i) => i.user?._id === user._id || i.user === user._id
    );
    const isRejected = userInterest?.status === "rejected";
    const isInterested = userInterest?.status === "interested";
    const isAccepted = userInterest?.status === "accepted";
    const isEligibleToReview =
      userInterest?.status === "accepted" ||
      userInterest?.status === "completed";

    const hasAcceptedUsers = ride.interestedUsers?.some(
      (i) => i.status === "accepted"
    );

    useEffect(() => {
      if (ride.status === "started" && ride.startedAt) {
        const startTime = new Date(ride.startedAt).getTime();
        timerRef.current = setInterval(() => {
          const now = new Date().getTime();
          const diff = now - startTime;
          const minutes = Math.floor(diff / 60000);
          const seconds = Math.floor((diff % 60000) / 1000);
          setElapsedTime(`${minutes}m ${seconds}s`);
        }, 1000);
      }
      return () => clearInterval(timerRef.current);
    }, [ride.status, ride.startedAt]);

    return (
      <Card
        sx={{
          mb: 2,
          marginTop: 15,
          border:
            ride._id === highlightedRideId
              ? "2px solid #00e676"
              : "1px solid #ccc",
          transition: "all 0.3s ease-in-out",
          boxShadow:
            ride._id === highlightedRideId ? "0 0 10px #00e676" : undefined,
          pointerEvents:
            ride.status === "cancelled" || isRejected ? "none" : "auto",
        }}
      >
        <CardContent>
          <div className="p-0">
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="text-lg font-bold">
                        {new Date(ride.departureTime).toLocaleTimeString()}
                      </p>
                      <p className="text-sm text-gray-500">{ride.origin}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">
                        {new Date(ride.arrivalTime).toLocaleTimeString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {ride.destination}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <div className="flex-1 h-0.5 bg-gray-200 mx-2"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-clock h-4 w-4 mr-1"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>

                    <span>{durationText} •</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-users h-4 w-4 mx-1"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <span>{ride.seats} seats available • </span>
                    <span>{new Date(ride.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[
                      { key: "ac", label: "AC" },
                      { key: "pet", label: "Pet friendly" },
                      { key: "bagMax", label: "2 bags max" },
                      { key: "smoking", label: "Smoking" },
                      { key: "music", label: "Music" },
                      { key: "luggage", label: "Luggage space" },
                    ]
                      .filter((pref) => ride.ridePreference?.[pref.key])
                      .map((pref) => (
                        <div
                          key={pref.key}
                          className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                          data-v0-t="badge"
                        >
                          {pref.label}
                        </div>
                      ))}
                  </div>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    component="div"
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      fontWeight="bold"
                      marginBottom="8px"
                      component="span"
                    >
                      <span style={{ fontWeight: "bold" }}>Status:</span>{" "}
                      {isCreator
                        ? ride.status
                        : isRejected
                        ? "Rejected"
                        : isAccepted
                        ? "Accepted"
                        : isInterested
                        ? "Waiting"
                        : ride.status}
                    </Typography>
                  </Typography>

                  {!isCreator &&
                    ride.interestedUsers?.some(
                      (i) =>
                        (i.user?._id === user._id || i.user === user._id) &&
                        i.status === "interested"
                    ) && (
                      <Box mt={1}>
                        <Chip
                          label="Waiting for approval"
                          color="warning"
                          variant="outlined"
                          size="small"
                          sx={{
                            borderRadius: "8px",
                            fontWeight: 500,
                            mb: "8px",
                          }}
                        />
                      </Box>
                    )}
                  {!isCreator &&
                    ride.interestedUsers.some(
                      (i) => i.user === user._id && i.status === "rejected"
                    ) && (
                      <Chip
                        label=" Ride request was rejected"
                        color="error"
                        variant="outlined"
                        sx={{ mt: 1 }}
                      />
                    )}

                  {isRejected && (
                    <Chip
                      label=" You were not accepted for this ride"
                      color="error"
                      variant="outlined"
                      sx={{ mt: 1, mb: 1 }}
                    />
                  )}
                  {/* Show Interested Users for Creator */}
                  {isCreator &&
                    ride.interestedUsers?.length > 0 &&
                    ride.status !== "accepted" &&
                    ride.status !== "started" &&
                    ride.status !== "completed" &&
                    ride.status !== "cancelled" && (
                      <Box mt={1} ml={2}>
                        <Typography variant="subtitle2" gutterBottom>
                          Interested Users:
                        </Typography>
                        {ride.interestedUsers.map((interest, index) => (
                          <Box key={index} sx={{ mb: 1 }}>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: "bold",
                                textTransform: "capitalize",
                              }}
                            >
                              {interest.user?.name || "Unnamed User"} – Status:{" "}
                              {interest.status}
                            </Typography>
                            {isCreator &&
                              !isRejected &&
                              interest.status === "interested" && (
                                <Box>
                                  <Button
                                    size="small"
                                    variant="outlined"
                                    color="primary"
                                    sx={{ mt: 0.5, mr: 1 }}
                                    onClick={() =>
                                      handleDetailsOpen(interest.user._id)
                                    }
                                  >
                                    Show profile
                                  </Button>
                                  <Modal
                                    open={openDetails === interest.user._id}
                                    onClose={handleDetailsClose}
                                    aria-labelledby="user-details-modal"
                                    aria-describedby="user-details-description"
                                  >
                                    <Box
                                      sx={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        width: 350,
                                        bgcolor: "background.paper",
                                        borderRadius: 2,
                                        boxShadow: 24,
                                        p: 4,
                                      }}
                                    >
                                      <Avatar
                                        src={interest?.user?.profileImage}
                                        alt={interest?.user?.name}
                                        sx={{
                                          width: 80,
                                          height: 80,
                                          mb: 2,
                                          mx: "auto",
                                        }}
                                      />
                                      <Typography
                                        variant="body2"
                                        align="center"
                                        gutterBottom
                                        sx={{
                                          fontSize: "1.2rem",
                                          fontWeight: "bold",
                                          textTransform: "capitalize",
                                        }}
                                      >
                                        {interest.user?.name || "Unnamed User"}
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        align="center"
                                        gutterBottom
                                      >
                                        <Box
                                          component="span"
                                          fontWeight="bold"
                                          fontSize=".9rem"
                                        >
                                          Phone:
                                        </Box>{" "}
                                        {interest.user?.phone}
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        align="center"
                                        gutterBottom
                                      >
                                        <Box
                                          component="span"
                                          fontWeight="bold"
                                          fontSize=".9rem"
                                        >
                                          Emergency Contact:
                                        </Box>{" "}
                                        {interest.user?.emergencyContact}
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        align="center"
                                        gutterBottom
                                      >
                                        <Box
                                          component="span"
                                          fontWeight="bold"
                                          fontSize=".9rem"
                                        >
                                          Gender:
                                        </Box>{" "}
                                        {interest.user?.gender}
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        align="center"
                                        gutterBottom
                                      >
                                        <Box
                                          component="span"
                                          fontWeight="bold"
                                          fontSize=".9rem"
                                        >
                                          Address:
                                        </Box>{" "}
                                        {interest.user?.address}
                                      </Typography>
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleDetailsClose}
                                        fullWidth
                                        sx={{ mt: 2 }}
                                      >
                                        Close
                                      </Button>
                                    </Box>
                                  </Modal>

                                  <Button
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 0.5 }}
                                    onClick={() =>
                                      handleStatusChange(
                                        ride._id,
                                        "accept",
                                        interest.user._id
                                      )
                                    }
                                  >
                                    Accept This User
                                  </Button>
                                </Box>
                              )}
                          </Box>
                        ))}
                      </Box>
                    )}
                  <div className="flex flex-col md:flex-row gap-6">
                    {ride?.status === "pending" && !isCreator ? (
                      <button
                        // onClick={() => setSelectedRide(ride)}
                        onClick={() => setSelectedRideForDetails(ride)}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground h-10 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 w-[20%] text-white"
                      >
                        View Details
                      </button>
                    ) : ride?.status !== "completed" &&
                      ride?.status !== "cancelled" &&
                      ride?.status !== "pending" ? (
                      <button
                        // onClick={() => setSelectedRide(ride)}
                        onClick={() => setSelectedRideForDetails(ride)}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground h-10 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 w-[20%] text-white"
                      >
                        View Details
                      </button>
                    ) : null}

                    {!isRejected &&
                      isCreator &&
                      hasAcceptedUsers &&
                      ride.status !== "started" &&
                      ride.status !== "completed" &&
                      ride.status !== "cancelled" && (
                        <button
                          onClick={() => handleStatusChange(ride._id, "start")}
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground h-10 px-4 py-2 bg-green-600 hover:bg-green-700 w-[20%] text-white"
                        >
                          Start Ride
                        </button>
                      )}

                    {isCreator && ride.status === "started" && (
                      <button
                        onClick={() => handleStatusChange(ride._id, "complete")}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground h-10 px-4 py-2 bg-teal-500 hover:bg-teal-600 w-[20%] text-white"
                      >
                        Complete Ride
                      </button>
                    )}

                    {!isRejected && ride.status === "started" && (
                      <button
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/dir/?api=1&origin=${ride.origin}&destination=${ride.destination}`,
                            "_blank"
                          )
                        }
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground h-10 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 w-[20%] text-white"
                      >
                        View Live Map
                      </button>
                    )}

                    {!isRejected &&
                      ride.status !== "completed" &&
                      ride.status !== "cancelled" &&
                      ride.status !== "started" && (
                        <button
                          onClick={() =>
                            openCancellationDialog(ride._id, "cancel")
                          }
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground h-10 px-4 py-2 bg-red-600 hover:bg-red-700 w-[20%] text-white"
                        >
                          Cancel Ride
                        </button>
                      )}

                    {isEligibleToReview && ride.status === "completed" && (
                      <button
                        onClick={() => openReviewDialog(ride._id)}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground h-10 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 w-[20%] text-white"
                      >
                        {alreadyReviewed ? "Update Review" : "Review"}
                      </button>
                    )}
                  </div>

                  {!isRejected && ride.status === "completed" && (
                    <Typography
                      variant="body2"
                      color="primary"
                      fontWeight="bold"
                      marginTop="8px"
                    >
                      Ride Completed At:{" "}
                      {ride.completedAt
                        ? new Date(ride.completedAt).toLocaleTimeString()
                        : "Not available"}
                    </Typography>
                  )}

                  {!isRejected && ride.status === "started" && (
                    <Typography
                      variant="body2"
                      color="primary"
                      fontWeight="bold"
                      marginTop="8px"
                    >
                      Ride Started At:{" "}
                      {ride.startedAt
                        ? new Date(ride.startedAt).toLocaleTimeString()
                        : "Not available"}
                    </Typography>
                  )}

                  {!isRejected && ride.status === "cancelled" && (
                    <>
                      <Typography
                        variant="body2"
                        color="error"
                        fontWeight="bold"
                        marginTop="8px"
                      >
                        Ride Cancelled At:{" "}
                        {ride.cancelledAt
                          ? new Date(ride.cancelledAt).toLocaleString()
                          : "Not available"}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="error"
                        fontWeight="bold"
                      >
                        Cancellation Reason:{" "}
                        {ride.cancellationReason || "Not provided"}
                      </Typography>
                    </>
                  )}

                  {!isRejected && ride.status === "started" && elapsedTime && (
                    <Typography
                      variant="body2"
                      color="secondary"
                      fontWeight="bold"
                      marginTop="8px"
                    >
                      Duration: {elapsedTime}
                    </Typography>
                  )}
                </div>
                <div className="flex flex-row md:flex-col justify-between items-center md:items-end gap-4 md:min-w-[150px]">
                  <div className="flex flex-col items-center">
                    <span className="relative flex shrink-0 overflow-hidden rounded-full h-12 w-12 mb-2">
                      <img
                        className="aspect-square h-full w-full"
                        alt={ride.creator?.name}
                        src={ride.creator?.profileImage}
                      />
                    </span>
                    <div className="text-center">
                      <p className="font-medium text-sm">
                        {ride.creator?.name}
                      </p>
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-star h-3 w-3 text-yellow-500 fill-yellow-500 mr-1"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        <span className="text-xs">
                          {ride.creator?.averageRating?.toFixed(1) || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-emerald-600">
                      ₹{ride.price}
                    </p>
                    {!isCreator &&
                      ride?.status !== "completed" &&
                      ride?.status !== "cancelled" &&
                      ride?.status !== "started" &&
                      ride?.status !== "accepted" &&
                      ride?.status !== "waiting" &&
                      ride?.status !== "pending" && (
                        <button
                          onClick={() => handleBookRide(ride._id)}
                          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground h-10 px-4 py-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                          Book
                        </button>
                      )}
                    <button
                      onClick={() => handleChatClick(ride)}
                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 w-full mt-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-message-square h-4 w-4 mr-1"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </CardContent>
        <CardActions>
          {/* <RideDetailsModal
            selectedRide={selectedRide}
            onClose={() => setSelectedRide(null)}
            onBook={() => {
              handleBookRide(selectedRide._id);
              setSelectedRide(null);
            }}
            onChat={() => handleChatClick(selectedRide)}
            onMap={() =>
              handleViewMap(selectedRide.origin, selectedRide.destination)
            }
            onShare={() => handleShareRide(selectedRide)}
            closeChat={handleCloseChat}
            currentUser={currentUser}
          /> */}
          
        </CardActions>
        {/* <Dialog open={isChatOpen}>
          <RideChat
            open={isChatOpen}
            closeChat={handleCloseChat}
            currentUser={currentUser}
            rideId={selectedRide?._id}
          />
        </Dialog> */}
        {/* <Dialog open={isChatOpen && !!selectedRide}>
  <RideChat
    open={isChatOpen}
    closeChat={handleCloseChat}
    currentUser={currentUser}
    rideId={selectedRide?._id}
  />
</Dialog> */}
        
      </Card>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 14, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Typography
                variant="h4"
                component="h1"
                textTransform="capitalize"
              >
                Welcome, {user?.name}!
              </Typography>
            </Box>

            <Typography variant="h5" gutterBottom>
              Your Rides
            </Typography>

            {loading ? (
              <Typography>Loading rides...</Typography>
            ) : userRides.length > 0 ? (
              userRides.map((ride) => <RideCard key={ride._id} ride={ride} />)
            ) : (
              <Typography color="text.secondary">
                No rides found. Create a new ride or accept an available one!
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
      <Dialog open={openCancelModal} onClose={() => setOpenCancelModal(false)}>
        <DialogTitle>Select Cancellation Reason</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel>Reason</InputLabel>
            <Select
              value={cancelReason}
              onChange={(e) => {
                setCancelReason(e.target.value);
                if (e.target.value !== "Other") {
                  setCustomReason("");
                }
              }}
              label="Reason"
            >
              {cancellationReasons.map((reason, index) => (
                <MenuItem key={index} value={reason}>
                  {reason}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {cancelReason === "Other" && (
            <FormControl fullWidth sx={{ mt: 2 }}>
              <input
                id="custom-reason"
                type="text"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="Please enter your reason"
                style={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  marginTop: "8px",
                }}
              />
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCancelModal(false)}>Close</Button>
          <Button color="error" onClick={confirmCancel}>
            Confirm Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openReviewModal} onClose={() => setOpenReviewModal(false)}>
        <DialogTitle>Rate Your Ride</DialogTitle>
        <DialogContent>
          <Box mt={2}>
            <Rating
              name="rating"
              value={ratingValue}
              onChange={(e, newValue) => setRatingValue(newValue)}
            />
            <TextField
              multiline
              fullWidth
              rows={3}
              label="Leave a comment (optional)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{ mt: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReviewModal(false)}>Cancel</Button>
          <Button
            onClick={async () => {
              try {
                await rideService.submitReview({
                  rideId: reviewRide._id,
                  rating: ratingValue,
                  comment,
                  toUserId: reviewRide.creator._id || reviewRide.creator,
                });

                toast.success("Thanks for your feedback!");
                setOpenReviewModal(false);
                setRatingValue(0);
                setComment("");

                try {
                  const profileRes = await api.get("/users/me");
                  updateUser(profileRes.data);
                } catch (profileError) {
                  console.warn(" Failed to refresh profile:", profileError);
                }
              } catch (err) {
                console.error(" Review submission failed:", err);
                toast.error("Failed to submit review");
              }
            }}
            variant="contained"
          >
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>
      {selectedRideForDetails && (
            <RideDetailsModal
              selectedRide={selectedRideForDetails}
              onClose={() => setSelectedRideForDetails(null)}
              onBook={() => {
                handleBookRide(selectedRideForDetails._id);
                setSelectedRideForDetails(null);
              }}
              onChat={() => {
                handleChatClick(selectedRideForDetails);
                setSelectedRideForDetails(null);
              }}
              onMap={() =>
                handleViewMap(
                  selectedRideForDetails.origin,
                  selectedRideForDetails.destination
                )
              }
              onShare={() => handleShareRide(selectedRideForDetails)}
              closeChat={handleCloseChat}
              currentUser={currentUser}
            />
          )}
          <Dialog open={isChatOpen} onClose={handleCloseChat}>
          <RideChat
            open={isChatOpen}
            closeChat={handleCloseChat}
            currentUser={currentUser}
            rideId={selectedRideForChat?._id}
          />
        </Dialog>
    </Container>
  );
};

export default Dashboard;
