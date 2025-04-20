// 📁 src/pages/ReporteCompras.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ReporteCompras = () => {
    const [compras, setCompras] = useState([]);
    const [inicio, setInicio] = useState("");
    const [fin, setFin] = useState("");

    const token = localStorage.getItem("token");
    const rol = JSON.parse(atob(token.split(".")[1])).rol;

    const cargarCompras = async () => {
        try {
            const params = {};
            if (inicio) params.inicio = inicio;
            if (fin) params.fin = fin;

            const res = await axios.get("http://localhost:5000/reporte-compras", {
                headers: { Authorization: `Bearer ${token}` },
                params,
            });
            setCompras(res.data);
        } catch (error) {
            alert("❌ Error al obtener el reporte de compras");
            console.error(error);
        }
    };
    // 📁 src/pages/ReporteCompras.jsx

    const descargarPDF = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get("http://localhost:5000/reporte-compras/pdf", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                responseType: "blob", // 👈 necesario para binarios como PDF
            });

            // Descargar el PDF en el navegador
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "reporte_compras.pdf");
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            alert("❌ Error al descargar PDF");
            console.error(err);
        }
    };
    const descargarExcel = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get("http://localhost:5000/reporte-compras/excel", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                responseType: "blob", // ⚠️ necesario para archivos
            });

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "reporte_compras.xlsx");
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            alert("❌ Error al descargar Excel");
            console.error(err);
        }
    };

    useEffect(() => {
        if (rol === "admin") cargarCompras();
    }, [inicio, fin]);

    if (rol !== "admin") return <p>⛔ No tienes permisos para ver este reporte.</p>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">📋 Reporte de Compras</h2>

            <div className="mb-4 flex gap-4">
                <div>
                    <label>Fecha inicio:</label>
                    <input
                        type="date"
                        value={inicio}
                        onChange={(e) => setInicio(e.target.value)}
                        className="border rounded px-2 py-1 ml-2"
                    />
                </div>
                <div>
                    <label>Fecha fin:</label>
                    <input
                        type="date"
                        value={fin}
                        onChange={(e) => setFin(e.target.value)}
                        className="border rounded px-2 py-1 ml-2"
                    />
                </div>
                <button
                    onClick={cargarCompras}
                    className="bg-blue-600 text-white px-4 py-2 rounded ml-4"
                >
                    Buscar
                </button>
                <button
                    onClick={descargarExcel}
                    className="bg-green-600 text-white px-4 py-2 rounded ml-2"
                >
                    Exportar Excel
                </button>


                <button
                    onClick={descargarPDF}
                    className="bg-red-600 text-white px-4 py-2 rounded ml-2"
                >
                    Exportar PDF
                </button>


            </div>

            {compras.length === 0 ? (
                <p>No hay registros de compra.</p>
            ) : (
                <table className="min-w-full border mt-4">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Cliente</th>
                            <th className="border px-4 py-2">NIT</th>
                            <th className="border px-4 py-2">Total</th>
                            <th className="border px-4 py-2">Fecha</th>
                            <th className="border px-4 py-2">Carrito</th>
                        </tr>
                    </thead>
                    <tbody>
                        {compras.map((compra) => (
                            <tr key={compra.id}>
                                <td className="border px-4 py-2">{compra.id}</td>
                                <td className="border px-4 py-2">{compra.cliente || "No registrado"}</td>
                                <td className="border px-4 py-2">{compra.nit_cliente || "No registrado"}</td>
                                <td className="border px-4 py-2">Bs {compra.total}</td>
                                <td className="border px-4 py-2">
                                    {new Date(compra.fecha).toLocaleString()}
                                </td>
                                <td className="border px-4 py-2">{compra.id_carrito}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            )}
        </div>
    );
};

export default ReporteCompras;
