"use client"

import type React from "react"
import { useAuth } from "../contexts/AuthContext"

const WelcomeHeader: React.FC = () => {
  const { user } = useAuth()

  if (!user) return null

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Bom dia"
    if (hour < 18) return "Boa tarde"
    return "Boa noite"
  }

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {getGreeting()}, {user.nome.split(" ")[0]}! 👋
          </h1>
          <p className="text-gray-600">Bem-vindo de volta ao ZapControl</p>
        </div>
        <div className="hidden md:block">
          <div className="text-right">
            <p className="text-sm text-gray-500">Logado como</p>
            <p className="text-sm font-medium text-gray-900">
              {user.role === "admin" ? "Administrador" : "Funcionário"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeHeader
