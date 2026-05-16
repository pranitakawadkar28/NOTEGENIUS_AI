import { FileText, SearchX, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/AuthPrimitives'
import { useNavigate } from 'react-router-dom'

export default function EmptyHistory({ hasFilters = false, onClearFilters }) {
  const navigate = useNavigate()

  if (hasFilters) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-rose-500/10 blur-3xl rounded-full" />
          <div className="relative h-20 w-20 flex items-center justify-center rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <SearchX size={32} className="text-rose-400" />
          </div>
        </div>

        <h3 className="text-xl font-bold text-[var(--text-primary)]">No results found</h3>
        <p className="mt-2 text-[var(--text-secondary)] max-w-xs mx-auto">
          No notes match your current search or filter. Try adjusting your criteria.
        </p>

        <Button
          onClick={onClearFilters}
          variant="outline"
          className="mt-8 px-8 border-rose-500/30 text-rose-400 hover:bg-rose-500/10"
        >
          Clear Filters
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-brand-500/10 blur-3xl rounded-full" />
        <div className="relative h-20 w-20 flex items-center justify-center rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
          <FileText size={32} className="text-[var(--text-secondary)]" />
        </div>
      </div>

      <h3 className="text-xl font-bold text-[var(--text-primary)]">No notes yet</h3>
      <p className="mt-2 text-[var(--text-secondary)] max-w-xs mx-auto">
        Your generated study materials will appear here. Start your first generation today!
      </p>

      <Button
        onClick={() => navigate('/generate-notes')}
        className="mt-8 px-8"
      >
        <Sparkles size={16} className="mr-2" />
        Generate My First Note
      </Button>
    </div>
  )
}
