import type React from "react"
import { ChatBubbleLeftRightIcon, ClockIcon } from "@heroicons/react/24/outline"

interface ChatMessage {
  id: number
  cliente: string
  telefone: string
  ultimaMensagem: string
  horario: string
  status: "pendente" | "em_preparo" | "finalizado"
  naoLida: boolean
}

const Chat: React.FC = () => {
  const conversas: ChatMessage[] = [
    {
      id: 1,
      cliente: "João Silva",
      telefone: "(11) 99999-1234",
      ultimaMensagem: "Oi! Gostaria de fazer um pedido: 1 X-Burger Clássico e 1 Coca-Cola",
      horario: "14:32",
      status: "pendente",
      naoLida: true,
    },
    {
      id: 2,
      cliente: "Maria Santos",
      telefone: "(11) 98888-5678",
      ultimaMensagem: "Quanto tempo para entrega no Centro?",
      horario: "14:15",
      status: "em_preparo",
      naoLida: false,
    },
    {
      id: 3,
      cliente: "Pedro Costa",
      telefone: "(11) 97777-9012",
      ultimaMensagem: "Obrigado! O lanche estava delicioso 😋",
      horario: "13:45",
      status: "finalizado",
      naoLida: false,
    },
    {
      id: 4,
      cliente: "Ana Oliveira",
      telefone: "(11) 96666-3456",
      ultimaMensagem: "Posso trocar a batata por salada?",
      horario: "13:20",
      status: "pendente",
      naoLida: true,
    },
    {
      id: 5,
      cliente: "Carlos Ferreira",
      telefone: "(11) 95555-7890",
      ultimaMensagem: "Pedido: 2 X-Bacon, 1 Milkshake de Chocolate",
      horario: "12:58",
      status: "em_preparo",
      naoLida: false,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "bg-apple-green-200 text-apple-green-800"
      case "em_preparo":
        return "bg-office-green-200 text-office-green-800"
      case "finalizado":
        return "bg-green-200 text-green-800"
      default:
        return "bg-gray-200 text-gray-800"
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
      default:
        return "Desconhecido"
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Chat com Clientes</h1>
        <p className="text-gray-600">Visualize as conversas do WhatsApp</p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <ChatBubbleLeftRightIcon className="w-5 h-5" />
            Conversas Recentes
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {conversas.map((conversa) => (
            <div
              key={conversa.id}
              className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors ${
                conversa.naoLida ? "bg-apple-green-50" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{conversa.cliente}</h3>
                    {conversa.naoLida && <span className="w-2 h-2 bg-apple-green rounded-full"></span>}
                  </div>

                  <p className="text-sm text-gray-600 mb-1">{conversa.telefone}</p>

                  <p className={`text-sm mb-3 ${conversa.naoLida ? "text-gray-900 font-medium" : "text-gray-600"}`}>
                    {conversa.ultimaMensagem}
                  </p>

                  <div className="flex items-center gap-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(conversa.status)}`}
                    >
                      {getStatusText(conversa.status)}
                    </span>

                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      {conversa.horario}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <ChatBubbleLeftRightIcon className="w-5 h-5 text-green-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">Integração com WhatsApp</h3>
            <p className="mt-1 text-sm text-green-700">
              Esta seção mostra apenas a visualização das conversas. O chatbot com IA processa automaticamente os
              pedidos e os envia para o sistema de pedidos.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
