// src/services/carrito.js
import api from "../api";

export const obtenerCarrito = async () => {
  const token = localStorage.getItem("token");
  const res = await api.get("/carrito/ver", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data.id_carrito;
};

export const crearCarrito = async () => {
  const token = localStorage.getItem("token");
  const res = await api.post("/carrito/crear", {}, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data.id_carrito;
};
