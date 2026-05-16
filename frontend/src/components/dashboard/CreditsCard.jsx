import { Zap, ArrowUpRight, Plus } from 'lucide-react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '@/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

export default function CreditsCard() {
  const user = useSelector(selectCurrentUser)
  const navigate = useNavigate()
  
  const credits = user?.credits ?? 0
  const maxCredits = 500
  const percentage = Math.min((credits / maxCredits) * 100, 100)

  return (
    <div className="bg-[var(--bg-secondary)] rounded-[3rem] p-10 border border-[var(--border-primary)] shadow-2xl shadow-brand-500/5 h-full flex flex-col justify-between group hover:border-brand-500/30 transition-all duration-700 relative overflow-hidden">
      {/* Decorative Accents */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-500/10" />
      
      <div className="flex items-start justify-between relative z-10">
        <div className="h-16 w-16 rounded-2xl bg-brand-500 flex items-center justify-center text-white shadow-xl shadow-brand-500/20 group-hover:rotate-12 transition-transform duration-500">
          <Zap size={28} fill="currentColor" />
        </div>
        <button 
          onClick={() => navigate('/billing')}
          className="h-12 w-12 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-brand-500 hover:text-white transition-all duration-300 flex items-center justify-center border border-[var(--border-primary)]"
        >
          <ArrowUpRight size={20} />
        </button>
      </div>

      <div className="mt-10 space-y-3 relative z-10">
        <p className="text-[10px] font-black uppercase tracking-widest text-brand-500">Available Balance</p>
        <div className="flex items-baseline gap-3">
          <h3 className="text-6xl font-black text-[var(--text-primary)] tracking-tighter leading-none">{credits}</h3>
          <span className="text-lg font-bold text-[var(--text-muted)] tracking-tight">/ {maxCredits}</span>
        </div>
      </div>

      <div className="mt-10 space-y-6 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-1">
             <span>Quota Usage</span>
             <span className="text-brand-500">{percentage.toFixed(0)}%</span>
          </div>
          <div className="h-2 w-full bg-[var(--bg-tertiary)] rounded-full overflow-hidden p-0.5 border border-[var(--border-primary)]">
            <div 
              className="h-full bg-brand-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(99,102,241,0.5)]" 
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        
        <button 
          onClick={() => navigate('/billing')}
          className="w-full py-5 rounded-2xl bg-[var(--bg-tertiary)] text-[var(--text-primary)] text-[10px] font-black uppercase tracking-widest hover:bg-brand-500 hover:text-white transition-all duration-500 flex items-center justify-center gap-3 border border-[var(--border-primary)] shadow-sm group-hover:shadow-lg"
        >
          <Plus size={14} strokeWidth={3} />
          Purchase Credits
        </button>
      </div>
    </div>
  )
}
