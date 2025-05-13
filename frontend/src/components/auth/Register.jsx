import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Footer from "../Footer"

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    receiveUpdates: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    receiveUpdates: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
  
    // Name validation
    if (formData.firstName.trim().length < 2) {
      newErrors.firstName = "Name must be at least 2 characters";
    }
  
    if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "Name must be at least 2 characters";
    }
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
  
    // Phone number validation
    if (formData.phoneNumber && !/^\d{10,}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "Phone number must be at least 10 digits and numeric";
    }
  
    // Password validation
    let passwordError = "";
    if (formData.password.length < 6) {
      passwordError += "Must be at least 6 characters. ";
    }
    if (!/\d/.test(formData.password)) {
      passwordError += "Must contain at least one number. ";
    }
    if (!/[A-Z]/.test(formData.password)) {
      passwordError += "Must contain at least one uppercase letter. ";
    }
    if (passwordError) {
      newErrors.password = passwordError.trim();
    }
  
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
  
    // Checkbox validations
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "confirmPassword") {
      if (formData.password === value) {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          confirmPassword: "Passwords do not match",
        }));
      }
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!validateForm()) {
      const errorMessages = Object.values(errors).filter(Boolean).join(' ');
      toast.error(errorMessages || "Please fix the form errors before submitting");
      return;
    }
  
    setLoading(true);
    try {
      const { confirmPassword, ...registerData } = formData;
      registerData.email = registerData.email.toLowerCase().trim();
      registerData.name = `${formData.firstName} ${formData.lastName}`;
      await register(registerData);
      toast.success("Registration successful! Please log in with your credentials.");
      navigate("/login");
    } catch (error) {
      if (error.response) {
        const err = error.response.data?.message || error.response.data?.errors || "Registration failed. Please try again.";
        toast.error(err);
      } else {
        toast.error("Registration failed. Please try again.");
      }
      if (error.message === "Email already exists") {
        toast.error("This email is already registered. Please try logging in.");
        setErrors((prev) => ({
          ...prev,
          email: "This email is already registered. Please try logging in.",
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
<>
<div className="flex-grow bg-white min-h-[calc(100vh-64px)] flex items-center justify-center pt-[90px] pb-10">
    <div className="container w-full flex flex-col items-center justify-center">
      <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="font-semibold tracking-tight text-2xl text-center">
                Create an account
              </h3>
              <p className="text-sm text-muted-foreground text-center">
                Enter your details below to create your account
              </p>
            </div>
            <div className="p-6 pt-0">
              <form className="space-y-6 w-full" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="firstName"
                    >
                      First name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      required
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                    {errors.firstName && <p className="error">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      htmlFor="lastName"
                    >
                      Last name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      required
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                    {errors.lastName && <p className="error">{errors.lastName}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="email"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john.doe@example.com"
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                  {errors.email && <p className="error">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="phone"
                  >
                    Phone number (optional)
                  </label>
                  <input
                    type="number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                  {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="password"
                  >
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      minLength="6"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500"
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>
                  {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      minLength="8"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    id="agreeTerms"
                    className="h-4 w-4 rounded"
                    required
                  />
                  <label htmlFor="agreeTerms" className="text-sm text-muted-foreground">
                    I agree to the <RouterLink to="/terms" className="text-emerald-500">Terms and Conditions</RouterLink>
                  </label>
                  {errors.agreeTerms && <p className="error">{errors.agreeTerms}</p>}
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="receiveUpdates"
                    checked={formData.receiveUpdates}
                    onChange={handleChange}
                    id="receiveUpdates"
                    className="h-4 w-4 rounded"
                  />
                  <label htmlFor="receiveUpdates" className="text-sm text-muted-foreground">
                    I would like to receive updates via email
                  </label>
                </div>
                <button
                  type="submit"
                  className={`w-full h-10 rounded-md bg-emerald-500 text-white text-sm font-medium focus:outline-none ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Create Account"}
                </button>
              </form>
              <p className="mt-4 text-sm text-center text-muted-foreground">
                Already have an account?{" "}
                <RouterLink to="/login" className="text-emerald-500">
                  Log in
                </RouterLink>
              </p>
            </div>
          </div>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] md:w-[450px]">
          
        </div>
      </div>
     
    </div>
    <Footer />
</>
  );

};

export default Register;


