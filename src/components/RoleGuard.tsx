"use client"

import type React from "react"
import { useAuth } from "../contexts/AuthContext"
import { ShieldExclamationIcon } from "@heroicons/react/24/outline"
import type { ReactNode } from "react"

interface RoleGuardProps {
  allowedRoles: ("admin" | "funcionario")[]
  children: ReactNode
  fallback?: ReactNode
}

const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children, fallback }) => {
  const { user } = useAuth()

  if (!user || !allowedRoles.includes(user.role)) {
    if (fallback) {
      return <>{fallback}</>
    }

    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <ShieldExclamationIcon className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Acesso Restrito</h3>
        <p className="text-gray-600">Você não tem permissão para acessar esta funcionalidade.</p>
      </div>
    )
  }

  return <>{children}</>
}

export default RoleGuard
