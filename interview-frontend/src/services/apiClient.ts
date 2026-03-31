import axios from 'axios';

/**
 * axios base setup establishing API connection to backend
 */
export const apiClient = () => {
  let baseURL = import.meta.env.VITE_BACKEND_API_URL;

  if (import.meta.env.DEV) {
    // code inside here will be tree-shaken in production builds
    baseURL = '/api';
  }
  return axios.create({
    baseURL,
  });
};
