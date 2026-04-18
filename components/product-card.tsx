'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { PlatformBadge } from '@/components/platform-badge'

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  currency: string
  image: string
  seller: string
  platform: 'taobao' | 'weidian' | '1688'
  rating: number
  orders: number
  favorites?: number
  favoriteAvatars?: string[]
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-primary/50">
        {/* Image */}
        <div className="relative aspect-square bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
          
          {/* Favorite Avatars */}
          {product.favorites && product.favorites > 0 && (
            <div className="absolute right-2 top-2 flex items-center">
              <div className="flex -space-x-2">
                {[...Array(Math.min(3, product.favorites))].map((_, i) => (
                  <div
                    key={i}
                    className="h-6 w-6 rounded-full border-2 border-card bg-primary/30"
                  />
                ))}
              </div>
              {product.favorites > 3 && (
                <span className="ml-1 text-xs text-muted-foreground bg-background/80 px-1.5 py-0.5 rounded-full">
                  +{product.favorites - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          {/* Seller */}
          <div className="flex items-center gap-2 mb-1">
            <PlatformBadge platform={product.platform} size="sm" />
            <span className="text-xs text-muted-foreground truncate">{product.seller}</span>
          </div>

          {/* Product Name */}
          <h3 className="text-sm text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-sm font-medium text-foreground">
              {product.currency} {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {product.currency} {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Rating & Orders */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
              <span>{product.rating.toFixed(1)}</span>
            </div>
            <span>|</span>
            <span>{product.orders.toLocaleString()} orders</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
