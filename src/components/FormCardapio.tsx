import React from "react"

interface FormData {
  nome: string
  quantidadeEstoque?: number | undefined
  preco: number
  categoria: string
  imagem: string
  ativo: boolean
}

interface FormCardapioProps {
  formData: FormData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
  categorias: string[]
  onSubmit: (e: React.FormEvent) => void
  onCancel: () => void
  isEditing: boolean
}

const FormCardapio: React.FC<FormCardapioProps> = ({
  formData,
  setFormData,
  categorias,
  onSubmit,
  onCancel,
  isEditing
}) => {
  return (

    <form onSubmit={onSubmit} className="space-y-4">
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

      {
        formData.categoria === "Bebida" && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantidade em Estoque</label>
            <input
              type="number"
              value={formData.quantidadeEstoque || ""}
              onChange={(e) => setFormData({ ...formData, quantidadeEstoque: Number(e.target.value) })}
              placeholder="Quantidade em estoque"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-apple-green focus:border-apple-green"
            />
          </div>
        )
      }

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
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-apple-green rounded-md hover:bg-apple-green-700"
        >
          {isEditing ? "Atualizar" : "Adicionar"}
        </button>
      </div>
    </form>
  )
}

export default FormCardapio
