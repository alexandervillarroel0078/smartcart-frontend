import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Usuarios from "./pages/Usuarios";
import Login from "./pages/Login";
import CrearUsuario from "./pages/CrearUsuario";
import EditarUsuario from "./pages/EditarUsuario";
import VerUsuario from "./pages/VerUsuario";
import Productos from "./pages/Productos";
import CrearProducto from "./pages/CrearProducto";
import VerProducto from "./pages/VerProducto";
import EditarProducto from "./pages/EditarProducto";
import ActualizarStock from "./pages/ActualizarStock";
import Catalogo from "./pages/Catalogo";
import Carrito from "./pages/Carrito";
import { obtenerRol } from "./utils/auth";
import Roles from "./pages/Roles";
import Bitacora from "./pages/Bitacora";
import ReporteInventario from "./pages/ReporteInventario";
import ReporteCompras from './pages/ReporteCompras';
import ReportesGraficos from './pages/ReportesGraficos';
import Recibo from "./pages/Recibo";
import Calificar from "./pages/Calificar";


const AppLayout = () => {
  const token = localStorage.getItem("token");
  const rol = obtenerRol();
  const location = useLocation();
  const estaEnLogin = location.pathname === "/login";

  return (
    <div className="flex h-screen">
      {!estaEnLogin && token && <Sidebar />}

      <div className="flex-1">
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Redirección según rol */}
          <Route
            path="/"
            element={
              token
                ? rol === "admin"
                  ? <Navigate to="/usuarios" />
                  : rol === "almacenero"
                    ? <Navigate to="/productos" />
                    : <Navigate to="/catalogo" /> // cliente o visitante
                : <Navigate to="/catalogo" /> // visitante sin token aún
            }
          />

          {/* Admin */}
          <Route path="/usuarios" element={token && rol === "admin" ? <Usuarios /> : <Navigate to="/" />} />
          <Route path="/usuarios/nuevo" element={token && rol === "admin" ? <CrearUsuario /> : <Navigate to="/" />} />
          <Route path="/usuarios/:id/ver" element={token && rol === "admin" ? <VerUsuario /> : <Navigate to="/" />} />
          <Route path="/usuarios/:id/editar" element={token && rol === "admin" ? <EditarUsuario /> : <Navigate to="/" />} />

          {/* Almacenero */}
          <Route path="/productos" element={token && rol === "almacenero" ? <Productos /> : <Navigate to="/" />} />
          <Route path="/productos/nuevo" element={token && rol === "almacenero" ? <CrearProducto /> : <Navigate to="/" />} />
          <Route path="/productos/:id/ver" element={token && rol === "almacenero" ? <VerProducto /> : <Navigate to="/" />} />
          <Route path="/productos/:id/editar" element={token && rol === "almacenero" ? <EditarProducto /> : <Navigate to="/" />} />
          <Route path="/productos/stock" element={token && rol === "almacenero" ? <ActualizarStock /> : <Navigate to="/" />} />

          {/* Catálogo accesible para cliente o visitante */}
          <Route path="/catalogo" element={<Catalogo />} />


          <Route path="/roles" element={token && rol === "admin" ? <Roles /> : <Navigate to="/" />} />
          <Route path="/bitacora" element={token && rol === "admin" ? <Bitacora /> : <Navigate to="/" />} />


          <Route path="/carrito" element={<Carrito />} />

          <Route path="/reporte-compras" element={token && rol === "admin" ? <ReporteCompras /> : <Navigate to="/" />} />
          <Route path="/inventario/reporte" element={token && ["admin", "almacenero"].includes(rol) ? <ReporteInventario /> : <Navigate to="/" />} />
          <Route path="/reportes-graficos" element={<ReportesGraficos />} />
        
        <Route path="/recibo/:id" element={<Recibo />} />
<Route path="/calificar/:id" element={<Calificar />} />
        
        
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;
