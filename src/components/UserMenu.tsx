"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  ChevronDownIcon,
  UserIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const UserMenu: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  const getRoleText = (role: string) => {
    return role === "admin" ? "Administrador" : "Funcionário";
  };

  const getRoleBadgeColor = (role: string) => {
    return role === "admin"
      ? "bg-apple-green-100 text-apple-green-800"
      : "bg-blue-100 text-blue-800";
  };

  const handleGoToProfile = () => {
    setIsOpen(false);
    navigate("/perfil");
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <img
          src={user.avatar || "/avatar.png"}
          alt={user.nome}
          className="w-8 h-8 rounded-full bg-gray-200"
        />
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-gray-900">{user.nome}</p>
          <p className="text-xs text-gray-500">{getRoleText(user.role)}</p>
        </div>
        <ChevronDownIcon className="w-4 h-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar || "/avatar.png"}
                alt={user.nome}
                className="w-10 h-10 rounded-full bg-gray-200"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{user.nome}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
                <span
                  className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(
                    user.role
                  )}`}
                >
                  {getRoleText(user.role)}
                </span>
              </div>
            </div>
          </div>

          <div className="py-2">
            <button
              onClick={handleGoToProfile}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <UserIcon className="w-4 h-4" />
              Meu Perfil
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              <Cog6ToothIcon className="w-4 h-4" />
              Configurações
            </button>
          </div>

          <div className="border-t border-gray-100 pt-2">
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
