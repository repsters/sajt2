'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Camera, Bell, Bookmark, Sun, Moon, Palette, ChevronDown, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/components/theme-provider'
import { ThemePanel } from '@/components/theme-panel'

const currencies = ['RSD', 'USD', 'EUR', 'GBP', 'CNY']

const categories = [
  'Shoes', 'Tops', 'Bottoms', 'Outerwear', 'Jewelry', 'Accessories', 'Intimates', 'Bags'
]

const browseOptions = [
  'Popular', 'New Arrivals', 'Trending', 'Best Sellers', 'Sale'
]

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [currency, setCurrency] = useState('RSD')
  const [showThemePanel, setShowThemePanel] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 text-lg font-medium text-foreground">
            shopqc
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-2 md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  Categories <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.map((cat) => (
                  <DropdownMenuItem key={cat} asChild>
                    <Link href={`/search?category=${cat.toLowerCase()}`}>{cat}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  Browse <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {browseOptions.map((option) => (
                  <DropdownMenuItem key={option} asChild>
                    <Link href={`/search?sort=${option.toLowerCase().replace(' ', '-')}`}>{option}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Search Bar */}
          <div className="hidden flex-1 max-w-xl md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter seller name or product link..."
                className="h-10 pl-10 pr-10 bg-card border-border rounded-lg"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1">
            {/* Currency Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden text-muted-foreground sm:flex">
                  {currency} <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {currencies.map((cur) => (
                  <DropdownMenuItem key={cur} onClick={() => setCurrency(cur)}>
                    {cur}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" className="hidden text-muted-foreground sm:flex">
              <Bell className="h-5 w-5" />
            </Button>

            <Link href="/profile?tab=wishlist">
              <Button variant="ghost" size="icon" className="hidden text-muted-foreground sm:flex">
                <Bookmark className="h-5 w-5" />
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-muted-foreground"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowThemePanel(!showThemePanel)}
                className="text-muted-foreground"
              >
                <Palette className="h-5 w-5" />
              </Button>
              {showThemePanel && (
                <ThemePanel onClose={() => setShowThemePanel(false)} />
              )}
            </div>

            {/* User Avatar */}
            <Link href="/profile">
              <div className="ml-2 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                U
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 text-muted-foreground md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              className="h-10 pl-10 pr-10 bg-card border-border rounded-lg"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border py-4 md:hidden">
            <div className="space-y-2">
              <p className="px-2 text-xs font-medium text-muted-foreground uppercase">Categories</p>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/search?category=${cat.toLowerCase()}`}
                  className="block px-2 py-2 text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
