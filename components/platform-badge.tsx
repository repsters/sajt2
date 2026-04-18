import { cn } from '@/lib/utils'

interface PlatformBadgeProps {
  platform: 'taobao' | 'weidian' | '1688'
  size?: 'sm' | 'md'
}

const platformConfig = {
  taobao: {
    label: 'Taobao',
    color: 'bg-orange-600',
  },
  weidian: {
    label: 'Weidian',
    color: 'bg-green-700',
  },
  '1688': {
    label: '1688',
    color: 'bg-red-700',
  },
}

export function PlatformBadge({ platform, size = 'md' }: PlatformBadgeProps) {
  const config = platformConfig[platform]
  
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded font-medium text-white",
        config.color,
        size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-1 text-xs'
      )}
    >
      {config.label}
    </span>
  )
}
