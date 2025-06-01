"use client"

import type React from "react"
import { useState } from "react"
import { PlusIcon, PencilIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import Modal from "../components/Modal"
import RoleGuard from "../components/RoleGuard"

interface EstoqueItem {
  id: number
  nome: string
  categoria: string
  quantidade: number
  unidade: string
  minimo: number
}

const Estoque: React.FC = () => {
  const [items, setItems] = useState<EstoqueItem[]>([
    { id: 1, nome: "Pão de Hambúrguer", categoria: "Pães", quantidade: 50, unidade: "unid", minimo: 10 },
    { id: 2, nome: "Carne Bovina", categoria: "Carnes", quantidade: 3, unidade: "kg", minimo: 5 },
    { id: 3, nome: "Queijo Cheddar", categoria: "Laticínios", quantidade: 2, unidade: "kg", minimo: 3 },
    { id: 4, nome: "Alface", categoria: "Vegetais", quantidade: 15, unidade: "unid", minimo: 5 },
    { id: 5, nome: "Tomate", categoria: "Vegetais", quantidade: 8, unidade: "kg", minimo: 2 },
    { id: 6, nome: "Coca-Cola 350ml", categoria: "Bebidas", quantidade: 24, unidade: "unid", minimo: 12 },
  ])

  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<EstoqueItem | null>(null)
  const [formData, setFormData] = useState({
    nome: "",
    categoria: "",
    quantidade: 0,
    unidade: "unid",
    minimo: 0,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingItem) {
      setItems(items.map((item) => (item.id === editingItem.id ? { ...editingItem, ...formData } : item)))
    } else {
      const newItem: EstoqueItem = {
        id: Date.now(),
        ...formData,
      }
      setItems([...items, newItem])
    }

    setModalOpen(false)
    setEditingItem(null)
    setFormData({ nome: "", categoria: "", quantidade: 0, unidade: "unid", minimo: 0 })
  }

  const openModal = (item?: EstoqueItem) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        nome: item.nome,
        categoria: item.categoria,
        quantidade: item.quantidade,
        unidade: item.unidade,
        minimo: item.minimo,
      })
    } else {
      setEditingItem(null)
      setFormData({ nome: "", categoria: "", quantidade: 0, unidade: "unid", minimo: 0 })
    }
    setModalOpen(true)
  }

  const getStatusColor = (item: EstoqueItem) => {
    if (item.quantidade <= item.minimo) return "text-red-600 bg-red-50"
    if (item.quantidade <= item.minimo * 2) return "text-yellow-600 bg-yellow-50"
    return "text-green-600 bg-green-50"
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Controle de Estoque</h1>
          <p className="text-gray-600">Gerencie o estoque do seu restaurante</p>
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

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Produto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoria
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantidade
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.nome}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{item.categoria}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {item.quantidade} {item.unidade}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item)}`}
                  >
                    {item.quantidade <= item.minimo && <ExclamationTriangleIcon className="w-4 h-4 mr-1" />}
                    {item.quantidade <= item.minimo
                      ? "Crítico"
                      : item.quantidade <= item.minimo * 2
                        ? "Baixo"
                        : "Normal"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => openModal(item)}
                    className="text-apple-green hover:text-apple-green-900 flex items-center gap-1"
                  >
                    <PencilIcon className="w-4 h-4" />
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
            <label className="block text-sm font-medium text-gray-700">Categoria</label>
            <input
              type="text"
              required
              value={formData.categoria}
              onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-apple-green focus:border-apple-green"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Quantidade</label>
              <input
                type="number"
                required
                min="0"
                value={formData.quantidade}
                onChange={(e) => setFormData({ ...formData, quantidade: Number(e.target.value) })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-apple-green focus:border-apple-green"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Unidade</label>
              <select
                value={formData.unidade}
                onChange={(e) => setFormData({ ...formData, unidade: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-apple-green focus:border-apple-green"
              >
                <option value="unid">Unidade</option>
                <option value="kg">Quilograma</option>
                <option value="g">Grama</option>
                <option value="l">Litro</option>
                <option value="ml">Mililitro</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Quantidade Mínima</label>
            <input
              type="number"
              required
              min="0"
              value={formData.minimo}
              onChange={(e) => setFormData({ ...formData, minimo: Number(e.target.value) })}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-apple-green focus:border-apple-green"
            />
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

export default Estoque
