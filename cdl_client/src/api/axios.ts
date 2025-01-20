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
    console.log("Response Interceptor caught an error:", error);
    if (error.response?.status === 401) {
      console.log("Handling 401 globally, clearing token");
      localStorage.removeItem("token");
      // Do NOT redirect here. Let the local error handler decide.
    }
    return Promise.reject(error); // Re-throw the error
  }
);



export { AxiosError }; // Export for error handling in other files
export default api;
