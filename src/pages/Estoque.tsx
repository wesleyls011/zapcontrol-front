"use client"

import type React from "react"
import { useState } from "react"
import { PlusIcon, PencilIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline"
import AddEstoque, { type EstoqueFormData, type EstoqueItem as AddEstoqueItem } from "./AddEstoque"
import RoleGuard from "../components/RoleGuard"



const Estoque: React.FC = () => {
  const [items, setItems] = useState<AddEstoqueItem[]>([
    { id: 1, nome: "Pão de Hambúrguer", categoria: "Pães", quantidade: 50, unidade: "unid", minimo: 10 },
    { id: 2, nome: "Carne Bovina", categoria: "Carnes", quantidade: 3, unidade: "kg", minimo: 5 },
    { id: 3, nome: "Queijo Cheddar", categoria: "Laticínios", quantidade: 2, unidade: "kg", minimo: 3 },
    { id: 4, nome: "Alface", categoria: "Vegetais", quantidade: 15, unidade: "unid", minimo: 5 },
    { id: 5, nome: "Tomate", categoria: "Vegetais", quantidade: 8, unidade: "kg", minimo: 2 },
    { id: 6, nome: "Coca-Cola 350ml", categoria: "Bebidas", quantidade: 24, unidade: "unid", minimo: 12 },
  ])

  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<AddEstoqueItem | null>(null)
  const [currentMode, setCurrentMode] = useState<'add' | 'edit'>('add');

  const handleSaveItem = (data: EstoqueFormData, id?: number) => {
    if (id !== undefined && editingItem && editingItem.id === id) {

      setItems(items.map((item) => (item.id === id ? { ...item, ...data, id } : item)));
    } else {
      const newItemWithId: AddEstoqueItem = {
        id: Date.now(),
        ...data,
      };
      setItems([...items, newItemWithId]);
    }

    setModalOpen(false);
    setEditingItem(null);
  };

  const openModal = (item?: AddEstoqueItem) => {
    if (item) {
      setEditingItem(item);
      setCurrentMode('edit');

    } else {
      setEditingItem(null);
      setCurrentMode('add');
    }
    setModalOpen(true);
  };

  const getStatusColor = (item: AddEstoqueItem) => {
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

      <AddEstoque
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSaveItem}
        initialData={editingItem}
        mode={currentMode}
      />
    </div>
  )
}

export default Estoque
