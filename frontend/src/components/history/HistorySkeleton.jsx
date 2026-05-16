export default function HistorySkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="glass rounded-2xl p-5 border border-[var(--border-primary)] relative overflow-hidden h-[240px]">
          <div className="flex items-center justify-between mb-6">
            <div className="h-10 w-10 rounded-xl bg-[var(--bg-secondary)] animate-pulse" />
            <div className="h-6 w-6 rounded-lg bg-[var(--bg-secondary)] animate-pulse" />
          </div>
          <div className="space-y-3">
            <div className="h-6 w-3/4 rounded-lg bg-[var(--bg-secondary)] animate-pulse" />
            <div className="flex gap-2">
              <div className="h-6 w-20 rounded-md bg-[var(--bg-secondary)] animate-pulse" />
              <div className="h-6 w-16 rounded-md bg-[var(--bg-secondary)] animate-pulse" />
            </div>
            <div className="h-4 w-1/2 rounded-lg bg-[var(--bg-secondary)] animate-pulse" />
          </div>
          <div className="absolute bottom-5 left-5 right-5 flex gap-2">
            <div className="h-9 flex-1 rounded-lg bg-[var(--bg-secondary)] animate-pulse" />
            <div className="h-9 flex-1 rounded-lg bg-[var(--bg-secondary)] animate-pulse" />
          </div>
          <div className="absolute inset-0 animate-shimmer" />
        </div>
      ))}
    </div>
  )
}
