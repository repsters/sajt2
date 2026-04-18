'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

type Theme = 'dark' | 'light'
type AccentColor = 'purple' | 'blue' | 'teal' | 'coral' | 'gold'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  accentColor: AccentColor
  setAccentColor: (color: AccentColor) => void
}

const defaultContext: ThemeContextType = {
  theme: 'dark',
  setTheme: () => {},
  accentColor: 'purple',
  setAccentColor: () => {},
}

const ThemeContext = createContext<ThemeContextType>(defaultContext)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [accentColor, setAccentColor] = useState<AccentColor>('purple')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as Theme | null
    const savedAccent = localStorage.getItem('accentColor') as AccentColor | null
    
    if (savedTheme) setTheme(savedTheme)
    if (savedAccent) setAccentColor(savedAccent)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const root = document.documentElement
    root.classList.remove('dark', 'light')
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme, mounted])

  useEffect(() => {
    if (!mounted) return
    
    const root = document.documentElement
    root.classList.remove('accent-purple', 'accent-blue', 'accent-teal', 'accent-coral', 'accent-gold')
    root.classList.add(`accent-${accentColor}`)
    localStorage.setItem('accentColor', accentColor)
  }, [accentColor, mounted])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, accentColor, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
