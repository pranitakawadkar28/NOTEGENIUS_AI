import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/lib/utils'

export default function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-primary)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] transition-all hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)] hover:shadow-sm active:scale-95",
        className
      )}
      aria-label="Toggle theme"
    >
      <div className="relative h-5 w-5">
        <Sun
          className={cn(
            "absolute inset-0 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0"
          )}
          size={20}
        />
        <Moon
          className={cn(
            "absolute inset-0 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100"
          )}
          size={20}
        />
      </div>
    </button>
  )
}
