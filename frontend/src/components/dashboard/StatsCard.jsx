import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'

export default function StatsCard({ label, value, icon: Icon, colorClass, trend }) {
  return (
    <div className="bg-[var(--bg-secondary)] rounded-[2.5rem] p-8 border border-[var(--border-primary)] shadow-2xl shadow-brand-500/[0.02] group hover:border-brand-500/30 transition-all duration-500 relative overflow-hidden">
      <div className="flex items-start justify-between mb-8">
        <div className={cn("p-4 rounded-[1.25rem] transition-transform duration-500 group-hover:scale-110", colorClass)}>
          <Icon size={24} />
        </div>
        {trend !== undefined && (
          <div className={cn(
            "flex items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase",
            trend >= 0 ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
          )}>
            {trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trend >= 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] opacity-80">{label}</p>
        <h4 className="text-4xl font-black text-[var(--text-primary)] tracking-tighter leading-none">{value}</h4>
      </div>
      
      {/* Decorative accent */}
      <div className={cn(
        "absolute bottom-0 right-0 h-1.5 w-1/3 rounded-tl-full opacity-30",
        colorClass.split(' ')[1]
      )} />
    </div>
  )
}
