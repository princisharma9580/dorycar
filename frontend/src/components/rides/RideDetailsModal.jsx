import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Avatar,
  Box,
  Button,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import MessageIcon from "@mui/icons-material/Message";
import { useMemo } from "react";

const RideDetailsModal = ({
  selectedRide,
  onClose,
  onBook,
  onChat,
  onMap,
  onShare,
  currentUser,
}) => {
  if (!selectedRide) return null;

  const isCreator = selectedRide.creator?._id === currentUser?.user?._id;

  const filteredInterestedUsers = useMemo(() => {
    if (!selectedRide?.interestedUsers || !selectedRide?.creator?._id) return [];
    return selectedRide?.interestedUsers.filter(
      (entry) => entry?.user?._id !== selectedRide?.creator?._id
    );
  }, [selectedRide]);

  const sectionBoxStyles = {
    bgcolor: "#e8f5f2",
    p: { xs: 2, sm: 3 },
    borderRadius: 3,
    boxShadow: "0 4px 15px rgba(44, 169, 133, 0.25)",
    mb: 4,
  };

  const labelStyles = {
    fontWeight: 700,
    color: "#1f9d55",
    mb: 1,
    fontSize: { xs: "1rem", sm: "1.2rem" },
  };

  const valueStyles = {
    color: "#2a2a2a",
    fontWeight: 500,
    mb: 1.2,
    lineHeight: 1.5,
    fontSize: { xs: "0.85rem", sm: "1rem" },
  };

  const renderCreatorInfo = () => (
    <>
      <Box
        display="flex"
        alignItems="center"
        gap={3}
        mb={4}
        sx={{
          ...sectionBoxStyles,
          flexDirection: { xs: "column", sm: "row" },
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        <Avatar
          src={selectedRide.creator?.profileImage}
          alt={selectedRide.creator?.name}
          sx={{
            width: { xs: 70, sm: 90 },
            height: { xs: 70, sm: 90 },
            border: "3px solid #2ca985",
            boxShadow: "0 0 10px #2ca985",
            mb: { xs: 2, sm: 0 },
            mx: { xs: "auto", sm: 0 },
          }}
        />
        <Box sx={{ textTransform: "capitalize" }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="#1f9d55"
            mb={0.5}
            sx={{ fontSize: { xs: "1.3rem", sm: "1.6rem" } }}
          >
            {selectedRide.creator?.name}
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent={{ xs: "center", sm: "flex-start" }}
            sx={{ color: "#fbc02d", fontSize: { xs: "1rem", sm: "1.2rem" } }}
          >
            <StarIcon sx={{ mr: 0.7 }} />
            <Typography
              variant="body1"
              fontWeight={700}
              color="#1f9d55"
              sx={{ userSelect: "none" }}
            >
              {selectedRide.creator?.averageRating?.toFixed(1) || "N/A"} (
              {selectedRide.creator?.ratings?.length ?? 0} rides)
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Basic Details */}
      <Box sx={sectionBoxStyles}>
        <Typography variant="h6" sx={labelStyles}>
          Basic Details
        </Typography>
        <Typography sx={valueStyles}>
          <strong>Gender:</strong> {selectedRide.creator?.gender || "N/A"}
        </Typography>
        <Typography sx={valueStyles}>
          <strong>Contact:</strong> {selectedRide.creator?.phone || "N/A"}
        </Typography>
        <Typography sx={valueStyles}>
          <strong>Emergency Contact:</strong>{" "}
          {selectedRide.creator?.emergencyContact || "N/A"}
        </Typography>
        <Typography sx={valueStyles}>
          <strong>Address:</strong> {selectedRide.creator?.address || "N/A"}
        </Typography>
        <Typography sx={valueStyles}>
          <strong>ID Proof:</strong>{" "}
          {selectedRide.creator?.idProof ? (
            <Typography
              component="span"
              sx={{ color: "#2ca985", fontWeight: "bold" }}
            >
              Uploaded
            </Typography>
          ) : (
            "Not Uploaded"
          )}
        </Typography>
      </Box>

      {/* Vehicle Info */}
      <Box sx={sectionBoxStyles}>
        <Typography variant="h6" sx={labelStyles}>
          Vehicle Info
        </Typography>
        {selectedRide.creator?.vehicle ? (
          <>
            <Typography sx={valueStyles}>
              <strong>Car:</strong> {selectedRide.creator.vehicle.make || "N/A"}
            </Typography>
            <Typography sx={valueStyles}>
              <strong>Model:</strong> {selectedRide.creator.vehicle.model || "N/A"}
            </Typography>
            <Typography sx={valueStyles}>
              <strong>Color:</strong> {selectedRide.creator.vehicle.color || "N/A"}
            </Typography>
            <Typography sx={valueStyles}>
              <strong>Registration:</strong>{" "}
              {selectedRide.creator.vehicle.registration || "N/A"}
            </Typography>
            <Typography sx={valueStyles}>
              <strong>Year:</strong> {selectedRide.creator.vehicle.year || "N/A"}
            </Typography>
            <Typography sx={valueStyles}>
              <strong>Fuel Type:</strong> {selectedRide.creator.vehicle.fuel || "N/A"}
            </Typography>
          </>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Vehicle info not available
          </Typography>
        )}
      </Box>

      {/* Fare and Payment */}
      <Box sx={sectionBoxStyles}>
        <Typography variant="h6" sx={labelStyles}>
          Fare and Payment
        </Typography>
        <Typography sx={valueStyles}>
          <strong>From:</strong> {selectedRide.origin || "N/A"}
        </Typography>
        <Typography sx={valueStyles}>
          <strong>To:</strong> {selectedRide.destination || "N/A"}
        </Typography>
        <Typography sx={valueStyles}>
          <strong>Fare per Seat:</strong>{" "}
          <span style={{ color: "#2ca985", fontWeight: "bold" }}>
            ₹{selectedRide.price || "N/A"}
          </span>
        </Typography>
        <Typography sx={valueStyles}>
          <strong>Payment Methods:</strong>{" "}
          {selectedRide.paymentMethods?.join(", ") || "Not specified"}
        </Typography>
        {selectedRide.upiId && (
          <Typography sx={{ mt: 1, fontWeight: 600, color: "#1f9d55" }}>
            <strong>UPI ID:</strong> {selectedRide.upiId}
          </Typography>
        )}
        {selectedRide.qrImageUrl && (
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography
              sx={{ fontWeight: 600, mb: 1, color: "#1f9d55" }}
              variant="body1"
            >
              QR Code
            </Typography>
            <img
              src={selectedRide.qrImageUrl}
              alt="QR Code"
              style={{
                maxWidth: "180px",
                borderRadius: 12,
                boxShadow: "0 6px 15px rgba(44,169,133,0.3)",
              }}
            />
          </Box>
        )}
        {selectedRide.fareSplitShown && (
          <Typography
            color="success.main"
            sx={{ mt: 2, fontWeight: "bold", textAlign: "center" }}
          >
            Fare Split Available
          </Typography>
        )}
      </Box>

      {/* Ride Preferences */}
      <Box sx={sectionBoxStyles}>
        <Typography variant="h6" sx={labelStyles}>
          Preferences
        </Typography>
        <Box component="ul" sx={{ mb: 0, pl: 3 }}>
          <li><strong>AC:</strong> {selectedRide.ridePreference?.ac ? "Yes" : "No"}</li>
          <li><strong>Smoking Allowed:</strong> {selectedRide.ridePreference?.smoking ? "Yes" : "No"}</li>
          <li><strong>Music Allowed:</strong> {selectedRide.ridePreference?.music ? "Yes" : "No"}</li>
          <li><strong>Extra Luggage Allowed:</strong> {selectedRide.ridePreference?.luggage ? "Yes" : "No"}</li>
          <li><strong>Pet Friendly:</strong> {selectedRide.ridePreference?.pet ? "Yes" : "No"}</li>
          <li><strong>2 Bags Max:</strong> {selectedRide.ridePreference?.bagMax ? "Yes" : "No"}</li>
        </Box>
      </Box>
    </>
  );

  const renderInterestedUsers = () => (
    <>
      {filteredInterestedUsers.length > 0 && (
        <>
          {filteredInterestedUsers.map((entry, index) => (
            <Box
              key={entry?.user?._id || index}
              mb={4}
              p={3}
              sx={{
                bgcolor: "#d7f0e3",
                borderRadius: 3,
                boxShadow: "0 4px 14px rgba(44,169,133,0.25)",
                transition: "all 0.3s ease",
                "&:hover": { boxShadow: "0 6px 22px rgba(44,169,133,0.45)" },
                flexDirection: { xs: "column", sm: "row" },
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Avatar
                src={entry?.user?.profileImage || ""}
                sx={{
                  width: { xs: 60, sm: 64 },
                  height: { xs: 60, sm: 64 },
                  border: "2px solid #2ca985",
                  boxShadow: "0 0 10px #2ca985",
                  mb: { xs: 2, sm: 0 },
                  mx: { xs: "auto", sm: 0 },
                }}
                alt={entry?.user?.name}
              />
              <Box sx={{ textTransform: "capitalize", flex: 1 }}>
                <Typography
                  variant="h6"
                  color="#1f9d55"
                  mb={1}
                  sx={{ fontSize: { xs: "1.2rem", sm: "1.4rem" } }}
                >
                  {entry?.user?.name}
                </Typography>
                <Typography gutterBottom sx={{ fontSize: { xs: "0.85rem", sm: "1rem" } }}>
                  <strong>Gender:</strong> {entry?.user?.gender}
                </Typography>
                <Typography gutterBottom sx={{ fontSize: { xs: "0.85rem", sm: "1rem" } }}>
                  <strong>Contact:</strong> {entry?.user?.phone}
                </Typography>
                <Typography gutterBottom sx={{ fontSize: { xs: "0.85rem", sm: "1rem" } }}>
                  <strong>Emergency Contact:</strong> {entry?.user?.emergencyContact}
                </Typography>
                <Typography gutterBottom sx={{ fontSize: { xs: "0.85rem", sm: "1rem" } }}>
                  <strong>Address:</strong> {entry?.user?.address}
                </Typography>
                <Typography gutterBottom sx={{ fontSize: { xs: "0.85rem", sm: "1rem" } }}>
                  <strong>ID Proof:</strong> {entry?.user?.idProof ? "Uploaded" : "Not Uploaded"}
                </Typography>
              </Box>
            </Box>
          ))}
        </>
      )}
    </>
  );

  return (
    <Dialog
      open={true}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      PaperProps={{ sx: { borderRadius: 4, overflowY: "visible" } }}
    >
      <DialogTitle
        sx={{
          background: isCreator
            ? "linear-gradient(to right, #1f9d55, #2ca985)"
            : "linear-gradient(to right, #2ca985, #1f9d55)",
          color: "#fff",
          fontWeight: 800,
          textTransform: "capitalize",
          userSelect: "none",
          fontSize: { xs: "1.3rem", sm: "1.5rem" },
          pb: 1,
          pt: 1.5,
          borderRadius: "12px 12px 0 0",
          boxShadow: "0 4px 12px rgba(44,169,133,0.7)",
        }}
      >
        {isCreator ? "Interested Users" : "Ride Details"}
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          bgcolor: "#f4fbf7",
          p: { xs: 2, sm: 4 },
          maxHeight: "calc(100vh - 160px)",
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: 8 },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#2ca985", borderRadius: 4 },
          "&::-webkit-scrollbar-track": { backgroundColor: "#daf4e7" },
        }}
      >
        {isCreator ? renderInterestedUsers() : renderCreatorInfo()}
      </DialogContent>

      <DialogActions
  sx={{
    p: { xs: 2, sm: 3 },
    justifyContent: { xs: "center", sm: "space-between" }, // Center on small screens, spaced on larger
    flexWrap: "wrap",
    gap: 2,
    backgroundColor: "#d4f1e0",
    borderRadius: "0 0 12px 12px",
    boxShadow: "inset 0 1px 0 0 #a3d8b7",
  }}
>
  {!isCreator &&
    !["completed", "cancelled", "started", "accepted", "waiting"].includes(
      selectedRide?.status
    ) && (
      <Button
        onClick={onBook}
        variant="contained"
        sx={{
          backgroundColor: "#2ca985",
          fontWeight: 700,
          textTransform: "none",
          boxShadow: "0 5px 12px rgba(44,169,133,0.5)",
          "&:hover": {
            backgroundColor: "#1f9d55",
            boxShadow: "0 8px 20px rgba(31,157,85,0.7)",
          },
          minWidth: 120,
          flexGrow: { xs: 1, sm: 0 }, // Grow full width on mobile
        }}
      >
        Book
      </Button>
    )}

  <Box
    sx={{
      display: "flex",
      gap: 1.5,
      flexWrap: "wrap",
      justifyContent: isCreator ? "center" : "flex-end",
      flexGrow: isCreator ? 1 : 0,
      width: { xs: "100%", sm: "auto" },
    }}
  >
    {["Chat", "Map", "Share", "Close"].map((label, idx) => {
      const handlers = {
        Chat: onChat,
        Map: onMap,
        Share: onShare,
        Close: onClose,
      };
      const disabled = ["completed", "cancelled"].includes(selectedRide?.status);
      const isClose = label === "Close";
      return (
        <Button
          key={label}
          onClick={handlers[label]}
          variant={isClose ? "contained" : "outlined"}
          color={isClose ? "error" : "primary"}
          startIcon={label === "Chat" ? <MessageIcon /> : null}
          disabled={["Chat", "Map"].includes(label) && disabled}
          sx={{
            borderColor: "#2ca985",
            color: isClose ? undefined : "#2ca985",
            fontWeight: 700,
            textTransform: "none",
            minWidth: 90,
            flexGrow: { xs: 1, sm: 0 }, // grow full width on mobile
            "&:hover": {
              borderColor: "#1f9d55",
              backgroundColor: isClose ? undefined : "#e6f4ea",
              boxShadow: isClose ? undefined : "0 4px 12px rgba(44,169,133,0.3)",
            },
          }}
        >
          {label}
        </Button>
      );
    })}
  </Box>
</DialogActions>

    </Dialog>
  );
};

export default RideDetailsModal;
