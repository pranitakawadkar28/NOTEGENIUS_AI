import React from 'react'
import { Sparkles, BrainCircuit } from 'lucide-react'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--bg-primary)] overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] animate-ai-pulse" />
      
      <div className="relative flex flex-col items-center">
        {/* Animated Logo Container */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-brand-500/20 blur-2xl rounded-full animate-ping opacity-20" />
          <div className="relative h-20 w-20 bg-brand-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-brand-500/20 group">
            <BrainCircuit className="text-white animate-ai-pulse" size={40} />
            <div className="absolute -top-2 -right-2 h-8 w-8 bg-[var(--bg-secondary)] rounded-full border border-[var(--border-primary)] flex items-center justify-center shadow-lg">
                <Sparkles size={16} className="text-brand-500 animate-spin-slow" />
            </div>
          </div>
        </div>

        {/* Text Animation */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-black tracking-tighter text-[var(--text-primary)] animate-fade-in">
            NoteGenius <span className="text-brand-500">AI</span>
          </h2>
          
          <div className="flex flex-col items-center gap-3">
             <div className="flex gap-1.5">
                <div className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-bounce [animation-delay:-0.3s]" />
                <div className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-bounce [animation-delay:-0.15s]" />
                <div className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-bounce" />
             </div>
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-secondary)] opacity-60">
                Initializing Workspace
             </p>
          </div>
        </div>
      </div>

      {/* Quote/Tip (Optional but premium) */}
      <div className="absolute bottom-12 text-center px-6">
        <p className="text-xs font-medium text-[var(--text-muted)] italic max-w-xs leading-relaxed">
          "The best way to predict the future is to create it."
        </p>
      </div>
    </div>
  )
}
