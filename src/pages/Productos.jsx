// 📁 src/pages/Productos.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerTodosLosProductos, eliminarProducto, actualizarVisibilidad, obtenerProductosCriticos } from "../services/productos";
import { obtenerCategorias } from "../services/categorias"; // asegúrate que exista



const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [mostrarSoloBajoStock, setMostrarSoloBajoStock] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todas");

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = mostrarSoloBajoStock
          ? await obtenerProductosCriticos()
          : await obtenerTodosLosProductos(); // 🔥 sin paginación

        setProductos(data);
      } catch (err) {
        console.error("❌ Error al cargar productos:", err);
        setProductos([]);
      }
    };

    cargarProductos();
  }, [mostrarSoloBajoStock]);
  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const data = await obtenerCategorias();
        setCategorias(data);
      } catch (err) {
        console.error("❌ Error al cargar categorías:", err);
      }
    };

    cargarCategorias();
  }, []);




  const productosBajoStock = productos.filter(p => p.stock <= p.umbral_minimo);
  const productosAMostrar = mostrarSoloBajoStock ? productosBajoStock : productos;

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar este producto?");
    if (!confirmar) return;

    try {
      await eliminarProducto(id);
      const actualizados = productos.filter((p) => p.id !== id);
      setProductos(actualizados);
    } catch (error) {
      alert("❌ Error al eliminar producto");
    }
  };
  const productosPorCategoria = categoriaSeleccionada === "todas"
    ? productosAMostrar
    : productosAMostrar.filter(p => p.categoria === categoriaSeleccionada);
    const productosFiltrados = productosAMostrar.filter(p =>
      categoriaSeleccionada === "todas" || p.categoria === categoriaSeleccionada
    );
    

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-cyan-300">📦 Lista de Productos</h2>

        <button
          onClick={() => setMostrarSoloBajoStock(!mostrarSoloBajoStock)}
          className={`px-4 py-2 rounded font-medium transition flex items-center gap-2 shadow-md
            ${mostrarSoloBajoStock
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-gray-800 text-cyan-300 hover:bg-gray-700 border border-cyan-500"}`}
        >
          {mostrarSoloBajoStock ? (
            <>
              <span>🛑 {productosBajoStock.length} críticos</span>
              <span className="text-sm underline">Ver todos</span>
            </>
          ) : (
            <>
              <span>🔍 Mostrar stock bajo</span>
            </>
          )}
        </button>
      </div>

      <div className="mb-4 space-x-2">
        <Link to="/productos/nuevo">
          <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded shadow-md transition">
            Nuevo producto
          </button>
        </Link>
        <Link to="/productos/stock">
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded shadow-md transition">
            Añadir stock
          </button>
        </Link>


      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 shadow-xl flex flex-col" style={{ height: "750px" }}>
        <div className="overflow-auto flex-1">
          <table className="min-w-full text-sm text-white">
            <thead className="bg-gray-700 text-cyan-200 sticky top-0 z-10">
              <tr>
                <th className="border border-gray-600 px-4 py-2">Imagen</th>
                <th className="border border-gray-600 px-4 py-2">Nombre</th>
                <th className="border border-gray-600 px-4 py-2">Modelo</th>
                <th className="border border-gray-600 px-4 py-2">Descripción</th>
                <th className="border border-gray-600 px-4 py-2">Precio</th>
                <th className="border border-gray-600 px-4 py-2">Stock</th>
                <th className="border border-gray-600 px-4 py-2">Mínimo</th>
                <th className="border border-gray-600 px-4 py-2">Máximo</th>
                <th className="border border-gray-600 px-4 py-2">Categoría</th>
                <th className="border border-gray-600 px-4 py-2">Visible</th>
                <th className="border border-gray-600 px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosAMostrar.map((p) => (
                <tr
                  key={p.id}
                  className={
                    p.stock <= p.umbral_minimo
                      ? "bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white border-y border-red-500 shadow-md shadow-red-500/30"
                      : "bg-gray-900"
                  }
                >
                  <td className="border border-gray-700 px-4 py-2">
                    <img src={p.imagen} alt={p.nombre} className="w-16 h-16 object-contain" />
                  </td>
                  <td className="border border-gray-700 px-4 py-2">{p.nombre}</td>
                  <td className="border border-gray-700 px-4 py-2">{p.modelo || "-"}</td>
                  <td className="border border-gray-700 px-4 py-2">{p.descripcion}</td>
                  <td className="border border-gray-700 px-4 py-2">
                    Bs {Number(p.precio).toFixed(2)}
                  </td>

                  <td className="border border-gray-700 px-4 py-2">{p.stock}</td>
                  <td className="border border-gray-700 px-4 py-2">{p.umbral_minimo}</td>
                  <td className="border border-gray-700 px-4 py-2">{p.umbral_maximo}</td>
                  <td className="border border-gray-700 px-4 py-2">{p.categoria}</td>
                  <td className="border border-gray-700 px-4 py-2">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={p.visible}
                        onChange={async () => {
                          try {
                            await actualizarVisibilidad(p.id, !p.visible);
                            const actualizados = productos.map((prod) =>
                              prod.id === p.id ? { ...prod, visible: !p.visible } : prod
                            );
                            setProductos(actualizados);
                          } catch (error) {
                            alert("❌ Error al actualizar visibilidad");
                          }
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500 relative"></div>
                    </label>
                  </td>
                  <td className="border border-gray-700 px-4 py-2 flex gap-2">
                    <Link to={`/productos/${p.id}/ver`}>
                      <button className="bg-cyan-600 hover:bg-cyan-500 px-3 py-1 rounded text-white text-sm shadow-md transition">
                        Ver
                      </button>
                    </Link>
                    <Link to={`/productos/${p.id}/editar`}>
                      <button className="bg-yellow-400 hover:bg-yellow-300 px-3 py-1 rounded text-black text-sm shadow-md transition">
                        Editar
                      </button>
                    </Link>
                    <button
                      onClick={() => handleEliminar(p.id)}
                      className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded text-white text-sm shadow-md transition"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            
          </table>
        </div>

        <div className="border-t border-gray-700 py-3 px-4 bg-gray-600 text-center text-cyan-300">
          Mostrando todos los productos sin paginación
        </div>

      </div><div className="mb-4">
        <label className="text-cyan-300 font-semibold mr-2">Filtrar por categoría:</label>
        <select
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          className="bg-gray-700 text-white border border-cyan-500 px-3 py-2 rounded"
        >
          <option value="todas">Todas</option>
          {[...new Set(productos.map(p => p.categoria))].map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

    </div>

  );
};

export default Productos;
