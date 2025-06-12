import {
  AppBar,
  Typography,
  Button,
  Box,
  IconButton,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Menu, 
  MenuItem
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const mobileMenuItems = [
    { label: "Home", path: "/" },
    { label: "How It Works", path: "/how-it-works" },
    { label: "Find Rides", path: "/find-rides" },
    { label: "Offer a Ride", path: "/offer-ride" },
    // { label: "Community", path: "/community" },
  ];

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          py: 1,
        }}
      >
        <Typography variant="h6">Menu</Typography>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {mobileMenuItems.map((item) => (
          <ListItem button key={item.label} onClick={() => navigate(item.path)}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        <Divider />
        {user ? (
          <>
            <ListItem button onClick={() => navigate("/dashboard")}>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={logout}>
              <ListItemText primary="Logout" />
            </ListItem>
            <ListItem button onClick={() => navigate("/profile")}>
              <ListItemText primary="Profile" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button onClick={() => navigate("/login")}>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button onClick={() => navigate("/register")}>
              <ListItemText primary="Sign Up" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          borderBottom: "1px solid #e5e7eb",
          zIndex: 1200,
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 2, md: 4 },
            py: 1.5,
          }}
        >
          {/* Logo */}
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <img
              alt="Dorycar Logo"
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Dorycar%20Logo.jpg-SGfzcdQoinHDU12n2Hb0Mqcqz0k8Ja.jpeg"
              style={{ height: "40px", marginRight: "8px" }}
            />
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 4,
            }}
          >
            {mobileMenuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Typography
                  key={item.label}
                  variant="body2"
                  sx={{
                    fontSize: ".9rem",
                    fontWeight: 600,
                    px: 2,
                    py: 1,
                    borderLeft: isActive
                      ? "4px solid #047857"
                      : "4px solid transparent",
                    color: isActive ? "#047857" : "#6b7280",
                    backgroundColor: isActive ? "#ecfdf5" : "transparent",
                    transform: isActive
                      ? "translateX(4px) scale(1.05)"
                      : "none",
                    transition: "all 0.3s ease-in-out",
                    borderRadius: "6px",
                    cursor: "pointer",
                    "&:hover": {
                      color: "#047857",
                      borderLeft: "4px solid #047857",
                      backgroundColor: "#ecfdf5",
                      transform: "translateX(4px) scale(1.05)",
                    },
                  }}
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </Typography>
              );
            })}
          </Box>

          {/* Auth Buttons / Profile */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >

            {user  ? (
        <>
          <Button
            variant="contained"
            onClick={() => navigate("/dashboard")}
            sx={{
              backgroundColor: "#059669",
              "&:hover": {
                backgroundColor: "#047857",
              },
              color: "white",
            }}
          >
            Dashboard
          </Button>

          <Box
            sx={{
              position: "relative",
              ml: 2,
              cursor: "pointer",
              width: 40,
              height: 40,
              borderRadius: "50%",
              overflow: "hidden",
              boxShadow: "0 0 5px rgba(0,0,0,0.3)",
              backgroundColor: "#ffffffaa",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={handleMenuOpen}
          >
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <Typography variant="body2" sx={{ color: "#333" }}>
                {user?.name?.charAt(0)?.toUpperCase()}
              </Typography>
            )}
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            sx={{ mt: 1 }}
          >
            <MenuItem
              onClick={() => {
                handleMenuClose();
                navigate("/profile");
              }}
              
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                logout();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </>
      )
            : (
              <>
                <Button
                  variant="text"
                  onClick={() => navigate("/login")}
                  sx={{
                    color: "gray",
                    "&:hover": {
                      color: "green",
                      backgroundColor: "#ecfdf5",
                    },
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate("/register")}
                  sx={{
                    backgroundColor: "#059669",
                    "&:hover": {
                      backgroundColor: "#047857",
                    },
                    color: "white",
                  }}
                >
                  Sign up
                </Button>
              </>
            )}
          </Box>

          {/* Hamburger Icon */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better performance on mobile
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
