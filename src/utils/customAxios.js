import axios from "axios";
import { getToken } from "./LocalStorage";

const apiUrl = `${import.meta.env.VITE_BASE_URL}/api`;

const customAxios = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

customAxios.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default customAxios;
