import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to include the token in all requests
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    if (token && config.headers) {
      config.headers.set("Authorization", `Bearer ${token}`); // Use `set` method for headers
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Add an interceptor to handle errors globally (e.g., token expiration)
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token"); // Clear token
      window.location.href = "/login"; // Redirect to login
    }
    return Promise.reject(error);
  }
);

export { AxiosError }; // Export for error handling in other files
export default api;
