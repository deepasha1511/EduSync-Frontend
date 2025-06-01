import axios from 'axios';

// Create axios instance with base configuration
const API = axios.create({
    baseURL: 'https://localhost:7052/api',
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Request interceptor for adding token and handling requests
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling global errors
API.interceptors.response.use(
    (response) => {
        // You can modify successful responses here
        return response;
    },
    (error) => {
        // Handle errors globally
        if (error.response) {
            // Server responded with a status code outside 2xx
            switch (error.response.status) {
                case 401:
                    // Handle unauthorized (token expired, invalid, etc.)
                    console.error('Unauthorized access - redirect to login');
                    window.location.href = '/login';
                    break;
                case 403:
                    // Handle forbidden access
                    console.error('Forbidden access');
                    break;
                case 404:
                    // Handle not found errors
                    console.error('Resource not found');
                    break;
                case 500:
                    // Handle server errors
                    console.error('Server error occurred');
                    break;
                default:
                    console.error('An error occurred:', error.message);
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received from server');
        } else {
            // Something happened in setting up the request
            console.error('Request setup error:', error.message);
        }

        return Promise.reject(error);
    }
);

// Helper functions for common request types
const apiService = {
    get: (url, params = {}) => API.get(url, { params }),
    post: (url, data) => API.post(url, data),
    put: (url, data) => API.put(url, data),
    patch: (url, data) => API.patch(url, data),
    delete: (url) => API.delete(url),
    // Add other methods as needed
};

export default apiService;