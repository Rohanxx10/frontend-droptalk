import axios from "axios";

export const url = import.meta.env.VITE_APP_API_URL;

const api = axios.create({
  baseURL: `${url}/api/v1`
});

export const fileApi = axios.create({
  baseURL: `${url}/api/files` 
});

export default api;