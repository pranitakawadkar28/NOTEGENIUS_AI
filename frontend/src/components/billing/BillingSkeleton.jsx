export default function BillingSkeleton() {
  return (
    <div className="space-y-12 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="h-[200px] w-full rounded-3xl bg-[var(--bg-secondary)] animate-pulse relative overflow-hidden">
             <div className="absolute inset-0 animate-shimmer" />
          </div>
        </div>
        <div className="lg:col-span-4">
           <div className="h-[200px] w-full rounded-3xl glass border border-[var(--border-primary)] p-8 flex flex-col justify-center gap-4">
             <div className="h-4 w-24 bg-[var(--bg-secondary)] rounded animate-pulse" />
             <div className="h-8 w-32 bg-[var(--bg-secondary)] rounded animate-pulse" />
             <div className="h-10 w-full bg-[var(--bg-secondary)] rounded-lg animate-pulse" />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-[400px] w-full rounded-3xl bg-[var(--bg-secondary)] animate-pulse relative overflow-hidden border border-[var(--border-primary)]">
            <div className="absolute inset-0 animate-shimmer" />
          </div>
        ))}
      </div>
    </div>
  )
}
