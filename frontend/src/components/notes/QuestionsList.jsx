import { HelpCircle, MessageSquare, List, BookMarked } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function QuestionsList({ questions }) {
  if (!questions) return null

  const isNewFormat = !Array.isArray(questions)
  if (!isNewFormat && questions.length === 0) return null

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3 pb-5 border-b border-[var(--border-primary)]">
        <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
          <HelpCircle size={20} />
        </div>
        <div>
          <h2 className="text-lg font-black text-[var(--text-primary)] tracking-tight uppercase">Concept Check</h2>
          <p className="text-[10px] text-[var(--text-muted)] font-medium mt-0.5">Practice these before your exam</p>
        </div>
      </div>

      <div className="space-y-8">
        {isNewFormat ? (
          <>
            {questions.short?.length > 0 && (
              <QuestionSection
                title="Short Questions"
                icon={MessageSquare}
                items={questions.short}
                accentClass="text-brand-500"
                bgClass="bg-brand-500/10"
              />
            )}
            {questions.long?.length > 0 && (
              <QuestionSection
                title="Critical Thinking"
                icon={List}
                items={questions.long}
                accentClass="text-indigo-500"
                bgClass="bg-indigo-500/10"
              />
            )}
            {questions.diagram && (
              <div className="p-5 rounded-2xl bg-[var(--bg-tertiary)] border border-[var(--border-primary)]">
                <div className="flex items-center gap-2 mb-3">
                  <BookMarked size={13} className="text-teal-500" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Diagram Insight</p>
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed italic">{questions.diagram}</p>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-3">
            {questions.map((item, index) => (
              <details
                key={index}
                className="group rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-tertiary)]/50 overflow-hidden transition-all hover:border-brand-500/30"
              >
                <summary className="flex items-center justify-between p-4 cursor-pointer list-none gap-3">
                  <div className="flex gap-3 items-start">
                    <span className="text-brand-500 font-black text-[10px] mt-0.5 shrink-0">Q{index + 1}</span>
                    <span className="text-sm font-semibold text-[var(--text-primary)] leading-snug">{item.question}</span>
                  </div>
                  <svg
                    className="w-4 h-4 text-[var(--text-muted)] group-open:rotate-180 transition-transform shrink-0"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 pb-4 pt-3 border-t border-[var(--border-primary)] bg-[var(--bg-secondary)]/50">
                  <div className="flex gap-3">
                    <span className="text-emerald-500 font-black text-[10px] uppercase mt-0.5 shrink-0">Answer</span>
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function QuestionSection({ title, icon: Icon, items, accentClass, bgClass }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className={`h-6 w-6 rounded-lg ${bgClass} flex items-center justify-center`}>
          <Icon size={12} className={accentClass} />
        </div>
        <h3 className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">{title}</h3>
        <span className={cn("text-[10px] font-black", accentClass)}>({items.length})</span>
      </div>
      <div className="space-y-2">
        {items.map((q, i) => (
          <div
            key={i}
            className="group flex gap-3 p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-tertiary)]/50 hover:border-brand-500/20 hover:bg-[var(--bg-tertiary)] transition-all"
          >
            <span className={cn("text-[10px] font-black mt-0.5 opacity-40 group-hover:opacity-100 transition-opacity shrink-0", accentClass)}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="text-xs font-semibold text-[var(--text-secondary)] leading-relaxed group-hover:text-[var(--text-primary)] transition-colors">{q}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
