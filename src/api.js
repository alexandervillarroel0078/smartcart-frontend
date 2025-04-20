import axios from 'axios';

const api = axios.create({
  baseURL: 'https://smartcart-backend-klyi.onrender.com', // ✅ tu backend en Render
});


export default api;
