"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Goal, Home, Menu, PiggyBank, TrendingUp, X, Sun, Moon, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Goals",
    href: "/goals",
    icon: Goal,
  },
  {
    title: "Expenses",
    href: "/expenses",
    icon: PiggyBank,
  },
  {
    title: "Financial Habits",
    href: "/habits",
    icon: TrendingUp,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
]

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we can access the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-md px-4 md:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex h-16 items-center border-b px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold" onClick={() => setOpen(false)}>
                <PiggyBank className="h-6 w-6 text-primary" />
                <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent font-bold">
                  FinTrack
                </span>
              </Link>
              <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setOpen(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            <nav className="grid gap-2 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted/80 text-muted-foreground hover:text-foreground",
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5",
                      pathname === item.href ? "text-primary-foreground" : "text-muted-foreground",
                    )}
                  />
                  {item.title}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <PiggyBank className="h-6 w-6 text-primary" />
          <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent font-bold">
            FinTrack
          </span>
        </Link>
        <nav className="ml-auto hidden md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex h-10 items-center gap-2 px-4 text-sm font-medium transition-colors duration-200 relative",
                pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.title}
              {pathname === item.href && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
              )}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t bg-background/80 backdrop-blur-md py-4 text-center text-sm text-muted-foreground">
        <div className="container mx-auto">
          <p>© 2024 FinTrack. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

