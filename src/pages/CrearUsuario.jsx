 
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CrearUsuario = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState([]);
  const [idRol, setIdRol] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const obtenerRoles = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/roles", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRoles(res.data.roles);
    };

    obtenerRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:5000/usuarios/agregar",
        {
          nombre,
          correo,
          password,
          id_rol: idRol,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/usuarios");
    } catch (error) {
      alert("❌ Error al crear usuario");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Crear Usuario</h2>
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
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={idRol}
          onChange={(e) => setIdRol(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">-- Seleccione Rol de usuario --</option>
          {roles.map((rol) => (
            <option key={rol.id} value={rol.id}>
              {rol.nombre}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default CrearUsuario;
