import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerCategorias } from "../services/categorias";
import { obtenerProductoPorId, actualizarProducto } from "../services/productos";

const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [formulario, setFormulario] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    umbral_stock: '',
    id_categoria: '',
  });

  useEffect(() => {
    obtenerCategorias().then(setCategorias);

    obtenerProductoPorId(id).then(producto => {
      setFormulario({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        stock: producto.stock,
        umbral_stock: producto.umbral_stock,
        id_categoria: producto.id_categoria,
      });
    }).catch(() => alert("❌ Error al cargar el producto"));
  }, [id]);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const exito = await actualizarProducto(id, formulario);
    if (exito) {
      alert("✅ Producto actualizado");
      navigate("/productos");
    } else {
      alert("❌ Error al actualizar");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Editar Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block font-semibold">
          Nombre
          <input type="text" name="nombre" value={formulario.nombre} onChange={handleChange} className="w-full border px-4 py-2 rounded mt-1" />
        </label>

        <label className="block font-semibold">
          Descripción
          <textarea name="descripcion" value={formulario.descripcion} onChange={handleChange} className="w-full border px-4 py-2 rounded mt-1" />
        </label>

        <label className="block font-semibold">
          Precio
          <input type="number" name="precio" value={formulario.precio} onChange={handleChange} className="w-full border px-4 py-2 rounded mt-1" />
        </label>

        <label className="block font-semibold">
          Stock
          <input type="number" name="stock" value={formulario.stock} onChange={handleChange} className="w-full border px-4 py-2 rounded mt-1" />
        </label>

        <label className="block font-semibold">
          Umbral mínimo
          <input type="number" name="umbral_stock" value={formulario.umbral_stock} onChange={handleChange} className="w-full border px-4 py-2 rounded mt-1" />
        </label>

        <label className="block font-semibold">
          Categoría
          <select name="id_categoria" value={formulario.id_categoria} onChange={handleChange} className="w-full border px-4 py-2 rounded mt-1">
            <option value="">-- Selecciona una categoría --</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </label>

        <button type="submit" className="bg-yellow-600 text-white px-4 py-2 rounded">
          Actualizar producto
        </button>
      </form>
    </div>
  );
};

export default EditarProducto;
