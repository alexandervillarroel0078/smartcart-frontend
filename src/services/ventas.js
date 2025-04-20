// src/services/ventas.js
import axios from "axios";

export const pagar = async (datos) => {
  const token = localStorage.getItem("token");

  // ✅ PRIMER PASO: obtener el ID del carrito
  const resCarrito = await axios.get("http://localhost:5000/carrito/ver", {
    headers: { Authorization: `Bearer ${token}` }
  });

  const idCarrito = resCarrito.data.id_carrito;
  console.log("🧾 ID del carrito para pagar:", idCarrito);

  // ✅ SEGUNDO PASO: pagar correctamente
  const res = await axios.post(
    `http://localhost:5000/ventas/pagar/${idCarrito}`,
    datos,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  ); 
  
  return res.data;
};
