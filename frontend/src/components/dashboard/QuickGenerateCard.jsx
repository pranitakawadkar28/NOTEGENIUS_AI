import { Sparkles, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function QuickGenerateCard() {
  const navigate = useNavigate()

  return (
    <div className="bg-brand-500 rounded-[2rem] p-6 text-white shadow-xl shadow-brand-500/20 group relative overflow-hidden cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]" onClick={() => navigate('/generate-notes')}>
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700" />
      
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex items-center justify-between">
          <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
            <Sparkles size={20} className="text-white" />
          </div>
          <ArrowRight size={20} className="text-white/50 group-hover:text-white transition-colors" />
        </div>
        
        <div className="mt-6 space-y-1">
          <h4 className="text-lg font-black leading-tight">Quick Note</h4>
          <p className="text-xs text-brand-100 font-medium leading-relaxed">Transform ideas into structured guides instantly.</p>
        </div>
      </div>
    </div>
  )
}
