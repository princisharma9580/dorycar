import { Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Navbar from "./components/Navbar";
import LandingPage from "./components/landing/LandingPage";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/Dashboard";
import CreateRide from "./components/rides/CreateRide";
import RideResults from "./components/rides/RideResults";
import PrivateRoute from "./components/PrivateRoute";
import theme from "./theme";
import Profile from "./components/Profile";
import { ToastContainer } from "react-toastify";
import useRideNotifications from './hooks/useRideNotifications';
import { useAuth } from "./context/AuthContext";
import HowItWorks from "./components/pages/HowItWorks";
import FindRides from "./components/pages/FindRides";
import Community from "./components/pages/Community";
import PopularRoutes from "./components/pages/PopularRoutes";
import AdminRoutes from "./admin/adminRoutes";


function App() {
  useRideNotifications();
  const user = useAuth()
  return (
    <>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          <div className="App">
            {/* <Navbar /> */}
             {!window.location.pathname.startsWith("/admin") && <Navbar />}
             <AdminRoutes /> 
            <Routes>
            
              <Route index element={<LandingPage />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard currentUser={user} />
                  </PrivateRoute>
                }
              />

              <Route path="rides">
                

                <Route path="/rides" element={<RideResults />} />
              </Route>

              <Route path="*" element={<LandingPage />} />
              <Route path='/how-it-works' element={<HowItWorks />}/>
            <Route path='/find-rides' element={<FindRides />} />
            <Route path='/community' element={<Community />} />
            <Route path="/offer-ride" element={<PrivateRoute><CreateRide /></PrivateRoute>} />
            <Route path='/popular-routes' element={<PopularRoutes />} />
            <Route path="/rides" element={<RideResults />} />
            </Routes>
          </div>
        </LocalizationProvider>
        <ToastContainer />
      </ThemeProvider>
      {/* </div> */}
    </>
  );
}

export default App;
