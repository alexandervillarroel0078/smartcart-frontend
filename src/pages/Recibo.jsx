import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const Recibo = () => {
  const { id } = useParams(); // id de la compra
  const navigate = useNavigate();
  const [compra, setCompra] = useState(null);
  const [loading, setLoading] = useState(true);

  const cargarRecibo = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await api.get(`/compras/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("📦 Compra recibida:", res.data);
      setCompra(res.data);
    } catch (error) {
      console.error("❌ Error al cargar el recibo:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("🔁 Montando componente Recibo.jsx con ID:", id);
    cargarRecibo();
  }, [id]);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      navigate(`/calificar/${id}`);
    }, 4000); // redirigir a calificar luego de 4s

    return () => clearTimeout(temporizador);
  }, [id]);

  if (loading) return <div className="p-6 text-center">🔄 Cargando recibo...</div>;

  if (!compra) return <div className="p-6 text-center text-red-500">❌ No se pudo cargar la compra</div>;

  const {
    nombre_cliente,
    nit_cliente,
    fecha,
    total,
    descuento,
    total_final,
    productos = []
  } = compra;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">🧾 Recibo de Compra</h2>
      <div className="mb-4 space-y-1">
        <p><strong>Cliente:</strong> {nombre_cliente || "Sin nombre"}</p>
        <p><strong>NIT:</strong> {nit_cliente || "S/N"}</p>
        <p><strong>Fecha:</strong> {fecha}</p>
        <p><strong>ID Compra:</strong> {id}</p>
      </div>

      <table className="min-w-full border mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Producto</th>
            <th className="border px-4 py-2">Cantidad</th>
            <th className="border px-4 py-2">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{item.producto}</td>
              <td className="border px-4 py-2">{item.cantidad}</td>
              <td className="border px-4 py-2">Bs {item.subtotal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-right space-y-1 text-lg font-medium">
        <p>Total: Bs {total.toFixed(2)}</p>
        {descuento > 0 && (
          <p className="text-green-400 font-semibold">🎉 Descuento aplicado: Bs {descuento.toFixed(2)}</p>
        )}
        <p className="text-xl font-bold">Total Final: Bs {total_final.toFixed(2)}</p>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => {
            console.log("⭐ Redirigiendo a calificar...");
            navigate(`/calificar/${id}`);
          }}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 py-2 rounded"
        >
          Calificar compra ⭐
        </button>
      </div>
    </div>
  );
};

export default Recibo;
