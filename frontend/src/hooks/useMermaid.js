import { useEffect } from 'react'
import mermaid from 'mermaid'
import { useTheme } from '@/context/ThemeContext'

/**
 * useMermaid Hook
 * Manages the initialization and configuration of the Mermaid library.
 * Syncs Mermaid theme with the application's dark/light mode.
 */
export const useMermaid = () => {
  const { theme } = useTheme()

  useEffect(() => {
    const isDark = theme === 'dark'

    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? 'dark' : 'default',
      themeVariables: {
        darkMode: isDark,
        background: 'transparent',
        primaryColor: isDark ? '#6366f1' : '#4f46e5', // Brand colors
        primaryTextColor: isDark ? '#f8fafc' : '#1a1a1a',
        primaryBorderColor: isDark ? '#6366f1' : '#4f46e5',
        lineColor: isDark ? '#94a3b8' : '#6b7280',
        fontSize: '14px',
        fontFamily: 'Inter, system-ui, sans-serif',
      },
      securityLevel: 'loose',
      fontFamily: 'Inter, system-ui, sans-serif',
    })
  }, [theme])

  return mermaid
}
