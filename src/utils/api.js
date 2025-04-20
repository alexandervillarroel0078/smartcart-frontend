// 📁 src/utils/api.js
const isDev = import.meta.env.DEV;

export const BASE_URL = isDev
  ? "http://localhost:5000"
  : "https://tubackend.real.com"; // URL real cuando subas

export const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});
