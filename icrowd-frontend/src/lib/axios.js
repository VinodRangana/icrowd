import axios from 'axios';

// Create a configured instance of Axios
export const apiClient = axios.create({
  // Use environment variable for the base URL, fallback to localhost if missing
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
