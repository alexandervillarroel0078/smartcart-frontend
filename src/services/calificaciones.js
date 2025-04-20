import axios from "axios";

export const enviarCalificacion = async ({ id_compra, estrellas }) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    "http://localhost:5000/calificaciones",
    { id_compra, estrellas }, // 👈 cuerpo válido
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // 👈 necesario
      },
    }
  );

  return res.data;
};
