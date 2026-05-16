import ReactMarkdown from 'react-markdown'
import { cn } from '@/lib/utils'
import MermaidRenderer from './MermaidRenderer'
import DataChart from './DataChart'

export default function MarkdownRenderer({ content, className }) {
  const markdownContent = typeof content === 'string' ? content : (content?.notes || "")

  return (
    <div className={cn("prose prose-slate dark:prose-invert max-w-none", className)}>
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4 tracking-tight" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-3 tracking-tight border-b border-[var(--border-primary)] pb-2" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-6 mb-2 tracking-tight" {...props} />,
          p: ({ node, ...props }) => <p className="leading-relaxed text-[var(--text-secondary)] mb-4" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc pl-6 space-y-2 mb-4" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-6 space-y-2 mb-4" {...props} />,
          li: ({ node, ...props }) => <li className="text-[var(--text-secondary)]" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-brand-500 bg-brand-500/5 px-4 py-2 italic my-6" {...props} />
          ),
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '')
            const language = match ? match[1] : null

            if (!inline && language === 'mermaid') {
              return <MermaidRenderer chart={String(children).replace(/\n$/, '')} />
            }

            if (!inline && language === 'chart') {
              return <DataChart dataString={String(children).replace(/\n$/, '')} />
            }

            return (
              <code 
                className={cn(
                  "rounded bg-[var(--bg-secondary)] px-1.5 py-0.5 font-mono text-sm text-brand-500",
                  !inline && "block p-4 overflow-x-auto my-4",
                  className
                )} 
                {...props}
              >
                {children}
              </code>
            )
          },
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  )
}
