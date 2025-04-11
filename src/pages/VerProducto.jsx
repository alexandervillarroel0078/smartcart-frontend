// src/pages/VerProducto.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerProductoPorId } from '../services/productos';

const VerProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    obtenerProductoPorId(id)
      .then(setProducto)
      .catch(() => {
        alert("❌ Error al obtener producto");
        navigate("/productos");
      });
  }, [id]);

  if (!producto) return <div className="p-6">Cargando producto...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Detalles del Producto</h2>
      <p><strong>Nombre:</strong> {producto.nombre}</p>
      <p><strong>Descripción:</strong> {producto.descripcion}</p>
      <p><strong>Precio:</strong> Bs {producto.precio}</p>
      <p><strong>Stock:</strong> {producto.stock}</p>
      <p><strong>Umbral mínimo:</strong> {producto.umbral_stock}</p>
      <p><strong>Categoría ID:</strong> {producto.id_categoria}</p>
    </div>
  );
};

export default VerProducto;
