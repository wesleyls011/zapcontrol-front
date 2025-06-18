"use client"

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const PublicHeader: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/landing" className="flex items-center">
            <div className="w-10 h-10 bg-apple-green rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">Z</span>
            </div>
            <span className="ml-3 text-2xl font-bold text-gray-900">ZapControl</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-600 hover:text-apple-green transition-colors">
              Recursos
            </a>
            <a href="#plans" className="text-gray-600 hover:text-apple-green transition-colors">
              Planos
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-apple-green transition-colors">
              Depoimentos
            </a>
            <a href="#contact" className="text-gray-600 hover:text-apple-green transition-colors">
              Contato
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-apple-green transition-colors font-medium">
              Fazer Login
            </Link>
            <button className="bg-apple-green text-white px-6 py-2 rounded-lg hover:bg-apple-green-700 transition-colors">
              Entrar em Contato
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-600 hover:text-gray-900"
          >
            {mobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-600 hover:text-apple-green transition-colors">
                Recursos
              </a>
              <a href="#plans" className="text-gray-600 hover:text-apple-green transition-colors">
                Planos
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-apple-green transition-colors">
                Depoimentos
              </a>
              <a href="#contact" className="text-gray-600 hover:text-apple-green transition-colors">
                Contato
              </a>
              <Link to="/" className="text-gray-600 hover:text-apple-green transition-colors font-medium">
                Fazer Login
              </Link>
              <button className="bg-apple-green text-white px-6 py-2 rounded-lg hover:bg-apple-green-700 transition-colors w-full">
                Entrar em Contato
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default PublicHeader
