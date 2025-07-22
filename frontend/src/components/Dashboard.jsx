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
  Fade,
  Tooltip,
  Stack,
} from "@mui/material";
import { Skeleton, Pagination } from "@mui/material";

import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { toast } from "react-toastify";
import socket from "../services/socket";
import RideDetailsModal from "./rides/RideDetailsModal";
import RideChat from "./rides/RideChat";
import rideService from "../services/rideService";
import StarIcon from "@mui/icons-material/Star";

const Dashboard = ({ currentUser }) => {
  console.log("current user", currentUser);
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [userRides, setUserRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRideForDetails, setSelectedRideForDetails] = useState(null);
  const [selectedRideForChat, setSelectedRideForChat] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [unreadCounts, setUnreadCounts] = useState({});

  const ridesPerPage = 5;

  const paginatedRides = userRides.slice(
    (page - 1) * ridesPerPage,
    page * ridesPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
    // Optionally scroll to top or ride list
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

      if (redirectPath) {
        setTimeout(() => navigate(redirectPath), 2000);
      }
    }
  };

  // const handleChatClick = (ride) => {
  //   setSelectedRideForChat(ride);
  //   setIsChatOpen(true);
  // };

  const handleChatClick = (rideId) => {
    setIsChatOpen(true);
    setSelectedRideForChat(rideId);
    setUnreadCounts((prev) => ({
      ...prev,
      [rideId]: 0,
    }));
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
    // const handleRideUpdated = (updatedRide) => {
    //   const isUserInvolved =
    //     updatedRide.creator?._id === user._id ||
    //     updatedRide.creator === user._id ||
    //     updatedRide.acceptor?._id === user._id ||
    //     updatedRide.acceptor === user._id ||
    //     updatedRide.interestedUsers.some(
    //       (i) => i.user?._id === user._id || i.user === user._id
    //     );

    //   if (!isUserInvolved) return;

    //   setUserRides((prevRides) => {
    //     const idx = prevRides.findIndex((r) => r._id === updatedRide._id);
    //     if (idx !== -1) {
    //       const updated = [...prevRides];
    //       updated[idx] = updatedRide;
    //       return updated;
    //     } else {
    //       return [updatedRide, ...prevRides];
    //     }
    //   });
    //   setHighlightedRideId(updatedRide._id);
    //   setTimeout(() => setHighlightedRideId(null), 3000);
    // };

    const handleRideUpdated = (updatedRide) => {
      console.log("🚀 Received updated ride via socket:", updatedRide._id, updatedRide.status);

      const isUserInvolved =
  (updatedRide.creator?._id || updatedRide.creator) === user._id ||
  (updatedRide.acceptor?._id || updatedRide.acceptor) === user._id ||
  updatedRide.interestedUsers.some(
    (i) => (i.user?._id || i.user) === user._id
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

  useEffect(() => {
    const handleNewMessage = ({ rideId: msgRideId }) => {
      if (!isChatOpen || selectedRideForChat !== msgRideId) {
        setUnreadCounts((prev) => ({
          ...prev,
          [msgRideId]: (prev[msgRideId] || 0) + 1,
        }));
      }
    };

    socket.on("new-message", handleNewMessage);
    return () => {
      socket.off("new-message", handleNewMessage);
    };
  }, [isChatOpen, selectedRideForChat]);

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
        // case "accept":
        //   try {
        //     await rideService.acceptInterest(rideId, userId);
        //     toast.success("Ride accepted successfully");
        //   } catch (error) {
        //     console.error("Accept ride failed:", error);
        //     toast.error("Failed to accept user");
        //   }
        //   break;
        case "accept":
          try {
            const updatedRide = await rideService.acceptInterest(
              rideId,
              userId
            );
            toast.success("Ride accepted successfully");

            // Update userRides with the updated ride from backend
            setUserRides((prevRides) =>
              prevRides.map((ride) =>
                ride._id === rideId ? updatedRide : ride
              )
            );
          } catch (error) {
            console.error("Accept ride failed:", error);
            toast.error("Failed to accept user");
          }
          break;
        // case "cancel":
        //   const reason = prompt("Please provide a reason for cancellation:");
        //   await rideService.cancelRide(rideId, reason);

        //   break;
        case "cancel":
          try {
            const reason = prompt("Please provide a reason for cancellation:");
            const updatedRide = await rideService.cancelRide(rideId, reason);

            toast.success("Ride cancelled successfully");

            // Update seats count locally if the current user was accepted before cancellation
            setUserRides((prevRides) =>
              prevRides.map((ride) => {
                if (ride._id === rideId) {
                  // Find current user status before cancellation
                  const userInterest = ride.interestedUsers.find(
                    (i) => i.user?._id === user._id || i.user === user._id
                  );
                  const wasAccepted =
                    userInterest?.status === "accepted" ||
                    userInterest?.status === "started";

                  return {
                    ...updatedRide,
                    seats: wasAccepted ? ride.seats + 1 : ride.seats,
                  };
                }
                return ride;
              })
            );
          } catch (error) {
            console.error("Cancel ride failed:", error);
            toast.error("Failed to cancel ride");
          }
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
    const [openTicketModal, setOpenTicketModal] = useState(false);
    const [ticketReason, setTicketReason] = useState("");
    const [ticketDescription, setTicketDescription] = useState("");
    const issueOptions = [
      "Driver was late",
      "Route deviation",
      "Vehicle was not clean",
      "Misbehavior",
      "Other",
    ];


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

    const getProgressBarClass = (interestStatus, rideStatus) => {
      if (interestStatus === "rejected") return "w-[25%] bg-red-400";
      if (interestStatus === "interested" || interestStatus === "pending")
        return "w-1/4 bg-yellow-400";
      if (interestStatus === "accepted") {
  if (rideStatus === "pending" || rideStatus === "accepted") return "w-1/2 bg-green-500";
  if (rideStatus === "started") return "w-3/4 bg-green-600";
  if (rideStatus === "completed") return "w-full bg-green-700";
}

      return "w-0";
    };

const progressBarClass = isCreator
  ? (() => {
      const anyUserAccepted = ride?.interestedUsers?.some(
        (i) => i.status === "accepted"
      );

      switch (true) {
        case anyUserAccepted && rideStatus === "pending":
        case rideStatus === "accepted":
          return "w-1/2 bg-green-500";
        case rideStatus === "started":
          return "w-3/4 bg-green-500";
        case rideStatus === "completed":
          return "w-full bg-green-500";
        case rideStatus === "cancelled":
          return "w-[50%] bg-red-400";
        default:
          return "w-1/4 bg-green-500"; // pending
      }
    })()
  : getProgressBarClass(userInterest?.status, rideStatus);


const getUserDisplayStatus = (interestStatus, rideStatus) => {
  if (interestStatus === "rejected") return "Rejected";
  if (interestStatus === "interested" || interestStatus === "pending") return "Pending";

  if (interestStatus === "accepted") {
    // ✅ override global ride status if user is accepted
    if (["pending", "accepted"].includes(rideStatus)) return "Accepted";
    return rideStatus.charAt(0).toUpperCase() + rideStatus.slice(1);
  }

  if (interestStatus === "cancelled") return "Cancelled";

  return rideStatus.charAt(0).toUpperCase() + rideStatus.slice(1);
};
console.log("ride status", rideStatus)

    return (
      <Card
        sx={{
          mb: { xs: 2, md: 4 },
          mt: { xs: 2, md: 10 },
          borderRadius: 3,
          border:
            ride._id === highlightedRideId
              ? "2px solid #00e676"
              : "1px solid #e5e7eb",
          transition: "all 0.3s ease-in-out",
          boxShadow:
            ride._id === highlightedRideId
              ? "0 0 16px rgba(0,230,118,0.5)"
              : "0 1px 6px rgba(0,0,0,0.1)",
          pointerEvents:
            ride.status === "cancelled" || isRejected ? "none" : "auto",
          "&:hover": {
            transform: "scale(1.01)",
            boxShadow: "0 6px 24px rgba(0,230,118,0.5)",
          },
        }}
      >
        <CardContent>
          <div className="p-0">
            <div className="p-6">
              <div className="flex  flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="md:text-lg text-md font-bold">
                        {new Date(ride.departureTime).toLocaleTimeString()}
                      </p>
                      <p className="text-sm text-gray-500">{ride.origin}</p>
                    </div>
                    <div className="text-right">
                      <p className="md:text-lg text-sm font-bold">
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

                    {ride.status !== "started" && (
                      <>
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
                        <span>
                          {ride.seats === 0
                            ? "Full"
                            : `${ride.seats} seats available`}{" "}
                          •
                        </span>
                      </>
                    )}

                    <span>{new Date(ride.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[
                      { key: "ac", label: "AC", icon: "❄️" },
                      { key: "pet", label: "Pet friendly", icon: "🐶" },
                      { key: "bagMax", label: "2 bags max", icon: "🧳" },
                      { key: "smoking", label: "Smoking", icon: "🚬" },
                      { key: "music", label: "Music", icon: "🎵" },
                      { key: "luggage", label: "Luggage space", icon: "📦" },
                    ]
                      .filter((pref) => ride.ridePreference?.[pref.key])
                      .map((pref) => (
                        <span
                          key={pref.key}
                          className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-800 text-xs px-3 py-1 font-medium shadow-sm"
                        >
                          <span>{pref.icon}</span>
                          <span>{pref.label}</span>
                        </span>
                      ))}
                  </div>
                  <div className="my-4">
                    <div className="flex items-center justify-between text-xs font-medium text-gray-700">
                      <span
                        className={`${
                          [
                            "pending",
                            "accepted",
                            "started",
                            "completed",
                          ].includes(ride.status) || ride.status === "cancelled"
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      >
                        Requested
                      </span>
                      <span
                        className={`${
                          ["accepted", "started", "completed"].includes(
                            ride.status
                          ) || ride.status === "cancelled"
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      >
                        Accepted
                      </span>
                      <span
                        className={`${
                          ["started", "completed"].includes(ride.status) ||
                          ride.status === "cancelled"
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      >
                        Started
                      </span>
                      <span
                        className={`${
                          ride.status === "completed"
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      >
                        Completed
                      </span>
                    </div>
                    {/* <div className="w-full h-2 mt-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
  className={`h-full transition-all duration-500 ${
    isRejected
      ? "w-[25%] bg-red-400"
      : ride.status === "pending"
      ? "w-1/4 bg-green-500"
      : ride.status === "accepted"
      ? "w-1/2 bg-green-500"
      : ride.status === "started"
      ? "w-3/4 bg-green-500"
      : ride.status === "completed"
      ? "w-full bg-green-500"
      : ride.status === "cancelled"
      ? "w-[50%] bg-red-400"
      : "w-0"
  }`}
/>
</div>
                    
                  </div> */}
                    {/* Progress bar for current logged-in user's status */}
                    <div className="w-full h-2 mt-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${progressBarClass}`}
                      />
                    </div>
                  </div>

                  {/* <p className="text-sm font-semibold text-gray-700 mb-3">
  Status:{" "}
  <span className="capitalize">
    {isRejected ? "Rejected" : ride.status}
  </span>
</p> */}

                  {/* Status text based on user's interest status */}
                  <p className="text-sm font-semibold text-gray-700 mb-3">
  Status:{" "}
  <span className="capitalize">
    {isCreator
      ? ride.status.charAt(0).toUpperCase() + ride.status.slice(1)
      : getUserDisplayStatus(userInterest?.status, ride.status)}
  </span>
</p>


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
                  {/* {isCreator &&
                    ride.interestedUsers?.length > 0 &&
                    ride.status !== "accepted" &&
                    ride.status !== "started" &&
                    ride.status !== "completed" &&
                    ride.status !== "cancelled" && ( */}
                  {isCreator &&
                    ride.interestedUsers?.length > 0 &&
                    !["started", "completed", "cancelled"].includes(
                      ride.status
                    ) && (
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
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexDirection: { xs: "column", sm: "row" },
                                    alignItems: "center",
                                    gap: 2,
                                    mt: 1.5,
                                    flexWrap: "wrap",
                                  }}
                                >
                                  <Button
                                    size="small"
                                    variant="outlined"
                                    color="success"
                                    sx={{
                                      textTransform: "none",
                                      fontWeight: 700,
                                      borderWidth: 2,
                                      px: 4,
                                      py: 1.25,
                                      borderRadius: "9999px", // pill shape
                                      transition: "all 0.3s ease",
                                      background:
                                        "linear-gradient(90deg, #e6f4ea, #d0f0db)",
                                      color: "success.dark",
                                      boxShadow:
                                        "0 2px 8px rgba(44,169,133,0.3)",
                                      "&:hover": {
                                        background:
                                          "linear-gradient(90deg, #1f9d55, #2ca985)",
                                        color: "#fff",
                                        borderColor: "success.dark",
                                        boxShadow:
                                          "0 6px 20px rgba(31,157,85,0.6)",
                                        transform: "scale(1.05)",
                                      },
                                    }}
                                    onClick={() =>
                                      handleDetailsOpen(interest.user._id)
                                    }
                                    startIcon={
                                      <StarIcon
                                        sx={{ color: "success.main" }}
                                      />
                                    }
                                  >
                                    Show Profile
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
                                        width: { xs: 320, sm: 380 },
                                        bgcolor: "background.paper",
                                        borderRadius: 3,
                                        boxShadow: 28,
                                        p: 5,
                                        outline: "none",
                                        maxHeight: "90vh",
                                        overflowY: "auto",
                                      }}
                                    >
                                      <Avatar
                                        src={interest?.user?.profileImage}
                                        alt={interest?.user?.name}
                                        sx={{
                                          width: 100,
                                          height: 100,
                                          mb: 3,
                                          mx: "auto",
                                          border: "3px solid",
                                          borderColor: "success.main",
                                          boxShadow:
                                            "0 0 20px rgba(44, 169, 133, 0.7)",
                                        }}
                                      />
                                      <Typography
                                        variant="h5"
                                        align="center"
                                        gutterBottom
                                        sx={{
                                          fontWeight: "bold",
                                          textTransform: "capitalize",
                                          color: "success.dark",
                                          mb: 3,
                                          letterSpacing: 1,
                                          textShadow:
                                            "0 1px 3px rgba(44,169,133,0.5)",
                                        }}
                                      >
                                        {interest.user?.name || "Unnamed User"}
                                      </Typography>

                                      {[
                                        {
                                          label: "Phone",
                                          value: interest.user?.phone,
                                          icon: "📞",
                                        },
                                        {
                                          label: "Emergency Contact",
                                          value:
                                            interest.user?.emergencyContact,
                                          icon: "🚨",
                                        },
                                        {
                                          label: "Gender",
                                          value: interest.user?.gender,
                                          icon: "⚧",
                                        },
                                        {
                                          label: "Address",
                                          value: interest.user?.address,
                                          icon: "🏠",
                                        },
                                      ].map(({ label, value, icon }) => (
                                        <Box
                                          key={label}
                                          sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mb: 1.8,
                                            px: 2,
                                            borderRadius: 2,
                                            bgcolor: "#e6f4ea",
                                            boxShadow:
                                              "inset 0 0 4px rgba(44,169,133,0.15)",
                                          }}
                                        >
                                          <Typography
                                            sx={{
                                              fontWeight: 700,
                                              color: "success.main",
                                              mr: 2,
                                              fontSize: "1.2rem",
                                            }}
                                          >
                                            {icon}
                                          </Typography>
                                          <Typography
                                            variant="body1"
                                            sx={{
                                              fontWeight: 600,
                                              color: "success.dark",
                                              textTransform: "capitalize",
                                            }}
                                          >
                                            {label}:
                                          </Typography>
                                          <Typography
                                            variant="body2"
                                            sx={{
                                              ml: 1,
                                              fontWeight: 500,
                                              color: "text.primary",
                                            }}
                                          >
                                            {value || "N/A"}
                                          </Typography>
                                        </Box>
                                      ))}

                                      <Button
                                        variant="contained"
                                        color="success"
                                        onClick={handleDetailsClose}
                                        fullWidth
                                        sx={{
                                          mt: 4,
                                          fontWeight: 700,
                                          textTransform: "none",
                                          py: 1.5,
                                          borderRadius: "9999px",
                                          boxShadow:
                                            "0 6px 18px rgba(44, 169, 133, 0.6)",
                                          "&:hover": {
                                            backgroundColor: "success.dark",
                                            boxShadow:
                                              "0 8px 25px rgba(31, 157, 85, 0.8)",
                                            transform: "scale(1.05)",
                                          },
                                        }}
                                      >
                                        Close
                                      </Button>
                                    </Box>
                                  </Modal>
                                  <Button
                                    size="small"
                                    variant="contained"
                                    color="success"
                                    sx={{
                                      fontWeight: 700,
                                      textTransform: "none",
                                      px: 4,
                                      py: 1.25,
                                      borderRadius: "9999px",
                                      boxShadow:
                                        "0 6px 18px rgba(44, 169, 133, 0.6)",
                                      transition: "all 0.3s ease",
                                      "&:hover": {
                                        backgroundColor: "success.dark",
                                        boxShadow:
                                          "0 8px 25px rgba(31, 157, 85, 0.8)",
                                        transform: "scale(1.05)",
                                      },
                                    }}
                                    onClick={() =>
                                      handleStatusChange(
                                        ride._id,
                                        "accept",
                                        interest.user._id
                                      )
                                    }
                                    startIcon={<StarIcon />}
                                  >
                                    Accept This User
                                  </Button>
                                </Box>
                              )}
                          </Box>
                        ))}
                      </Box>
                    )}
                  <div className="flex flex-col sm:flex-row md:flex-row gap-6">
                    {ride?.status === "pending" && !isCreator ? (
                      <button
                        onClick={() => setSelectedRideForDetails(ride)}
                        className="items-center rounded-md text-sm font-medium  px-4 py-2  bg-cyan-600 hover:bg-cyan-700 text-white"
                      >
                        View Details
                      </button>
                    ) : ride?.status !== "completed" &&
                      ride?.status !== "cancelled" &&
                      ride?.status !== "pending" ? (
                      <Tooltip title="View ride details">
                        <button
                          onClick={() => setSelectedRideForDetails(ride)}
                          className="items-center rounded-md text-sm font-medium  px-4 py-2  bg-cyan-600 hover:bg-cyan-700  text-white"
                        >
                          View Details
                        </button>
                      </Tooltip>
                    ) : null}

                    {!isRejected &&
                      isCreator &&
                      hasAcceptedUsers &&
                      ride.status !== "started" &&
                      ride.status !== "completed" &&
                      ride.status !== "cancelled" && (
                        <Tooltip title="start this ride">
                          <button
                            onClick={() =>
                              handleStatusChange(ride._id, "start")
                            }
                            className="items-center rounded-md text-sm font-medium  px-4 py-2  bg-green-600 hover:bg-green-700 text-white"
                          >
                            Start Ride
                          </button>
                        </Tooltip>
                      )}

                    {isCreator && ride.status === "started" && (
                      <Tooltip title="complete this ride">
                        <button
                          onClick={() =>
                            handleStatusChange(ride._id, "complete")
                          }
                          className="items-center rounded-md text-sm font-medium  px-4 py-2  bg-teal-500 hover:bg-teal-600 text-white"
                        >
                          Complete Ride
                        </button>
                      </Tooltip>
                    )}

                    {!isRejected && ride.status === "started" && (
                      <Tooltip title="Navigate using Google Maps">
                        <button
                          onClick={() =>
                            window.open(
                              `https://www.google.com/maps/dir/?api=1&origin=${ride.origin}&destination=${ride.destination}`,
                              "_blank"
                            )
                          }
                          className="items-center rounded-md text-sm font-medium  px-4 py-2  bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                          View Live Map
                        </button>
                      </Tooltip>
                    )}

                    {!isRejected && ["started", "completed"].includes(ride.status) && (
                      <Tooltip title="Raise an issue about this ride">
                        <button
                          onClick={() => setOpenTicketModal(true)}
                          className="items-center rounded-md text-sm font-medium px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white"
                        >
                          Raise Ticket
                        </button>
                      </Tooltip>
                    )}



                    {!isRejected &&
                      ride.status !== "completed" &&
                      ride.status !== "cancelled" &&
                      ride.status !== "started" && (
                        <Tooltip title="cancel this ride">
                          <button
                            onClick={() =>
                              openCancellationDialog(ride._id, "cancel")
                            }
                            className="items-center rounded-md text-sm font-medium  px-4 py-2  bg-red-600 hover:bg-red-700 text-white"
                          >
                            Cancel Ride
                          </button>
                        </Tooltip>
                      )}

                    {isEligibleToReview && ride.status === "completed" && (
                      <button
                        onClick={() => openReviewDialog(ride._id)}
                        className="items-center rounded-md text-sm font-medium  px-4 py-2  bg-emerald-600 hover:bg-emerald-700 text-white"
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
                <div className="flex flex-col items-center text-center gap-4 md:min-w-[150px]">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-emerald-500">
                    <img
                      src={ride.creator?.profileImage}
                      alt={ride.creator?.name}
                      className="object-cover w-full h-full"
                    />
                    {(ride.creator?.isVerified || ride.creator?.isPremium) && (
                      <Tooltip
                        title={
                          ride.creator.isVerified
                            ? "Verified user"
                            : "Premium member"
                        }
                      >
                        <span className="absolute bottom-0 right-0 bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full shadow">
                          {ride.creator.isVerified ? "✔ Verified" : "★ Premium"}
                        </span>
                      </Tooltip>
                    )}
                  </div>
                  <p className="text-sm font-medium text-gray-800">
                    {ride.creator?.name}
                  </p>
                  <div className="flex items-center justify-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill={
                          i < Math.round(ride.creator?.averageRating || 0)
                            ? "currentColor"
                            : "none"
                        }
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className={`w-4 h-4 transition-transform duration-300 ${
                          i < Math.round(ride.creator?.averageRating || 0)
                            ? "text-yellow-500 scale-110"
                            : "text-gray-300"
                        }`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                        />
                      </svg>
                    ))}
                  </div>
                  <span className="text-md text-gray-600 ml-1">
                    {ride.creator?.averageRating?.toFixed(1) || "N/A"}
                  </span>
                  <div className="text-center mt-2">
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
                          className="items-center rounded-md text-sm font-medium  px-4 py-2  bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                          Book
                        </button>
                      )}

                    <Tooltip title="Message the ride owner">
                      <button
                        onClick={() => handleChatClick(ride)}
                        className="relative flex items-center w-full rounded-md text-sm font-medium gap-2 h-9 px-4 py-2 mt-2 bg-emerald-600 hover:bg-green-700 text-white"
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
                        {/* Badge for unread count */}
                        {ride.unreadCount > 0 && (
                          <span className="absolute top-0 left-4 -mt-1 -ml-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                            {ride.unreadCount}
                          </span>
                        )}
                        Contact
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <Modal
  open={openTicketModal}
  onClose={() => setOpenTicketModal(false)}
  closeAfterTransition
>
  <Fade in={openTicketModal}>
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        borderRadius: 3,
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography variant="h6" mb={2}>
        Raise Ticket
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Issue Type</InputLabel>
        <Select
          value={ticketReason}
          onChange={(e) => setTicketReason(e.target.value)}
          label="Issue Type"
        >
          {issueOptions.map((option, i) => (
            <MenuItem key={i} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        multiline
        rows={3}
        label="Describe the issue"
        value={ticketDescription}
        onChange={(e) => setTicketDescription(e.target.value)}
        required={ticketReason === "Other"} 
        error={ticketReason === "Other" && ticketDescription.trim() === ""}
      />

      <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
        <Button onClick={() => setOpenTicketModal(false)}>Cancel</Button>
        <Button
          variant="contained"
          color="error"
          onClick={async () => {
                if (!ticketReason) {
                  toast.error("Please select an issue type.");
                  return;
                }

                if (ticketReason === "Other" && ticketDescription.trim() === "") {
                  toast.error("Please describe the issue when 'Other' is selected.");
                  return;
                }

                try {
                  await api.post(`/rides/${ride._id}/ticket`, {
                    issue: ticketReason === "Other" ? ticketDescription.trim() : ticketReason,
                    category: ticketReason,
                  });


                  toast.success("Ticket raised successfully!");
                  setOpenTicketModal(false);
                  setTicketReason("");
                  setTicketDescription("");
                } catch (error) {
                  console.error("Error raising ticket:", error);
                  toast.error(
                    error?.response?.data?.message || "Failed to raise ticket"
                  );
                }
              }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  </Fade>
</Modal>

      </Card>
    );
  };
  
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: { xs: 12, md: 14 },
        mb: { xs: 3, md: 4 },
        borderRadius: 5,
        px: { xs: 2, md: 2 }, // padding on small screens
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper
            sx={{
              py: { xs: 3, md: 5 },
              px: { xs: 2, md: 10 },
              borderRadius: 5,
              boxShadow: "0 0 16px rgba(0,230,118,0.5)",
              overflowX: "auto", // allow horizontal scroll if needed on small devices
            }}
          >
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", sm: "center" }}
              mb={3}
              gap={{ xs: 2, sm: 0 }}
            >
              <Typography
                variant="h4"
                component="h1"
                textTransform="capitalize"
                color="green"
                sx={{
                  fontSize: { xs: "1.5rem", sm: "2rem", md: "3rem" },
                  wordBreak: "break-word",
                }}
              >
                Welcome, {user?.name}!
              </Typography>
              <Button
                variant="contained"
                sx={{
                  boxShadow: "0 6px 15px seagreen",
                  textTransform: "none",
                  fontWeight: 600,
                  backgroundColor: "seagreen",
                  whiteSpace: "nowrap",
                  "&:hover": {
                    backgroundColor: "seagreen",
                    boxShadow: "0 8px 30px seagreen",
                  },
                  alignSelf: { xs: "auto", sm: "auto" },
                  width: { xs: "full", sm: "auto" },
                }}
                onClick={() => navigate("/offer-ride")}
                fullWidth={{ xs: true, sm: false }}
              >
                Offer a Ride
              </Button>
            </Box>

            <Typography
              variant="h5"
              color="gray"
              sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" }, mb: 2 }}
            >
              Your Rides
            </Typography>

            {loading ? (
              <Stack spacing={3}>
                {[...Array(ridesPerPage)].map((_, i) => (
                  <Skeleton
                    key={i}
                    variant="rectangular"
                    height={120}
                    animation="wave"
                    sx={{ borderRadius: 3 }}
                  />
                ))}
              </Stack>
            ) : userRides.length > 0 ? (
              <>
                {/* Rides grid */}
                <Grid container spacing={4}>
                  {paginatedRides.map((ride) => (
                    <Grid item xs={12} key={ride._id}>
                      <RideCard
                        key={ride._id}
                        ride={ride}
                        unreadCount={unreadCounts[ride._id] || 0}
                        onChatClick={() => handleChatClick(ride._id)}
                      />
                    </Grid>
                  ))}
                </Grid>

                {/* Pagination */}
                {userRides.length > ridesPerPage && (
                  <Stack alignItems="center" mt={5}>
                    <Pagination
                      count={Math.ceil(userRides.length / ridesPerPage)}
                      page={page}
                      onChange={handlePageChange}
                      color="success"
                      shape="rounded"
                      showFirstButton
                      showLastButton
                      siblingCount={1}
                      boundaryCount={1}
                      size={window.innerWidth < 600 ? "small" : "medium"}
                    />
                  </Stack>
                )}
              </>
            ) : (
              <Typography
                color="text.secondary"
                textAlign="center"
                mt={8}
                fontStyle="italic"
                variant="body1"
              >
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
      {/* <Dialog open={isChatOpen} onClose={handleCloseChat}>
        <RideChat
          open={isChatOpen}
          closeChat={handleCloseChat}
          currentUser={currentUser}
          rideId={selectedRideForChat?._id}
        />
      </Dialog> */}
      <RideChat
        open={isChatOpen}
        closeChat={handleCloseChat}
        currentUser={currentUser}
        rideId={selectedRideForChat?._id}
        onOpenChat={() => setIsChatOpen(true)}
      />
    </Container>
  );
};

export default Dashboard;
