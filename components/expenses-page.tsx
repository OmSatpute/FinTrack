"use client"
import { ExpenseChart } from "@/components/expense-chart"
import { RecentExpenses } from "@/components/recent-expenses"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ExpensesPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-6 text-3xl font-bold">Expense Tracking</h1>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expense Overview</CardTitle>
              <CardDescription>Visualize your spending patterns over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ExpenseChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentExpenses />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>Complete history of your expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentExpenses />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
              <CardDescription>Breakdown of your expenses by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ExpenseChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

