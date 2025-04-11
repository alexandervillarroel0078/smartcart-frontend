// src/services/usuarios.js
import api from '../api';

export const obtenerUsuarios = async () => {
  const token = localStorage.getItem('token');
  const response = await api.get('/usuarios', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data.usuarios;
};

export const eliminarUsuario = async (id) => {
  const token = localStorage.getItem("token");
  await api.delete(`/usuarios/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const obtenerTokenVisitante = async () => {
  const res = await api.get("/token/visitante"); // tu backend ya lo devuelve
  localStorage.setItem("token", res.data.token);
  return res.data;
};