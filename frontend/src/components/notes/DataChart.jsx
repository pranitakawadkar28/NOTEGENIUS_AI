import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b', '#10b981']

export default function DataChart({ dataString }) {
  const noteData = React.useMemo(() => {
    if (!dataString) return null
    if (typeof dataString === 'object') return dataString
    try {
      return JSON.parse(dataString)
    } catch (e) {
      console.error('Failed to parse chart data:', e)
      return null
    }
  }, [dataString])

  if (!noteData) {
    return (
      <div className="my-8 p-8 rounded-2xl border border-dashed border-[var(--border-primary)] text-center">
        <p className="text-sm text-[var(--text-muted)]">Unable to render chart visualization</p>
      </div>
    )
  }

  const { type, data, title, xAxis, yAxis } = noteData

  if (!data || !Array.isArray(data)) {
    return (
      <div className="my-8 p-8 rounded-2xl border border-dashed border-[var(--border-primary)] text-center">
        <p className="text-sm text-[var(--text-muted)]">No data available for chart: {title || 'Untitled'}</p>
      </div>
    )
  }

  const renderChart = () => {
    try {
      switch (type) {
        case 'bar':
          return (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-primary)" />
              <XAxis dataKey={xAxis || 'name'} stroke="var(--text-secondary)" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-secondary)" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: 'var(--bg-tertiary)', opacity: 0.4 }}
                contentStyle={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  borderColor: 'var(--border-primary)',
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  fontSize: '12px'
                }} 
              />
              <Bar dataKey={yAxis || 'value'} fill="var(--brand-500)" radius={[4, 4, 0, 0]} />
            </BarChart>
          )
        case 'line':
          return (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-primary)" />
              <XAxis dataKey={xAxis || 'name'} stroke="var(--text-secondary)" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-secondary)" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  borderColor: 'var(--border-primary)',
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  fontSize: '12px'
                }} 
              />
              <Line type="monotone" dataKey={yAxis || 'value'} stroke="var(--brand-500)" strokeWidth={3} dot={{ fill: 'var(--brand-500)', r: 4 }} activeDot={{ r: 6, strokeWidth: 0 }} />
            </LineChart>
          )
        case 'pie':
          return (
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--bg-secondary)', 
                  borderColor: 'var(--border-primary)',
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  fontSize: '12px'
                }} 
              />
            </PieChart>
          )
        default:
          return <div className="flex items-center justify-center h-full text-xs text-rose-500">Unsupported type: {type}</div>
      }
    } catch (e) {
      return <div className="flex items-center justify-center h-full text-xs text-rose-500">Rendering Error</div>
    }
  }

  return (
    <div className="my-8 bg-[var(--bg-tertiary)]/30 p-6 rounded-3xl border border-[var(--border-primary)]">
      {title && <h4 className="text-center text-xs font-black uppercase tracking-[0.2em] mb-8 text-[var(--text-secondary)]">{title}</h4>}
      <div className="h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  )
}
