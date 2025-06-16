"use client"

import type React from "react"
import axios from "axios"
import { useEffect, useState } from "react"
import { ClockIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline"

interface Pedido {
  id: number
  cliente: string
  telefone: string
  itens: string[]  // Agora é apenas array de strings
  total: number
  status: string
  horario: string
}

const Pedidos: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([])

  const fetchPedidos = async () => {
    try {
      const response = await axios.get("http://localhost:4000/pedidos")
      if (!response.data || !Array.isArray(response.data)) {
        throw new Error("Erro ao buscar pedidos")
      }

      console.log("Pedidos recebidos:", response.data)

      const pedidosFormatados = response.data.map((pedido: any) => ({
        id: pedido.id,
        cliente: pedido.nomeDoCliente,
        telefone: pedido.telefoneDoCliente,
        itens: pedido.nomesProdutos,
        total: pedido.valorTotal,
        status: pedido.status,
        horario: pedido.horario,
      }))

      setPedidos(pedidosFormatados)
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error)
    }
  }

  useEffect(() => {
    fetchPedidos()
    const interval = setInterval(fetchPedidos, 3000)

    return () => clearInterval(interval)
  }, [])

  const updateStatus = (id: number, newStatus: Pedido["status"]) => {
    setPedidos((prevPedidos) =>
      prevPedidos.map((pedido) =>
        pedido.id === id ? { ...pedido, status: newStatus } : pedido
      )
    )
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pendente":
        return "bg-green-200 text-green-800 border-green-300"
      case "em_preparo":
        return "bg-blue-200 text-blue-800 border-blue-300"
      case "finalizado":
        return "bg-green-200 text-green-800 border-green-300"
      case "cancelado":
        return "bg-red-200 text-red-800 border-red-300"
      default:
        return "bg-gray-200 text-gray-800 border-gray-300"
    }
  }

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case "pendente":
        return "Pendente"
      case "em_preparo":
        return "Em Preparo"
      case "finalizado":
        return "Finalizado"
      case "cancelado":
        return "Cancelado"
      default:
        return "Desconhecido"
    }
  }

  const filteredPedidos = pedidos.filter((pedido) => pedido.status !== "cancelado")

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Pedidos</h1>
        <p className="text-gray-600">Pedidos recebidos via WhatsApp</p>
      </div>

      <div className="grid gap-6">
        {filteredPedidos.map((pedido) => (
          <div
            key={pedido.id}
            className={`bg-white rounded-lg shadow border-l-4 ${getStatusColor(pedido.status)}`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Pedido #{pedido.id}</h3>
                  <p className="text-sm text-gray-600">{pedido.cliente}</p>
                  <p className="text-sm text-gray-500">{pedido.telefone}</p>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(pedido.status)}`}
                  >
                    {getStatusText(pedido.status.toLowerCase())}
                  </span>
                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    {pedido.horario}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Itens do Pedido:</h4>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  {pedido.itens.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <div className="border-t border-gray-200 mt-2 pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span className="text-green-700">R$ {pedido.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {pedido.status.toLowerCase() !== "finalizado" && (
                <div className="flex gap-2">
                  {pedido.status === "pendente" && (
                    <button
                      onClick={() => updateStatus(pedido.id, "em_preparo")}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                    >
                      <ClockIcon className="w-4 h-4" />
                      Iniciar Preparo
                    </button>
                  )}

                  {pedido.status.toLowerCase() === "em_preparo" && (
                    <button
                      onClick={() => updateStatus(pedido.id, "finalizado")}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                    >
                      <CheckCircleIcon className="w-4 h-4" />
                      Finalizar Pedido
                    </button>
                  )}

                  <button
                    onClick={() => updateStatus(pedido.id, "cancelado")}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
                  >
                    <XCircleIcon className="w-4 h-4" />
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredPedidos.length === 0 && (
        <div className="text-center py-12">
          <ClockIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum pedido encontrado</h3>
          <p className="text-gray-600">Os pedidos recebidos via WhatsApp aparecerão aqui.</p>
        </div>
      )}
    </div>
  )
}

export default Pedidos
