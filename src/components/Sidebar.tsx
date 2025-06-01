"use client"

import type React from "react"
import { Link, useLocation } from "react-router-dom"
import {
  HomeIcon,
  CubeIcon,
  ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import UserMenu from "./UserMenu"

interface SidebarProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const location = useLocation()

  const navigation = [
    { name: "Dashboard", href: "/", icon: HomeIcon },
    { name: "Estoque", href: "/estoque", icon: CubeIcon },
    { name: "Cardápio", href: "/cardapio", icon: ClipboardDocumentListIcon },
    { name: "Chat", href: "/chat", icon: ChatBubbleLeftRightIcon },
    { name: "Pedidos", href: "/pedidos", icon: ShoppingBagIcon },
  ]

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-gray-600 bg-opacity-75" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-apple-green">
          <img src="/logo.png" alt="Logo ZapControl" className="h-36 w-auto" />
          <button onClick={() => setIsOpen(false)} className="text-white lg:hidden">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-8">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200
                  ${
                    isActive
                      ? "bg-apple-green-50 text-apple-green border-r-2 border-apple-green"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            )
          })}
        </nav>
        <div className="mt-auto p-4 border-t border-gray-200">
          <UserMenu />
        </div>
      </div>
    </>
  )
}

export default Sidebar
