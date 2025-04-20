import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Calificar = () => {
  const { id } = useParams(); // id_compra
  const navigate = useNavigate();
  const [estrellas, setEstrellas] = useState(0);

  const enviarCalificacion = async () => {
    try {
      console.log("📤 Enviando calificación...");
      console.log("🆔 Compra:", id, "⭐ Estrellas:", estrellas);

      const res = await axios.post("http://localhost:5000/calificaciones", {
        id_compra: id,
        estrellas: estrellas,
      });

      alert("✅ ¡Gracias por calificar!");
      navigate("/catalogo");
    } catch (error) {
      console.error("❌ Error al enviar calificación:", error);
      alert("❌ No se pudo enviar la calificación");
    }
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">⭐ Califica tu experiencia</h2>
      <div className="text-3xl mb-4">
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            onClick={() => setEstrellas(n)}
            style={{ cursor: "pointer", color: n <= estrellas ? "#facc15" : "#ccc" }}
          >
            ★
          </span>
        ))}
      </div>
      <button
        onClick={enviarCalificacion}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        disabled={estrellas === 0}
      >
        Enviar calificación
      </button>
    </div>
  );
};

export default Calificar;
