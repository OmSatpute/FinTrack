"use client"

import { FinancialHabitScore } from "@/components/financial-habit-score"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function HabitsPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-6 text-3xl font-bold">Financial Habits Analysis</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>AI-Powered Financial Habits Comparison</CardTitle>
          <CardDescription>Compare your current month's spending habits with the previous month</CardDescription>
        </CardHeader>
        <CardContent>
          <FinancialHabitScore detailed />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Spending Efficiency</CardTitle>
            <CardDescription>How efficiently you're spending in each category</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your spending efficiency is calculated by comparing your actual spending against your budget allocations
              and historical patterns. Categories where you're spending less than budgeted while maintaining your
              lifestyle are considered more efficient.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-green-500"></span>
                <span>Green: Improved efficiency (spending less or getting more value)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
                <span>Yellow: Neutral (similar to previous patterns)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500"></span>
                <span>Red: Decreased efficiency (spending more without added value)</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Improvement Tips</CardTitle>
            <CardDescription>AI-generated suggestions to improve your financial habits</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="rounded-md border p-3">
                <strong>Entertainment:</strong> Your spending in this category has increased by 35% compared to last
                month. Consider setting a specific entertainment budget and tracking each expense.
              </li>
              <li className="rounded-md border p-3">
                <strong>Food:</strong> Great job reducing food expenses! Continue meal planning and cooking at home to
                maintain this positive trend.
              </li>
              <li className="rounded-md border p-3">
                <strong>Transportation:</strong> Your transportation costs are consistent. Consider carpooling or using
                public transport more frequently to further reduce expenses.
              </li>
              <li className="rounded-md border p-3">
                <strong>Overall:</strong> Set up automatic transfers to your savings account on payday to ensure you're
                consistently saving before spending.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

