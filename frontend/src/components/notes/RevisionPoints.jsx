import { Zap, CheckCircle2 } from 'lucide-react'

export default function RevisionPoints({ points = [] }) {
  if (!points || !points.length) return null

  return (
    <div className="bg-[var(--bg-secondary)] rounded-[2.5rem] border border-[var(--border-primary)] shadow-lg overflow-hidden relative">
      {/* Top accent */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400" />

      {/* Subtle BG glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="p-8 lg:p-10 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="h-11 w-11 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
              <Zap size={22} fill="currentColor" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[var(--text-primary)] tracking-tighter">Rapid Recap</h2>
              <p className="text-[10px] font-medium text-[var(--text-muted)] mt-0.5">High-yield facts for quick revision</p>
            </div>
          </div>
          <span className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-[var(--border-primary)] bg-[var(--bg-tertiary)] text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">
            {points.length} Points
          </span>
        </div>

        {/* Grid of points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {points.map((point, index) => (
            <div
              key={index}
              className="group flex gap-3 p-4 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-tertiary)]/50 hover:border-brand-500/30 hover:bg-[var(--bg-tertiary)] transition-all duration-200"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-muted)] text-[10px] font-black group-hover:bg-brand-500 group-hover:text-white group-hover:border-brand-500 transition-all duration-200">
                {String(index + 1).padStart(2, '0')}
              </span>
              <p className="text-sm font-semibold text-[var(--text-secondary)] leading-relaxed pt-0.5 group-hover:text-[var(--text-primary)] transition-colors">
                {point}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
