import { useState, useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  ArrowLeft, Download, Clock, BookOpen, AlertCircle,
  Loader2, Sparkles, Star, FileText, Layers, CheckCircle2
} from 'lucide-react'
import { Button } from '@/components/ui/AuthPrimitives'
import MarkdownRenderer from '@/components/notes/MarkdownRenderer'
import RevisionPoints from '@/components/notes/RevisionPoints'
import QuestionsList from '@/components/notes/QuestionsList'
import MermaidRenderer from '@/components/notes/MermaidRenderer'
import DataChart from '@/components/notes/DataChart'
import { fetchNoteById, selectCurrentNote, selectNotesLoading, downloadNotePdf, clearCurrentNote } from '@/features/notes/notesSlice'
import { formatDistanceToNow } from 'date-fns'

// ─── Sub-topics sidebar panel ────────────────────────────────
function SubTopicsPanel({ subTopics }) {
  if (!subTopics) return null

  const entries = Array.isArray(subTopics)
    ? [['Topics', subTopics]]
    : Object.entries(subTopics)

  if (!entries.length) return null

  const starColors = {
    '⭐': 'text-amber-400',
    '⭐⭐': 'text-orange-400',
    '⭐⭐⭐': 'text-rose-400',
  }

  return (
    <div className="bg-[var(--bg-secondary)] rounded-[2rem] border border-[var(--border-primary)] shadow-lg overflow-hidden">
      <div className="px-6 py-5 border-b border-[var(--border-primary)] flex items-center gap-3">
        <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
          <Star size={16} className="text-amber-500" />
        </div>
        <h3 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest">Sub Topics</h3>
      </div>
      <div className="p-5 space-y-5">
        {entries.map(([level, topics]) => (
          <div key={level}>
            <p className={`text-[10px] font-black uppercase tracking-widest mb-2 ${starColors[level] || 'text-[var(--text-muted)]'}`}>
              {level}
            </p>
            <div className="space-y-1.5">
              {topics.map((t, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)] font-medium leading-relaxed">
                  <CheckCircle2 size={12} className="text-brand-500 shrink-0 mt-0.5" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Note meta bar ───────────────────────────────────────────
function MetaBar({ note, onDownload, isLoading }) {
  return (
    <div className="flex items-center justify-between sticky top-16 z-20 bg-[var(--bg-primary)]/90 backdrop-blur-xl py-4 border-b border-[var(--border-primary)] -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
      <Link
        to="/notes-history"
        className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-brand-500 transition-all group"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        <span className="hidden sm:inline">Back to History</span>
        <span className="sm:hidden">Back</span>
      </Link>

      <div className="flex items-center gap-2 sm:gap-3">
        <Button
          size="sm"
          onClick={onDownload}
          disabled={isLoading}
          className="h-9 sm:h-10 rounded-xl bg-brand-500 hover:bg-brand-600 shadow-lg shadow-brand-500/20 text-xs sm:text-sm"
        >
          {isLoading ? (
            <Loader2 size={14} className="animate-spin mr-2" />
          ) : (
            <Download size={14} className="mr-1.5 sm:mr-2" />
          )}
          <span className="hidden sm:inline">Export PDF</span>
          <span className="sm:hidden">PDF</span>
        </Button>
      </div>
    </div>
  )
}

// ─── Main component ──────────────────────────────────────────
export default function NoteDetails() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const note = useSelector(selectCurrentNote)
  const isLoading = useSelector(selectNotesLoading)
  const [activeTab, setActiveTab] = useState('notes')

  useEffect(() => {
    dispatch(fetchNoteById(id))
    return () => dispatch(clearCurrentNote())
  }, [dispatch, id])

  const noteData = useMemo(() => {
    if (!note) return null

    let parsedContent = note.content
    if (typeof parsedContent === 'string') {
      try { parsedContent = JSON.parse(parsedContent) } catch (e) { /* raw text */ }
    }

    if (typeof parsedContent === 'object' && parsedContent !== null) {
      return { ...parsedContent, topic: note.topic, createdAt: note.createdAt }
    }

    return {
      notes: note.content,
      topic: note.topic,
      createdAt: note.createdAt,
      subTopics: [],
      revisionPoints: [],
      questions: [],
      importance: '⭐',
    }
  }, [note])

  const tags = useMemo(() => {
    if (!noteData?.subTopics) return []
    if (Array.isArray(noteData.subTopics)) return noteData.subTopics
    return Object.values(noteData.subTopics).flat()
  }, [noteData?.subTopics])

  const handleDownloadPdf = () => {
    if (note && noteData) {
      dispatch(downloadNotePdf({ noteData, title: note.topic }))
    }
  }

  // ─── Loading state ─────────────────────────────────────
  if (isLoading && !note) {
    return (
      <div className="flex flex-col h-[70vh] items-center justify-center space-y-4">
        <div className="relative">
          <div className="h-16 w-16 rounded-2xl bg-brand-500/10 flex items-center justify-center">
            <Sparkles size={28} className="text-brand-500 animate-pulse" />
          </div>
          <div className="absolute inset-0 rounded-2xl border-2 border-brand-500/20 animate-ping" />
        </div>
        <p className="text-[var(--text-secondary)] font-bold tracking-tight animate-pulse">Loading your notes...</p>
      </div>
    )
  }

  // ─── Error state ────────────────────────────────────────
  if (!note || !noteData) {
    return (
      <div className="flex flex-col h-[70vh] items-center justify-center space-y-6 text-center">
        <div className="h-20 w-20 rounded-[2rem] bg-rose-500/10 flex items-center justify-center">
          <AlertCircle size={40} className="text-rose-500" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-[var(--text-primary)] tracking-tighter">Note not found</h2>
          <p className="text-[var(--text-secondary)] mt-2 font-medium">This note doesn't exist or has been deleted.</p>
        </div>
        <Link to="/dashboard">
          <Button className="rounded-xl px-8">Back to Dashboard</Button>
        </Link>
      </div>
    )
  }

  // ─── Tabs config ─────────────────────────────────────────
  const tabs = [
    { id: 'notes', label: 'Notes', icon: FileText, show: true },
    { id: 'revision', label: 'Revision', icon: Layers, show: noteData.revisionPoints?.length > 0 },
    { id: 'questions', label: 'Questions', icon: BookOpen, show: !!noteData.questions },
  ].filter(t => t.show)

  return (
    <div className="animate-fade-in pb-20">
      {/* ── Sticky Meta Bar ── */}
      <MetaBar note={note} onDownload={handleDownloadPdf} isLoading={isLoading} />

      {/* ── Hero Header ── */}
      <header className="pt-10 pb-8 space-y-6">
        {/* Badges row */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-500/10 text-brand-500 text-[10px] font-black uppercase tracking-widest border border-brand-500/20">
            <Sparkles size={10} fill="currentColor" />
            {noteData.importance || 'Standard'}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest">
            <Clock size={12} />
            {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
          </span>
          {note.examType && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)] text-[10px] font-black uppercase tracking-widest border border-[var(--border-primary)]">
              {note.examType}
            </span>
          )}
        </div>

        {/* Topic title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[var(--text-primary)] tracking-tighter leading-[1.05] max-w-4xl">
          {note.topic}
        </h1>

        {/* Tag chips */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 12).map((topic, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-widest hover:text-brand-500 hover:border-brand-500/30 transition-all cursor-default"
              >
                #{topic}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* ── Tab Navigation ── */}
      {tabs.length > 1 && (
        <div className="flex items-center gap-1 p-1 bg-[var(--bg-tertiary)] rounded-2xl border border-[var(--border-primary)] w-fit mb-10">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id
                  ? 'bg-[var(--bg-secondary)] text-brand-500 shadow-sm border border-[var(--border-primary)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <tab.icon size={13} />
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* ── Main Content Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* ── LEFT: Main Content ── */}
        <div className="lg:col-span-8 space-y-8">

          {/* Notes Tab */}
          {activeTab === 'notes' && (
            <div className="bg-[var(--bg-secondary)] rounded-[2.5rem] border border-[var(--border-primary)] shadow-lg overflow-hidden">
              {/* Top accent bar */}
              <div className="h-1 w-full bg-gradient-to-r from-brand-500 via-indigo-500 to-purple-500" />
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[var(--border-primary)]">
                  <div className="h-10 w-10 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-500">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-[var(--text-primary)] tracking-tight uppercase">Study Notes</h2>
                    <p className="text-[10px] text-[var(--text-muted)] font-medium mt-0.5">AI-generated mastery guide</p>
                  </div>
                </div>
                <MarkdownRenderer content={noteData.notes} />
              </div>
            </div>
          )}

          {/* Revision Tab */}
          {activeTab === 'revision' && noteData.revisionPoints?.length > 0 && (
            <RevisionPoints points={noteData.revisionPoints} />
          )}

          {/* Questions Tab */}
          {activeTab === 'questions' && noteData.questions && (
            <div className="bg-[var(--bg-secondary)] rounded-[2.5rem] border border-[var(--border-primary)] shadow-lg overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-purple-500" />
              <div className="p-8 lg:p-12">
                <QuestionsList questions={noteData.questions} />
              </div>
            </div>
          )}

          {/* Diagrams (always show below content if present) */}
          {activeTab === 'notes' && noteData.diagram && (
            <div className="bg-[var(--bg-secondary)] rounded-[2.5rem] border border-[var(--border-primary)] shadow-lg overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-teal-500 to-cyan-500" />
              <div className="p-8">
                <h3 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Layers size={16} className="text-teal-500" />
                  Conceptual Flow
                </h3>
                <MermaidRenderer chart={typeof noteData.diagram === 'string' ? noteData.diagram : noteData.diagram.data} />
              </div>
            </div>
          )}

          {/* Charts */}
          {activeTab === 'notes' && noteData.charts?.length > 0 && (
            <div className="bg-[var(--bg-secondary)] rounded-[2.5rem] border border-[var(--border-primary)] shadow-lg overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-rose-500 to-orange-500" />
              <div className="p-8">
                <h3 className="text-sm font-black text-[var(--text-primary)] uppercase tracking-widest mb-6">Data Visualizations</h3>
                {noteData.charts.map((chart, index) => (
                  <DataChart key={index} dataString={typeof chart === 'string' ? chart : JSON.stringify(chart)} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── RIGHT: Sidebar ── */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
          {/* Sub-topics panel */}
          <SubTopicsPanel subTopics={noteData.subTopics} />

          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Revision Points', value: noteData.revisionPoints?.length || 0, color: 'text-brand-500', bg: 'bg-brand-500/10' },
              { label: 'Questions', value: (noteData.questions?.short?.length || 0) + (noteData.questions?.long?.length || 0), color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
            ].map(stat => (
              <div key={stat.label} className="bg-[var(--bg-secondary)] rounded-2xl p-4 border border-[var(--border-primary)] text-center">
                <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* AI Insight card */}
          <div className="relative bg-gradient-to-br from-brand-600/10 via-indigo-600/10 to-purple-600/10 rounded-[2rem] p-6 border border-brand-500/20 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={14} className="text-brand-500" fill="currentColor" />
                <h3 className="text-xs font-black text-[var(--text-primary)] uppercase tracking-widest">AI Insight</h3>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                This guide was generated using advanced AI to maximize retention and exam performance for{' '}
                <span className="text-brand-500 font-bold">{note.examType || 'your exam'}</span>.
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* ── Footer ── */}
      <footer className="mt-20 pt-8 border-t border-[var(--border-primary)] text-center">
        <div className="inline-flex items-center gap-2 text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em]">
          <Sparkles size={10} className="text-brand-500" />
          NoteGenius AI
          <div className="h-1 w-1 rounded-full bg-[var(--border-secondary)]" />
          End of Document
        </div>
      </footer>
    </div>
  )
}
