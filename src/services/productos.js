// src/services/productos.js
import api from "../api";

export const obtenerProductos = async (pagina = 1) => {
  const token = localStorage.getItem("token");
  const response = await api.get(`/productos?pagina=${pagina}&por_pagina=10`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// productos.js
export const obtenerProductosCatalogo = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token no encontrado");
  
  const response = await api.get("/catalogo", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.productos;
};



export const registrarProducto = async (producto) => {
  const token = localStorage.getItem("token");
  try {
    const res = await api.post("/productos/agregar", producto, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    return res.data.success; // ✅ Esto devolverá true o false
  } catch (error) {
    console.error("❌ Error en registrarProducto:", error);
    return false; // ✅ En caso de error devuelve false
  }
};
export const eliminarProducto = async (id) => {
  const token = localStorage.getItem("token");
  try {
    await api.delete(`/productos/eliminar/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error("❌ Error al eliminar producto:", error);
    throw error;
  }
};

export const obtenerProductoPorId = async (id) => {
  const token = localStorage.getItem("token");
  const res = await api.get(`/productos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};
// ✅ NUEVO: Actualizar producto
export const actualizarProducto = async (id, datos) => {
  const token = localStorage.getItem("token");
  const res = await api.put(`/productos/editar/${id}`, datos, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data.success;
};
// src/services/productos.js

export const obtenerAlertas = async () => {
  const token = localStorage.getItem("token");
  const res = await api.get("/inventario/alertas", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data.alertas;
};

// src/services/productos.js
export const actualizarStock = async ({ id, cantidad }) => {
  const token = localStorage.getItem("token");
  try {
    const res = await api.put(`/productos/stock/${id}`, { cantidad }, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    return res.data.success;
  } catch (error) {
    console.error("❌ Error al actualizar stock:", error);
    return false;
  }
};

export const actualizarVisibilidad = async (id, visible) => {
  const token = localStorage.getItem("token");
  try {
    const res = await api.put(`/productos/${id}/visibilidad`, { visible }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data.success;
  } catch (error) {
    console.error("❌ Error al actualizar visibilidad:", error);
    return false;
  }
};
// ✅ Obtener todos los productos sin paginación
export const obtenerTodosLosProductos = async () => {
  const token = localStorage.getItem("token");
  const res = await api.get("/productos/todos", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data.productos;
};

// ✅ Obtener productos con stock bajo (sin paginación)
export const obtenerProductosCriticos = async () => {
  const token = localStorage.getItem("token");
  const res = await api.get("/productos/criticos", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data; // devuelve array directo
};

