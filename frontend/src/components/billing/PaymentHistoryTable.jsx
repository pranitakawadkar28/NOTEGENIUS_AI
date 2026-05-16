import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import paymentService from '@/services/paymentService'
import { Loader2, AlertCircle } from 'lucide-react'

export default function PaymentHistoryTable() {
  const [history, setHistory] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true)
        const response = await paymentService.getHistory()
        setHistory(response.data.data || [])
      } catch (err) {
        console.error('Failed to fetch payment history:', err)
        setError('Could not load transaction history.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistory()
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center bg-[var(--bg-secondary)]/30 rounded-2xl border border-[var(--border-primary)]">
        <Loader2 className="h-6 w-6 animate-spin text-brand-500" />
      </div>
    )
  }

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 bg-[var(--bg-secondary)]/30 rounded-2xl border border-[var(--border-primary)] border-dashed text-center p-6">
        <AlertCircle className="h-8 w-8 text-[var(--text-muted)] mb-3" />
        <p className="text-sm text-[var(--text-secondary)] font-medium">No transactions found yet.</p>
        <p className="text-xs text-[var(--text-muted)] mt-1">Your credit purchases will appear here.</p>
      </div>
    )
  }

  return (
    <div className="glass rounded-2xl border border-[var(--border-primary)] overflow-hidden">
      <div className="p-6 border-b border-[var(--border-primary)]">
        <h3 className="font-bold text-[var(--text-primary)] uppercase text-xs tracking-widest">Transaction History</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-[var(--bg-secondary)]/50 text-[var(--text-secondary)] font-bold uppercase tracking-wider text-[10px]">
              <th className="px-6 py-4">Transaction ID</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Credits</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-primary)] text-[var(--text-primary)]">
            {history.map((txn) => (
              <tr key={txn._id} className="hover:bg-[var(--bg-secondary)]/30 transition-colors">
                <td className="px-6 py-4 font-mono text-[10px] text-[var(--text-secondary)] max-w-[120px] truncate" title={txn.razorpayOrderId}>
                  {txn.razorpayOrderId}
                </td>
                <td className="px-6 py-4 text-xs font-medium">
                  {new Date(txn.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </td>
                <td className="px-6 py-4 font-black">+{txn.credits}</td>
                <td className="px-6 py-4 font-black text-brand-500">₹{txn.amount}</td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
                    txn.status === 'paid' 
                      ? "bg-green-500/10 text-green-500 border-green-500/20" 
                      : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                  )}>
                    {txn.status === 'paid' ? 'Success' : txn.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
