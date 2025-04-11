// src/pages/ActualizarStock.jsx
import React, { useState, useEffect } from "react";
import { obtenerProductos, actualizarStock } from "../services/productos";
import { useNavigate } from "react-router-dom";

const ActualizarStock = () => {
  const [productos, setProductos] = useState([]);
  const [idSeleccionado, setIdSeleccionado] = useState("");
  const [cantidad, setCantidad] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    obtenerProductos()
      .then(setProductos)
      .catch((err) => console.error("❌ Error al obtener productos:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await actualizarStock({ id: idSeleccionado, cantidad: parseInt(cantidad) });

    if (ok) {
      alert("✅ Stock actualizado");
      navigate("/productos");
    } else {
      alert("❌ Error al actualizar stock");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Actualizar stock</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Producto
          <select
            className="w-full border px-4 py-2 rounded mt-1"
            value={idSeleccionado}
            onChange={(e) => setIdSeleccionado(e.target.value)}
            required
          >
            <option value="">-- Selecciona un producto --</option>
            {productos.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          Cantidad a añadir
          <input
            type="number"
            className="w-full border px-4 py-2 rounded mt-1"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
            min={1}
          />
        </label>

        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default ActualizarStock;
