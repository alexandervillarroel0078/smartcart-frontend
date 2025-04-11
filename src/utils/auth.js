// src/utils/auth.js

export const obtenerRol = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
  
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.rol;
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return null;
    }
  };
  