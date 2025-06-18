"use client"

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  CheckIcon,
  XMarkIcon,
  Bars3Icon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  CubeIcon,
  ClipboardDocumentListIcon,
  ShieldCheckIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline"

const LandingPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const features = [
    {
      icon: <ChatBubbleLeftRightIcon className="w-8 h-8" />,
      title: "Chat WhatsApp Integrado",
      description: "Receba e gerencie pedidos diretamente pelo WhatsApp com chatbot inteligente",
    },
    {
      icon: <ChartBarIcon className="w-8 h-8" />,
      title: "Dashboard Completo",
      description: "Acompanhe vendas, pedidos e performance em tempo real com gráficos intuitivos",
    },
    {
      icon: <CubeIcon className="w-8 h-8" />,
      title: "Controle de Estoque",
      description: "Monitore ingredientes, receba alertas de estoque baixo e evite desperdícios",
    },
    {
      icon: <ClipboardDocumentListIcon className="w-8 h-8" />,
      title: "Cardápio Digital",
      description: "Gerencie seu menu, preços e disponibilidade de forma simples e rápida",
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      title: "Sistema Seguro",
      description: "Controle de acesso por usuário com diferentes níveis de permissão",
    },
    {
      icon: <ChartBarIcon className="w-8 h-8" />,
      title: "Relatórios Detalhados",
      description: "Análises completas para tomar decisões estratégicas no seu negócio",
    },
  ]

interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  notIncluded: string[];
  popular: boolean;
}

const plan: Plan = {
    name: "Enterprise",
    price: "R$ 199",
    period: "/mês",
    description: "Ideal para seu negócio",
    features: [
      "Pedidos ilimitados",
      "Usuários ilimitados",
      "Chat WhatsApp premium",
      "Controle de estoque avançado",
      "Múltiplos cardápios",
      "Dashboard personalizado",
      "Relatórios avançados",
      "API personalizada",
      "Suporte prioritário 24/7",
      "Treinamento incluído",
    ],
    notIncluded: [],
    popular: true
  }

  const testimonials = [
    {
      name: "Carlos Silva",
      business: "Burger House",
      content: "O ZapControl revolucionou nosso atendimento! Aumentamos 40% nas vendas em apenas 2 meses.",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Maria Santos",
      business: "Pizzaria Bella",
      content: "Finalmente conseguimos organizar nossos pedidos. O controle de estoque é fantástico!",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "João Oliveira",
      business: "Lanchonete do João",
      content: "Sistema muito fácil de usar. Meus funcionários aprenderam rapidinho!",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <div className="min-h-screen bg-white">

      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img src="/logo.png" alt="ZapControl" className="h-32 w-auto" />
              <span className="ml-3 text-2xl font-bold text-gray-900"></span>
            </div>


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
              <a href="#contact" className="bg-apple-green text-white px-6 py-2 rounded-lg hover:bg-apple-green-700 transition-colors">
                Entrar em Contato
              </a>
              <button onClick={() => navigate('/login')} className="border-2 border-apple-green text-apple-green px-6 py-1 rounded-lg text-lg font-semibold hover:bg-apple-green hover:text-white transition-colors">
                Entrar
              </button>
            </div>


            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-600 hover:text-gray-900"
            >
              <Bars3Icon className="w-6 h-6" />
            </button>
          </div>


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
                <button className="bg-apple-green text-white px-6 py-2 rounded-lg hover:bg-apple-green-700 transition-colors w-full">
                  Entrar em Contato
                </button>
              </div>
            </div>
          )}
        </div>
      </header>


      <section className="relative py-20">
        <div className="absolute inset-0">
          <img src="bannerZapControl.png" alt="Banner ZapControl" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black opacity-40" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Revolucione seu
              <span className="text-white"> Restaurante</span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              O ZapControl é a solução completa para gerenciar seu restaurante ou lanchonete. Integração com WhatsApp,
              controle de estoque, dashboard inteligente e muito mais!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#plans" className="bg-apple-green text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-apple-green-700 transition-colors">
                Começar Agora
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Recursos que fazem a diferença</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tudo que você precisa para gerenciar seu negócio de forma eficiente e profissional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-apple-green mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section id="plans" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Assine já e comece a usar o ZapControl</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nosso pacote ideal para você
            </p>
          </div>

          <div className="flex justify-center">
            <div
              className="bg-white rounded-xl shadow-xl p-8 relative ring-2 ring-apple-green scale-105 transform transition-all hover:shadow-2xl"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-apple-green text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Mais Popular
                </span>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature: string, featureIndex: number) => (
                  <div key={featureIndex} className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className="w-full py-3 px-6 rounded-lg font-semibold transition-colors bg-apple-green text-white hover:bg-apple-green-700"
              >
                Entrar em Contato
              </button>
            </div>
          </div>
        </div>
      </section>


      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">O que nossos clientes dizem</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Histórias reais de sucesso com o ZapControl</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl">
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.business}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-20 bg-apple-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Pronto para transformar seu negócio?</h2>
          <p className="text-xl text-apple-green-100 mb-8 max-w-2xl mx-auto">
            Junte-se a centenas de restaurantes que já revolucionaram suas operações com o ZapControl
          </p>
          <a href="#contact" className="inline-block bg-white text-apple-green px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
            Entrar em Contato Agora
          </a>
        </div>
      </section>


      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Entre em contato conosco</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nossa equipe está pronta para ajudar você a escolher o melhor plano
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-apple-green w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <PhoneIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Telefone</h3>
              <p className="text-gray-600">(11) 9999-9999</p>
              <p className="text-gray-600">Segunda a Sexta, 9h às 18h</p>
            </div>

            <div className="text-center">
              <div className="bg-apple-green w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <EnvelopeIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">contato@zapcontrol.com</p>
              <p className="text-gray-600">Resposta em até 24h</p>
            </div>

            <div className="text-center">
              <div className="bg-apple-green w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChatBubbleLeftRightIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">WhatsApp</h3>
              <p className="text-gray-600">(11) 99999-9999</p>
              <p className="text-gray-600">Atendimento rápido</p>
            </div>
          </div>

          <div className="mt-16 max-w-2xl mx-auto">
            <form className="bg-white p-8 rounded-xl shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-apple-green focus:border-apple-green"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-apple-green focus:border-apple-green"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-apple-green focus:border-apple-green"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Mensagem</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-apple-green focus:border-apple-green"
                  placeholder="Conte-nos mais sobre seu negócio e suas necessidades..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-apple-green text-white py-3 px-6 rounded-lg font-semibold hover:bg-apple-green-700 transition-colors"
              >
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </section>


      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img src="/logo.png" alt="ZapControl" className="h-32 w-auto" />
              </div>
              <p className="text-gray-400">
                A solução completa para gerenciar seu restaurante ou lanchonete com eficiência e profissionalismo.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    Recursos
                  </a>
                </li>
                <li>
                  <a href="#plans" className="hover:text-white transition-colors">
                    Planos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Demonstração
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#contact" className="hover:text-white transition-colors">
                    Contato
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentação
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Sobre
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Carreiras
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacidade
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ZapControl. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
