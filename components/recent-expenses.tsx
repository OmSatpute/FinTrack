"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

// Sample data
const initialExpenses = [
  {
    id: 1,
    description: "Grocery Shopping",
    amount: 8542,
    category: "Food",
    date: new Date(2024, 2, 28),
  },
  {
    id: 2,
    description: "Monthly Rent",
    amount: 25000,
    category: "Housing",
    date: new Date(2024, 2, 25),
  },
  {
    id: 3,
    description: "Petrol",
    amount: 2500,
    category: "Transportation",
    date: new Date(2024, 2, 27),
  },
  {
    id: 4,
    description: "Netflix Subscription",
    amount: 649,
    category: "Entertainment",
    date: new Date(2024, 2, 26),
  },
  {
    id: 5,
    description: "Chai and Snacks",
    amount: 250,
    category: "Food",
    date: new Date(2024, 2, 28),
  },
]

const categoryColors: Record<string, string> = {
  Food: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  Housing: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  Transportation: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  Entertainment: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  Shopping: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  Utilities: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
  Other: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
}

export function RecentExpenses() {
  const [expenses, setExpenses] = useState(initialExpenses)
  const [open, setOpen] = useState(false)
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "",
    date: new Date(),
  })

  // Format currency based on USD only
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount / 100)
  }

  const handleAddExpense = () => {
    if (!newExpense.description || !newExpense.amount || !newExpense.category) return

    setExpenses([
      {
        id: expenses.length + 1,
        description: newExpense.description,
        amount: Number.parseFloat(newExpense.amount),
        category: newExpense.category,
        date: newExpense.date,
      },
      ...expenses,
    ])

    setNewExpense({
      description: "",
      amount: "",
      category: "",
      date: new Date(),
    })

    setOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <h3 className="text-lg font-medium">Recent Transactions</h3>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Expense</DialogTitle>
              <DialogDescription>Record a new expense to track your spending.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="e.g., Grocery Shopping"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newExpense.category}
                  onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Housing">Housing</SelectItem>
                    <SelectItem value="Transportation">Transportation</SelectItem>
                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                    <SelectItem value="Shopping">Shopping</SelectItem>
                    <SelectItem value="Utilities">Utilities</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("justify-start text-left font-normal", !newExpense.date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newExpense.date ? format(newExpense.date, "PPP") : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newExpense.date}
                      onSelect={(date) => setNewExpense({ ...newExpense, date: date || new Date() })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddExpense}>Add Expense</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        {expenses.map((expense) => (
          <div key={expense.id} className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex flex-col">
              <span className="font-medium">{expense.description}</span>
              <span className="text-xs text-muted-foreground">{format(expense.date, "MMM d, yyyy")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className={cn("font-normal", categoryColors[expense.category])}>
                {expense.category}
              </Badge>
              <span className="font-medium">{formatCurrency(expense.amount)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

