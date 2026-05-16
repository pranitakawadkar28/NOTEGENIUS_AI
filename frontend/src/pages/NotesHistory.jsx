import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChevronLeft, ChevronRight, History, X } from 'lucide-react'
import HistoryFilters from '@/components/history/HistoryFilters'
import NoteCard from '@/components/history/NoteCard'
import EmptyHistory from '@/components/history/EmptyHistory'
import HistorySkeleton from '@/components/history/HistorySkeleton'
import { fetchNotes, selectAllNotes, selectNotesLoading, selectNotesPagination } from '@/features/notes/notesSlice'
import { cn } from '@/lib/utils'
import { useSearchParams } from 'react-router-dom'

const ITEMS_PER_PAGE = 9

export default function NotesHistory() {
  const dispatch = useDispatch()
  const notes = useSelector(selectAllNotes)
  const isLoading = useSelector(selectNotesLoading)
  const pagination = useSelector(selectNotesPagination)
  const [searchParams] = useSearchParams()

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    classLevel: 'all',
    examType: 'all',
    page: 1
  })

  // Fetch notes when filters or page changes
  useEffect(() => {
    dispatch(fetchNotes({
      page: filters.page,
      limit: ITEMS_PER_PAGE,
      search: filters.search,
      classLevel: filters.classLevel === 'all' ? undefined : filters.classLevel,
      examType: filters.examType === 'all' ? undefined : filters.examType
    }))
  }, [dispatch, filters.page, filters.search, filters.classLevel, filters.examType])

  const totalPages = pagination?.pages || 1
  const currentPage = pagination?.page || 1
  const hasActiveFilters = filters.search || filters.classLevel !== 'all' || filters.examType !== 'all'

  const handleClearFilters = () => {
    setFilters({ search: '', classLevel: 'all', examType: 'all', page: 1 })
  }

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] flex items-center gap-3">
            <History className="text-brand-500" />
            Notes History
          </h1>
          <p className="mt-2 text-[var(--text-secondary)]">Manage and review all your AI-generated study materials.</p>
        </div>

        <div className="px-4 py-2 rounded-xl glass border border-[var(--border-primary)] text-sm font-medium text-[var(--text-secondary)]">
          {hasActiveFilters
            ? <><span className="text-brand-500 font-bold">{pagination?.total || 0}</span> results</>
            : <>Total Notes: <span className="text-brand-500 font-bold">{pagination?.total || 0}</span></>
          }
        </div>
      </div>

      <HistoryFilters filters={filters} setFilters={setFilters} />

      {/* Active filter badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 -mt-4 animate-fade-in">
          <span className="text-xs text-[var(--text-secondary)] font-semibold uppercase tracking-wider">Active:</span>
          {filters.search && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-bold text-brand-400">
              Search: "{filters.search}"
              <button onClick={() => setFilters(p => ({ ...p, search: '', page: 1 }))} className="hover:text-white"><X size={12} /></button>
            </span>
          )}
          {filters.classLevel !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-bold text-brand-400">
              Level: {filters.classLevel}
              <button onClick={() => setFilters(p => ({ ...p, classLevel: 'all', page: 1 }))} className="hover:text-white"><X size={12} /></button>
            </span>
          )}
          {filters.examType !== 'all' && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-bold text-brand-400">
              Exam: {filters.examType}
              <button onClick={() => setFilters(p => ({ ...p, examType: 'all', page: 1 }))} className="hover:text-white"><X size={12} /></button>
            </span>
          )}
          <button onClick={handleClearFilters} className="text-xs text-rose-400 hover:text-rose-300 font-bold underline underline-offset-2">
            Clear all
          </button>
        </div>
      )}

      {isLoading ? (
        <HistorySkeleton />
      ) : notes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="p-2 rounded-lg border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={20} />
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className={cn(
                    "h-10 w-10 rounded-lg text-sm font-bold transition-all",
                    currentPage === i + 1
                      ? "bg-brand-500 text-white shadow-md shadow-brand-500/20"
                      : "border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
                  )}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="p-2 rounded-lg border border-[var(--border-primary)] hover:bg-[var(--bg-secondary)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      ) : (
        <EmptyHistory
          hasFilters={!!hasActiveFilters}
          onClearFilters={handleClearFilters}
        />
      )}
    </div>
  )
}



