import { useState, useEffect } from 'react'
import { Sparkles, Brain, FileSearch, PenTool, Layout, Loader2 } from 'lucide-react'

const steps = [
  { icon: FileSearch, text: "Analyzing your topic..." },
  { icon: Brain, text: "Brainstorming key concepts..." },
  { icon: PenTool, text: "Drafting detailed notes..." },
  { icon: Layout, text: "Organizing with diagrams..." },
  { icon: Sparkles, text: "Adding final AI magic..." }
]

export default function GenerationLoader() {
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-12 animate-fade-in">
      {/* Premium AI Orb */}
      <div className="relative h-48 w-48 md:h-64 md:w-64">
        {/* Deep Glows */}
        <div className="absolute inset-0 rounded-full bg-brand-500/20 blur-[80px] animate-ai-pulse" />
        <div className="absolute inset-0 rounded-full bg-indigo-600/10 blur-[100px] animate-float [animation-duration:6s]" />
        
        {/* Core Orb */}
        <div className="absolute inset-4 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-indigo-600/5" />
          <div className="relative z-10 flex flex-col items-center">
             <Sparkles className="h-16 w-16 md:h-24 md:w-24 text-brand-500 animate-ai-pulse" />
             <Loader2 className="absolute h-24 w-24 md:h-32 md:w-32 text-brand-500/20 animate-spin [animation-duration:3s]" />
          </div>
        </div>
        
        {/* Orbiting Elements */}
        <div className="absolute -inset-4 border border-zinc-800 rounded-full animate-spin [animation-duration:12s]" />
        <div className="absolute -inset-10 border border-dashed border-zinc-800/50 rounded-full animate-spin [animation-duration:20s] [animation-direction:reverse]" />
        
        {/* Floating Particles */}
        <div className="absolute top-0 left-1/4 h-2 w-2 bg-brand-400 rounded-full animate-ping" />
        <div className="absolute bottom-1/4 right-0 h-1.5 w-1.5 bg-indigo-400 rounded-full animate-ping [animation-delay:1s]" />
      </div>

      <div className="space-y-8 max-w-md mx-auto">
        <div className="space-y-3">
          <h2 className="text-3xl font-black text-white tracking-tighter">Generating Brilliance</h2>
          <p className="text-zinc-500 font-medium text-sm px-8 leading-relaxed">
            Our AI models are processing your topic to create a highly structured, expert-level study guide.
          </p>
        </div>

        {/* Dynamic Progress Indicator */}
        <div className="bg-zinc-900/50 backdrop-blur-md rounded-2xl p-5 border border-zinc-800 shadow-xl flex items-center gap-5 transition-all duration-500">
          <div className="bg-brand-500/10 h-12 w-12 flex items-center justify-center rounded-xl text-brand-500 shrink-0">
            {(() => {
              const Icon = steps[currentStep].icon
              return <Icon size={24} className="animate-pulse" />
            })()}
          </div>
          <div className="text-left flex-1">
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-0.5">Current Phase</p>
             <p className="text-sm font-bold text-white transition-all duration-500">
               {steps[currentStep].text}
             </p>
          </div>
        </div>

        {/* Minimalist Progress Bar */}
        <div className="px-6 w-full">
          <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden relative">
            <div 
              className="h-full bg-brand-500 transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(99,102,241,0.5)]" 
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
          <p className="mt-3 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
            Processing Step {currentStep + 1} of {steps.length}
          </p>
        </div>
      </div>
    </div>
  )
}
