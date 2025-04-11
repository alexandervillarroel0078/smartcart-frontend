import { useState } from "react"
import Login from "./Login"
import Cliente from "./Cliente"

function Home() {
  const [rolSeleccionado, setRolSeleccionado] = useState(null)

  if (rolSeleccionado === "admin" || rolSeleccionado === "almacenero") {
    return <Login rol={rolSeleccionado} />
  }

  if (rolSeleccionado === "cliente") {
    return <Cliente />
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Selecciona tu rol</h1>
      <div className="flex flex-col gap-4">
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          onClick={() => setRolSeleccionado("admin")}
        >
          Administrador
        </button>
        <button
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          onClick={() => setRolSeleccionado("almacenero")}
        >
          Almacenero
        </button>
        <button
          className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600"
          onClick={() => setRolSeleccionado("cliente")}
        >
          Cliente
        </button>
      </div>
    </div>
  )
}

export default Home
