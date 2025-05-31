// src/admin/api.js
import axios from "axios";
import adminAuthService from "../services/adminAuthService";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL, // Replace with your backend URL
});

// Add JWT to every request
api.interceptors.request.use((config) => {
  const token = adminAuthService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
