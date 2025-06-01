import type React from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import MetricCard from "../components/MetricCard"
import { ShoppingBagIcon, CurrencyDollarIcon, ClockIcon, CheckCircleIcon } from "@heroicons/react/24/outline"
import WelcomeHeader from "../components/WelcomeHeader"

const Dashboard: React.FC = () => {
  const salesData = [
    { day: "Seg", vendas: 1200 },
    { day: "Ter", vendas: 1900 },
    { day: "Qua", vendas: 800 },
    { day: "Qui", vendas: 2100 },
    { day: "Sex", vendas: 2800 },
    { day: "Sáb", vendas: 3200 },
    { day: "Dom", vendas: 2400 },
  ]

  const categoryData = [
    { name: "Lanches", value: 45, color: "#72b01d" },
    { name: "Bebidas", value: 25, color: "#3b82f6" },
    { name: "Sobremesas", value: 20, color: "#10b981" },
    { name: "Outros", value: 10, color: "#8b5cf6" },
  ]

  return (
    <>
      <WelcomeHeader />
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Visão geral do seu restaurante</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Pedidos Hoje"
            value="47"
            icon={<ShoppingBagIcon className="w-8 h-8" />}
            change="+12% vs ontem"
            changeType="positive"
          />
          <MetricCard
            title="Vendas Hoje"
            value="R$ 2.840"
            icon={<CurrencyDollarIcon className="w-8 h-8" />}
            change="+8% vs ontem"
            changeType="positive"
          />
          <MetricCard title="Em Andamento" value="8" icon={<ClockIcon className="w-8 h-8" />} />
          <MetricCard title="Finalizados" value="39" icon={<CheckCircleIcon className="w-8 h-8" />} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Vendas da Semana</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${value}`, "Vendas"]} />
                <Line type="monotone" dataKey="vendas" stroke="#72b01d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pedidos por Categoria</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
