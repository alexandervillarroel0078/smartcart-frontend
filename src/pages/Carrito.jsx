import React, { useEffect, useState } from "react";
import { validarStockCarrito } from "../services/detalleCarrito";
import axios from "axios";
// Agrega esta importación al inicio del archivo (junto con las otras)
import { pagar } from "../services/ventas";  // Servicio de pago simulado
 
import {
  obtenerDetalleCarrito,
  eliminarDetalleCarrito,
  actualizarCantidadDetalle,
  obtenerTotalCarrito,
} from "../services/detalleCarrito";

const Carrito = () => {
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const [tokenListo, setTokenListo] = useState(false);
  const [puedePagar, setPuedePagar] = useState(false);
  const [idCarrito, setIdCarrito] = useState(null);
  const [nombreCliente, setNombreCliente] = useState("");
  const [nitCliente, setNitCliente] = useState("");

  const cargarCarrito = async () => {
    try {
      const res = await obtenerDetalleCarrito();
      setProductos(res || []);
      const resTotal = await obtenerTotalCarrito();
      setTotal(resTotal.total);
    } catch (error) {
      console.error("❌ Error al cargar el carrito:", error);
    }
  };
  const calcularTotal = async () => {
    try {
      const resTotal = await obtenerTotalCarrito();
      setTotal(resTotal.total);
      alert(` Total actualizado: Bs ${resTotal.total.toFixed(2)}`);
    } catch (err) {
      console.error("❌ Error al calcular total", err);
      alert("❌ No se pudo calcular el total");
    }
  };


  //  Esperar que el token esté en localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("🔐 Token en carrito:", token);
    if (token) setTokenListo(true);
  }, []);

  //  Cargar carrito solo cuando token esté listo
  useEffect(() => {
    if (tokenListo) {
      cargarCarrito();
    }
  }, [tokenListo]);
  useEffect(() => {
    const obtenerCarrito = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/carrito/ver", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setIdCarrito(res.data.id_carrito); // <--- Guarda el ID en el estado
      } catch (err) {
        console.error("❌ No tienes un carrito activo", err);
      }
    };

    obtenerCarrito();
  }, []);

  const actualizarCantidad = async (id, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    await actualizarCantidadDetalle(id, nuevaCantidad);
    cargarCarrito();
  };
  const pagarConStripe = async () => {
    try {

      console.log("🧾 idCarrito:", idCarrito); // DEBE MOSTRAR un número


      const res = await axios.post("http://localhost:5000/crear-pago", {
        monto: 100,
        descripcion: "Compra desde Smart Cart",
        id_carrito: idCarrito,
      });
  
      window.location.href = res.data.url; // Redirige al checkout de Stripe
    } catch (error) {
      console.error("Error al crear el pago", error);
      alert("No se pudo procesar el pago.");
    }
  };
  const eliminarProducto = async (id) => {
    await eliminarDetalleCarrito(id);
    cargarCarrito();
  };


  const validarAntesDePagar = async () => {
    try {
      const res = await validarStockCarrito();
      if (res.success) {
        alert(" Stock suficiente, puedes proceder al pago.");
        setPuedePagar(true); //  habilita el botón de pagar
      }
    } catch (error) {
      if (error.response?.data?.problemas) {
        const msg = error.response.data.problemas
          .map(
            (p) =>
              `❌ ${p.producto}: solicitado ${p.cantidad_solicitada}, disponible ${p.stock_disponible}`
          )
          .join("\n");
        alert(`❌ Problemas de stock:\n${msg}`);
      } else {
        alert("❌ Error al validar el stock");
      }
    }
  };


  const pagarCarrito = async () => {
    try {
      console.log("🧾 Intentando pagar...");
      const res = await pagar({
        metodo_pago: "Simulado",
        estado: "exitoso",
        nombre_cliente: nombreCliente,
        nit_cliente: nitCliente,
      });
  
      console.log("🧾 Respuesta completa:", res);
  
      if (res.success && res.id_compra) {
        alert(`✅ Pago simulado registrado\nTotal: Bs ${res.total.toFixed(2)}`);
    //    window.location.href = `/recibo/${res.id_compra}`;
        setPuedePagar(false);
        setProductos([]);
        setTotal(0);

        setNombreCliente("");
        setNitCliente("");
  
        // 🧼 Limpiar localStorage si se guarda el id del carrito
        localStorage.removeItem("id_carrito");
  
        // ✅ Redirigir a recibo
        window.location.href = `/recibo/${res.id_compra}`;



      } else {
        console.error("❌ No se recibió id_compra o success = false");
        alert("❌ No se pudo procesar el pago.");
      }
    } catch (err) {
      console.error("❌ Error inesperado al pagar", err);
      alert("❌ Error inesperado al pagar");
    }
  };
  




  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">🛒 Carrito</h2>
      {productos.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <table className="min-w-full border mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Producto</th>
                <th className="border px-4 py-2">Cantidad</th>
                <th className="border px-4 py-2">Precio</th>
                <th className="border px-4 py-2">Subtotal</th>
                <th className="border px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((item) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">{item.producto}</td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      value={item.cantidad}
                      min="1"
                      onChange={(e) =>
                        actualizarCantidad(item.id, parseInt(e.target.value))
                      }
                      className="w-16 text-center border rounded"
                    />
                  </td>
                  <td className="border px-4 py-2">Bs {item.precio_unitario.toFixed(2)}</td>
                  <td className="border px-4 py-2">Bs {item.subtotal.toFixed(2)}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => eliminarProducto(item.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Quitar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right text-xl font-bold">
            Total: Bs {total ? total.toFixed(2) : "0.00"}

          </div>
        </>
      )}



      <div className="text-right">
        <button
          onClick={async () => {
            try {
              const resTotal = await obtenerTotalCarrito();
              if (typeof resTotal === 'number') {
                setTotal(resTotal);
              } else {
                alert("⚠️ No se pudo calcular el total");
              }

            } catch (e) {
              alert("❌ Error al calcular el total");
              console.error(e);
            }
          }}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Calcular Total
        </button>
      </div>
      <button
        onClick={validarAntesDePagar}
        className="bg-green-600 text-white px-4 py-2 rounded mt-4"
      >
        Confirmar antes de pagar
      </button>
      {puedePagar && (
        <div>
          {/* 👇 Agrega esto aquí */}
          <label className="block text-white mt-4">Nombre del cliente:</label>
          <input
            type="text"
            value={nombreCliente}
            onChange={(e) => setNombreCliente(e.target.value)}
            className="w-full p-2 rounded border text-black"
          />

          <label className="block text-white mt-4">NIT:</label>
          <input
            type="text"
            value={nitCliente}
            onChange={(e) => setNitCliente(e.target.value)}
            maxLength={10}
            className="w-full p-2 rounded border text-black"
          />

<button
  onClick={pagarConStripe}
  className="bg-yellow-600 text-white px-4 py-2 rounded mt-4 ml-4"
>
  Pagar con Stripe 💳
</button>

        </div>
      )}
    </div>
  );
};

export default Carrito;
