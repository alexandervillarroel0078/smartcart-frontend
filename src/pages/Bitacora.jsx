// 📁 src/pages/Bitacora.jsx
import { useEffect, useState } from "react";
import { BASE_URL, getHeaders } from "../utils/api";

function Bitacora() {
  const [bitacora, setBitacora] = useState([]);
  const [pagina, setPagina] = useState(1);
  const porPagina = 10;

  useEffect(() => {
    fetch(`${BASE_URL}/bitacora`, { headers: getHeaders() })
      .then(res => res.json())
      .then(data => setBitacora(data.bitacora || []))
      .catch(err => console.error("Error cargando bitácora:", err));
  }, []);

  const totalPaginas = Math.ceil(bitacora.length / porPagina);
  const registrosPagina = bitacora.slice((pagina - 1) * porPagina, pagina * porPagina);

  return (
    <div className="flex flex-col min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Bitácora del sistema</h1>

      {/* Contenedor tabla que crece con scroll si es necesario */}
      <div className="flex-1 overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-200 sticky top-0 z-10">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Usuario</th>
              <th className="p-2">Acción</th>
              <th className="p-2">Fecha</th>
              <th className="p-2">IP</th>
            </tr>
          </thead>
          <tbody>
            {registrosPagina.map((r, i) => (
              <tr key={r.id} className="border-t">
                <td className="p-2">{(pagina - 1) * porPagina + i + 1}</td>
                <td className="p-2">{r.usuario}</td>
                <td className="p-2">{r.accion}</td>
                <td className="p-2">{new Date(r.fecha_hora).toLocaleString()}</td>
                <td className="p-2">{r.ip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Contenedor de paginación fijo abajo */}
      <div className="sticky bottom-0 bg-white border-t py-3 mt-4 flex justify-center gap-2 z-20">
        {Array.from({ length: totalPaginas }, (_, i) => (
          <button
            key={i}
            onClick={() => setPagina(i + 1)}
            className={`px-3 py-1 rounded border text-sm ${
              pagina === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Bitacora;
