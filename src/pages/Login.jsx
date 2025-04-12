import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { obtenerTokenVisitante } from "../services/auth";

const Login = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + '/login', {
        correo,
        contrasena: password, // ✅ CAMBIAMOS 'password' → 'contrasena'
      });
      
      console.log("✅ Login response:", response.data); // <-- aquí se imprime la respuesta del backend

      localStorage.setItem('token', response.data.token);
      navigate('/'); // Redirige al home o a /usuarios
    } catch (error) {
      alert('❌ Credenciales incorrectas');
      console.error("🔴 Error en login:", error.response); // <-- esto también ayuda
    }
  };

  // ✅ AQUÍ debes colocar esta función (fuera del return)
  const handleEntrarComoVisitante = async () => {
    try {
      const res = await obtenerTokenVisitante();
      localStorage.setItem("token", res.token); // ✅ Aquí se guarda el token
      alert("Bienvenido visitante");
      window.location.href = "/catalogo";       // ✅ Redirige al catálogo
    } catch (error) {
      alert("❌ Error al entrar como visitante");
      console.error(error);
    }
  };

  const entrarComoVisitante = async () => {
    try {
      const res = await obtenerTokenVisitante();
      localStorage.setItem("token", res.token); // ✅ Guarda el token visitante
      window.location.href = "/catalogo";       // ✅ Redirige al catálogo
    } catch (error) {
      alert("❌ Error al entrar como visitante");
      console.error(error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <input
          type="email"
          placeholder="Correo"
          className="w-full mb-4 p-2 border"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full mb-4 p-2 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
          Ingresar
        </button>
        {/* ✅ Botón para visitante */}
        <p className="text-center mt-4 text-sm">
          ¿Solo deseas explorar?{" "}
          <button
            type="button"
            onClick={handleEntrarComoVisitante}
            className="text-blue-600 underline"
          >
            Entrar como visitante
          </button>
        </p>


      </form>
    </div>
  );
};

export default Login;
