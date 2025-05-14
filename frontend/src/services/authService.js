
import axios from "axios";
// import { API_BASE_URL } from "./api";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const authService = {
  register: async (userData) => {
    try { 
      const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
      return response.data;
    } catch (error) {
      // Check if the error is a response from the backend
      if (error.response) {
        // Log detailed backend error message
        console.error('Registration Error:', error.response.data);
        throw new Error(error.response.data?.message || "Registration failed. Please try again.");
      } else if (error.request) {
        // If no response was received from the backend
        console.error('No response received:', error.request);
        throw new Error("Registration failed. No response from the server.");
      } else {
        // For any other errors
        console.error('Error:', error.message);
        throw new Error("Registration failed. Please try again.");
      }
    }
  },

  login: async (credentials) => {
    try {
      console.log('Attempting login with:', credentials);
      const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
      const data = response.data;

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      // Check if the error is a response from the backend
      if (error.response) {
        // Log detailed backend error message
        console.error('Login Error:', error.response.data);
        throw new Error(error.response.data?.message || "Login failed. Please try again.");
      } else if (error.request) {
        // If no response was received from the backend
        console.error('No response received:', error.request);
        throw new Error("Login failed. No response from the server.");
      } else {
        // For any other errors
        console.error('Error:', error.message);
        throw new Error("Login failed. Please try again.");
      }
    }
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return user && token ? JSON.parse(user) : null;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export default authService;
