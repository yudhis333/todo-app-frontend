import axios from "axios";

// Set up Axios instance
const baseURL = "http://localhost:4000";
const instance = axios.create({ baseURL });

// Function to get JWT token dynamically
const getToken = () => {
  // Misalnya, Anda mengambil token dari state aplikasi atau local storage
  return localStorage.getItem("jwtToken");
};

// Add interceptor to automatically add authorization header with dynamic token
instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { instance, getToken };
