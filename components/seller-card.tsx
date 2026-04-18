'use client'

import Link from 'next/link'
import Image from 'next/image'
import { PlatformBadge } from '@/components/platform-badge'

export interface Seller {
  id: string
  name: string
  platform: 'taobao' | 'weidian' | '1688'
  images: string[]
  minPrice: number
  currency: string
  productCount: number
}

interface SellerCardProps {
  seller: Seller
}

export function SellerCard({ seller }: SellerCardProps) {
  return (
    <Link href={`/seller/${seller.id}`} className="group block">
      <div className="rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-primary/50">
        {/* Image Grid */}
        <div className="grid grid-cols-2 gap-0.5 aspect-square">
          {seller.images.slice(0, 4).map((image, index) => (
            <div key={index} className="relative bg-muted">
              <Image
                src={image}
                alt={`${seller.name} product ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <PlatformBadge platform={seller.platform} size="sm" />
            <span className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
              {seller.name}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>From {seller.currency} {seller.minPrice.toLocaleString()}</span>
            <span>{seller.productCount} products</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
