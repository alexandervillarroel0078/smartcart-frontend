import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`http://localhost:5000/usuarios/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsuario(res.data);
      })
      .catch(() => {
        alert("❌ Error al obtener el usuario");
        navigate("/usuarios");
      });
  }, [id]);

  if (!usuario) return <div className="p-6">Cargando usuario...</div>;

  return (
    <div className="p-6 max-w-lg space-y-4">
      <h2 className="text-2xl font-bold">Detalle del Usuario</h2>
      <div>
        <strong>Nombre:</strong> {usuario.nombre}
      </div>
      <div>
        <strong>Correo:</strong> {usuario.correo}
      </div>
      <div>
        <strong>Rol:</strong> {usuario.id_rol}
      </div>
      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => navigate("/usuarios")}
      >
        Volver
      </button>
    </div>
  );
};

export default VerUsuario;
