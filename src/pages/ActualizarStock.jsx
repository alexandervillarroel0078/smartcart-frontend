// src/pages/ActualizarStock.jsx
import React, { useState, useEffect } from "react";
import { obtenerTodosLosProductos, actualizarStock } from "../services/productos";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const ActualizarStock = () => {
  const [productos, setProductos] = useState([]);
  const [idSeleccionado, setIdSeleccionado] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [todosLosProductos, setTodosLosProductos] = useState([]);
  const navigate = useNavigate();
  const recargarProductos = async () => {
    const data = await obtenerProductos();
    const productosCargados = Array.isArray(data) ? data : data.productos || [];
    setTodosLosProductos(productosCargados);
    setProductos(
      mostrarTodos ? productosCargados : productosCargados.filter(p => p.stock <= p.umbral_minimo)
    );
  };

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const productosCargados = await obtenerTodosLosProductos();
        setTodosLosProductos(productosCargados);
        const criticos = productosCargados.filter(p => p.stock <= p.umbral_minimo);
        setProductos(mostrarTodos ? productosCargados : criticos);
      } catch (error) {
        console.error("❌ Error al obtener productos:", error);
      }
    };
  
    cargarProductos();
  }, [mostrarTodos]);
  

  useEffect(() => {
    if (mostrarTodos) {
      setProductos(todosLosProductos);
    } else {
      const criticos = todosLosProductos.filter(p => p.stock <= p.umbral_minimo);
      setProductos(criticos);
    }
  }, [mostrarTodos, todosLosProductos]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const producto = todosLosProductos.find(p => p.id === idSeleccionado);
    if (!producto) {
      alert("❌ Selecciona un producto válido.");
      return;
    }
  
    const cantidadInt = parseInt(cantidad);
  
    if (isNaN(cantidadInt) || cantidadInt <= 0) {
      alert("❌ Ingresa una cantidad válida.");
      return;
    }
  
    const nuevoStock = producto.stock + cantidadInt;
    if (nuevoStock > producto.umbral_maximo) {
      alert("⚠️ No puedes superar el stock máximo permitido.");
      return;
    }
  
    const ok = await actualizarStock({
      id: producto.id,
      cantidad: cantidadInt
    });
  
    if (ok) {
      alert("✅ Stock actualizado correctamente");
      navigate("/productos"); // ✅ Redirigir tras éxito
    } else {
      alert("❌ Error al actualizar stock");
    }
  };
  


  const productoSeleccionado = productos.find(p => p.id === idSeleccionado);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-cyan-300 mb-6 text-center">🔁 Añadir Stock</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-cyan-200 font-semibold mb-2">
              <input
                type="checkbox"
                checked={mostrarTodos}
                onChange={() => setMostrarTodos(!mostrarTodos)}
                className="accent-cyan-500"
              />
              Mostrar todos los productos
            </label>

            <Select
              options={productos.map((p) => ({
                value: p.id,
                label: p.stock <= p.umbral_minimo ? `⚠️ ${p.nombre}` : p.nombre
              }))}
              value={
                idSeleccionado
                  ? {
                    value: idSeleccionado,
                    label: productos.find(p => p.id === idSeleccionado)?.nombre || ""
                  }
                  : null
              }
              onChange={(opcion) => setIdSeleccionado(opcion.value)}
              placeholder="Buscar producto..."
              classNamePrefix="react-select"
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: "#111827",
                  borderColor: "#4b5563",
                  color: "white",
                }),
                singleValue: (base) => ({ ...base, color: "white" }),
                input: (base) => ({ ...base, color: "white" }),
                menu: (base) => ({ ...base, backgroundColor: "#1f2937", color: "white" }),
                option: (base, state) => {
                  const producto = productos.find(p => p.id === state.data.value);
                  const critico = producto && producto.stock <= producto.umbral_minimo;

                  return {
                    ...base,
                    backgroundColor: state.isFocused ? "#0891b2" : "#1f2937",
                    color: critico ? "#f87171" : "white",
                    fontWeight: critico ? "bold" : "normal",
                    cursor: "pointer",
                  };
                }
              }}
            />

            {productoSeleccionado && (
              <div className="mt-3 bg-gray-700 p-3 rounded text-sm text-cyan-100">
                <p><strong>📦 Stock actual:</strong> {productoSeleccionado.stock}</p>
                <p><strong>🧾 Mínimo requerido:</strong> {productoSeleccionado.umbral_minimo}</p>
                <p><strong>📈 Máximo permitido:</strong> {productoSeleccionado.umbral_maximo}</p>
                {cantidad && (
                  <p className="mt-1 text-yellow-400">
                    {productoSeleccionado.stock + parseInt(cantidad) > productoSeleccionado.umbral_maximo
                      ? "⚠️ Supera el stock máximo permitido"
                      : `🔢 Stock tras añadir: ${productoSeleccionado.stock + parseInt(cantidad)} / ${productoSeleccionado.umbral_maximo}`}
                  </p>
                )}
              </div>
            )}

          </div>

          <div>
            <label className="block text-cyan-200 mb-1 font-semibold">Cantidad a añadir</label>
            <input
              type="number"
              className="w-full bg-gray-900 border border-gray-600 px-4 py-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              required
              min={1}
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-6 py-2 rounded shadow-md transition"
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActualizarStock;
