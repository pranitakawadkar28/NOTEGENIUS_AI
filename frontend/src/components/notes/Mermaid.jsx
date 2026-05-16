import React, { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

mermaid.initialize({
  startOnLoad: true,
  theme: 'base',
  securityLevel: 'loose',
  fontFamily: 'Inter, sans-serif',
  themeVariables: {
    primaryColor: '#6366f1',
    primaryTextColor: '#fff',
    primaryBorderColor: '#6366f1',
    lineColor: '#4b5563',
    secondaryColor: '#1f2937',
    tertiaryColor: '#111827',
    mainBkg: '#111827',
    nodeBorder: '#374151',
    clusterBkg: '#1f2937',
    titleColor: '#f3f4f6',
    edgeLabelBackground: '#111827',
    nodeRadius: '8px',
  }
})

export default function Mermaid({ chart }) {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current && chart) {
      // We use a unique ID for each chart to avoid collisions
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
      
      try {
        // Clean up previous content
        ref.current.innerHTML = '<div class="animate-pulse flex space-y-4 flex-col items-center"><div class="h-32 w-64 bg-zinc-800 rounded-xl"></div></div>'
        
        mermaid.render(id, chart).then(({ svg }) => {
          if (ref.current) {
            ref.current.innerHTML = svg
            // Ensure SVG is responsive
            const svgElement = ref.current.querySelector('svg')
            if (svgElement) {
              svgElement.style.maxWidth = '100%'
              svgElement.style.height = 'auto'
            }
          }
        })
      } catch (error) {
        console.error('Mermaid render error:', error)
        ref.current.innerHTML = '<p class="text-xs text-rose-500 font-bold">Failed to render diagram</p>'
      }
    }
  }, [chart])

  return (
    <div className="flex flex-col items-center my-12 bg-zinc-950/50 p-8 rounded-[2rem] border border-zinc-800 overflow-x-auto group hover:border-brand-500/30 transition-all">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-6 group-hover:text-brand-500 transition-colors">Visual Architecture</p>
      <div ref={ref} className="mermaid w-full flex justify-center" />
    </div>
  )
}
