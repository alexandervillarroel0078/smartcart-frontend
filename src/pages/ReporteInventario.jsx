// 📁 src/pages/ReporteInventario.jsx
import React, { useEffect, useState } from "react";

const ReporteInventario = () => {
  const [productos, setProductos] = useState([]);
  const [estadoFiltro, setEstadoFiltro] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState("");

  useEffect(() => {
    fetch("https://smartcart-backend-klyi.onrender.com/inventario/reporte", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
     
     
      .then((data) => {
        console.log("📦 Productos desde el backend:", data); // 👈 Agrega esto
        setProductos(data);
        const unicas = [...new Set(data.map((p) => p.categoria))];
        setCategorias(unicas);
      })
      


      .catch((err) => console.error("❌ Error al cargar reporte:", err));
  }, []);

  const obtenerColorEstado = (estado) => {
    switch (estado) {
      case "Crítico":
        return "bg-red-700 text-white";
      case "Adecuado":
        return "bg-yellow-500 text-black";
      case "Lleno":
        return "bg-green-600 text-white";
      case "Excedido":
        return "bg-purple-700 text-white";
      default:
        return "";
    }
  };

  const descargarPDF = () => {
    const query = new URLSearchParams();
    if (estadoFiltro) query.append("estado", estadoFiltro);
    if (categoriaFiltro) query.append("categoria", categoriaFiltro);
  
    fetch(`https://smartcart-backend-klyi.onrender.com/inventario/reporte/pdf?${query.toString()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "reporte_inventario.pdf";
        a.click();
      })
      .catch((err) => console.error("❌ Error al descargar PDF:", err));
  };
  
  

  const productosFiltrados = productos.filter((p) => {
    return (
      (!estadoFiltro || p.estado.toLowerCase() === estadoFiltro.toLowerCase()) &&
      (!categoriaFiltro || p.categoria === categoriaFiltro)
    );
  });

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-cyan-300">📋 Reporte de Inventario</h2>

        <button
          onClick={descargarPDF}
          className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded shadow"
        >
          📄 Descargar PDF
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        <select
          value={estadoFiltro}
          onChange={(e) => setEstadoFiltro(e.target.value)}
          className="bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded"
        >
          <option value="">Todos los estados</option>
          <option value="Crítico">Crítico</option>

          <option value="Adecuado">Adecuado</option>
          <option value="Lleno">Lleno</option>
          <option value="Excedido">Excedido</option>
        </select>

        <select
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
          className="bg-gray-800 border border-gray-600 text-white px-4 py-2 rounded"
        >
          <option value="">Todas las categorías</option>
          {categorias.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="overflow-auto rounded-lg shadow border border-gray-700 bg-gray-800">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-700 text-cyan-200">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Producto</th>
              <th className="px-4 py-2 border">Modelo</th>
              <th className="px-4 py-2 border">Precio</th>
              <th className="px-4 py-2 border">Stock</th>
              <th className="px-4 py-2 border">Mínimo</th>
              <th className="px-4 py-2 border">Máximo</th>
              <th className="px-4 py-2 border">Categoría</th>
              <th className="px-4 py-2 border">Estado</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((p, index) => (
              <tr key={p.id} className="border-t border-gray-700">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{p.nombre}</td>
                <td className="px-4 py-2 border">{p.modelo || "-"}</td>
                <td className="px-4 py-2 border">Bs {p.precio.toFixed(2)}</td>
                <td className="px-4 py-2 border">{p.stock}</td>
                <td className="px-4 py-2 border">{p.umbral_minimo}</td>
                <td className="px-4 py-2 border">{p.umbral_maximo}</td>
                <td className="px-4 py-2 border">{p.categoria}</td>
                <td className={`px-4 py-2 border font-bold text-center ${obtenerColorEstado(p.estado)}`}>
                  {p.estado}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReporteInventario;
