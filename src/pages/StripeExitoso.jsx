import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const StripeExitoso = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const idCarrito = params.get("id_carrito");
    const token = localStorage.getItem("token");

    const confirmarVenta = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/ventas/confirmar",
          {
            id_carrito: idCarrito,
            metodo_pago: "Stripe",
            estado: "exitoso",
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.success && res.data.id_compra) {
          const idCompra = res.data.id_compra;
          console.log("✅ Redirigiendo a recibo:", idCompra);
          navigate(`/recibo/${idCompra}`);
        } else {
          alert("❌ No se pudo confirmar la venta.");
        }
      } catch (error) {
        console.error("❌ Error al registrar venta:", error);
      }
    };

    if (idCarrito) confirmarVenta();
  }, []);

  return (
    <div className="p-6 text-center">
      <h2 className="text-3xl font-bold text-yellow-600 mb-4">⌛ Procesando compra...</h2>
      <p className="text-xl">Por favor, espera mientras generamos tu recibo.</p>
    </div>
  );
};

export default StripeExitoso;
