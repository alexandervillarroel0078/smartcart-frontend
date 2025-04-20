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
const pagarAhora = async () => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(
      `http://localhost:5000/ventas/pagar/${idCarrito}`,
      { metodo_pago: "Simulado" },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("✅ Pago exitoso\n" + JSON.stringify(res.data, null, 2));
  } catch (err) {
    console.error("❌ Error al simular pago:", err);
    alert("❌ Hubo un error al procesar el pago.");
  }
};
