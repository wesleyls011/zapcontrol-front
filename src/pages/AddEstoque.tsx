"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Modal from "../components/Modal"; 

export interface EstoqueFormData {
  nome: string;
  categoria: string;
  quantidade: number;
  unidade: string;
  minimo: number;
}

export interface EstoqueItem extends EstoqueFormData {
  id: number; 
}

interface AddEstoqueProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EstoqueFormData, id?: number) => void;
  initialData?: EstoqueItem | null;
  mode: "add" | "edit";
}

const AddEstoque: React.FC<AddEstoqueProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
}) => {
  const [formData, setFormData] = useState<EstoqueFormData>({
    nome: "",
    categoria: "",
    quantidade: 0,
    unidade: "unid",
    minimo: 0,
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        nome: initialData.nome,
        categoria: initialData.categoria,
        quantidade: initialData.quantidade,
        unidade: initialData.unidade,
        minimo: initialData.minimo,
      });
    } else {
      setFormData({
        nome: "",
        categoria: "",
        quantidade: 0,
        unidade: "unid",
        minimo: 0,
      });
    }
  }, [isOpen, mode, initialData]); 

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantidade" || name === "minimo" ? Number(value) : value,
    }));
  };

  const handleSubmitInternal = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "edit" && initialData) {
      onSubmit(formData, initialData.id);
    } else {
      onSubmit(formData);
    }
    onClose(); 
  };

  if (!isOpen) return null; 

  return (
    <Modal
      isOpen={isOpen} 
      onClose={onClose}
      title={mode === "edit" ? "Editar Item do Estoque" : "Adicionar Item ao Estoque"}
    >
      <form onSubmit={handleSubmitInternal} className="space-y-4">
        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
            Nome
          </label>
          <input
            type="text"
            name="nome"
            id="nome"
            required
            value={formData.nome}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-apple-green focus:border-apple-green"
          />
        </div>

        <div>
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
            Categoria
          </label>
          <input
            type="text"
            name="categoria"
            id="categoria"
            required
            value={formData.categoria}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-apple-green focus:border-apple-green"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700">
              Quantidade
            </label>
            <input
              type="number"
              name="quantidade"
              id="quantidade"
              required
              min="0"
              value={formData.quantidade}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-apple-green focus:border-apple-green"
            />
          </div>

          <div>
            <label htmlFor="unidade" className="block text-sm font-medium text-gray-700">
              Unidade
            </label>
            <select
              name="unidade"
              id="unidade"
              value={formData.unidade}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-apple-green focus:border-apple-green"
            >
              <option value="unid">Unidade</option>
              <option value="kg">Quilograma</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="minimo" className="block text-sm font-medium text-gray-700">
            Quantidade Mínima
          </label>
          <input
            type="number"
            name="minimo"
            id="minimo"
            required
            min="0"
            value={formData.minimo}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-apple-green focus:border-apple-green"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose} 
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-apple-green rounded-md hover:bg-apple-green-700"
          >
            {mode === "edit" ? "Atualizar Item" : "Adicionar Item"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddEstoque;