'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, ExternalLink, Search, ArrowUpDown } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { PlatformBadge } from '@/components/platform-badge'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { mockProducts, mockSellers } from '@/lib/mock-data'

const sortOptions = [
  { value: 'popular', label: 'Popular' },
  { value: 'new', label: 'New' },
  { value: 'price-asc', label: 'Price Low' },
  { value: 'price-desc', label: 'Price High' },
]

const categories = ['All', 'Tops', 'Bottoms', 'Shoes', 'Outerwear', 'Accessories']

export default function SellerPage() {
  const [sortBy, setSortBy] = useState('popular')
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const seller = mockSellers[0]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Banner */}
      <div className="relative h-48 bg-muted md:h-64">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&h=400&fit=crop"
          alt="Store banner"
          fill
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <main className="mx-auto max-w-7xl px-4">
        {/* Seller Info Card */}
        <div className="relative -mt-16 mb-8 rounded-xl border border-border bg-card p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="h-20 w-20 rounded-full border-4 border-card bg-muted flex items-center justify-center text-2xl font-medium text-foreground">
                {seller.name.charAt(0)}
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-xl font-medium text-foreground">{seller.name}</h1>
                  <PlatformBadge platform={seller.platform} />
                </div>
                <p className="text-sm text-muted-foreground">Member since 2021</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-8 text-center">
              <div>
                <p className="text-xl font-medium text-foreground">{seller.productCount}</p>
                <p className="text-xs text-muted-foreground">Products</p>
              </div>
              <div>
                <p className="text-xl font-medium text-foreground">2.4k</p>
                <p className="text-xs text-muted-foreground">Reviews</p>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                <div>
                  <p className="text-xl font-medium text-foreground">4.8</p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
              </div>
              <div>
                <p className="text-xl font-medium text-foreground">12.5k</p>
                <p className="text-xs text-muted-foreground">Orders</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button variant="outline">Follow</Button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit on {seller.platform.charAt(0).toUpperCase() + seller.platform.slice(1)}
              </Button>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search in store..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <div className="flex gap-1">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    sortBy === option.value
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap border transition-colors ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border text-muted-foreground hover:border-muted-foreground'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mb-16">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  )
}
