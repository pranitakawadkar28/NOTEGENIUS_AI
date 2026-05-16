import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import WelcomeBanner from '@/components/dashboard/WelcomeBanner'
import CreditsCard from '@/components/dashboard/CreditsCard'
import StatsCard from '@/components/dashboard/StatsCard'
import QuickGenerateCard from '@/components/dashboard/QuickGenerateCard'
import RecentNotesList from '@/components/dashboard/RecentNotesList'
import { FileText, Clock, Users } from 'lucide-react'
import { fetchNotes, selectAllNotes, selectNotesPagination } from '@/features/notes/notesSlice'

export default function Dashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const notes = useSelector(selectAllNotes)
  const pagination = useSelector(selectNotesPagination)

  useEffect(() => {
    dispatch(fetchNotes({ limit: 5 }))
  }, [dispatch])

  return (
    <div className="space-y-8 animate-fade-in pb-10 px-4 sm:px-6">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-8">
          <WelcomeBanner />
        </div>
        <div className="lg:col-span-4">
          <CreditsCard />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          label="Total Notes" 
          value={pagination?.total?.toString() || "0"} 
          icon={FileText} 
          trend={0} 
          colorClass="bg-blue-500/10 text-blue-500" 
        />
        <StatsCard 
          label="Time Saved" 
          value={`${((pagination?.total || 0) * 0.4).toFixed(1)}h`} 
          icon={Clock} 
          trend={0} 
          colorClass="bg-purple-500/10 text-purple-500" 
        />
        <StatsCard 
          label="Study Groups" 
          value="1" 
          icon={Users} 
          colorClass="bg-orange-500/10 text-orange-500" 
        />
        <QuickGenerateCard />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <RecentNotesList notes={notes.slice(0, 5)} />
        </div>
        <div className="lg:col-span-4">
           {/* Simple CTA */}
           <div className="bg-[var(--bg-secondary)] rounded-[2.5rem] p-10 border border-[var(--border-primary)] shadow-sm h-full flex flex-col items-center justify-center text-center space-y-6">
             <div className="h-20 w-20 rounded-2xl bg-brand-500/10 flex items-center justify-center">
               <FileText className="text-brand-500 h-10 w-10" />
             </div>
             <div className="space-y-2">
               <h4 className="text-xl font-bold text-[var(--text-primary)]">Start your next topic</h4>
               <p className="text-sm text-[var(--text-secondary)]">NoteGenius uses AI to create structured study guides in seconds.</p>
             </div>
             <button 
               onClick={() => navigate('/generate-notes')}
               className="px-6 py-2 rounded-full bg-brand-500 text-white text-sm font-bold hover:bg-brand-600 transition-colors"
             >
               Get Started
             </button>
           </div>
        </div>
      </div>
    </div>
  )
}
