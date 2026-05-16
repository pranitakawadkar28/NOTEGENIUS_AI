import { FileText, Calendar, Download, Eye, Tag, Trash2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/AuthPrimitives'
import { useDispatch } from 'react-redux'
import { downloadNotePdf, deleteNote } from '@/features/notes/notesSlice'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function NoteCard({ note }) {
  const { _id, topic, classLevel, examType, revisionMode, createdAt } = note
  const dispatch = useDispatch()
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    
    // Ensure we parse the content properly to send the full payload to backend
    let parsedContent = note.content
    if (typeof parsedContent === 'string') {
      try {
        parsedContent = JSON.parse(parsedContent)
      } catch(e) {
        parsedContent = { notes: note.content }
      }
    }
    
    const noteData = {
      ...(typeof parsedContent === 'object' && parsedContent !== null ? parsedContent : { notes: note.content }),
      topic: note.topic,
      createdAt: note.createdAt
    }

    await dispatch(downloadNotePdf({ noteData, title: topic }))
    setIsDownloading(false)
  }

  return (
    <div className="glass rounded-2xl p-5 border border-[var(--border-primary)] hover:border-brand-500/30 transition-all group flex flex-col h-full shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500 group-hover:scale-110 transition-transform">
          <FileText size={20} />
        </div>
        <button 
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this note?')) {
              dispatch(deleteNote(_id))
            }
          }}
          className="p-1.5 text-zinc-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
          title="Delete Note"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-bold text-[var(--text-primary)] line-clamp-1 group-hover:text-brand-500 transition-colors">
          {topic}
        </h3>
        
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
            <Tag size={10} />
            {examType}
          </span>
          {revisionMode && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold uppercase tracking-wider text-purple-500">
              Revision
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center gap-3 text-[var(--text-secondary)]">
          <div className="flex items-center gap-1.5 text-xs">
            <Calendar size={14} />
            {new Date(createdAt).toLocaleDateString()}
          </div>
          <div className="h-1 w-1 rounded-full bg-[var(--border-primary)]" />
          <span className="text-xs">{classLevel}</span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-[var(--border-primary)] flex items-center gap-2">
        <Link to={`/notes/${_id}`} className="flex-1">
          <Button size="sm" className="w-full">
            <Eye size={14} className="mr-2" />
            View
          </Button>
        </Link>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={handleDownload}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <>
              <Download size={14} className="mr-2" />
              PDF
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
