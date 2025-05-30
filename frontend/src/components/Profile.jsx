import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Divider,
  TextField,
  Button,
  IconButton,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useAuth } from "../context/AuthContext";
import rideService from "../services/rideService";
import Footer from "./Footer";

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
  previousProfileImageKey: uploadedProfileImage !== formData.profileImage ? previousKeys.profileImageKey : "",
  previousVehicleImageKey: uploadedVehicleImage !== formData.vehicleImage ? previousKeys.vehicleImageKey : "",
  previousRcDocumentKey: uploadedRcDocument !== formData.rcDocument ? previousKeys.rcDocumentKey : "",
  previousIdProofKey: uploadedIdProof !== formData.idProof ? previousKeys.idProofKey : "",
  previousLicenseKey: uploadedLicense !== formData.license ? previousKeys.licenseKey : "",
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
      <Box
        sx={{
          pt: 15,
          pb: 8,
          display: "flex",
          justifyContent: "center",
          marginBottom: "2.5rem",
          background: "white",
        }}
      >
        <Paper elevation={3} sx={{ p: 4, width: 600 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
              position: "relative",
            }}
          >
            <Avatar
              src={profilePreview}
              alt={user.name}
              sx={{ width: 80, height: 80 }}
            />
            {editMode && (
              <IconButton
                component="label"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: "30%",
                  bgcolor: "white",
                  "&:hover": { bgcolor: "#eee" },
                }}
              >
                <PhotoCamera />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    console.log("Selected file:", e.target.files[0]);
                    setSelectedFile(e.target.files[0]);
                  }}
                />
              </IconButton>
            )}
          </Box>

          <Typography variant="h5" align="center" gutterBottom>
            {editMode ? "Edit Profile" : "Profile"}
          </Typography>
          {user.averageRating > 0 && (
            <Box mt={2}>
              <Typography>
                <strong>Your Overall Ratings:</strong>{" "}
                <span style={{ color: "#fbc02d" }}>
                  {"★".repeat(Math.round(user.averageRating))}{" "}
                  {"☆".repeat(5 - Math.round(user.averageRating))} (
                  {user.averageRating.toFixed(1)})
                </span>
              </Typography>
            </Box>
          )}
          <Divider sx={{ mb: 2 }} />

          {editMode ? (
            <>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="DOB"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Emergency Contact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
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
              <Typography variant="h6" mt={2}>
                Vehicle Info (Only for Ride Creators)
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Vehicle Type</InputLabel>
                <Select
                  value={formData.vehicle.type}
                  onChange={(e) =>
                    handleNestedChange("vehicle", "type", e.target.value)
                  }
                >
                  {vehicleTypes.map((v) => (
                    <MenuItem key={v} value={v}>
                      {v}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Make</InputLabel>
                <Select
                  value={formData.vehicle.make}
                  onChange={(e) =>
                    handleNestedChange("vehicle", "make", e.target.value)
                  }
                >
                  {carMakers.map((v) => (
                    <MenuItem key={v} value={v}>
                      {v}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Model"
                value={formData.vehicle.model}
                onChange={(e) =>
                  handleNestedChange("vehicle", "model", e.target.value)
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Color"
                value={formData.vehicle.color}
                onChange={(e) =>
                  handleNestedChange("vehicle", "color", e.target.value)
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Year"
                value={formData.vehicle.year}
                onChange={(e) =>
                  handleNestedChange("vehicle", "year", e.target.value)
                }
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Registration"
                value={formData.vehicle.registration}
                onChange={(e) =>
                  handleNestedChange("vehicle", "registration", e.target.value)
                }
                sx={{ mb: 2 }}
              />

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Fuel Type</InputLabel>
                <Select
                  value={formData.vehicle.fuel}
                  onChange={(e) =>
                    handleNestedChange("vehicle", "fuel", e.target.value)
                  }
                >
                  {fuelTypes.map((f) => (
                    <MenuItem key={f} value={f}>
                      {f}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Typography variant="h6">Uploads</Typography>
              <Button
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
                {/* {formData.vehicleImage?.name || "Upload Vehicle Image"} */}
                {formData.vehicleImage instanceof File
    ? formData.vehicleImage.name
    : getFileNameFromUrl(formData.vehicleImage) || "Upload Vehicle Image"}
                <input
                  type="file"
                  hidden
                  onChange={(e) => handleFileUpload(e, "vehicleImage")}
                />
              </Button>
              <Button
                component="label"
                variant="outlined"
                fullWidth
                sx={{
                  mb: 1,
                  color: "#059669",
                  borderColor: "#059669",
                  "&:hover": {
                    borderColor: "#047857",
                    backgroundColor: "#ecfdf5",
                  },
                }}
              >
                {/* {formData.rcDocument?.name || "Upload RC Document"} */}
                {formData.rcDocument instanceof File
    ? formData.rcDocument.name
    : getFileNameFromUrl(formData.rcDocument) || "Upload RC Document"}
                <input
                  type="file"
                  hidden
                  onChange={(e) => handleFileUpload(e, "rcDocument")}
                />
              </Button>
              <Button
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
                {/* {formData.idProof?.name || "Upload ID Proof"} */}
                {formData.idProof instanceof File
    ? formData.idProof.name
    : getFileNameFromUrl(formData.idProof) || "Upload ID Proof"}
                <input
                  type="file"
                  hidden
                  onChange={(e) => handleFileUpload(e, "idProof")}
                />
              </Button>
              <Button
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
                {/* {formData.license?.name || "Upload License"} */}
                {formData.license instanceof File
    ? formData.license.name
    : getFileNameFromUrl(formData.license) || "Upload License"}
                <input
                  type="file"
                  hidden
                  onChange={(e) => handleFileUpload(e, "license")}
                />
              </Button>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
            </>
          ) : (
            <>
              {user.name && (
                <Typography>
                  <strong>Name:</strong> {user.name}
                </Typography>
              )}
              {user.email && (
                <Typography>
                  <strong>Email:</strong> {user.email}
                </Typography>
              )}
              {user.phone && (
                <Typography>
                  <strong>Phone:</strong> {user.phone}
                </Typography>
              )}
              {user.gender && (
                <Typography>
                  <strong>Gender:</strong> {user.gender}
                </Typography>
              )}
              {formData.dob && (
                <Typography>
                  <strong>DOB:</strong> {formData.dob}
                </Typography>
              )}
              {formData.emergencyContact && (
                <Typography>
                  <strong>Emergency Contact:</strong>{" "}
                  {formData.emergencyContact}
                </Typography>
              )}
              {formData.address && (
                <Typography>
                  <strong>Address:</strong> {formData.address}
                </Typography>
              )}

              {formData.vehicle?.type && (
                <>
                  <Typography sx={{ mt: 2 }}>
                    <strong>Vehicle:</strong> {formData.vehicle.type}
                  </Typography>
                  {formData.vehicle.make && (
                    <Typography>
                      <strong>Make:</strong> {formData.vehicle.make}
                    </Typography>
                  )}
                  {formData.vehicle.model && (
                    <Typography>
                      <strong>Model:</strong> {formData.vehicle.model}
                    </Typography>
                  )}
                  {formData.vehicle.color && (
                    <Typography>
                      <strong>Color:</strong> {formData.vehicle.color}
                    </Typography>
                  )}
                  {formData.vehicle.year && (
                    <Typography>
                      <strong>Year:</strong> {formData.vehicle.year}
                    </Typography>
                  )}
                  {formData.vehicle.registration && (
                    <Typography>
                      <strong>Registration:</strong>{" "}
                      {formData.vehicle.registration}
                    </Typography>
                  )}

                  {formData.vehicle.fuel && (
                    <Typography>
                      <strong>Fuel:</strong> {formData.vehicle.fuel}
                    </Typography>
                  )}
                  {formData.idProof && (
                    <Typography>
                      <strong>ID Proof:</strong>{" "}
                      <img
                        src={formData.idProof}
                        alt="Vehicle Preview"
                        style={{
                          width: "100%",
                          maxHeight: 200,
                          objectFit: "contain",
                          marginBottom: 16,
                        }}
                      />
                    </Typography>
                  )}

                  {formData.license && (
                    <Typography>
                      <strong>License:</strong>{" "}
                      <img
                        src={formData.license}
                        alt="Vehicle Preview"
                        style={{
                          width: "100%",
                          maxHeight: 200,
                          objectFit: "contain",
                          marginBottom: 16,
                        }}
                      />
                    </Typography>
                  )}
                  
                  {formData.rcDocument && (
                    <Typography>
                      <strong>RC Document:</strong>{" "}
                      <img
                        src={formData.rcDocument}
                        alt="Vehicle Preview"
                        style={{
                          width: "100%",
                          maxHeight: 200,
                          objectFit: "contain",
                          marginBottom: 16,
                        }}
                      />
                    </Typography>
                  )}

                  {formData.vehicleImage && (
                    <Typography>
                      <strong>Vehicle Image :</strong>{" "}
                      <img
                        src={formData.vehicleImage}
                        alt="Vehicle Preview"
                        style={{
                          width: "100%",
                          maxHeight: 200,
                          objectFit: "contain",
                          marginBottom: 16,
                        }}
                      />
                    </Typography>
                  )}
                </>
              )}

              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  backgroundColor: "#059669",
                  "&:hover": {
                    backgroundColor: "#047857",
                  },
                }}
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </Button>
            </>
          )}
        </Paper>
      </Box>
      <Footer />
    </>
  );
};

export default Profile;
