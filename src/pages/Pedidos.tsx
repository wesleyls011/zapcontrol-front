"use client"

import type React from "react"
import { useState } from "react"
import { ClockIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline"

interface PedidoItem {
  nome: string
  quantidade: number
  preco: number
}

interface Pedido {
  id: number
  cliente: string
  telefone: string
  itens: PedidoItem[]
  total: number
  status: "pendente" | "em_preparo" | "finalizado" | "cancelado"
  horario: string
  tempoDecorrido: string
}

const Pedidos: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([
    {
      id: 1001,
      cliente: "João Silva",
      telefone: "(11) 99999-1234",
      itens: [
        { nome: "X-Burger Clássico", quantidade: 1, preco: 18.9 },
        { nome: "Coca-Cola 350ml", quantidade: 1, preco: 5.5 },
      ],
      total: 24.4,
      status: "pendente",
      horario: "14:32",
      tempoDecorrido: "5 min",
    },
    {
      id: 1002,
      cliente: "Maria Santos",
      telefone: "(11) 98888-5678",
      itens: [
        { nome: "X-Bacon", quantidade: 2, preco: 22.9 },
        { nome: "Batata Frita", quantidade: 1, preco: 12.9 },
      ],
      total: 58.7,
      status: "em_preparo",
      horario: "14:15",
      tempoDecorrido: "22 min",
    },
    {
      id: 1003,
      cliente: "Pedro Costa",
      telefone: "(11) 97777-9012",
      itens: [
        { nome: "X-Burger Clássico", quantidade: 1, preco: 18.9 },
        { nome: "Milkshake de Chocolate", quantidade: 1, preco: 14.9 },
      ],
      total: 33.8,
      status: "finalizado",
      horario: "13:45",
      tempoDecorrido: "52 min",
    },
    {
      id: 1004,
      cliente: "Ana Oliveira",
      telefone: "(11) 96666-3456",
      itens: [{ nome: "X-Bacon", quantidade: 1, preco: 22.9 }],
      total: 22.9,
      status: "pendente",
      horario: "13:20",
      tempoDecorrido: "1h 17min",
    },
  ])

  const updateStatus = (id: number, newStatus: Pedido["status"]) => {
    setPedidos(pedidos.map((pedido) => (pedido.id === id ? { ...pedido, status: newStatus } : pedido)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "bg-apple-green-200 text-apple-green-800 border-apple-green-200"
      case "em_preparo":
        return "bg-office-green-200 text-office-green-800 border-office-green-200"
      case "finalizado":
        return "bg-green-200 text-green-800 border-green-200"
      case "cancelado":
        return "bg-red-200 text-red-800 border-red-200"
      default:
        return "bg-gray-200 text-gray-800 border-gray-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
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
        <p className="text-gray-600">Gerencie os pedidos recebidos via WhatsApp</p>
      </div>

      <div className="grid gap-6">
        {filteredPedidos.map((pedido) => (
          <div
            key={pedido.id}
            className={`bg-white rounded-lg shadow border-l-4 ${
              pedido.status === "pendente"
                ? "border-l-apple-green-400"
                : pedido.status === "em_preparo"
                  ? "border-l-office-green-400"
                  : "border-l-apple-green-600"
            }`}
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
                    {getStatusText(pedido.status)}
                  </span>
                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    {pedido.horario} • {pedido.tempoDecorrido}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Itens do Pedido:</h4>
                <div className="space-y-1">
                  {pedido.itens.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.quantidade}x {item.nome}
                      </span>
                      <span className="text-gray-900">R$ {(item.quantidade * item.preco).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 mt-2 pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span className="text-apple-green">R$ {pedido.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {pedido.status !== "finalizado" && (
                <div className="flex gap-2">
                  {pedido.status === "pendente" && (
                    <button
                      onClick={() => updateStatus(pedido.id, "em_preparo")}
                      className="flex-1 bg-office-green-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                    >
                      <ClockIcon className="w-4 h-4" />
                      Iniciar Preparo
                    </button>
                  )}

                  {pedido.status === "em_preparo" && (
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
