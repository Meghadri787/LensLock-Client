import axios from "axios";

export const BASE_URL = "http://localhost:8000/api/";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;
