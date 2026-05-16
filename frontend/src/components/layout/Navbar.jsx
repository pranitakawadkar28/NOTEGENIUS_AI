import { useState } from 'react'
import { Sun, Moon, Menu, Sparkles, Search } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar } from '@/features/ui/uiSlice'
import { selectCurrentUser } from '@/features/auth/authSlice'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)

  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/notes-history?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  return (
    <header className="sticky top-0 z-30 h-16 w-full bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border-primary)]">
      <div className="flex h-full items-center justify-between px-6 lg:px-10">
        <div className="flex items-center gap-6 flex-1">
          {user && (
            <button 
              onClick={() => dispatch(toggleSidebar())}
              className="lg:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <Menu size={20} />
            </button>
          )}

          {/* Search Bar */}
          <div className="hidden md:flex items-center gap-3 group max-w-md w-full">
            <Search size={18} className="text-[var(--text-muted)] group-focus-within:text-brand-500 transition-colors" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search notes or topics..." 
              className="bg-transparent text-sm font-medium outline-none w-full text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Credits Button (Visible when logged in) */}
          {user && (
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-secondary)] shadow-sm">
              <Sparkles size={14} className="text-brand-500" fill="currentColor" />
              <span className="text-xs font-bold tracking-tight">
                {user?.credits ?? 0}
                <span className="text-[var(--text-muted)] ml-1 uppercase text-[10px]">Credits</span>
              </span>
            </div>
          )}

          {/* Authenticated User Avatar */}
          {user && (
            <Link to="/settings" className="h-9 w-9 rounded-full bg-brand-500 flex items-center justify-center text-white font-black text-sm shadow-sm hover:scale-105 transition-transform uppercase">
              {user?.username?.[0] || user?.email?.[0] || 'U'}
            </Link>
          )}

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-xl transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  )
}
