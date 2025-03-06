import axios from "axios";
import { BASE_URL } from "./apiPaths";
import { toast } from "react-toastify";

// Create an Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ✅ Create a Toast Queue
let toastQueue = [];
let isToastShowing = false;

const showNextToast = () => {
  if (toastQueue.length === 0) {
    isToastShowing = false;
    return;
  }

  isToastShowing = true;
  const nextToast = toastQueue.shift();

  toast[nextToast.type](nextToast.message, {
    onClose: () => setTimeout(showNextToast, 1000), // Show next toast after 1 sec
  });
};

const queueToast = (message, type = "error") => {
  toastQueue.push({ message, type });

  if (!isToastShowing) {
    showNextToast();
  }
};

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    queueToast("Network error! Check your internet connection.");
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      console.error("Network error: Check your internet connection.");
      return Promise.reject(error);
    }

    const { status } = error.response;

    if (status === 401) {
        queueToast("Session expired. Redirecting to login...", "warning");
        localStorage.removeItem("token");
      window.location.href = "/login";
    } else if (status === 500) {
        queueToast("Server error! Please try again later.");
    } else if (error.code === "ECONNABORTED") {
        queueToast("Request timeout. Retrying...", "info");
        return retryRequest(error);
    }

    return Promise.reject(error);
  }
);

// Retry failed requests 
const retryRequest = async (error) => {
  const config = error.config;
  
  if (!config || config._retry) {
    return Promise.reject(error);
  }

  config._retry = true; // Mark request as retried
  
  try {
    return await axiosInstance(config);
  } catch (retryError) {
    return Promise.reject(retryError);
  }
};

export default axiosInstance;
