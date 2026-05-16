import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  BarChart, 
  Bar 
} from 'recharts'
import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/lib/utils'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass rounded-xl p-3 border border-[var(--border-primary)] shadow-xl">
        <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1">{label}</p>
        <p className="text-sm font-black text-brand-500">
          {payload[0].value} <span className="text-[10px] text-[var(--text-secondary)]">units</span>
        </p>
      </div>
    )
  }
  return null
}

export default function NoteChart({ data = [], type = 'area', height = 300, className }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  if (!data.length) {
    return (
      <div className="flex h-40 w-full items-center justify-center rounded-2xl border border-dashed border-[var(--border-primary)] text-[var(--text-secondary)] text-sm">
        No data available for chart.
      </div>
    )
  }

  const axisStyle = {
    fontSize: '10px',
    fontWeight: '600',
    fill: isDark ? '#94a3b8' : '#64748b',
  }

  return (
    <div className={cn("w-full my-8 p-6 rounded-3xl glass border border-[var(--border-primary)]", className)}>
      <ResponsiveContainer width="100%" height={height}>
        {type === 'bar' ? (
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={axisStyle} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={axisStyle} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--bg-secondary)', opacity: 0.4 }} />
            <Bar 
              dataKey="value" 
              fill="var(--brand-500)" 
              radius={[4, 4, 0, 0]} 
              barSize={32}
            />
          </BarChart>
        ) : (
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--brand-500)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--brand-500)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#1e293b' : '#e2e8f0'} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={axisStyle} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={axisStyle} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--brand-500)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorValue)"
              animationDuration={1500}
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}
