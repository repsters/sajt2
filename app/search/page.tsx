'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { mockProducts } from '@/lib/mock-data'
import { SlidersHorizontal, X } from 'lucide-react'

const categories = [
  { id: 'tops', label: 'Tops' },
  { id: 'bottoms', label: 'Bottoms' },
  { id: 'shoes', label: 'Shoes' },
  { id: 'outerwear', label: 'Outerwear' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'jewelry', label: 'Jewelry' },
]

const platforms = [
  { id: 'taobao', label: 'Taobao' },
  { id: 'weidian', label: 'Weidian' },
  { id: '1688', label: '1688' },
]

const ratings = [
  { id: '4plus', label: '4 & up' },
  { id: '3plus', label: '3 & up' },
  { id: '2plus', label: '2 & up' },
]

const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price Low' },
  { value: 'price-desc', label: 'Price High' },
  { value: 'orders', label: 'Most Orders' },
]

export default function SearchPage() {
  const [sortBy, setSortBy] = useState('relevance')
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [selectedRating, setSelectedRating] = useState<string | null>(null)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  const togglePlatform = (id: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-foreground">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden"
          onClick={() => setShowMobileFilters(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center gap-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
              />
              <label
                htmlFor={category.id}
                className="text-sm text-muted-foreground cursor-pointer"
              >
                {category.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Price Range</h3>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="bg-card border-border"
          />
          <span className="text-muted-foreground">-</span>
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="bg-card border-border"
          />
        </div>
      </div>

      {/* Platform */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Platform</h3>
        <div className="space-y-2">
          {platforms.map((platform) => (
            <div key={platform.id} className="flex items-center gap-2">
              <Checkbox
                id={platform.id}
                checked={selectedPlatforms.includes(platform.id)}
                onCheckedChange={() => togglePlatform(platform.id)}
              />
              <label
                htmlFor={platform.id}
                className="text-sm text-muted-foreground cursor-pointer"
              >
                {platform.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-sm font-medium text-foreground mb-3">Rating</h3>
        <div className="space-y-2">
          {ratings.map((rating) => (
            <div key={rating.id} className="flex items-center gap-2">
              <Checkbox
                id={rating.id}
                checked={selectedRating === rating.id}
                onCheckedChange={() =>
                  setSelectedRating(selectedRating === rating.id ? null : rating.id)
                }
              />
              <label
                htmlFor={rating.id}
                className="text-sm text-muted-foreground cursor-pointer"
              >
                {rating.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
        Apply Filters
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden w-60 flex-shrink-0 lg:block">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-4">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-xl font-medium text-foreground">
                  Results for &quot;hoodie&quot;
                </h1>
                <p className="text-sm text-muted-foreground">
                  {mockProducts.length} products found
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <Button
                  variant="outline"
                  className="lg:hidden"
                  onClick={() => setShowMobileFilters(true)}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>

                {/* Sort Options */}
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

            {/* Product Grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {mockProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  className={`h-10 w-10 rounded-lg text-sm transition-colors ${
                    page === 1
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-secondary'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Filter Modal */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden">
            <div className="fixed inset-y-0 left-0 w-80 bg-card p-6 shadow-lg overflow-y-auto">
              <FilterSidebar />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
