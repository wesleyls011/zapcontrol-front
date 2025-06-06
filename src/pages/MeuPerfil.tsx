"use client";

import type React from "react";
import { useState } from "react";
import Modal from "../components/Modal";
import { PencilIcon } from "@heroicons/react/24/outline";

interface UserProfile {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  localizacao: string;
  plano: string;
}

const Perfil: React.FC = () => {
  const [user, setUser] = useState<UserProfile>({
    id: 1,
    nome: "João da Silva",
    email: "joao@email.com",
    telefone: "(11) 98765-4321",
    cpf: "123.456.789-00",
    localizacao: "São Paulo, SP",
    plano: "Semestral",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: user.nome,
    email: user.email,
    telefone: user.telefone,
    cpf: user.cpf,
    localizacao: user.localizacao,
    plano: user.plano,
    senha: "",
    confirmarSenha: "",
  });

  const openModal = () => {
    setFormData({
      nome: user.nome,
      email: user.email,
      telefone: user.telefone,
      cpf: user.cpf,
      localizacao: user.localizacao,
      plano: user.plano,
      senha: "",
      confirmarSenha: "",
    });
    setModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem");
      return;
    }

    setUser({
      id: user.id,
      nome: formData.nome,
      email: formData.email,
      telefone: formData.telefone,
      cpf: formData.cpf,
      localizacao: formData.localizacao,
      plano: formData.plano,
    });

    setModalOpen(false);
  };

  // Função para descrever os planos
  const getPlanoDescricao = (plano: string) => {
    switch (plano) {
      case "Trimestral":
        return "Plano com assinatura de 3 meses.";
      case "Semestral":
        return "Plano com assinatura de 6 meses.";
      case "Anual":
        return "Plano com assinatura de 12 meses.";
      default:
        return "";
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Meu Perfil</h1>

      <div className="bg-white rounded-xl shadow-md p-6 space-y-6 border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl font-bold">
            {user.nome.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{user.nome}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Telefone</dt>
              <dd className="text-sm text-gray-900">{user.telefone}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">CPF</dt>
              <dd className="text-sm text-gray-900">{user.cpf}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Localização</dt>
              <dd className="text-sm text-gray-900">{user.localizacao}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Seção do Plano */}
      <div className="bg-white rounded-xl shadow-md p-6 space-y-6 border border-gray-100 mt-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Plano de Assinatura
        </h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Plano Atual</p>
            <p className="text-sm text-gray-900">{user.plano}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Descrição do Plano</p>
            <p className="text-sm text-gray-900">
              {getPlanoDescricao(user.plano)}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={openModal}
        className="mt-6 inline-flex items-center gap-2 bg-apple-green text-white px-4 py-2 rounded-md hover:bg-apple-green-700 transition-colors"
      >
        <PencilIcon className="w-5 h-5" />
        Editar Perfil
      </button>

      {/* Modal de Edição */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Editar Perfil"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              type="text"
              required
              value={formData.nome}
              onChange={(e) =>
                setFormData({ ...formData, nome: e.target.value })
              }
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-apple-green focus:border-apple-green"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-apple-green focus:border-apple-green"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Telefone
            </label>
            <input
              type="text"
              required
              value={formData.telefone}
              onChange={(e) =>
                setFormData({ ...formData, telefone: e.target.value })
              }
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-apple-green focus:border-apple-green"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              CPF
            </label>
            <input
              type="text"
              required
              value={formData.cpf}
              onChange={(e) =>
                setFormData({ ...formData, cpf: e.target.value })
              }
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-apple-green focus:border-apple-green"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Localização
            </label>
            <input
              type="text"
              required
              value={formData.localizacao}
              onChange={(e) =>
                setFormData({ ...formData, localizacao: e.target.value })
              }
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-apple-green focus:border-apple-green"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipo de Plano
            </label>
            <select
              value={formData.plano}
              onChange={(e) =>
                setFormData({ ...formData, plano: e.target.value })
              }
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-apple-green focus:border-apple-green"
            >
              <option value="Trimestral">Trimestral</option>
              <option value="Semestral">Semestral</option>
              <option value="Anual">Anual</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nova Senha
            </label>
            <input
              type="password"
              value={formData.senha}
              onChange={(e) =>
                setFormData({ ...formData, senha: e.target.value })
              }
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-apple-green focus:border-apple-green"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirmar Senha
            </label>
            <input
              type="password"
              value={formData.confirmarSenha}
              onChange={(e) =>
                setFormData({ ...formData, confirmarSenha: e.target.value })
              }
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-apple-green focus:border-apple-green"
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
              Salvar Alterações
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Perfil;
