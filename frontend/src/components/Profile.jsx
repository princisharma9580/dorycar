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
  Grid,
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
const editScrollContainerRef = useRef(null);



const scrollToSection = (ref, tabName) => {
  setActiveTab(tabName);
  if (editMode && editScrollContainerRef.current && ref.current) {
    const container = editScrollContainerRef.current;
    const card = ref.current;
    container.scrollTo({
      left: card.offsetLeft - container.offsetLeft,
      behavior: "smooth",
    });
  } else if (!editMode && ref.current) {
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
            pt: 14,
            pb: 6,
            minHeight: "100vh",
            width: "100%",
            background: "linear-gradient(to bottom right, #d1fae5, #b2e7ceff)", // ✅ green gradient
            transition: "all 0.5s ease-in-out",
          }}
        >


          <Grow in timeout={1000}>
            <Paper
              elevation={6}
              sx={{
                p: { xs: 2, sm: 3, md: 4 },
                width: "90%",
                mx: "auto",
                borderRadius: 4,
                backgroundColor: "#ffffff",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              }}
            >

              
              

              {/* Form or Read View */}
        
<Collapse in={editMode}>
  

  <Grid container spacing={4} sx={{ px: { xs: 2, sm: 4, md: 6 }, mt: 2, mb: 4, alignItems: "stretch" }}>
    {/* Left: Profile Avatar and Info */}
    <Grid item xs={12} md={4}>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Avatar Container */}
        <Box
          sx={{
            width: 120,
            height: 120,
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
          onClick={() => handleOpenModal(profilePreview, "Profile Image")}
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
            <Typography variant="caption">View</Typography>
          </Box>
        </Box>

        {/* Camera Icon */}
        <IconButton
  component="label"
  sx={{
    mt: 2,
    bgcolor: "#f9fafb",
    border: "2px solid #d1d5db",
    boxShadow: 3,
    p: 1.2,
    zIndex: 3,
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      bgcolor: "#f3f4f6",
      transform: "scale(1.05)",
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


        <Typography
          variant="h6"
          align="center"
          fontWeight="bold"
          sx={{ color: "#047857", mt: 6 }}
        >
          Edit Your Profile
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
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{
            backgroundColor: "#059669",
            "&:hover": { backgroundColor: "#047857" },
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

      </Box>
    </Grid>

    {/* Right: Editable Cards */}
    <Grid item xs={12} md={8}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper ref={profileRef} sx={{ p: 3, borderRadius: 3, backgroundColor: "#d1fae5", height: "100%", boxShadow: "0px 4px 20px rgba(0,0,0,0.08)", transition: "transform 0.3s ease, box-shadow 0.3s ease", "&:hover": { transform: "translateY(-4px)", boxShadow: "0px 6px 25px rgba(0,0,0,0.15)" } }}>
            <Typography variant="h6" sx={{ mb: 2, color: "#047857" }}>Profile Information</Typography>
            {["name", "email", "phone", "dob", "emergencyContact", "address"].map((field) => (
              <TextField
                key={field}
                fullWidth
                name={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
            ))}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Gender</InputLabel>
              <Select name="gender" value={formData.gender} onChange={handleChange} label="Gender">
                {genders.map((g) => <MenuItem key={g} value={g}>{g}</MenuItem>)}
              </Select>
            </FormControl>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper ref={vehicleRef} sx={{ p: 3, borderRadius: 3, backgroundColor: "#d1fae5", height: "100%", boxShadow: "0px 4px 20px rgba(0,0,0,0.08)", transition: "transform 0.3s ease, box-shadow 0.3s ease", "&:hover": { transform: "translateY(-4px)", boxShadow: "0px 6px 25px rgba(0,0,0,0.15)" } }}>
            <Typography variant="h6" sx={{ mb: 2, color: "#047857" }}>Vehicle Information</Typography>
            {["type", "make", "fuel"].map((field) => (
              <FormControl fullWidth sx={{ mb: 2 }} key={field}>
                <InputLabel>{field.charAt(0).toUpperCase() + field.slice(1)}</InputLabel>
                <Select
                  value={formData.vehicle[field]}
                  onChange={(e) => handleNestedChange("vehicle", field, e.target.value)}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                >
                  {(field === "type" ? vehicleTypes : field === "fuel" ? fuelTypes : carMakers).map((opt) => (
                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
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
                onChange={(e) => handleNestedChange("vehicle", field, e.target.value)}
                sx={{ mb: 2 }}
              />
            ))}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper ref={documentRef} sx={{ p: 3, borderRadius: 3, backgroundColor: "#d1fae5", height: "100%", boxShadow: "0px 4px 20px rgba(0,0,0,0.08)", transition: "transform 0.3s ease, box-shadow 0.3s ease", "&:hover": { transform: "translateY(-4px)", boxShadow: "0px 6px 25px rgba(0,0,0,0.15)" } }}>
            <Typography variant="h6" sx={{ mb: 2, color: "#047857" }}>Upload Documents</Typography>
            {["vehicleImage", "rcDocument", "idProof", "license"].map((field) => (
              <Button key={field} component="label" variant="outlined" fullWidth sx={{ mb: 2, color: "#059669", borderColor: "#059669", "&:hover": { borderColor: "#047857", backgroundColor: "#ecfdf5" } }}>
                {formData[field] instanceof File ? formData[field].name : getFileNameFromUrl(formData[field]) || `Upload ${field}`}
                <input type="file" hidden onChange={(e) => handleFileUpload(e, field)} />
              </Button>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  </Grid>

  {/* <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
    <Button variant="contained" onClick={handleSave} sx={{ backgroundColor: "#059669", "&:hover": { backgroundColor: "#047857" } }}>
      Save
    </Button>
    <Button variant="outlined" color="error" onClick={() => setEditMode(false)}>
      Cancel
    </Button>
  </Box> */}
</Collapse>














{/*Non editable section */}

             <Collapse in={!editMode}>
  <Grid
  container
  spacing={4}
  sx={{
    px: { xs: 2, sm: 4, md: 6 },
    mt: 2,
    mb: 4,
    alignItems: "stretch",
  }}
>

    {/* Left: Profile Avatar and Name */}
    <Grid container spacing={4} sx={{ px: 3, alignItems: "stretch", mb: 3 }}>
  <Grid item xs={12} md={4}>
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Avatar
        src={profilePreview}
        alt={user.name}
        sx={{
          width: 120,
          height: 120,
          mb: 2,
          border: "4px solid #34d399",
          boxShadow: "0 0 15px rgba(52, 211, 153, 0.6)",
        }}
      />
      <Typography variant="h6" fontWeight="bold" sx={{ color: "#047857" }}>
        {user.name}
      </Typography>
      <Typography sx={{ mt: 1, mb: 2 }}>
        <strong>Your Rating:</strong>{" "}
        <span style={{ color: "#fbbf24", fontSize: "1.2rem" }}>
          {"★".repeat(Math.round(user.averageRating || 0))}
          {"☆".repeat(5 - Math.round(user.averageRating || 0))} (
          {(user.averageRating || 0).toFixed(1)})
        </span>
      </Typography>

      {/* Edit Profile Button */}
      {!editMode && (
        <Button
          variant="contained"
          onClick={() => setEditMode(true)}
          sx={{
            backgroundColor: "#059669",
            "&:hover": { backgroundColor: "#047857" },
            mt: 2,
          }}
        >
          Edit Profile
        </Button>
      )}
    </Box>
  </Grid>

    {/* Right: Cards */}
    <Grid item xs={12} md={8}>
      <Grid container spacing={3}>
        {/* Card 1: Personal Info */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              backgroundColor: "#d1fae5", // ✅ White cards
              height: "100%",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)", // ✅ Soft shadow
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.15)", // ✅ Hover effect
              },
            }}
          >

            <Typography variant="h6" sx={{ mb: 2, color: "#047857" }}>
              Personal Information
            </Typography>
            <Typography><strong>Name:</strong> {user.name}</Typography>
            <Typography><strong>Email:</strong> {user.email}</Typography>
            <Typography><strong>Phone:</strong> {user.phone}</Typography>
            <Typography><strong>Gender:</strong> {user.gender}</Typography>
            <Typography><strong>DOB:</strong> {formData.dob}</Typography>
            <Typography><strong>Emergency Contact:</strong> {formData.emergencyContact}</Typography>
            <Typography><strong>Address:</strong> {formData.address}</Typography>
          </Paper>
        </Grid>

        {/* Card 2: Vehicle Info */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              backgroundColor: "#d1fae5", // ✅ White cards
              height: "100%",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)", // ✅ Soft shadow
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.15)", // ✅ Hover effect
              },
            }}
          >

            <Typography variant="h6" sx={{ mb: 2, color: "#047857" }}>
              Vehicle Information
            </Typography>
            {formData.vehicle?.type && (
              <>
                <Typography><strong>Type:</strong> {formData.vehicle.type}</Typography>
                <Typography><strong>Make:</strong> {formData.vehicle.make}</Typography>
                <Typography><strong>Model:</strong> {formData.vehicle.model}</Typography>
                <Typography><strong>Color:</strong> {formData.vehicle.color}</Typography>
                <Typography><strong>Year:</strong> {formData.vehicle.year}</Typography>
                <Typography><strong>Registration:</strong> {formData.vehicle.registration}</Typography>
                <Typography><strong>Fuel:</strong> {formData.vehicle.fuel}</Typography>
              </>
            )}
          </Paper>
        </Grid>

        {/* Card 3: Documents */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              backgroundColor: "#d1fae5", // ✅ White cards
              height: "100%",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)", // ✅ Soft shadow
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.15)", // ✅ Hover effect
              },
            }}
          >

            <Typography variant="h6" sx={{ mb: 2, color: "#047857" }}>
              Uploaded Documents
            </Typography>
            <Grid container spacing={2}>
              {["idProof", "license", "rcDocument", "vehicleImage"].map((docKey) =>
                formData[docKey] ? (
                  <Grid item xs={6} sm={3} key={docKey}>
                    <Box
                      onClick={() => handleOpenModal(formData[docKey], docKey)}
                      sx={{
                        cursor: "pointer",
                        borderRadius: 2,
                        overflow: "hidden",
                        boxShadow: 2,
                        "&:hover img": { transform: "scale(1.05)" },
                      }}
                    >
                      <img
                        src={formData[docKey]}
                        alt={docKey}
                        style={{
                          width: "100%",
                          height: 120,
                          objectFit: "cover",
                          transition: "transform 0.3s ease",
                        }}
                      />
                      <Typography variant="caption" align="center" display="block" sx={{ mt: 1 }}>
                        {docKey.replace(/([A-Z])/g, " $1").trim()}
                      </Typography>
                    </Box>
                  </Grid>
                ) : null
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
  </Grid>

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
