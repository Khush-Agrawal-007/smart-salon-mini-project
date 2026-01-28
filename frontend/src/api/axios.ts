import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5001/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request Interceptor: Log requests
api.interceptors.request.use(
    (config) => {
        console.log(`[API REQUEST] ${config.method?.toUpperCase()} ${config.url}`, config.data);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Log responses
api.interceptors.response.use(
    (response) => {
        console.log(`[API RESPONSE] ${response.status} ${response.config.url}`, response.data);
        return response;
    },
    (error) => {
        console.error(`[API ERROR]`, error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default api;
