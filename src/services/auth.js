//src/services/auth.js

import api from "../api";

export const obtenerTokenVisitante = async () => {
  const res = await api.get("/token/visitante");
  localStorage.setItem("token", res.data.token);
  return res.data;
};

export const obtenerRol = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload.rol;
};
