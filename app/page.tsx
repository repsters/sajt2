'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, QrCode, ChevronRight } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { CategoryPills } from '@/components/category-pills'
import { ProductCard } from '@/components/product-card'
import { SellerCard } from '@/components/seller-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { mockProducts, mockSellers, mockOutfits } from '@/lib/mock-data'

const tabList = ['All', 'Tops', 'Shoes', 'Bottoms', 'Outerwear', 'Accessories']

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('popular')
  const [activeTab, setActiveTab] = useState('All')

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left - Headline & Search */}
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl font-medium text-foreground mb-2 text-balance md:text-4xl">
                Discover more
              </h1>
              <h2 className="text-3xl font-medium text-muted-foreground mb-6 md:text-4xl">
                Pay less
              </h2>
              
              <div className="relative max-w-lg">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter Weidian link..."
                  className="h-14 pl-12 pr-14 text-base bg-card border-border rounded-xl"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 text-muted-foreground hover:text-foreground"
                >
                  <QrCode className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Right - Promo Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-pink-500 via-red-500 to-orange-500 p-6 lg:p-8">
              <div className="relative z-10">
                <p className="text-white/80 text-sm mb-1">For new users</p>
                <h3 className="text-2xl font-medium text-white mb-1 md:text-3xl">
                  20% Coupon
                </h3>
                <p className="text-xl text-white/90 mb-4">
                  & ¥3500 Bonus
                </p>
                <Button className="bg-white text-pink-600 hover:bg-white/90">
                  Claim
                </Button>
              </div>
              
              {/* Decorative Product Image */}
              <div className="absolute -right-8 -bottom-8 h-48 w-48 opacity-20 lg:opacity-30">
                <Image
                  src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop"
                  alt=""
                  fill
                  className="object-cover rounded-2xl rotate-12"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Pills */}
        <section className="mb-8">
          <CategoryPills selected={selectedCategory} onSelect={setSelectedCategory} />
        </section>

        {/* Tab Filter */}
        <section className="mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabList.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? 'bg-secondary text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>

        {/* Popular Products */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium text-foreground flex items-center gap-1">
              Popular <ChevronRight className="h-5 w-5" />
            </h2>
            <Link href="/search?sort=popular" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {mockProducts.slice(0, 10).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Trending Sellers */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium text-foreground flex items-center gap-1">
              Trending Sellers <ChevronRight className="h-5 w-5" />
            </h2>
            <Link href="/search?type=sellers" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockSellers.map((seller) => (
              <SellerCard key={seller.id} seller={seller} />
            ))}
          </div>
        </section>

        {/* Popular Outfits */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium text-foreground flex items-center gap-1">
              Popular Outfits <ChevronRight className="h-5 w-5" />
            </h2>
            <Link href="/search?type=outfits" className="text-sm text-primary hover:underline">
              View all
            </Link>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockOutfits.map((outfit) => (
              <Link key={outfit.id} href={`/outfit/${outfit.id}`} className="group block">
                <div className="rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-primary/50">
                  <div className="relative aspect-[3/2]">
                    <Image
                      src={outfit.image}
                      alt={outfit.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors mb-1">
                      {outfit.name}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{outfit.items} items</span>
                      <span>{outfit.currency} {outfit.price.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              2024 ShopQC. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
