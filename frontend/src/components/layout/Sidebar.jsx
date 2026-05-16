import { NavLink, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Sparkles, 
  History, 
  CreditCard, 
  Settings, 
  X, 
  Plus, 
  LogOut
} from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '@/features/auth/authSlice'
import { cn } from '@/lib/utils'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/generate-notes', label: 'Generate Notes', icon: Sparkles },
  { path: '/notes-history', label: 'Notes History', icon: History },
  { path: '/billing', label: 'Billing', icon: CreditCard },
  { path: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ className, onClose }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/login')
  }

  return (
    <aside className={cn("flex h-full flex-col sidebar-bg relative transition-colors duration-300", className)}>
      <div className="flex h-16 items-center justify-between px-8">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/dashboard')}>
          <div className="h-8 w-8 rounded-lg bg-brand-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/20 group-hover:scale-110 transition-transform duration-300">
            <Sparkles size={18} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-black text-[var(--text-primary)] tracking-tighter">
            NoteGenius
          </span>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 px-4 py-8">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) => cn(
              "flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 group",
              isActive 
                ? "bg-[var(--bg-tertiary)] text-brand-500 shadow-sm" 
                : "text-[var(--text-secondary)] hover:text-brand-500 hover:bg-[var(--bg-tertiary)]/50"
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon 
                  size={18} 
                  className={cn(
                    "transition-colors", 
                    isActive ? "text-brand-500" : "group-hover:text-brand-500"
                  )} 
                />
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-[var(--border-primary)]">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all group"
        >
          <div className="h-8 w-8 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-primary)] flex items-center justify-center group-hover:border-rose-500/20 text-[var(--text-secondary)] group-hover:text-rose-500 transition-colors">
            <LogOut size={16} />
          </div>
          Sign Out
        </button>
      </div>
    </aside>
  )
}
