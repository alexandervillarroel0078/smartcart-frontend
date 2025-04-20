import React, { useState } from 'react';
import GraficaVentasPorFecha from '../components/GraficaVentasPorFecha';
import GraficaProductosMasVendidos from '../components/GraficaProductosMasVendidos';

const ReportesGraficos = () => {
  const [fechaInicio, setFechaInicio] = useState('2025-01-01');
  const [fechaFin, setFechaFin] = useState('2025-04-01');
  const [modo, setModo] = useState('mes'); // <-- nuevo estado

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📊 Reportes Gráficos</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label style={{ marginRight: '1rem' }}>
          Fecha Inicio:
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            style={{ marginLeft: '0.5rem' }}
          />
        </label>

        <label style={{ marginRight: '1rem' }}>
          Fecha Fin:
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            style={{ marginLeft: '0.5rem' }}
          />
        </label>

        <label>
          Modo:
          <select
            value={modo}
            onChange={(e) => setModo(e.target.value)}
            style={{ marginLeft: '0.5rem' }}
          >
            <option value="mes">Mensual</option>
            <option value="dia">Diario</option>
          </select>
        </label>
      </div>

      <GraficaVentasPorFecha inicio={fechaInicio} fin={fechaFin} modo={modo} />
      <GraficaProductosMasVendidos inicio={fechaInicio} fin={fechaFin} />
    </div>
  );
};

export default ReportesGraficos;
