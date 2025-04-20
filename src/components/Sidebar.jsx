// src/components/Sidebar.jsx
import { Link, useNavigate } from "react-router-dom";
import { obtenerRol } from "../utils/auth";
// src/components/Sidebar.jsx
import Notificaciones from "./Notificaciones";
import { useEffect } from "react";
//import ReporteCompras from "../pages/ReporteCompras";

const Sidebar = () => {
  const navigate = useNavigate();
  const rol = obtenerRol(); // ✅ obtenemos el rol desde el token

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-60 bg-gray-800 text-white h-screen p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Smart Cart</h2>
          {rol === "almacenero" && (
            <div className="relative">
              <Notificaciones />
            </div>
          )}
        </div>
        <ul className="space-y-2">
          <li><Link to="/" className="hover:text-yellow-300">Inicio</Link></li>

          {rol === "admin" && (
            <>
              <li><Link to="/usuarios" className="hover:text-yellow-300">Usuarios</Link></li>
              <li><Link to="/roles" className="hover:text-yellow-300">Roles</Link></li>
              <li><Link to="/bitacora" className="hover:text-yellow-300">Bitácora</Link></li>
              <li><Link to="/reporte-compras" className="hover:text-yellow-300">Reporte de Compras</Link></li> {/* ✅ AGREGADO */}
              <li>
  <Link to="/reportes-graficos">📊 Reportes Gráficos</Link>
</li>

            </>
          )}



          {rol === "almacenero" && (
            <>
              <li><Link to="/productos" className="hover:text-yellow-300">Productos</Link></li>
              <li><Link to="/inventario/reporte" className="hover:text-yellow-300">Reporte de Inventario</Link></li>
            </>
          )}

          {rol === "cliente" && (
            <>
              <li><Link to="/catalogo" className="hover:text-yellow-300">Catálogo</Link></li>
              <li><Link to="/carrito" className="hover:text-yellow-300">Carrito</Link></li>
            </>
          )}

        </ul>
      </div>


      {/* Aquí mostramos las notificaciones abajo */}

      <div className="mb-4">

        <button
          onClick={cerrarSesion}
          className="bg-red-600 hover:bg-red-700 py-2 px-4 rounded text-white mt-6"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};


export default Sidebar;
