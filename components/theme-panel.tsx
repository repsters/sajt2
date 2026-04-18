'use client'

import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const accentColors = [
  { name: 'purple', color: '#7F77DD' },
  { name: 'blue', color: '#378ADD' },
  { name: 'teal', color: '#1D9E75' },
  { name: 'coral', color: '#D85A30' },
  { name: 'gold', color: '#BA7517' },
] as const

interface ThemePanelProps {
  onClose: () => void
}

export function ThemePanel({ onClose }: ThemePanelProps) {
  const { theme, setTheme, accentColor, setAccentColor } = useTheme()

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="absolute right-0 top-full mt-2 z-50 w-72 rounded-xl border border-border bg-card p-4 shadow-lg">
        <h3 className="text-sm font-medium text-foreground mb-4">Appearance</h3>
        
        {/* Theme Toggle */}
        <div className="mb-6">
          <div className="flex rounded-lg border border-border p-1 bg-background">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "flex-1 rounded-md text-sm",
                theme === 'dark' && "bg-primary text-primary-foreground"
              )}
              onClick={() => setTheme('dark')}
            >
              Dark
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "flex-1 rounded-md text-sm",
                theme === 'light' && "bg-primary text-primary-foreground"
              )}
              onClick={() => setTheme('light')}
            >
              Light
            </Button>
          </div>
        </div>

        {/* Accent Color */}
        <div>
          <p className="text-sm text-muted-foreground mb-3">Accent color</p>
          <div className="flex gap-3">
            {accentColors.map((color) => (
              <button
                key={color.name}
                onClick={() => setAccentColor(color.name)}
                className={cn(
                  "h-8 w-8 rounded-full transition-all",
                  accentColor === color.name && "ring-2 ring-offset-2 ring-offset-card ring-white"
                )}
                style={{ backgroundColor: color.color }}
                aria-label={`Set accent color to ${color.name}`}
              />
            ))}
          </div>
        </div>

        {/* Preview */}
        <div className="mt-6 rounded-lg border border-border p-3 bg-background">
          <p className="text-xs text-muted-foreground mb-2">Preview</p>
          <div className="flex items-center gap-2">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Button
            </Button>
            <span className="text-sm text-primary">Link</span>
            <div className="h-4 w-4 rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </>
  )
}
