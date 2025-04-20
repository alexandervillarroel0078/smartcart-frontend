// 📁 src/pages/Roles.jsx
import { useEffect, useState } from "react";
import { BASE_URL, getHeaders } from "../utils/api";

function Roles() {
  const [roles, setRoles] = useState([]);
  const [nuevoRol, setNuevoRol] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [nombreEditado, setNombreEditado] = useState("");

  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    cargarRoles();
  }, []);

  const cargarRoles = () => {
    fetch(`${BASE_URL}/roles`, { headers: getHeaders() })
      .then((res) => res.json())
      .then((data) => setRoles(data.roles || []))
      .catch((err) => console.error("❌ Error al obtener roles:", err));
  };

  const crearRol = () => {
    if (!nuevoRol.trim()) return;
  
    fetch(`${BASE_URL}/roles`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ nombre: nuevoRol }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al crear rol");
        return res.json();
      })
      .then(() => {
        setNuevoRol("");
        cargarRoles(); // <- actualiza la lista
      })
      .catch((err) => console.error("❌ Error al crear rol:", err));
  };
  

  const eliminarRol = (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este rol?")) return;
    fetch(`http://localhost:5000/roles/${id}`, {
      method: "DELETE",
      headers,
    })
      .then(() => cargarRoles())
      .catch((err) => console.error("❌ Error al eliminar rol:", err));
  };

  const actualizarRol = (id) => {
    if (!nombreEditado.trim()) return;
    fetch(`http://localhost:5000/roles/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ nombre: nombreEditado }),
    })
      .then(() => {
        setEditandoId(null);
        setNombreEditado("");
        cargarRoles();
      })
      .catch((err) => console.error("❌ Error al actualizar rol:", err));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Roles</h1>

      {/* Crear nuevo rol */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Nuevo rol"
          value={nuevoRol}
          onChange={(e) => setNuevoRol(e.target.value)}
          className="border rounded p-2 flex-1"
        />
        <button
          onClick={crearRol}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded"
        >
          Crear
        </button>
      </div>

      {/* Tabla de roles */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Nombre</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((rol) => (
            <tr key={rol.id} className="border-t">
              <td className="p-2">{rol.id}</td>
              <td className="p-2">
                {editandoId === rol.id ? (
                  <input
                    type="text"
                    value={nombreEditado}
                    onChange={(e) => setNombreEditado(e.target.value)}
                    className="border p-1 rounded"
                  />
                ) : (
                  rol.nombre
                )}
              </td>
              <td className="p-2 flex gap-2">
                {editandoId === rol.id ? (
                  <button
                    onClick={() => actualizarRol(rol.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Guardar
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditandoId(rol.id);
                      setNombreEditado(rol.nombre);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Editar
                  </button>
                )}
                <button
                  onClick={() => eliminarRol(rol.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Eliminar
                </button>
                {editandoId === rol.id && (
                  <button
                    onClick={() => {
                      setEditandoId(null);
                      setNombreEditado("");
                    }}
                    className="bg-gray-500 text-white px-3 py-1 rounded"
                  >
                    Cancelar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Roles;
