"use client"

import { useState } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data for different time frames
const weeklyExpenses = [
  { name: "Mon", amount: 8500 },
  { name: "Tue", amount: 7200 },
  { name: "Wed", amount: 9800 },
  { name: "Thu", amount: 6500 },
  { name: "Fri", amount: 12000 },
  { name: "Sat", amount: 15000 },
  { name: "Sun", amount: 10500 },
]

const monthlyExpenses = [
  { name: "Jan", amount: 45000 },
  { name: "Feb", amount: 38000 },
  { name: "Mar", amount: 42000 },
  { name: "Apr", amount: 55000 },
  { name: "May", amount: 48000 },
  { name: "Jun", amount: 43000 },
  { name: "Jul", amount: 47000 },
  { name: "Aug", amount: 52000 },
  { name: "Sep", amount: 49000 },
  { name: "Oct", amount: 47000 },
  { name: "Nov", amount: 53000 },
  { name: "Dec", amount: 50000 },
]

const yearlyExpenses = [
  { name: "2018", amount: 420000 },
  { name: "2019", amount: 480000 },
  { name: "2020", amount: 450000 },
  { name: "2021", amount: 520000 },
  { name: "2022", amount: 580000 },
  { name: "2023", amount: 620000 },
  { name: "2024", amount: 570000 },
]

const categoryExpenses = [
  { name: "Food", value: 15000, color: "#8884d8" },
  { name: "Housing", value: 25000, color: "#82ca9d" },
  { name: "Transportation", value: 5000, color: "#ffc658" },
  { name: "Entertainment", value: 3500, color: "#ff8042" },
  { name: "Shopping", value: 7500, color: "#0088fe" },
  { name: "Utilities", value: 6000, color: "#00C49F" },
]

export function ExpenseChart() {
  const [chartType, setChartType] = useState("bar")
  const [timeFrame, setTimeFrame] = useState("monthly")

  // Format currency for tooltip
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Get the appropriate data based on the selected time frame
  const getChartData = () => {
    switch (timeFrame) {
      case "weekly":
        return weeklyExpenses
      case "yearly":
        return yearlyExpenses
      case "category":
        return categoryExpenses
      case "monthly":
      default:
        return monthlyExpenses
    }
  }

  // Handle chart type change
  const handleChartTypeChange = (value: string) => {
    // If timeFrame is category, always use pie chart
    if (timeFrame === "category" && value === "bar") {
      // Do nothing, keep pie chart for category
    } else {
      setChartType(value)
    }
  }

  // Handle time frame change
  const handleTimeFrameChange = (value: string) => {
    setTimeFrame(value)
    // If changing to category view, force pie chart
    if (value === "category") {
      setChartType("pie")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Select value={chartType} onValueChange={handleChartTypeChange} disabled={timeFrame === "category"}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Chart Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bar">Bar Chart</SelectItem>
              <SelectItem value="pie">Pie Chart</SelectItem>
            </SelectContent>
          </Select>

          <Select value={timeFrame} onValueChange={handleTimeFrameChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
              <SelectItem value="category">By Category</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="h-[300px] w-full">
        {chartType === "bar" && timeFrame !== "category" && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getChartData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Bar dataKey={timeFrame === "category" ? "value" : "amount"} name="Expenses (₹)" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )}

        {(chartType === "pie" || timeFrame === "category") && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={timeFrame === "category" ? categoryExpenses : getChartData()}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey={timeFrame === "category" ? "value" : "amount"}
                nameKey="name"
              >
                {timeFrame === "category"
                  ? categoryExpenses.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)
                  : getChartData().map((_, index) => {
                      const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe", "#00C49F"]
                      return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    })}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

