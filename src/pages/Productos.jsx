import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerProductos, eliminarProducto, actualizarVisibilidad } from "../services/productos";
 
const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);

  useEffect(() => {
    obtenerProductos(paginaActual)
      .then((data) => setProductos(data.productos || data))
      .catch((err) => console.error("❌ Error al cargar productos:", err));
  }, [paginaActual]);

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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Lista de Productos</h2>

      <div className="mb-4 space-x-2">
        <Link to="/productos/nuevo">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Nuevo producto</button>
        </Link>
        <Link to="/productos/stock">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded">Añadir stock</button>
        </Link>
      </div>

      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Imagen</th>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Descripción</th>
            <th className="border px-4 py-2">Precio</th>
            <th className="border px-4 py-2">Stock</th>
            <th className="border px-4 py-2">Umbral</th>
            <th className="border px-4 py-2">Categoría</th>
            <th className="border px-4 py-2">Visible</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id} className={p.stock <= p.umbral_stock ? "bg-red-100" : ""}>
              <td className="border px-4 py-2">
                <img src={p.imagen} alt={p.nombre} className="w-16 h-16 object-contain" />
              </td>
              <td className="border px-4 py-2">{p.nombre}</td>
              <td className="border px-4 py-2">{p.descripcion}</td>
              <td className="border px-4 py-2">Bs {p.precio.toFixed(2)}</td>
              <td className="border px-4 py-2">{p.stock}</td>
              <td className="border px-4 py-2">{p.umbral_stock}</td>
              <td className="border px-4 py-2">{p.categoria}</td>
              <td className="border px-4 py-2">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={p.visible}
                    onChange={async () => {
                      try {
                        await actualizarVisibilidad(p.id, !p.visible);
                        const actualizados = productos.map(prod =>
                          prod.id === p.id ? { ...prod, visible: !p.visible } : prod
                        );
                        setProductos(actualizados);
                      } catch (error) {
                        alert("❌ Error al actualizar visibilidad");
                      }
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500 relative"></div>
                </label>
              </td>
              <td className="border px-4 py-2 flex gap-2">
                <Link to={`/productos/${p.id}/ver`}>
                  <button className="bg-green-600 text-white px-2 py-1 rounded text-sm">Ver</button>
                </Link>
                <Link to={`/productos/${p.id}/editar`}>
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded text-sm">Editar</button>
                </Link>
                <button
                  onClick={() => handleEliminar(p.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded text-sm"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Navegación de páginas */}
      <div className="mt-4 flex justify-center gap-4">
        <button
          onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
          disabled={paginaActual === 1}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-gray-700">Página {paginaActual}</span>
        <button
          onClick={() => setPaginaActual((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Productos;
