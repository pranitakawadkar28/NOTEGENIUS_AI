import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/lib/utils'

export default function ThemeSettings() {
  const { theme, toggleTheme } = useTheme()

  const THEMES = [
    { id: 'light', icon: Sun, label: 'Light' },
    { id: 'dark', icon: Moon, label: 'Dark' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-[var(--text-primary)] tracking-tight">Appearance</h3>
        <span className="text-[10px] font-black uppercase tracking-widest text-brand-500 bg-brand-500/10 px-2 py-0.5 rounded-full">New Themes Coming</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {THEMES.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => {
               if (theme !== id) toggleTheme()
            }}
            className={cn(
              "flex items-center gap-4 p-4 rounded-2xl border-2 transition-all group",
              theme === id 
                ? "border-brand-500 bg-brand-500/5 text-brand-500 shadow-sm" 
                : "border-[var(--border-primary)] bg-transparent text-[var(--text-muted)] hover:border-brand-500/30 hover:text-[var(--text-primary)]"
            )}
          >
            <div className={cn(
              "h-10 w-10 rounded-xl flex items-center justify-center transition-all",
              theme === id ? "bg-brand-500 text-white" : "bg-[var(--bg-tertiary)]"
            )}>
              <Icon size={20} />
            </div>
            <span className="text-xs font-black uppercase tracking-widest">{label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
