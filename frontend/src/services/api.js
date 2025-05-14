// api.js
import axios from 'axios';
import { io } from 'socket.io-client';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log(import.meta.env.VITE_API_BASE_URL);

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  } 
});

// Attach token to each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Global error handler
// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response?.status === 401) {
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }
//     return Promise.reject(err);
//   }
// );
// api.js
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const originalRequest = err.config;
    const status = err.response?.status;

    // Only redirect if the request requires auth (e.g., user endpoints, booking)
    const shouldRedirect =
      status === 401 &&
      originalRequest?.url &&
      !originalRequest.url.includes('/rides/search') &&
      !originalRequest.url.includes('/rides');

    if (shouldRedirect) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(err);
  }
);

api.get('/users')
  .then(data => console.log(data))
  .catch(err => console.log('Error fetching users:', err));

// Socket instance
export const socket = io(import.meta.env.VITE_SOCKET_URL, {
  path: "/socket.io",
  autoConnect: false,
});

export default api;
