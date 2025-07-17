import { useState, useEffect, useRef } from "react";
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  Fade,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Grow,
  Slide,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import rideService from "../services/rideService";
import Footer from "./Footer";
import { keyframes } from "@mui/system";

// Ring animation keyframes
const pulseRing = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0.6;
  }
  70% {
    transform: scale(1.4);
    opacity: 0;
  }
  100% {
    transform: scale(0.8);
    opacity: 0;
  }
`;

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const genders = ["Male", "Female", "Other"];
const vehicleTypes = ["Car", "SUV", "Bike", "Van"];
const fuelTypes = ["Petrol", "Diesel", "CNG", "Electric"];
const carMakers = [
  "Maruti Suzuki",
  "Hyundai",
  "Tata Motors",
  "Mahindra",
  "Honda",
  "Toyota",
  "Renault",
  "Kia Motors",
  "Volkswagen",
  "Skoda",
  "Audi",
  "BMW",
  "Mercedes-Benz",
  "Jaguar Land Rover",
  "Volvo",
  "Nissan",
  "Ford",
  "Mitsubishi",
  "Datsun",
  "Chevrolet",
];

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    phone: "",
    dob: "",
    profileImage: "",
    emergencyContact: "",
    address: "",
    vehicle: {
      type: "",
      make: "",
      model: "",
      color: "",
      year: "",
      registration: "",
      fuel: "",
    },
    vehicleImage: "",
    rcDocument: "",
    profileImage: "",
    idProof: "",
    license: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [modalTitle, setModalTitle] = useState("");

  const handleOpenModal = (imgSrc, title) => {
    setModalImage(imgSrc);
    setModalTitle(title.replace(/([A-Z])/g, " $1").trim());
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const extractKeyFromUrl = (url) => {
    if (!url) return "";
    try {
      const urlObj = new URL(url);
      return urlObj.pathname.slice(1); // remove leading '/'
    } catch {
      return "";
    }
  };

  // Example: initialize previous keys when loading user data
  const [previousKeys, setPreviousKeys] = useState({
    profileImageKey: "",
    vehicleImageKey: "",
    rcDocumentKey: "",
    idProofKey: "",
    licenseKey: "",
  });

  useEffect(() => {
    console.log("formData.profileImage:", formData.profileImage);
    if (formData.profileImage instanceof File) {
      const previewUrl = URL.createObjectURL(formData.profileImage);
      console.log("Preview URL generated:", previewUrl);
      setProfilePreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    } else if (
      typeof formData.profileImage === "string" &&
      formData.profileImage !== ""
    ) {
      console.log("Using existing image URL:", formData.profileImage);
      setProfilePreview(formData.profileImage);
    } else {
      console.log("No valid profile image found.");
      setProfilePreview("");
    }
  }, [formData.profileImage]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        gender: user.gender || "",
        phone: user.phone || "",
        dob: user.dob || "",
        profileImage: user.profileImage || "",
        emergencyContact: user.emergencyContact || "",
        address: user.address || "",
        vehicle: user.vehicle || {
          type: "",
          make: "",
          model: "",
          color: "",
          year: "",
          registration: "",
          fuel: "",
        },
        vehicleImage: user.vehicleImage || "",
        rcDocument: user.rcDocument || "",
        idProof: user.idProof || "",
        license: user.license || "",
        // profileImage: user.profileImage || "",
      });
      setPreviousKeys({
        profileImageKey: extractKeyFromUrl(user.profileImage),
        vehicleImageKey: extractKeyFromUrl(user.vehicleImage),
        rcDocumentKey: extractKeyFromUrl(user.rcDocument),
        idProofKey: extractKeyFromUrl(user.idProof),
        licenseKey: extractKeyFromUrl(user.license),
      });
    }
  }, [user]);

  useEffect(() => {
    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setFormData((prevFormData) => ({
        ...prevFormData,
        profileImage: previewUrl,
      }));
    }
  }, [selectedFile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const getFileNameFromUrl = (url) => {
    if (!url) return "";
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      return pathname.substring(pathname.lastIndexOf("/") + 1);
    } catch {
      // If invalid URL (maybe just a filename string)
      if (typeof url === "string") {
        return url.split("/").pop();
      }
      return "";
    }
  };

  const handleFileUpload = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [key]: file }));
    }
  };
   
const [activeTab, setActiveTab] = useState("profile");
const profileRef = useRef(null);
const vehicleRef = useRef(null);
const documentRef = useRef(null);

const scrollToSection = (ref, tabName) => {
  setActiveTab(tabName);
  if (ref.current) {
    ref.current.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  }
};

const tabButtonStyle = (tab) => ({
  fontWeight: "bold",
  fontSize: "1.1rem",
  color: "#047857",
  borderBottom: activeTab === tab ? "3px solid #047857" : "none",
  transition: "border 0.3s",
  "&:hover": {
    borderBottom: "2px solid #047857",
  },
});




  const handleSave = async () => {
    const bucket = import.meta.env.VITE_AWS_BUCKET;
    const region = import.meta.env.VITE_AWS_REGION;

    try {
      const token = localStorage.getItem("token"); // or sessionStorage

      let uploadedProfileImage = formData.profileImage;
      let uploadedVehicleImage = formData.vehicleImage;
      let uploadedRcDocument = formData.rcDocument;
      let uploadedIdProof = formData.idProof;
      let uploadedLicense = formData.license;

      // Helper to get presigned URL from backend
      const getPresignedUrl = async (fileType, file) => {
        const extension = file.name.split(".").pop();
        const contentType = file.type;

        const res = await fetch(
          `${API_BASE_URL}/users/presigned-url?fileType=${fileType}&extension=${extension}&contentType=${encodeURIComponent(
            contentType
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(
            `Presigned URL request failed: ${res.status} - ${errorText}`
          );
        }
        return res.json(); // { url, key }
      };

      // Helper to upload file to S3
      const uploadFileToS3 = async (file, url) => {
        try {
          const response = await fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": file.type,
            },
            body: file,
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error("S3 upload failed:", errorText);
            throw new Error("Failed to upload file to S3");
          }

          return true;
        } catch (err) {
          console.error("uploadFileToS3 error:", err);
          return false;
        }
      };

      // Upload profile image
      if (selectedFile) {
        const { url, key } = await getPresignedUrl(
          "profileImage",
          selectedFile
        );

        await uploadFileToS3(selectedFile, url);
        uploadedProfileImage = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
      }
      console.log("Bucket:", bucket);
      console.log("Region:", region);

      // Upload vehicle image if it's a file
      if (formData.vehicleImage instanceof File) {
        const { url, key } = await getPresignedUrl(
          "vehicleImage",
          formData.vehicleImage
        );
        await uploadFileToS3(formData.vehicleImage, url);
        uploadedVehicleImage = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
      }

      // Upload RC document if it's a file
      if (formData.rcDocument instanceof File) {
        const { url, key } = await getPresignedUrl(
          "rcDocument",
          formData.rcDocument
        );
        await uploadFileToS3(formData.rcDocument, url);
        uploadedRcDocument = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
      }

      // Upload ID proof if it's a file
      if (formData.idProof instanceof File) {
        const { url, key } = await getPresignedUrl("idProof", formData.idProof);
        await uploadFileToS3(formData.idProof, url);
        uploadedIdProof = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
      }

      // Upload license if it's a file
      if (formData.license instanceof File) {
        const { url, key } = await getPresignedUrl("license", formData.license);
        await uploadFileToS3(formData.license, url);
        uploadedLicense = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
      }

      const updated = {
        ...formData,
        profileImage: uploadedProfileImage,
        vehicleImage: uploadedVehicleImage,
        rcDocument: uploadedRcDocument,
        idProof: uploadedIdProof,
        license: uploadedLicense,
        previousProfileImageKey:
          uploadedProfileImage !== formData.profileImage
            ? previousKeys.profileImageKey
            : "",
        previousVehicleImageKey:
          uploadedVehicleImage !== formData.vehicleImage
            ? previousKeys.vehicleImageKey
            : "",
        previousRcDocumentKey:
          uploadedRcDocument !== formData.rcDocument
            ? previousKeys.rcDocumentKey
            : "",
        previousIdProofKey:
          uploadedIdProof !== formData.idProof ? previousKeys.idProofKey : "",
        previousLicenseKey:
          uploadedLicense !== formData.license ? previousKeys.licenseKey : "",
        address: formData.address,
        emergencyContact: formData.emergencyContact,
        phone: formData.phone,
        gender: formData.gender,
      };

      console.log("User fetched for interest:", user);

      await rideService.updateUser(user._id, updated);
      updateUser(updated);
      setFormData(updated);
      // After successful update:
      setPreviousKeys({
        profileImageKey: extractKeyFromUrl(updated.profileImage),
        vehicleImageKey: extractKeyFromUrl(updated.vehicleImage),
        rcDocumentKey: extractKeyFromUrl(updated.rcDocument),
        idProofKey: extractKeyFromUrl(updated.idProof),
        licenseKey: extractKeyFromUrl(updated.license),
      });
      // Also update local state here!
      setEditMode(false);
    } catch (err) {
      console.error("Failed to update profile:", err.message);
    }
  };

  if (!user) return null;

  return (
    <>
      <Fade in timeout={800}>
        <Box
          sx={{
            pt: 10,
            pb: 6,
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(to bottom right, #f0fdf4, #d1fae5)",
            transition: "all 0.5s ease-in-out",
          }}
        >
          <Grow in timeout={1000}>
            <Paper
              elevation={6}
              sx={{
                p: 5,
                width: "100%",
                maxWidth: 700,
                borderRadius: 4,
                backgroundColor: "#ffffff",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: 2,
                  position: "relative",
                }}
              >
                {/* Animated Ring */}
                <Box
                  sx={{
                    position: "absolute",
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    backgroundColor: "#34d399",
                    animation: `${pulseRing} 2s infinite ease-out`,
                    zIndex: 0,
                  }}
                />

                {/* Avatar Container */}
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    overflow: "hidden",
                    position: "relative",
                    boxShadow: "0 0 12px #34d399",
                    zIndex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    "&:hover .avatar-img": {
                      transform: "scale(1.05)",
                    },
                    "&:hover .avatar-overlay": {
                      opacity: 1,
                    },
                  }}
                  onClick={() =>
                    handleOpenModal(profilePreview, "Profile Image")
                  }
                >
                  <Avatar
                    src={profilePreview}
                    alt={user.name}
                    className="avatar-img"
                    sx={{
                      width: "100%",
                      height: "100%",
                      transition: "transform 0.3s ease-in-out",
                    }}
                  />

                  <Box
                    className="avatar-overlay"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      backgroundColor: "rgba(0, 0, 0, 0.4)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#fff",
                      opacity: 0,
                      transition: "opacity 0.3s ease-in-out",
                      zIndex: 2,
                    }}
                  >
                    {!editMode ? (
                      <Typography variant="caption">View</Typography>
                    ) : null}
                  </Box>
                </Box>

                {/* Camera Icon Outside (only in edit mode) */}
                {editMode && (
                  <IconButton
                    component="label"
                    sx={{
                      position: "absolute",
                      bottom: -20,
                      left: "50%",
                      transform: "translateX(-50%)",
                      bgcolor: "#f9fafb",
                      border: "2px solid #d1d5db",
                      boxShadow: 3,
                      p: 1.2,
                      zIndex: 3,
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        bgcolor: "#f3f4f6",
                        transform: "translateX(-50%) scale(1.05)",
                      },
                    }}
                  >
                    <PhotoCamera color="action" />
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                  </IconButton>
                )}
              </Box>

              {/* Title */}
              <Typography
                variant="h5"
                align="center"
                fontWeight="bold"
                gutterBottom
                sx={{ color: "#047857", transition: "color 0.3s" }}
              >
                {editMode ? "Edit Your Profile" : user.name}
              </Typography>

              {user.averageRating > 0 && (
                <Typography align="center" sx={{ mt: 1, mb: 2 }}>
                  <strong>Your Rating:</strong>{" "}
                  <span style={{ color: "#fbbf24", fontSize: "1.2rem" }}>
                    {"★".repeat(Math.round(user.averageRating))}
                    {"☆".repeat(5 - Math.round(user.averageRating))} (
                    {user.averageRating.toFixed(1)})
                  </span>
                </Typography>
              )}

              <Divider sx={{ mb: 3 }} />

              {/* Form or Read View */}
              <Collapse in={editMode}>
                   {/* Tab Buttons (edit mode) */}
                   <Box sx={{ display: "flex", justifyContent: "center", gap: 4, mb: 3 }}>
                      <Button sx={tabButtonStyle("profile")} onClick={() => scrollToSection(profileRef, "profile")}>Profile Info</Button>
                      <Button sx={tabButtonStyle("vehicle")} onClick={() => scrollToSection(vehicleRef, "vehicle")}>Vehicle Info</Button>
                      <Button sx={tabButtonStyle("documents")} onClick={() => scrollToSection(documentRef, "documents")}>Documents</Button>
                    </Box>


                      <Box
                        sx={{
                          display: "flex",
                          overflowX: "auto",
                          gap: 3,
                          scrollSnapType: "x mandatory",
                          px: 1,
                          pb: 2,
                        }}
                      >
                        {/* Profile Info Form */}
                        <Paper   ref={profileRef}
                          sx={{
                            flex: "0 0 100%",
                            p: 3,
                            scrollSnapAlign: "start",
                            borderRadius: 3,
                            boxShadow: 4,
                            background: "#f0fdf4",
                            minWidth: 300,
                          }}
                        >
                          <Typography variant="h6" sx={{ mb: 2, color: "#047857" }}>
                            Profile Information
                          </Typography>
                          {[
                            { name: "name", label: "Name" },
                            { name: "email", label: "Email" },
                            { name: "phone", label: "Phone" },
                            { name: "dob", label: "DOB" },
                            { name: "emergencyContact", label: "Emergency Contact" },
                            { name: "address", label: "Address" },
                          ].map((field) => (
                            <TextField
                              key={field.name}
                              fullWidth
                              name={field.name}
                              label={field.label}
                              value={formData[field.name]}
                              onChange={handleChange}
                              sx={{ mb: 2 }}
                            />
                          ))}

                          {/* Gender */}
                          <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Gender</InputLabel>
                            <Select
                              name="gender"
                              value={formData.gender}
                              onChange={handleChange}
                              label="Gender"
                            >
                              {genders.map((g) => (
                                <MenuItem key={g} value={g}>
                                  {g}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Paper>

                        {/* Vehicle Info Form */}
                        <Paper   ref={vehicleRef}
                          sx={{
                            flex: "0 0 100%",
                            p: 3,
                            scrollSnapAlign: "start",
                            borderRadius: 3,
                            boxShadow: 4,
                            background: "#ecfdf5",
                            minWidth: 300,
                          }}
                        >
                          <Typography variant="h6" sx={{ mb: 2, color: "#065f46" }}>
                            Vehicle Information
                          </Typography>

                          {[
                            ["vehicle", "type", "Vehicle Type", vehicleTypes],
                            ["vehicle", "make", "Make", carMakers],
                            ["vehicle", "fuel", "Fuel Type", fuelTypes],
                          ].map(([section, field, label, options]) => (
                            <FormControl fullWidth sx={{ mb: 2 }} key={field}>
                              <InputLabel>{label}</InputLabel>
                              <Select
                                value={formData[section][field]}
                                onChange={(e) =>
                                  handleNestedChange(section, field, e.target.value)
                                }
                              >
                                {options.map((opt) => (
                                  <MenuItem key={opt} value={opt}>
                                    {opt}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          ))}

                          {["model", "color", "year", "registration"].map((field) => (
                            <TextField
                              key={field}
                              fullWidth
                              label={field.charAt(0).toUpperCase() + field.slice(1)}
                              value={formData.vehicle[field]}
                              onChange={(e) =>
                                handleNestedChange("vehicle", field, e.target.value)
                              }
                              sx={{ mb: 2 }}
                            />
                          ))}
                        </Paper>

                        {/* Documents Uploads */}
                        <Paper  ref={documentRef}
                          sx={{
                            flex: "0 0 100%",
                            p: 3,
                            scrollSnapAlign: "start",
                            borderRadius: 3,
                            boxShadow: 4,
                            background: "#e0f2f1",
                            minWidth: 300,
                          }}
                        >
                          <Typography variant="h6" sx={{ mb: 2, color: "#004d40" }}>
                            Upload Documents
                          </Typography>
                          {[
                            ["vehicleImage", "Vehicle Image"],
                            ["rcDocument", "RC Document"],
                            ["idProof", "ID Proof"],
                            ["license", "License"],
                          ].map(([field, label]) => (
                            <Button
                              key={field}
                              component="label"
                              variant="outlined"
                              fullWidth
                              sx={{
                                mb: 2,
                                color: "#059669",
                                borderColor: "#059669",
                                "&:hover": {
                                  borderColor: "#047857",
                                  backgroundColor: "#ecfdf5",
                                },
                              }}
                            >
                              {formData[field] instanceof File
                                ? formData[field].name
                                : getFileNameFromUrl(formData[field]) || `Upload ${label}`}
                              <input
                                type="file"
                                hidden
                                onChange={(e) => handleFileUpload(e, field)}
                              />
                            </Button>
                          ))}
                        </Paper>
                      </Box>

                      {/* Buttons Below the Scroll Section */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mt: 3,
                        }}
                      >
                        <Button
                          variant="contained"
                          onClick={handleSave}
                          sx={{
                            backgroundColor: "#059669",
                            "&:hover": {
                              backgroundColor: "#047857",
                            },
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => setEditMode(false)}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Collapse>




{/* Tab Buttons (replacing scrollbar) */}
{!editMode && (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      gap: 4,
      mb: 3,
    }}
  >
    <Button
      onClick={() => scrollToSection(profileRef)}
      sx={{
        fontWeight: "bold",
        fontSize: "1.05rem",
        color: "#047857",
        borderBottom: "2px solid transparent",
        "&:hover": { borderBottom: "2px solid #047857" },
      }}
    >
      Profile Info
    </Button>
    <Button
      onClick={() => scrollToSection(vehicleRef)}
      sx={{
        fontWeight: "bold",
        fontSize: "1.05rem",
        color: "#047857",
        borderBottom: "2px solid transparent",
        "&:hover": { borderBottom: "2px solid #047857" },
      }}
    >
      Vehicle Info
    </Button>
    <Button
      onClick={() => scrollToSection(documentRef)}
      sx={{
        fontWeight: "bold",
        fontSize: "1.05rem",
        color: "#047857",
        borderBottom: "2px solid transparent",
        "&:hover": { borderBottom: "2px solid #047857" },
      }}
    >
      Documents
    </Button>
  </Box>
)}



{/*Non editable section */}

             <Collapse in={!editMode}>
  <Box
    sx={{
      display: "flex",
      overflowX: "auto",
      gap: 3,
      scrollSnapType: "x mandatory",
      px: 1,
      pb: 2,
    }}
  >
    {/* Profile Info Card */}
    <Paper ref={profileRef}
      sx={{
        flex: "0 0 100%",
        p: 3,
        scrollSnapAlign: "start",
        borderRadius: 3,
        boxShadow: 4,
        background: "#f0fdf4",
        minWidth: 300,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, color: "#047857" }}>
        Profile Information
      </Typography>
      {[
        ["Name", user.name],
        ["Email", user.email],
        ["Phone", user.phone],
        ["Gender", user.gender],
        ["DOB", formData.dob],
        ["Emergency Contact", formData.emergencyContact],
        ["Address", formData.address],
      ].map(
        ([label, value]) =>
          value && (
            <Typography key={label} sx={{ mb: 1 }}>
              <strong>{label}:</strong> {value}
            </Typography>
          )
      )}
    </Paper>

    {/* Vehicle Info Card */}
    {formData.vehicle?.type && (
      <Paper  ref={vehicleRef}
        sx={{
          flex: "0 0 100%",
          p: 3,
          scrollSnapAlign: "start",
          borderRadius: 3,
          boxShadow: 4,
          background: "#ecfdf5",
          minWidth: 300,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: "#065f46" }}>
          Vehicle Information
        </Typography>
        {[
          ["Type", formData.vehicle.type],
          ["Make", formData.vehicle.make],
          ["Model", formData.vehicle.model],
          ["Color", formData.vehicle.color],
          ["Year", formData.vehicle.year],
          ["Registration", formData.vehicle.registration],
          ["Fuel", formData.vehicle.fuel],
        ].map(
          ([label, value]) =>
            value && (
              <Typography key={label} sx={{ mb: 1 }}>
                <strong>{label}:</strong> {value}
              </Typography>
            )
        )}
      </Paper>
    )}

    {/* Documents Card */}
    <Paper  ref={documentRef}
      sx={{
        flex: "0 0 100%",
        p: 3,
        scrollSnapAlign: "start",
        borderRadius: 3,
        boxShadow: 4,
        background: "#e0f2f1",
        minWidth: 300,
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, color: "#004d40" }}>
        Uploaded Documents
      </Typography>
      {["idProof", "license", "rcDocument", "vehicleImage"].map(
        (docKey) =>
          formData[docKey] && (
            <Box
              key={docKey}
              sx={{
                width: "100%",
                mb: 2,
                position: "relative",
                overflow: "hidden",
                borderRadius: 2,
                border: "1px solid #e5e7eb",
                p: 1,
                cursor: "pointer",
                "&:hover .doc-title": {
                  opacity: 1,
                  transform: "translateY(0)",
                },
                "&:hover img": {
                  transform: "scale(1.05)",
                },
              }}
              onClick={() => handleOpenModal(formData[docKey], docKey)}
            >
              <img
                src={formData[docKey]}
                alt={docKey}
                style={{
                  width: "100%",
                  height: 150,
                  objectFit: "contain",
                  transition: "transform 0.3s ease",
                }}
              />
              <Box
                className="doc-title"
                sx={{
                  position: "absolute",
                  bottom: 8,
                  left: 8,
                  right: 8,
                  backgroundColor: "rgba(0,0,0,0.6)",
                  color: "white",
                  borderRadius: 1,
                  px: 1,
                  py: 0.5,
                  opacity: 0,
                  transform: "translateY(10px)",
                  transition: "all 0.3s ease",
                  fontSize: 14,
                }}
              >
                {docKey.replace(/([A-Z])/g, " $1").trim()}
              </Box>
            </Box>
          )
      )}
    </Paper>
  </Box>

  <Box sx={{ mt: 3 }}>
    <Button
      fullWidth
      variant="contained"
      sx={{
        backgroundColor: "#059669",
        "&:hover": { backgroundColor: "#047857" },
      }}
      onClick={() => setEditMode(true)}
    >
      Edit Profile
    </Button>
  </Box>
</Collapse>




            </Paper>
          </Grow>
        </Box>
      </Fade>
      <Footer />
      {/* Lightbox Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{modalTitle}</DialogTitle>
        <DialogContent sx={{ textAlign: "center" }}>
          <img
            src={modalImage}
            alt={modalTitle}
            style={{ width: "100%", maxHeight: "80vh", objectFit: "contain" }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Profile;
