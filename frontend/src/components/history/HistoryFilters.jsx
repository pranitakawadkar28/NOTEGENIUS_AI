import { Search, Filter, SlidersHorizontal } from 'lucide-react'
import { Input } from '@/components/ui/AuthPrimitives'
import { Select } from '@/components/ui/FormComponents'
import { useEffect, useState } from 'react'

const CLASS_OPTIONS = [
  { label: 'All Levels', value: 'all' },
  { label: 'Secondary', value: 'secondary' },
  { label: 'Higher Secondary', value: 'higher_secondary' },
  { label: 'Undergrad', value: 'undergrad' },
  { label: 'Postgrad', value: 'postgrad' },
]

const EXAM_OPTIONS = [
  { label: 'All Exams', value: 'all' },
  { label: 'Board', value: 'board' },
  { label: 'University', value: 'university' },
  { label: 'Competitive', value: 'competitive' },
]

export default function HistoryFilters({ filters, setFilters }) {
  const [searchTerm, setSearchTerm] = useState(filters.search)

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(prev => ({ ...prev, search: searchTerm, page: 1 }))
    }, 500)
    return () => clearTimeout(timer)
  }, [searchTerm, setFilters])

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-8 animate-fade-in">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-[var(--text-secondary)]" />
        <Input 
          placeholder="Search by topic..." 
          className="pl-10 h-11 bg-[var(--bg-secondary)] border-[var(--border-primary)]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-secondary)]">
          <Filter size={14} />
          <span className="text-xs font-bold uppercase tracking-wider">Filters</span>
        </div>
        
        <Select 
          options={CLASS_OPTIONS} 
          className="w-40 h-11" 
          value={filters.classLevel}
          onChange={(e) => setFilters(prev => ({ ...prev, classLevel: e.target.value, page: 1 }))}
        />
        <Select 
          options={EXAM_OPTIONS} 
          className="w-40 h-11" 
          value={filters.examType}
          onChange={(e) => setFilters(prev => ({ ...prev, examType: e.target.value, page: 1 }))}
        />
        
        <button className="p-2.5 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-brand-500 transition-colors">
          <SlidersHorizontal size={18} />
        </button>
      </div>
    </div>
  )
}
