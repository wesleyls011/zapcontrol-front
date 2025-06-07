"use client"
import axios from "axios"
import type React from "react"
import { useEffect, useState } from "react"
import { PlusIcon, PencilIcon, EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline"
import Modal from "../components/Modal"
import RoleGuard from "../components/RoleGuard"
import FormCardapio from "@/components/FormCardapio"

interface MenuItem {
  id: number
  nome: string
  preco: number
  categoria: string
  imagem: string
  ativo: boolean
  quantidadeEstoque?: number
}

interface FormData {
  nome: string
  quantidadeEstoque?: number
  preco: number
  categoria: string
  imagem: string
  ativo: boolean
}

const Cardapio: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>([])

  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    quantidadeEstoque: undefined,
    preco: 0,
    categoria: "",
    imagem: "",
    ativo: true,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/cardapio")
        console.log(response.data)
        const produtosDoCardapio: MenuItem[] = response.data.map((item: any) => ({
          id: item.id,
          nome: item.nome,
          preco: item.preco,
          ativo: item.ativo,
          categoria: item.categoria,
          imagem: item.imagemUrl ?? "",
        }))
        setItems(produtosDoCardapio)
      } catch (error) {
        console.error("Erro ao buscar os dados do cardápio:", error)
      }
    }

    fetchData()
  }, [])

  const categorias = ["Lanche", "Bebida", "Acompanhamento", "Sobremesa", "Salgado"]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingItem) {
        const response = await axios.put(`http://localhost:4000/cardapio/${editingItem.id}`, formData)
        console.log("Item atualizado:", response.data)
        setItems(items.map((item) => (item.id === editingItem.id ? response.data : item)))
      } else {

        const { data } = await axios.post("http://localhost:4000/cardapio/produtos", {
          dados: {
            nome: formData.nome,
            preco: formData.preco,
            categoria: formData.categoria.toUpperCase(),
            imagemUrl: formData.imagem,
            quantidadeEstoque: formData.categoria === "Bebida" ? formData.quantidadeEstoque : undefined,
          },
        })
        console.log("Item adicionado:", data.produto)
        const produto = data.produto
        const newItem: MenuItem = {
          id: produto.id,
          nome: produto.nome,
          preco: produto.preco,
          categoria: produto.categoria,
          imagem: produto.imagemUrl ?? "",
          ativo: true,

        }
        setItems([...items, newItem])
      }
    } catch (error) {
      console.error("Erro ao salvar o item:", error)
      alert("Ocorreu um erro ao salvar o item. Por favor, tente novamente.")
    } finally {
      setModalOpen(false)
      setEditingItem(null)
      setFormData({ nome: "", quantidadeEstoque: undefined, preco: 0, categoria: "", imagem: "", ativo: true })
    }
  }

  const openModal = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        nome: item.nome,
        quantidadeEstoque: item.quantidadeEstoque,
        preco: item.preco,
        categoria: item.categoria,
        imagem: item.imagem,
        ativo: item.ativo,
      })
    } else {
      setEditingItem(null)
      setFormData({ nome: "", quantidadeEstoque: 0, preco: 0, categoria: "", imagem: "", ativo: true })
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
                  className={`px-2 py-1 rounded-full text-xs font-medium ${item.ativo ? "bg-green-200 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                  {item.ativo ? "Ativo" : "Inativo"}
                </span>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-bold text-apple-green">R$ {item.preco.toFixed(2)}</span>
                <span className="text-sm text-office-green-800 bg-office-green-200 px-2 py-1 rounded">{item.categoria}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(item)}
                  className="flex-1 bg-green-100 text-green-800 px-3 py-2 rounded text-sm hover:bg-gray-200 flex items-center justify-center gap-1"
                >
                  <PencilIcon className="w-4 h-4" />
                  Editar
                </button>
                <button
                  onClick={() => toggleStatus(item.id)}
                  className={`flex-1 px-3 py-2 rounded text-sm flex items-center justify-center gap-1 ${item.ativo
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
        <FormCardapio
          formData={formData}
          setFormData={setFormData}
          categorias={categorias}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
          isEditing={!!editingItem}
        />
      </Modal>
    </div>
  )
}

export default Cardapio
