import React, { useEffect, useState } from 'react';
import { obtenerUsuarios, eliminarUsuario } from '../services/usuarios';
import { Link, useNavigate } from "react-router-dom";
import { obtenerRol } from "../utils/auth";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ DEFINIDO AQUÍ
  const navigate = useNavigate();
  const rol = obtenerRol();

  useEffect(() => {
    if (rol !== "admin") {
      navigate("/"); // ❌ No es admin, redirigimos
    } else {
      setLoading(false); // ✅ Ya cargó
    }
  }, [rol]);

  const cargarUsuarios = () => {
    obtenerUsuarios()
      .then(setUsuarios)
      .catch(err => console.error('Error al cargar usuarios:', err));
  };

  useEffect(() => {
    if (!loading) {
      cargarUsuarios();
    }
  }, [loading]);

  if (loading) {
    return <div className="p-6">Cargando...</div>; // ✅ Esto evita pantalla blanca
  }

  return (
    <div className="p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">Lista de Usuarios</h2>

      <div className="mb-4">
        <Link to="/usuarios/nuevo">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Nuevo usuario
          </button>
        </Link>
      </div>

      <table className="min-w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Correo</th>
            <th className="border px-4 py-2">Rol</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td className="border px-4 py-2">{u.nombre}</td>
              <td className="border px-4 py-2">{u.correo}</td>
              <td className="border px-4 py-2 capitalize">{u.rol}</td>
              <td className="border px-4 py-2 flex gap-2">
                <button
                  onClick={() => navigate(`/usuarios/${u.id}/ver`)}
                  className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                >
                  Ver
                </button>
                <button
                  onClick={() => navigate(`/usuarios/${u.id}/editar`)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleEliminar(u.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded text-sm"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;
