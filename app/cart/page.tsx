'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Minus, Plus } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { PlatformBadge } from '@/components/platform-badge'
import { Button } from '@/components/ui/button'

interface CartItem {
  id: string
  name: string
  price: number
  currency: string
  image: string
  seller: string
  platform: 'taobao' | 'weidian' | '1688'
  size: string
  color: string
  quantity: number
}

const initialCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Vintage Oversized Hoodie - Streetwear Essential',
    price: 4500,
    currency: 'RSD',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&h=200&fit=crop',
    seller: 'StreetStyle Shop',
    platform: 'weidian',
    size: 'L',
    color: 'Black',
    quantity: 2,
  },
  {
    id: '2',
    name: 'Classic Low-Top Sneakers White Leather',
    price: 8900,
    currency: 'RSD',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop',
    seller: 'SneakerHub',
    platform: 'taobao',
    size: '42',
    color: 'White',
    quantity: 1,
  },
  {
    id: '3',
    name: 'Minimal Canvas Tote Bag - Daily Essential',
    price: 2200,
    currency: 'RSD',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=200&h=200&fit=crop',
    seller: 'BagMaster',
    platform: '1688',
    size: 'One Size',
    color: 'Natural',
    quantity: 1,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const agentFee = Math.round(subtotal * 0.05)
  const shippingEstimate = 1500
  const total = subtotal + agentFee + shippingEstimate

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-2xl font-medium text-foreground mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Link href="/">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-xl border border-border bg-card p-4"
                >
                  {/* Image */}
                  <div className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <PlatformBadge platform={item.platform} size="sm" />
                          <span className="text-xs text-muted-foreground">{item.seller}</span>
                        </div>
                        <Link href={`/product/${item.id}`}>
                          <h3 className="text-sm text-foreground hover:text-primary line-clamp-2">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.size} / {item.color}
                        </p>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-2">
                      {/* Quantity */}
                      <div className="flex items-center border border-border rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-r-none"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm text-foreground">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-l-none"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* Price */}
                      <span className="text-sm font-medium text-foreground">
                        {item.currency} {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
                <h2 className="text-lg font-medium text-foreground mb-4">Order Summary</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">RSD {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Agent Fee (5%)</span>
                    <span className="text-foreground">RSD {agentFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping Estimate</span>
                    <span className="text-foreground">RSD {shippingEstimate.toLocaleString()}</span>
                  </div>
                </div>

                <hr className="border-border my-4" />

                <div className="flex justify-between text-base font-medium mb-6">
                  <span className="text-foreground">Total</span>
                  <span className="text-foreground">RSD {total.toLocaleString()}</span>
                </div>

                <Link href="/checkout">
                  <Button className="w-full h-12 text-base bg-primary text-primary-foreground hover:bg-primary/90">
                    Proceed to Checkout
                  </Button>
                </Link>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Taxes and final shipping calculated at checkout
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
