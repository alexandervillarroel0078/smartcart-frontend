import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditarUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [idRol, setIdRol] = useState("");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Obtener usuario por ID
    axios
      .get(`http://localhost:5000/usuarios/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setNombre(res.data.nombre);
        setCorreo(res.data.correo);
        setIdRol(res.data.id_rol);
      });

    // Obtener roles
    axios
      .get("http://localhost:5000/roles", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setRoles(res.data.roles);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:5000/usuarios/${id}`,
        { nombre, correo, id_rol: idRol },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/usuarios");
    } catch (error) {
      alert("❌ Error al actualizar el usuario");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Editar Usuario</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={idRol}
          onChange={(e) => setIdRol(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">-- Seleccione Rol --</option>
          {roles.map((rol) => (
            <option key={rol.id} value={rol.id}>
              {rol.nombre}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Guardar cambios
        </button>
      </form>
    </div>
  );
};

export default EditarUsuario;
