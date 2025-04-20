import React, { useEffect, useState } from "react";
import { obtenerCategorias } from "../services/categorias";

import { obtenerProductosCatalogo } from "../services/productos";
import { agregarProductoAlCarrito } from "../services/detalleCarrito";
import { obtenerCarrito, crearCarrito } from "../services/carrito";
import { useLocation } from "react-router-dom";


const Catalogo = () => {
    const [categorias, setCategorias] = useState([]);
    const [productos, setProductos] = useState([]);
    const location = useLocation(); // 👈 AÑADE ESTO

    const agregarAlCarrito = async (producto) => {
        console.log("🛒 Producto agregado al carrito:", producto.id);

        try {
            let id_carrito;

            try {
                id_carrito = await obtenerCarrito();
            } catch {
                id_carrito = await crearCarrito();
            }

            const res = await agregarProductoAlCarrito({
                id_producto: producto.id,
                cantidad: 1,
                precio_unitario: producto.precio
            });

            if (res.success) {
                alert("✅ Producto agregado al carrito");
                refrescarCatalogo();
            } else {
                alert("❌ No se pudo agregar al carrito");
            }
        } catch (err) {
            console.error("❌ Error agregando al carrito", err);
            alert("❌ Error inesperado");
        }
    };
    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("🔐 Token en catálogo:", token); // 👀 Este debe mostrar el token real

        if (!token) {
            alert("⚠️ Token no encontrado. Redirigiendo al login.");
            window.location.href = "/login";
            return;
        }

        obtenerCategorias()
            .then(setCategorias)
            .catch((e) => console.error("❌ Error al obtener categorías", e));

        obtenerProductosCatalogo()
            .then(setProductos)
            .catch((e) => console.error("❌ Error al obtener productos para catálogo", e));


    }, []);
    const refrescarCatalogo = () => {
        obtenerCategorias().then(setCategorias);
        obtenerProductosCatalogo().then(setProductos);
      };
      
    useEffect(() => {
        obtenerCategorias().then(setCategorias);
        obtenerProductosCatalogo().then(setProductos);
    }, []); // ✅ debe estar sin dependencia o con trigger desde navegación
   
        useEffect(() => {
            console.log("📦 Recargando catálogo desde:", location.pathname);
            obtenerCategorias().then(setCategorias);
            obtenerProductosCatalogo().then(setProductos);
        }, [location]);
     
        return (
            <div className="p-6">
                <h2 className="text-3xl font-bold mb-6">Catálogo de Productos</h2>

                {categorias.map((categoria) => {
                    const productosFiltrados = productos.filter(
                        (p) => p.id_categoria === categoria.id && p.visible !== false
                    );


                    if (productosFiltrados.length === 0) return null;

                    return (
                        <div key={categoria.id} className="mb-8">
                            <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                                {categoria.nombre}
                            </h3>

                            <div className="relative">
                                {/* Contenedor que muestra solo 4 productos visibles */}
                                <div
                                    className="overflow-hidden"
                                    style={{ maxWidth: "1000px", margin: "0 auto" }} // 👈 250px * 4 productos
                                >
                                    {/* Scroll horizontal interno */}
                                    <div
                                        id={`scroll-${categoria.id}`}
                                        className="flex overflow-x-auto no-scrollbar scroll-smooth space-x-4"
                                        style={{ scrollBehavior: "smooth" }}
                                    >
                                        {productosFiltrados.map((p) => (
                                            <div
                                                key={p.id}
                                                className="min-w-[250px] max-w-[250px] border rounded shadow p-4 flex-shrink-0"
                                            >
                                                <img
                                                    src={p.imagen}
                                                    alt={p.nombre}
                                                    className="w-full h-32 object-contain mb-2"
                                                />
                                                <h4 className="text-lg font-bold">{p.nombre}</h4>
                                                <p className="text-sm text-gray-600 mb-1">{p.descripcion}</p>
                                                <p className="text-green-600 font-semibold">
                                                    Bs {Number(p.precio).toFixed(2)}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {p.stock === 0 ? "Agotado" : `Stock: ${p.stock}`}
                                                </p>
                                                <button
                                                    className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                                                    onClick={() => agregarAlCarrito(p)}
                                                >
                                                    Agregar al carrito
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Flechas */}
                                <button
                                    onClick={() =>
                                        document
                                            .getElementById(`scroll-${categoria.id}`)
                                            .scrollBy({ left: -1000, behavior: "smooth" })
                                    }
                                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border rounded-full shadow p-2 z-10"
                                >
                                    ◀
                                </button>
                                <button
                                    onClick={() =>
                                        document
                                            .getElementById(`scroll-${categoria.id}`)
                                            .scrollBy({ left: 1000, behavior: "smooth" })
                                    }
                                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border rounded-full shadow p-2 z-10"
                                >
                                    ▶
                                </button>
                            </div>
                        </div>


                    );
                })}
            </div>
        );

    };

    export default Catalogo;
