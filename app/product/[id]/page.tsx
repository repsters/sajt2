'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Minus, Plus, Truck, Shield, ChevronRight, ThumbsUp, ExternalLink } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { PlatformBadge } from '@/components/platform-badge'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { mockProducts } from '@/lib/mock-data'

const sizes = ['S', 'M', 'L', 'XL', 'XXL']
const colors = [
  { name: 'Black', hex: '#1a1a1a' },
  { name: 'White', hex: '#ffffff' },
  { name: 'Gray', hex: '#6b7280' },
  { name: 'Navy', hex: '#1e3a5f' },
]

const productImages = [
  'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop&sat=-100',
  'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop&blur=20',
  'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop&flip=h',
]

const qcPhotos = [
  { image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&h=200&fit=crop', rating: 4.8, votes: 24 },
  { image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop', rating: 4.5, votes: 18 },
  { image: 'https://images.unsplash.com/photo-1544923246-77307dd628b9?w=200&h=200&fit=crop', rating: 4.9, votes: 32 },
  { image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&h=200&fit=crop', rating: 4.6, votes: 15 },
]

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState('Black')
  const [quantity, setQuantity] = useState(1)

  const product = mockProducts[0]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/search?category=tops" className="hover:text-foreground">Tops</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Left Column - Images */}
          <div className="lg:col-span-3">
            {/* Main Image */}
            <div className="relative aspect-square rounded-xl overflow-hidden bg-muted mb-4">
              <Image
                src={productImages[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-2 mb-8">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square w-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-primary' : 'border-border'
                  }`}
                >
                  <Image src={image} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>

            {/* QC Photos Section */}
            <section>
              <h2 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
                QC Photos <ChevronRight className="h-5 w-5" />
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {qcPhotos.map((photo, index) => (
                  <div key={index} className="rounded-lg border border-border bg-card overflow-hidden">
                    <div className="relative aspect-square">
                      <Image src={photo.image} alt="QC Photo" fill className="object-cover" />
                    </div>
                    <div className="p-2 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                        <span className="text-foreground">{photo.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <ThumbsUp className="h-3 w-3" />
                        <span>{photo.votes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Product Info */}
          <div className="lg:col-span-2">
            {/* Platform & Seller */}
            <div className="flex items-center gap-2 mb-3">
              <PlatformBadge platform={product.platform} />
              <Link href="/seller/1" className="text-sm text-muted-foreground hover:text-primary">
                {product.seller}
              </Link>
            </div>

            {/* Title */}
            <h1 className="text-xl font-medium text-foreground mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-medium text-foreground">
                {product.currency} {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {product.currency} {product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-sm text-muted-foreground">
                (¥{Math.round(product.price / 15)})
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6 text-sm">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-500 text-yellow-500'
                        : 'text-muted-foreground'
                    }`}
                  />
                ))}
                <span className="ml-1 text-foreground">{product.rating}</span>
              </div>
              <span className="text-muted-foreground">|</span>
              <span className="text-muted-foreground">{product.orders.toLocaleString()} orders</span>
            </div>

            <hr className="border-border mb-6" />

            {/* Size Selector */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-3">Size</p>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-10 min-w-[48px] px-4 rounded-lg border text-sm transition-colors ${
                      selectedSize === size
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border text-muted-foreground hover:border-muted-foreground'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-3">Color: {selectedColor}</p>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`h-8 w-8 rounded-full border-2 transition-all ${
                      selectedColor === color.name
                        ? 'ring-2 ring-offset-2 ring-offset-background ring-primary'
                        : 'border-border'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-3">Quantity</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-10 w-10 rounded-r-none"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center text-foreground">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="h-10 w-10 rounded-l-none"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3 mb-6">
              <Link href="/cart" className="flex-1">
                <Button variant="outline" className="w-full h-12 text-base">
                  Add to Cart
                </Button>
              </Link>
              <Link href="/checkout" className="flex-1">
                <Button className="w-full h-12 text-base bg-primary text-primary-foreground hover:bg-primary/90">
                  Buy Now
                </Button>
              </Link>
            </div>

            {/* Shipping Info */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                <span>Est. 10-15 days</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Agent fee: 5%</span>
              </div>
            </div>

            <hr className="border-border mb-6" />

            {/* Seller Card */}
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-muted" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{product.seller}</span>
                    <PlatformBadge platform={product.platform} size="sm" />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    <span>4.8</span>
                    <span>•</span>
                    <span>234 products</span>
                  </div>
                </div>
              </div>
              <Link href="/seller/1">
                <Button variant="outline" className="w-full" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Store
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <section className="mt-16">
          <h2 className="text-xl font-medium text-foreground mb-6 flex items-center gap-1">
            Similar Products <ChevronRight className="h-5 w-5" />
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {mockProducts.slice(0, 5).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
