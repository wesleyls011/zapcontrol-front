import type React from "react"
import type { ReactNode } from "react"

interface MetricCardProps {
  title: string
  value: string | number
  icon: ReactNode
  change?: string
  changeType?: "positive" | "negative" | "neutral"
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, change, changeType = "neutral" }) => {
  const changeColor = {
    positive: "text-green-600",
    negative: "text-red-600",
    neutral: "text-gray-600",
  }[changeType]

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
          {change && <p className={`text-sm ${changeColor}`}>{change}</p>}
        </div>
        <div className="text-apple-green">{icon}</div>
      </div>
    </div>
  )
}

export default MetricCard
