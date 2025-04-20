// 📁 src/pages/CrearProducto.jsx
import React, { useEffect, useState } from 'react';
import { obtenerCategorias } from '../services/categorias';
import { registrarProducto } from '../services/productos';
import { useNavigate } from 'react-router-dom';

const CrearProducto = () => {
  const [categorias, setCategorias] = useState([]);
  const [formulario, setFormulario] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    modelo: '',
    umbral_minimo: '',
    umbral_maximo: '',
    id_categoria: '',
  });
  

  const navigate = useNavigate();

  useEffect(() => {
    obtenerCategorias()
      .then(setCategorias)
      .catch(() => alert('Error al cargar categorías'));
  }, []);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const exito = await registrarProducto(formulario);
    if (exito) {
      alert('✅ Producto registrado');
      navigate('/productos');
    } else {
      alert('❌ Error al registrar');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
      <div className="w-full max-w-xl bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-6">
        <h2 className="text-3xl font-bold text-cyan-300 mb-6 text-center">📝 Registrar Producto</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nombre */}
          <div>
            <label className="block text-cyan-200 font-medium mb-1">Nombre del producto</label>
            <input
              type="text"
              name="nombre"
              value={formulario.nombre}
              onChange={handleChange}
              required
              className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-cyan-200 font-medium mb-1">Descripción</label>
            <textarea
              name="descripcion"
              value={formulario.descripcion}
              onChange={handleChange}
              required
              className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Precio */}
          <div>
            <label className="block text-cyan-200 font-medium mb-1">Precio</label>
            <input
              type="number"
              name="precio"
              value={formulario.precio}
              onChange={handleChange}
              required
              className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-cyan-200 font-medium mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={formulario.stock}
              onChange={handleChange}
              required
              className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Modelo */}
<div>
  <label className="block text-cyan-200 font-medium mb-1">Modelo</label>
  <input
    type="text"
    name="modelo"
    value={formulario.modelo}
    onChange={handleChange}
    required
    className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
  />
</div>

{/* Umbral mínimo */}
<div>
  <label className="block text-cyan-200 font-medium mb-1">Umbral mínimo</label>
  <input
    type="number"
    name="umbral_minimo"
    value={formulario.umbral_minimo}
    onChange={handleChange}
    required
    className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
  />
</div>

{/* Umbral máximo */}
<div>
  <label className="block text-cyan-200 font-medium mb-1">Umbral máximo</label>
  <input
    type="number"
    name="umbral_maximo"
    value={formulario.umbral_maximo}
    onChange={handleChange}
    required
    className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
  />
</div>


          {/* Categoría */}
          <div>
            <label className="block text-cyan-200 font-medium mb-1">Categoría</label>
            <select
              name="id_categoria"
              value={formulario.id_categoria}
              onChange={handleChange}
              required
              className="w-full bg-gray-900 border border-gray-600 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">-- Selecciona una categoría --</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </div>

          {/* Botón */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-500 px-6 py-2 text-white font-semibold rounded shadow-md transition"
            >
              Guardar producto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearProducto;
