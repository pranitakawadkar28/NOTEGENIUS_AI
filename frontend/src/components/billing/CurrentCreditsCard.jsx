import { Zap, ArrowUpRight } from 'lucide-react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '@/features/auth/authSlice'

export default function CurrentCreditsCard() {
  const user = useSelector(selectCurrentUser)
  const credits = user?.credits ?? 0
  
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-indigo-800 p-8 text-white shadow-xl">
      <div className="relative z-10">
        <div className="flex items-center gap-3 opacity-80 mb-2">
          <Zap size={16} fill="currentColor" />
          <span className="text-xs font-bold uppercase tracking-widest">Active Balance</span>
        </div>
        
        <div className="flex items-baseline gap-3">
          <h2 className="text-5xl font-black">{credits}</h2>
          <span className="text-lg font-medium opacity-70">AI Credits</span>
        </div>
        
        <p className="mt-4 text-sm text-brand-100 max-w-xs opacity-90 leading-relaxed">
          Your credits allow you to generate high-quality notes, diagrams, and study guides.
        </p>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute right-10 top-10 h-20 w-20 rounded-full bg-brand-400/20 blur-2xl animate-ai-pulse" />
      
      <div className="absolute right-8 top-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
          <ArrowUpRight size={20} />
        </div>
      </div>
    </div>
  )
}
