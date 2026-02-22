import axios from 'axios';
import { SERVER_URL } from '../config';

const axiosInstance = axios.create({
  baseURL: `${SERVER_URL}/api`, // replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token automatically
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
