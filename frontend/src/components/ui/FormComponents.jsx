import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export const Select = forwardRef(({ className, options = [], ...props }, ref) => (
  <div className="relative group">
    <select
      ref={ref}
      className={cn(
        "flex h-12 w-full rounded-xl border border-[var(--border-primary)] bg-[var(--bg-tertiary)] px-4 py-2 text-sm font-bold text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all appearance-none cursor-pointer",
        className
      )}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors">
       <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
       </svg>
    </div>
  </div>
))
Select.displayName = "Select"

export const Switch = ({ checked, onChange, label, description, disabled }) => (
  <div className={cn("flex items-center justify-between py-4", disabled && "opacity-50 cursor-not-allowed")}>
    <div className="flex flex-col gap-0.5">
      <span className="text-sm font-bold text-[var(--text-primary)]">{label}</span>
      {description && <span className="text-xs font-medium text-[var(--text-secondary)]">{description}</span>}
    </div>
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-500/20",
        checked ? "bg-brand-500" : "bg-[var(--border-secondary)]"
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xl transition duration-300 ease-in-out",
          checked ? "translate-x-5" : "translate-x-0"
        )}
      />
    </button>
  </div>
)
