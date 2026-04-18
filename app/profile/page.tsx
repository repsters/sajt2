'use client'

import { useState, Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Package, Heart, Camera, Settings, LogOut, ChevronRight } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTheme } from '@/components/theme-provider'
import { cn } from '@/lib/utils'
import { mockProducts } from '@/lib/mock-data'

const tabs = [
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'qc-requests', label: 'QC Requests', icon: Camera },
  { id: 'settings', label: 'Settings', icon: Settings },
]

const orders = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'delivered',
    items: [
      {
        name: 'Vintage Oversized Hoodie',
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&h=100&fit=crop',
        quantity: 2,
      },
    ],
    total: 9000,
    currency: 'RSD',
  },
  {
    id: 'ORD-002',
    date: '2024-01-20',
    status: 'shipped',
    items: [
      {
        name: 'Classic Low-Top Sneakers',
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop',
        quantity: 1,
      },
    ],
    total: 8900,
    currency: 'RSD',
  },
  {
    id: 'ORD-003',
    date: '2024-01-25',
    status: 'pending',
    items: [
      {
        name: 'Minimal Canvas Tote Bag',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=100&h=100&fit=crop',
        quantity: 1,
      },
    ],
    total: 2200,
    currency: 'RSD',
  },
]

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-500 text-white' },
  shipped: { label: 'Shipped', color: 'bg-blue-500 text-white' },
  delivered: { label: 'Delivered', color: 'bg-green-500 text-white' },
}

const accentColors = [
  { name: 'purple', color: '#7F77DD' },
  { name: 'blue', color: '#378ADD' },
  { name: 'teal', color: '#1D9E75' },
  { name: 'coral', color: '#D85A30' },
  { name: 'gold', color: '#BA7517' },
] as const

function ProfileContent() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')
  const [activeTab, setActiveTab] = useState(tabParam || 'orders')
  const { theme, setTheme, accentColor, setAccentColor } = useTheme()

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-foreground">My Orders</h2>
            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-xl border border-border bg-card p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                  <span
                    className={cn(
                      'px-2.5 py-1 rounded-full text-xs font-medium',
                      statusConfig[order.status as keyof typeof statusConfig].color
                    )}
                  >
                    {statusConfig[order.status as keyof typeof statusConfig].label}
                  </span>
                </div>

                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 mb-4">
                    <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-muted">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm font-medium text-foreground">
                    Total: {order.currency} {order.total.toLocaleString()}
                  </span>
                  <Button variant="ghost" size="sm" className="text-primary">
                    View Details <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )

      case 'wishlist':
        return (
          <div>
            <h2 className="text-lg font-medium text-foreground mb-6">My Wishlist</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {mockProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )

      case 'qc-requests':
        return (
          <div className="text-center py-12">
            <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-lg font-medium text-foreground mb-2">No QC Requests</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Request quality check photos for your orders
            </p>
            <Link href="/">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Browse Products
              </Button>
            </Link>
          </div>
        )

      case 'settings':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-medium text-foreground mb-6">Account Settings</h2>
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">
                      Display Name
                    </label>
                    <Input
                      defaultValue="John Doe"
                      className="bg-background border-border"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">
                      Email
                    </label>
                    <Input
                      type="email"
                      defaultValue="john@example.com"
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-sm text-muted-foreground mb-1.5 block">
                      New Password
                    </label>
                    <Input
                      type="password"
                      placeholder="Leave blank to keep current"
                      className="bg-background border-border"
                    />
                  </div>
                </div>
                <Button className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
                  Save Changes
                </Button>
              </div>
            </div>

            {/* Theme Customization */}
            <div>
              <h2 className="text-lg font-medium text-foreground mb-6">Theme Customization</h2>
              <div className="rounded-xl border border-border bg-card p-6">
                {/* Appearance */}
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-3">Appearance</p>
                  <div className="flex rounded-lg border border-border p-1 bg-background w-fit">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "rounded-md",
                        theme === 'dark' && "bg-primary text-primary-foreground"
                      )}
                      onClick={() => setTheme('dark')}
                    >
                      Dark
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "rounded-md",
                        theme === 'light' && "bg-primary text-primary-foreground"
                      )}
                      onClick={() => setTheme('light')}
                    >
                      Light
                    </Button>
                  </div>
                </div>

                {/* Accent Color */}
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-3">Accent Color</p>
                  <div className="flex gap-3">
                    {accentColors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setAccentColor(color.name)}
                        className={cn(
                          "h-10 w-10 rounded-full transition-all",
                          accentColor === color.name &&
                            "ring-2 ring-offset-2 ring-offset-card ring-white"
                        )}
                        style={{ backgroundColor: color.color }}
                        aria-label={`Set accent color to ${color.name}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Currency */}
                <div>
                  <p className="text-sm text-muted-foreground mb-3">Currency</p>
                  <select className="bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground">
                    <option value="RSD">RSD - Serbian Dinar</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="CNY">CNY - Chinese Yuan</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-4">
      {/* Sidebar */}
      <aside className="lg:col-span-1">
        <div className="rounded-xl border border-border bg-card p-6">
          {/* User Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-2xl font-medium text-primary-foreground">
              JD
            </div>
            <div>
              <h2 className="text-lg font-medium text-foreground">John Doe</h2>
              <p className="text-xs text-muted-foreground">Member since 2023</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                    activeTab === tab.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {tab.label}
                </button>
              )
            })}

            <hr className="border-border my-4" />

            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-destructive transition-colors">
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:col-span-3">{renderContent()}</div>
    </div>
  )
}

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <Suspense fallback={<div className="text-foreground">Loading...</div>}>
          <ProfileContent />
        </Suspense>
      </main>
    </div>
  )
}
