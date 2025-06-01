"use client"

import type React from "react"
import { useState } from "react"
import { PlusIcon, PencilIcon, EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline"
import Modal from "../components/Modal"
import RoleGuard from "../components/RoleGuard"

interface MenuItem {
  id: number
  nome: string
  descricao: string
  preco: number
  categoria: string
  imagem: string
  ativo: boolean
}

const Cardapio: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>([
    {
      id: 1,
      nome: "X-Burger Clássico",
      descricao: "Hambúrguer artesanal, queijo, alface, tomate e molho especial",
      preco: 18.9,
      categoria: "Lanches",
      imagem: "/placeholder.svg?height=200&width=200",
      ativo: true,
    },
    {
      id: 2,
      nome: "X-Bacon",
      descricao: "Hambúrguer, bacon crocante, queijo, alface e tomate",
      preco: 22.9,
      categoria: "Lanches",
      imagem: "/placeholder.svg?height=200&width=200",
      ativo: true,
    },
    {
      id: 3,
      nome: "Coca-Cola 350ml",
      descricao: "Refrigerante gelado",
      preco: 5.5,
      categoria: "Bebidas",
      imagem: "/placeholder.svg?height=200&width=200",
      ativo: true,
    },
    {
      id: 4,
      nome: "Batata Frita",
      descricao: "Porção de batata frita crocante",
      preco: 12.9,
      categoria: "Acompanhamentos",
      imagem: "/placeholder.svg?height=200&width=200",
      ativo: false,
    },
    {
      id: 5,
      nome: "Milkshake de Chocolate",
      descricao: "Cremoso milkshake de chocolate com chantilly",
      preco: 14.9,
      categoria: "Sobremesas",
      imagem: "/placeholder.svg?height=200&width=200",
      ativo: true,
    },
  ])

  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: 0,
    categoria: "",
    imagem: "",
    ativo: true,
  })

  const categorias = ["Lanches", "Bebidas", "Acompanhamentos", "Sobremesas"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingItem) {
      setItems(items.map((item) => (item.id === editingItem.id ? { ...editingItem, ...formData } : item)))
    } else {
      const newItem: MenuItem = {
        id: Date.now(),
        ...formData,
      }
      setItems([...items, newItem])
    }

    setModalOpen(false)
    setEditingItem(null)
    setFormData({ nome: "", descricao: "", preco: 0, categoria: "", imagem: "", ativo: true })
  }

  const openModal = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        nome: item.nome,
        descricao: item.descricao,
        preco: item.preco,
        categoria: item.categoria,
        imagem: item.imagem,
        ativo: item.ativo,
      })
    } else {
      setEditingItem(null)
      setFormData({ nome: "", descricao: "", preco: 0, categoria: "", imagem: "", ativo: true })
    }
    setModalOpen(true)
  }

  const toggleStatus = (id: number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, ativo: !item.ativo } : item)))
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cardápio</h1>
          <p className="text-gray-600">Gerencie os itens do seu menu</p>
        </div>
        <RoleGuard allowedRoles={["admin"]}>
          <button
            onClick={() => openModal()}
            className="bg-apple-green text-white px-4 py-2 rounded-lg hover:bg-apple-green-700 flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            Adicionar Item
          </button>
        </RoleGuard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-lg shadow overflow-hidden ${!item.ativo ? "opacity-60" : ""}`}
          >
            <img src={item.imagem || "/placeholder.svg"} alt={item.nome} className="w-full h-48 object-cover" />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{item.nome}</h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.ativo ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {item.ativo ? "Ativo" : "Inativo"}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{item.descricao}</p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-bold text-apple-green">R$ {item.preco.toFixed(2)}</span>
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{item.categoria}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(item)}
                  className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-200 flex items-center justify-center gap-1"
                >
                  <PencilIcon className="w-4 h-4" />
                  Editar
                </button>
                <button
                  onClick={() => toggleStatus(item.id)}
                  className={`flex-1 px-3 py-2 rounded text-sm flex items-center justify-center gap-1 ${
                    item.ativo
                      ? "bg-red-100 text-red-700 hover:bg-red-200"
                      : "bg-green-100 text-green-700 hover:bg-green-200"
                  }`}
                >
                  {item.ativo ? (
                    <>
                      <EyeSlashIcon className="w-4 h-4" />
                      Desativar
                    </>
                  ) : (
                    <>
                      <EyeIcon className="w-4 h-4" />
                      Ativar
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? "Editar Item" : "Adicionar Item"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              required
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-apple-green focus:border-apple-green"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <textarea
              required
              value={formData.descricao}
              onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-apple-green focus:border-apple-green"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Preço (R$)</label>
              <input
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.preco}
                onChange={(e) => setFormData({ ...formData, preco: Number(e.target.value) })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-apple-green focus:border-apple-green"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Categoria</label>
              <select
                required
                value={formData.categoria}
                onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-apple-green focus:border-apple-green"
              >
                <option value="">Selecione...</option>
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">URL da Imagem</label>
            <input
              type="url"
              value={formData.imagem}
              onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
              placeholder="/placeholder.svg?height=200&width=200"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-apple-green focus:border-apple-green"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="ativo"
              checked={formData.ativo}
              onChange={(e) => setFormData({ ...formData, ativo: e.target.checked })}
              className="h-4 w-4 text-apple-green focus:ring-apple-green border-gray-300 rounded"
            />
            <label htmlFor="ativo" className="ml-2 block text-sm text-gray-900">
              Item ativo no cardápio
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-apple-green rounded-md hover:bg-apple-green-700"
            >
              {editingItem ? "Atualizar" : "Adicionar"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default Cardapio
