import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const GraficaProductosMasVendidos = ({ inicio, fin }) => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`http://127.0.0.1:5000/reporte-productos-mas-vendidos?inicio=${inicio}&fin=${fin}&limite=5`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setDatos(data));
  }, [inicio, fin]);

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h3>📊 Productos más vendidos</h3>
      <ResponsiveContainer>
        <BarChart data={datos}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="producto" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="cantidad_vendida" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficaProductosMasVendidos;
