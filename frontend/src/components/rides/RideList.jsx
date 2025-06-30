import React, { useState, useEffect } from "react"; 

import {
  Container,
  Typography,
  CardContent,
  Grid,
  Box,
  Card,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import rideService from "../../services/rideService";
import RideDetailsModal from "./RideDetailsModal";
import RideChat from "./RideChat";

const RideList = ({ currentUser}) => {
  const [searchResults, setSearchResults] = useState([]); 
  const [selectedRide, setSelectedRide] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const navigate = useNavigate();
  useEffect(() => {
    const fetchRides = async () => {
      try {
        const res = await rideService.getRides();
        setSearchResults(res);
        console.log("Fetched rides:", res); // ✅ Moved here
      } catch (error) {
        console.error("Failed to fetch rides", error);
      }
    };

    fetchRides();
  }, []);
   console.log("Search results:", searchResults); // ✅ Moved here

  // Defensive: ensure searchResults is an array
  const rides = Array.isArray(searchResults) && searchResults.length > 0 ? searchResults : [];

  const totalPages = Math.ceil(rides.length / pageSize);

  const paginatedRides = rides.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleBookRide = async (rideId) => {
    try {
      await rideService.expressInterest(rideId);
      toast.success("Ride booked successfully!");
      navigate("/dashboard");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to book ride";
      const redirectPath = error?.response?.data?.redirectTo;
      const missingFields = error?.response?.data?.missingFields;

      if (missingFields && missingFields.length > 0) {
        const message = `Please complete the following fields in your profile: ${missingFields.join(
          ", "
        )}`;
        toast.error(message);
      } else {
        toast.error(errorMessage);
      }

      if (redirectPath) {
        setTimeout(() => navigate(redirectPath), 2000);
      }
    }
  };

  const handleChatClick = (ride) => {
    setIsChatOpen(true);
    setSelectedRide(ride);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
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

  if (rides.length === 0) {
    return (
      <Container maxWidth="xl" sx={{ my: 4 }}>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mt: 4 }}
        >
          No ride matches your search.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      <CardContent>
        <Grid container spacing={2}>
          {paginatedRides.length > 0 &&
            paginatedRides.map((ride) => {
              const departure = new Date(ride.departureTime);
              const arrival = new Date(ride.arrivalTime);
              const diffMs = arrival - departure;
              const diffMin = Math.floor(diffMs / 60000);
              const hours = Math.floor(diffMin / 60);
              const minutes = diffMin % 60;
              const durationText = `${hours}h ${minutes}m`;

              return (
                <Grid
                  item
                  xs={12}
                  key={ride._id}
                  sx={{
                    mb: 4,
                    mt: { xs: 2, md: 8 },
                    borderRadius: 3,
                    overflow: "hidden",
                    border: "2px solid #e5e7eb",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.01)",
                    },
                  }}
                >
                  <Card sx={{ borderRadius: 3, boxShadow: "none" }}>
                    <CardContent>
                      <div className="p-0">
                        <div className="p-6">
                          <div
                            className="flex flex-col md:flex-row gap-6"
                            style={{ minWidth: 0 }}
                          >
                            <div
                              className="flex-1"
                              style={{
                                minWidth: 0,
                                overflowWrap: "break-word",
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                              }}
                            >
                              <div
                                className="flex justify-between mb-4"
                                style={{ minWidth: 0 }}
                              >
                                <div
                                  style={{
                                    minWidth: 0,
                                    overflowWrap: "break-word",
                                    wordBreak: "break-word",
                                    whiteSpace: "normal",
                                  }}
                                >
                                  <p className="md:text-lg text-md font-bold">
                                    {departure.toLocaleTimeString()}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {ride.origin}
                                  </p>
                                </div>
                                <div
                                  className="text-right"
                                  style={{
                                    minWidth: 0,
                                    overflowWrap: "break-word",
                                    wordBreak: "break-word",
                                    whiteSpace: "normal",
                                  }}
                                >
                                  <p className="md:text-lg text-sm font-bold">
                                    {arrival.toLocaleTimeString()}
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
                              <div className="flex items-center text-sm text-gray-600 mb-4 flex-wrap gap-1">
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
                                  className="lucide lucide-clock h-4 w-4 mr-1 flex-shrink-0"
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
                                  className="lucide lucide-users h-4 w-4 mx-1 flex-shrink-0"
                                >
                                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                  <circle cx="9" cy="7" r="4"></circle>
                                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                                <span>{ride.seats} seats available • </span>
                                <span>
                                  {ride.date
                                    ? new Date(ride.date).toLocaleDateString()
                                    : ""}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {[
                                  { key: "ac", label: "AC", icon: "❄️" },
                                  {
                                    key: "pet",
                                    label: "Pet friendly",
                                    icon: "🐶",
                                  },
                                  {
                                    key: "bagMax",
                                    label: "2 bags max",
                                    icon: "🧳",
                                  },
                                  {
                                    key: "smoking",
                                    label: "Smoking",
                                    icon: "🚬",
                                  },
                                  { key: "music", label: "Music", icon: "🎵" },
                                  {
                                    key: "luggage",
                                    label: "Luggage space",
                                    icon: "📦",
                                  },
                                ]
                                  .filter(
                                    (pref) => ride.ridePreference?.[pref.key]
                                  )
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
                              <button
                                onClick={() => setSelectedRide(ride)}
                                className="items-center rounded-md text-sm font-medium px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                              >
                                View Details
                              </button>
                            </div>
                            <div
                              className="flex flex-col justify-between  items-center md:items-end gap-4 md:min-w-[150px]"
                              style={{ minWidth: 0 }}
                            >
                              <div
                                className="flex flex-col items-center"
                                style={{ minWidth: 0 }}
                              >
                                <span className="relative flex shrink-0 overflow-hidden rounded-full h-12 w-12 mb-2">
                                  <img
                                    className="aspect-square h-full w-full max-w-full"
                                    alt={ride.creator?.name}
                                    src={ride.creator?.profileImage}
                                    style={{ height: "auto", maxWidth: "100%" }}
                                  />
                                </span>
                                <div
                                  className="text-center"
                                  style={{ minWidth: 0 }}
                                >
                                  <p
                                    className="font-medium text-sm"
                                    style={{ whiteSpace: "normal" }}
                                  >
                                    {ride.creator?.name}
                                  </p>
                                  <div className="flex items-center justify-center">
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
                                    <span
                                      className="text-xs"
                                      style={{ whiteSpace: "normal" }}
                                    >
                                      {ride.creator?.averageRating?.toFixed(
                                        1
                                      ) || "N/A"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="text-center"
                                style={{ minWidth: 0 }}
                              >
                                <p
                                  className="text-2xl font-bold text-emerald-600"
                                  style={{ whiteSpace: "normal" }}
                                >
                                  ₹{ride.price}
                                </p>
                                <button
                                  onClick={() => handleBookRide(ride._id)}
                                  className="items-center rounded-md text-sm font-medium px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                                >
                                  Book
                                </button>
                                <button
                                  onClick={() => handleChatClick(ride)}
                                  className="inline-flex items-center justify-center gap-2 whitespace-normal text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 w-full mt-2"
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
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
        </Grid>

        {totalPages > 1 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 4,
              gap: 2,
            }}
          >
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md border border-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            {[...Array(totalPages).keys()].map((num) => {
              const pageNum = num + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`px-4 py-2 rounded-md border ${
                    pageNum === currentPage
                      ? "bg-emerald-600 text-white"
                      : "border-gray-300"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md border border-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </Box>
        )}
      </CardContent>

      {selectedRide && !isChatOpen && (
        <RideDetailsModal
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
        />
      )}

      <RideChat
        open={isChatOpen && !!selectedRide}
        closeChat={() => {
          setIsChatOpen(false);
          setSelectedRide(null);
        }}
        currentUser={currentUser}
        rideId={selectedRide?._id}
        onOpenChat={() => setIsChatOpen(true)}
      />
    </Container>
  );
};

export default RideList;
