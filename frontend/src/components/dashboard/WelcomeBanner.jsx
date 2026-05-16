import { Sparkles, ArrowRight, BookOpen } from 'lucide-react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '@/features/auth/authSlice'
import { Button } from '@/components/ui/AuthPrimitives'
import { useNavigate } from 'react-router-dom'

export default function WelcomeBanner() {
  const user = useSelector(selectCurrentUser)
  const navigate = useNavigate()
  
  const userName = user?.username?.split(' ')[0] || 'Genius'

  return (
    <div className="relative overflow-hidden rounded-[3rem] bg-[var(--bg-secondary)] border border-[var(--border-primary)] p-10 text-[var(--text-primary)] shadow-2xl shadow-brand-500/5 h-full flex flex-col lg:flex-row items-center transition-all duration-500 group">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-brand-500/[0.03] rounded-full blur-[100px] pointer-events-none group-hover:bg-brand-500/[0.05] transition-colors duration-1000" />
      
      <div className="relative z-10 flex-1 space-y-8">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-xl bg-brand-500/10 border border-brand-500/10 text-brand-500 text-[10px] font-black uppercase tracking-widest">
          <Sparkles size={14} className="animate-ai-pulse" />
          AI Workstation Active
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-black tracking-tighter md:text-6xl text-[var(--text-primary)] leading-none">
            Welcome back, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-indigo-600">{userName}</span>
          </h1>
          
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-md font-medium opacity-80">
            Your personal AI study companion is ready to transform complex topics into structured knowledge.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4 pt-4">
          <Button 
            onClick={() => navigate('/generate-notes')}
            className="bg-brand-500 hover:bg-brand-600 text-white rounded-2xl px-10 py-7 text-xs font-black uppercase tracking-widest shadow-2xl shadow-brand-500/30 transition-all hover:scale-[1.03] active:scale-[0.98] border-none"
          >
            Create New Note
            <ArrowRight className="ml-3 h-5 w-5" />
          </Button>
          <button 
            onClick={() => navigate('/notes-history')}
            className="flex items-center gap-3 px-10 py-4 text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] hover:text-brand-500 transition-all group/btn"
          >
            <BookOpen size={18} className="group-hover/btn:scale-110 transition-transform" />
            Workspace History
          </button>
        </div>
      </div>
      
      {/* Elite Graphical Element */}
      <div className="hidden lg:block relative ml-12">
        <div className="relative h-64 w-64">
           <div className="absolute inset-0 bg-brand-500/20 blur-[80px] rounded-full animate-pulse" />
           <div className="relative h-full w-full rounded-[2.5rem] bg-[var(--bg-tertiary)] border border-[var(--border-primary)] shadow-2xl p-8 transform hover:rotate-2 transition-transform duration-700 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <Sparkles size={20} className="text-brand-500/30" />
              </div>
              <div className="space-y-4">
                <div className="h-2 w-full bg-brand-500/20 rounded-full" />
                <div className="h-2 w-3/4 bg-brand-500/10 rounded-full" />
                <div className="h-2 w-5/6 bg-brand-500/10 rounded-full" />
              </div>
              <div className="pt-8">
                 <div className="h-12 w-full rounded-xl bg-brand-500 flex items-center justify-center text-white font-black text-[10px] uppercase tracking-widest">
                    Processing AI
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
