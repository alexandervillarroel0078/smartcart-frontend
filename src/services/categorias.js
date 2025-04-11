import api from "../api";

// categorías.js
export const obtenerCategorias = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token no encontrado");
  
  const res = await api.get("/categorias", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.categorias;
};
