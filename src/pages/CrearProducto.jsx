// src/pages/CrearProducto.jsx
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
    umbral_stock: '',
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
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Registrar Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block font-semibold">
          Nombre del producto
          <input
            type="text"
            name="nombre"
            value={formulario.nombre}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded mt-1"
          />
        </label>

        <label className="block font-semibold">
          Descripción
          <textarea
            name="descripcion"
            value={formulario.descripcion}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded mt-1"
          />
        </label>

        <label className="block font-semibold">
          Precio
          <input
            type="number"
            name="precio"
            value={formulario.precio}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded mt-1"
          />
        </label>

        <label className="block font-semibold">
          Stock
          <input
            type="number"
            name="stock"
            value={formulario.stock}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded mt-1"
          />
        </label>

        <label className="block font-semibold">
          Umbral mínimo
          <input
            type="number"
            name="umbral_stock"
            value={formulario.umbral_stock}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded mt-1"
          />
        </label>

        <label className="block font-semibold">
          Categoría
          <select
            name="id_categoria"
            value={formulario.id_categoria}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded mt-1"
          >
            <option value="">-- Selecciona una categoría --</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Guardar producto
        </button>
      </form>

    </div>
  );
};

export default CrearProducto;
