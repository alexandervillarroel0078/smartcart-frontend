import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { obtenerAlertas } from "../services/productos"; // ✅ servicio correcto

const Notificaciones = () => {
  const [productos, setProductos] = useState([]);
  const [mostrar, setMostrar] = useState(false);

  const toggleMostrar = () => setMostrar(!mostrar);

  useEffect(() => {
    obtenerAlertas()
      .then((res) => setProductos(res)) // ✅ ya devuelve el array directamente
      .catch((err) => console.error("Error al obtener alertas de stock", err));
  }, []);

  return (
    <div className="relative text-white">
      <button onClick={toggleMostrar} className="relative">
        <Bell size={24} />
        {productos.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {productos.length}
          </span>
        )}
      </button>

      {mostrar && (
        <div className="absolute left-10 top-0 bg-white text-black shadow-lg rounded p-4 w-64 z-50">
          <h3 className="font-bold mb-2">Notificaciones</h3>
          {productos.length === 0 ? (
            <p className="text-sm text-gray-500">Sin alertas de stock.</p>
          ) : (
            <ul className="space-y-1 text-sm">
              {productos.map((p) => (
                <li key={p.id} className="text-red-600">
                ⚠️ <strong>{p.nombre}</strong>: {p.stock} en stock (mín. {p.umbral_minimo})
              </li>
              
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Notificaciones;
