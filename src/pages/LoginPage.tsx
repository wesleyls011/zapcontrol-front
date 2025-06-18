"use client"

import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext"
import { EyeIcon, EyeSlashIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline"

import { useNavigate } from 'react-router-dom'

const LoginPage: React.FC = () => {
  const { login, isLoading, user } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const success = await login(formData.email, formData.password)

    if (!success) {
      setError("Email ou senha incorretos")
    } else {
      navigate('/app')
    }
  }

  // Redireciona automaticamente se já estiver autenticado
  React.useEffect(() => {
    if (user) {
      navigate('/app')
    }
  }, [user, navigate])



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-magnolia to-apple-green-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-apple-green rounded-full flex items-center justify-center mb-4">
              <span className="text-white text-2xl font-bold">Z</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">ZapControl</h2>
            <p className="text-gray-600 mt-2">Faça login para acessar o sistema</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
                <ExclamationCircleIcon className="w-5 h-5 text-red-600" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-apple-green focus:border-apple-green transition-colors"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-apple-green focus:border-apple-green transition-colors pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-apple-green text-white py-3 px-4 rounded-lg hover:bg-apple-green-700 focus:ring-2 focus:ring-apple-green focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Entrando...
                </div>
              ) : (
                "Entrar"
              )}
            </button>
          </form>


        </div>
      </div>
    </div>
  )
}

export default LoginPage
