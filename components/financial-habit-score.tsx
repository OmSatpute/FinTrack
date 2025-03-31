"use client"

import { Cell, Pie, PieChart, ResponsiveContainer } from "@/components/ui/chart"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// Sample data for financial habits comparison
const habitScores = [
  { name: "Food", score: 85, status: "improved", color: "#22c55e" },
  { name: "Housing", score: 95, status: "improved", color: "#22c55e" },
  { name: "Transportation", score: 60, status: "neutral", color: "#eab308" },
  { name: "Entertainment", score: 40, status: "worsened", color: "#ef4444" },
  { name: "Shopping", score: 75, status: "improved", color: "#22c55e" },
  { name: "Utilities", score: 90, status: "improved", color: "#22c55e" },
]

const pieData = [
  { name: "Improved", value: 4, color: "#22c55e" },
  { name: "Neutral", value: 1, color: "#eab308" },
  { name: "Worsened", value: 1, color: "#ef4444" },
]

const statusColors = {
  improved: "text-green-600 dark:text-green-400",
  neutral: "text-yellow-600 dark:text-yellow-400",
  worsened: "text-red-600 dark:text-red-400",
}

const statusIcons = {
  improved: "↑",
  neutral: "→",
  worsened: "↓",
}

export function FinancialHabitScore({ detailed = false }: { detailed?: boolean }) {
  // Calculate overall score (weighted average)
  const overallScore = Math.round(habitScores.reduce((acc, habit) => acc + habit.score, 0) / habitScores.length)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">{overallScore}/100</h3>
          <p className="text-sm text-muted-foreground">Overall Financial Habit Score</p>
        </div>
        <div className="h-16 w-16">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={15} outerRadius={30} paddingAngle={2} dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Progress value={overallScore} className="h-2" />

      {detailed && (
        <div className="mt-6 space-y-4">
          <h4 className="font-medium">Category Breakdown</h4>
          <div className="grid gap-3">
            {habitScores.map((habit) => (
              <Card key={habit.name}>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{habit.name}</span>
                        <span className={statusColors[habit.status]}>{statusIcons[habit.status]}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <Progress value={habit.score} className="h-2 w-24" />
                        <span className="text-sm font-medium">{habit.score}/100</span>
                      </div>
                    </div>
                    <div className="text-sm">
                      {habit.status === "improved" && "Spending more efficiently"}
                      {habit.status === "neutral" && "Similar to last month"}
                      {habit.status === "worsened" && "Spending less efficiently"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6">
            <h4 className="mb-2 font-medium">AI Analysis</h4>
            <p className="text-sm text-muted-foreground">
              Your overall financial habits have improved by 12% compared to last month. You've made significant
              progress in reducing unnecessary spending in the Food and Housing categories. However, your Entertainment
              spending has increased beyond your set budget. Consider reviewing your Entertainment expenses to identify
              areas where you can cut back.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

