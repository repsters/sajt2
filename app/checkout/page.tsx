'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Check, CreditCard, Wallet } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const steps = [
  { id: 1, name: 'Cart' },
  { id: 2, name: 'Shipping' },
  { id: 3, name: 'Payment' },
  { id: 4, name: 'Confirm' },
]

const paymentMethods = [
  { id: 'card', name: 'Credit Card', icon: CreditCard },
  { id: 'paypal', name: 'PayPal', icon: Wallet },
]

const orderItems = [
  {
    id: '1',
    name: 'Vintage Oversized Hoodie',
    price: 9000,
    currency: 'RSD',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=100&h=100&fit=crop',
    quantity: 2,
  },
  {
    id: '2',
    name: 'Classic Low-Top Sneakers',
    price: 8900,
    currency: 'RSD',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=100&fit=crop',
    quantity: 1,
  },
]

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(2)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Serbia',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const agentFee = Math.round(subtotal * 0.05)
  const shipping = 1500
  const total = subtotal + agentFee + shipping

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-8">
        {/* Step Indicator */}
        <nav className="mb-12">
          <ol className="flex items-center justify-center">
            {steps.map((step, index) => (
              <li key={step.id} className="flex items-center">
                <div
                  className={cn(
                    "flex items-center justify-center h-10 w-10 rounded-full border-2 text-sm font-medium",
                    step.id < currentStep
                      ? "bg-primary border-primary text-primary-foreground"
                      : step.id === currentStep
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground"
                  )}
                >
                  {step.id < currentStep ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <span
                  className={cn(
                    "ml-2 text-sm hidden sm:block",
                    step.id === currentStep
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 w-12 mx-4",
                      step.id < currentStep ? "bg-primary" : "bg-border"
                    )}
                  />
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Form Section */}
          <div className="lg:col-span-3">
            {/* Shipping Address */}
            <div className="rounded-xl border border-border bg-card p-6 mb-6">
              <h2 className="text-lg font-medium text-foreground mb-6">Shipping Address</h2>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">
                    First Name
                  </label>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">
                    Last Name
                  </label>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">
                    Email
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">
                    Phone
                  </label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-background border-border"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm text-muted-foreground mb-1.5 block">
                    Address
                  </label>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">
                    City
                  </label>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="bg-background border-border"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">
                    Postal Code
                  </label>
                  <Input
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="bg-background border-border"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-lg font-medium text-foreground mb-6">Payment Method</h2>
              
              <div className="grid gap-3 sm:grid-cols-2 mb-6">
                {paymentMethods.map((method) => {
                  const Icon = method.icon
                  return (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={cn(
                        "flex items-center gap-3 p-4 rounded-lg border transition-colors",
                        paymentMethod === method.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-muted-foreground"
                      )}
                    >
                      <Icon className={cn(
                        "h-5 w-5",
                        paymentMethod === method.id ? "text-primary" : "text-muted-foreground"
                      )} />
                      <span className={cn(
                        "text-sm",
                        paymentMethod === method.id ? "text-foreground" : "text-muted-foreground"
                      )}>
                        {method.name}
                      </span>
                    </button>
                  )
                })}
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">
                      Card Number
                    </label>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm text-muted-foreground mb-1.5 block">
                        Expiry Date
                      </label>
                      <Input
                        placeholder="MM/YY"
                        className="bg-background border-border"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1.5 block">
                        CVC
                      </label>
                      <Input
                        placeholder="123"
                        className="bg-background border-border"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
              <h2 className="text-lg font-medium text-foreground mb-4">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-6">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm text-foreground">
                      {item.currency} {item.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <hr className="border-border mb-4" />

              {/* Totals */}
              <div className="space-y-2 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">RSD {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Agent Fee (5%)</span>
                  <span className="text-foreground">RSD {agentFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">RSD {shipping.toLocaleString()}</span>
                </div>
              </div>

              <hr className="border-border mb-4" />

              <div className="flex justify-between text-base font-medium mb-6">
                <span className="text-foreground">Total</span>
                <span className="text-foreground">RSD {total.toLocaleString()}</span>
              </div>

              <Button 
                className="w-full h-12 text-base bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => setCurrentStep(4)}
              >
                Place Order
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                By placing this order, you agree to our{' '}
                <Link href="/terms" className="text-primary hover:underline">Terms</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
