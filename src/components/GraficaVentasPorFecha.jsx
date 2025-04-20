import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

// 📁 src/components/GraficaVentasPorFecha.jsx
const GraficaVentasPorFecha = ({ inicio, fin, modo }) => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`http://127.0.0.1:5000/grafica-ventas-por-fecha?inicio=${inicio}&fin=${fin}&modo=${modo}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setDatos(data));
  }, [inicio, fin, modo]);

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h3>📈 Ventas por {modo === 'mes' ? 'mes' : 'día'}</h3>
      <ResponsiveContainer>
        <LineChart data={datos}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fecha" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficaVentasPorFecha;
