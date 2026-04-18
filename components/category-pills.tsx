'use client'

import { cn } from '@/lib/utils'
import { 
  Flame, 
  Sparkles, 
  Shirt, 
  Users, 
  Footprints, 
  CircleDot,
  Layers,
  Gem,
  Watch,
  Heart
} from 'lucide-react'

const categories = [
  { id: 'popular', label: 'Popular', icon: Flame },
  { id: 'new', label: 'New', icon: Sparkles },
  { id: 'outfits', label: 'Outfits', icon: Layers },
  { id: 'sellers', label: 'Sellers', icon: Users },
  { id: 'shoes', label: 'Shoes', icon: Footprints },
  { id: 'tops', label: 'Tops', icon: Shirt },
  { id: 'bottoms', label: 'Bottoms', icon: CircleDot },
  { id: 'outerwear', label: 'Outerwear', icon: Shirt },
  { id: 'jewelry', label: 'Jewelry', icon: Gem },
  { id: 'accessories', label: 'Accessories', icon: Watch },
  { id: 'intimates', label: 'Intimates', icon: Heart },
]

interface CategoryPillsProps {
  selected?: string
  onSelect?: (categoryId: string) => void
}

export function CategoryPills({ selected = 'popular', onSelect }: CategoryPillsProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
      {categories.map((category) => {
        const Icon = category.icon
        const isSelected = selected === category.id
        
        return (
          <button
            key={category.id}
            onClick={() => onSelect?.(category.id)}
            className="flex flex-col items-center gap-2 min-w-[64px]"
          >
            <div
              className={cn(
                "h-14 w-14 rounded-full flex items-center justify-center transition-all",
                "bg-card border-2",
                isSelected 
                  ? "border-primary" 
                  : "border-border hover:border-muted-foreground"
              )}
            >
              <Icon 
                className={cn(
                  "h-6 w-6 transition-colors",
                  isSelected ? "text-primary" : "text-muted-foreground"
                )} 
              />
            </div>
            <span 
              className={cn(
                "text-xs transition-colors",
                isSelected ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {category.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
