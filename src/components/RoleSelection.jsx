import { useState } from "react"
import { UserCog, Box, ShoppingCart } from "lucide-react" // si usas lucide para íconos
 

const roles = [
  { id: "admin", label: "Administrador", icon: <UserCog size={40} /> },
  { id: "almacenero", label: "Personal de Almacén", icon: <Box size={40} /> },
  { id: "cliente", label: "Cliente", icon: <ShoppingCart size={40} /> },
]

function RoleSelection({ onSelect }) {
  const [selectedRole, setSelectedRole] = useState(null)

  const handleContinue = () => {
    if (selectedRole) onSelect(selectedRole)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full p-8 text-center">
        <h1 className="text-2xl font-bold mb-2">¿Quién eres?</h1>
        <p className="text-gray-600 mb-6">Selecciona tu rol para continuar:</p>

        <div className="flex justify-center gap-6 mb-6 flex-wrap">
          {roles.map((role) => (
            <div
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`cursor-pointer border-2 rounded-xl p-6 flex flex-col items-center w-40 transition 
                ${
                  selectedRole === role.id
                    ? "border-blue-600 shadow-md"
                    : "border-gray-200 hover:border-blue-400"
                }`}
            >
              <div className="mb-3 text-blue-600">{role.icon}</div>
              <span className="font-semibold">{role.label}</span>
            </div>
          ))}
        </div>

        <button
          disabled={!selectedRole}
          onClick={handleContinue}
          className={`mt-4 px-6 py-2 rounded text-white font-semibold transition 
            ${
              selectedRole
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          Continuar
        </button>
      </div>
    </div>
  )
}

export default RoleSelection
