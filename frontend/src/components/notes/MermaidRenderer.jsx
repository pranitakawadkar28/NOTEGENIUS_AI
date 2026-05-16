import { useEffect, useRef, useState } from 'react'
import { useMermaid } from '@/hooks/useMermaid'
import { AlertCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function MermaidRenderer({ chart, className }) {
  const mermaid = useMermaid()
  const containerRef = useRef(null)
  const [svg, setSvg] = useState('')
  const [error, setError] = useState(null)
  const [isRendering, setIsRendering] = useState(true)

  // Unique ID for each diagram to prevent SVG collision
  const diagramId = useRef(`mermaid-${Math.random().toString(36).substr(2, 9)}`)

  // Preprocess chart to fix common syntax errors (like unquoted parentheses in labels)
  const cleanChart = (code) => {
    if (!code) return code
    return code.replace(/([a-zA-Z0-9_-]+)\[(.*?)\]/g, (match, id, label) => {
      // If label has parentheses and isn't already quoted, quote it
      if ((label.includes('(') || label.includes(')')) && !label.startsWith('"')) {
        return `${id}["${label}"]`
      }
      return match
    })
  }

  useEffect(() => {
    const renderChart = async () => {
      if (!chart || !containerRef.current) return
      
      const sanitizedChart = cleanChart(chart)
      setIsRendering(true)
      setError(null)
      
      try {
        // Handle invalid syntax safely
        const isValid = await mermaid.parse(sanitizedChart)
        if (isValid) {
          const { svg: renderedSvg } = await mermaid.render(diagramId.current, sanitizedChart)
          setSvg(renderedSvg)
        }
      } catch (err) {
        console.error('Mermaid Render Error:', err)
        setError('Invalid diagram syntax or rendering error.')
      } finally {
        setIsRendering(false)
      }
    }

    renderChart()
  }, [chart, mermaid])

  return (
    <div className={cn("w-full overflow-hidden my-6 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)]/30 p-6", className)}>
      {isRendering && (
        <div className="flex h-32 w-full items-center justify-center">
          <Loader2 className="animate-spin text-brand-500" size={24} />
        </div>
      )}

      {error ? (
        <div className="flex flex-col items-center justify-center py-8 text-center text-red-500 gap-2">
          <AlertCircle size={24} />
          <p className="text-sm font-medium">{error}</p>
        </div>
      ) : (
        <div 
          ref={containerRef}
          className="flex justify-center transition-opacity duration-300 overflow-x-auto"
          style={{ opacity: isRendering ? 0 : 1 }}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}
    </div>
  )
}
