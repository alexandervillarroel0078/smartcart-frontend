import api from "../api";

// 📌 Obtener detalle del carrito (productos)
export const obtenerDetalleCarrito = async () => {
  const token = localStorage.getItem("token");
  const res = await api.get("/detalle_carrito/ver", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.detalle_carrito;
};

// 📌 Obtener el total del carrito
export const obtenerTotalCarrito = async () => {
  const token = localStorage.getItem("token");
  const res = await api.get("/detalle_carrito/total", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data.total;
};

// 📌 Agregar producto al carrito
export const agregarProductoAlCarrito = async ({ id_producto, cantidad, precio_unitario }) => {
  const token = localStorage.getItem("token");
  const res = await api.post("/detalle_carrito/agregar", {
    id_producto,
    cantidad,
    precio_unitario
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  return res.data;
};

// 📌 Actualizar cantidad de un producto en el carrito
export const actualizarCantidadDetalle = async (id_detalle, cantidad) => {
  const token = localStorage.getItem("token");
  const res = await api.put(`/detalle_carrito/actualizar/${id_detalle}`, {
    cantidad
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });
  return res.data;
};

// 📌 Eliminar un producto del carrito
export const eliminarDetalleCarrito = async (id_detalle) => {
  const token = localStorage.getItem("token");
  const res = await api.delete(`/detalle_carrito/eliminar/${id_detalle}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};

// 📌 Vaciar carrito completo
export const vaciarCarrito = async () => {
  const token = localStorage.getItem("token");
  const res = await api.delete("/detalle_carrito/vaciar", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data;
};
export const validarStockCarrito = async () => {
  const token = localStorage.getItem("token");
  const res = await api.get("/detalle_carrito/validar", {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};