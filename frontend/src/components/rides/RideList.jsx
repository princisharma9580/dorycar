import {
  Grid,
  Typography,
  CardContent,
  Container,
  Dialog,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import rideService from "../../services/rideService";
import RideDetailsModal from "./RideDetailsModal";
import RideChat from "./RideChat";

const RideList = ({ currentUser, searchResults }) => {
  const [selectedRide, setSelectedRide] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const navigate = useNavigate();

  const handleBookRide = async (rideId) => {
    console.log("handle book ride:", rideId);
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

  if (!Array.isArray(searchResults) || searchResults.length === 0) {
    return (
      <Typography variant="h6" align="center" color="text.secondary">
        No ride matches your search.
      </Typography>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      <CardContent>
        <Grid container spacing={2}>
          {searchResults.length > 0 ? (
            searchResults.map((ride) => {
              const departure = new Date(ride.departureTime);
              const arrival = new Date(ride.arrivalTime);
              const diffMs = arrival - departure;
              const diffMin = Math.floor(diffMs / 60000);
              const hours = Math.floor(diffMin / 60);
              const minutes = diffMin % 60;
              const durationText = `${hours}h ${minutes}m`;
              return (
                <Grid item xs={12} key={ride._id}>
                  <div
                    data-state="active"
                    data-orientation="horizontal"
                    role="tabpanel"
                    aria-labelledby="radix-«rb»-trigger-all"
                    id="radix-«rb»-content-all"
                    tabIndex="0"
                    className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-6"
                    style={{ animationDuration: "0s" }}
                  >
                    <div
                      className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                      data-v0-t="card"
                    >
                      <div className="p-0">
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1">
                              <div className="flex justify-between mb-4">
                                <div>
                                  <p className="text-lg font-bold">
                                    {new Date(
                                      ride.departureTime
                                    ).toLocaleTimeString()}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {ride.origin}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="text-lg font-bold">
                                    {new Date(
                                      ride.arrivalTime
                                    ).toLocaleTimeString()}
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
                                <span>
                                  {new Date(ride.date).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {[
                                  { key: "ac", label: "AC" },
                                  { key: "pet", label: "Pet friendly" },
                                  { key: "bagMax", label: "2 bags max" },
                                  { key: "smoking", label: "No Smoking" },
                                  { key: "music", label: "Music" },
                                  { key: "luggage", label: "Luggage space" },
                                ]
                                  .filter(
                                    (pref) => ride.ridePreference?.[pref.key]
                                  )
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
                              <button
                                onClick={() => setSelectedRide(ride)}
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground h-10 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 w-[20%] text-white"
                              >
                                View Details
                              </button>
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
                                      {ride.creator?.averageRating?.toFixed(
                                        1
                                      ) || "N/A"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-center">
                                <p className="text-2xl font-bold text-emerald-600">
                                  ₹{ride.price}
                                </p>
                                <button
                                  onClick={() => handleBookRide(ride._id)}
                                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground h-10 px-4 py-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                                >
                                  Book
                                </button>
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
                    </div>
                  </div>
                </Grid>
              );
            })
          ) : (
            <Grid item xs={12}>
              <Typography
                variant="h6"
                align="center"
                color="text.secondary"
                sx={{ mt: 4 }}
              >
                No ride matches your search.
              </Typography>
            </Grid>
          )}
        </Grid>
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
      <Dialog open={isChatOpen && !!selectedRide}>
        <RideChat
          open={isChatOpen}
          closeChat={() => {
            setIsChatOpen(false);
            setSelectedRide(null);
          }}
          currentUser={currentUser}
          rideId={selectedRide?._id}
        />
      </Dialog>
    </Container>
  );
};

export default RideList;
