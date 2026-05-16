import { FileText, ChevronRight, Clock, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'

export default function RecentNotesList({ notes }) {
  const navigate = useNavigate()

  if (!notes || notes.length === 0) {
    return (
      <div className="bg-[var(--bg-secondary)] rounded-[2.5rem] p-12 border border-[var(--border-primary)] shadow-sm flex flex-col items-center justify-center text-center space-y-4">
        <div className="h-16 w-16 rounded-2xl bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-muted)]">
          <FileText size={32} />
        </div>
        <div>
          <h4 className="text-lg font-bold text-[var(--text-primary)]">No recent activity</h4>
          <p className="text-sm text-[var(--text-secondary)]">Start generating notes to see them here.</p>
        </div>
        <button 
          onClick={() => navigate('/generate-notes')}
          className="px-6 py-2 rounded-xl bg-brand-500 text-white text-xs font-black uppercase tracking-widest hover:bg-brand-600 transition-colors"
        >
          Generate Now
        </button>
      </div>
    )
  }

  return (
    <div className="bg-[var(--bg-secondary)] rounded-[2.5rem] border border-[var(--border-primary)] shadow-sm overflow-hidden">
      <div className="p-8 border-b border-[var(--border-primary)] flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-[var(--text-primary)]">Recent Activity</h3>
          <p className="text-xs text-[var(--text-muted)] font-medium mt-1">Your latest AI-generated study guides</p>
        </div>
        <button 
          onClick={() => navigate('/notes-history')}
          className="h-10 w-10 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-brand-500 hover:text-white transition-all group"
        >
          <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="divide-y divide-[var(--border-primary)]">
        {notes.map((note) => (
          <div 
            key={note._id}
            onClick={() => navigate(`/notes/${note._id}`)}
            className="p-6 flex items-center justify-between hover:bg-[var(--bg-tertiary)]/50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-brand-500/5 flex items-center justify-center text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                <FileText size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[var(--text-primary)] leading-tight">{note.title}</h4>
                <div className="flex items-center gap-3 mt-1">
                   <div className="flex items-center gap-1 text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wide">
                     <Clock size={12} />
                     {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
                   </div>
                   <span className="h-1 w-1 rounded-full bg-[var(--border-primary)]" />
                   <span className="text-[10px] font-black text-brand-500 uppercase tracking-widest">{note.examType || 'Exam'}</span>
                </div>
              </div>
            </div>
            <ChevronRight size={18} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
          </div>
        ))}
      </div>
    </div>
  )
}
