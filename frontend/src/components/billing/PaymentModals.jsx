import { CheckCircle2, XCircle, Loader2, Sparkles, ArrowRight, ShieldAlert } from 'lucide-react'
import { Button } from '@/components/ui/AuthPrimitives'
import { cn } from '@/lib/utils'

export function PaymentSuccessModal({ isOpen, onClose, creditsAdded, newBalance }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[var(--bg-primary)]/40 backdrop-blur-md animate-fade-in">
      <div className="glass max-w-md w-full rounded-3xl p-8 border border-green-500/20 text-center shadow-2xl relative overflow-hidden">
        {/* Celebration Background */}
        <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-green-500/10 blur-3xl animate-pulse" />
        <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-brand-500/10 blur-3xl animate-pulse" />

        <div className="relative z-10">
          <div className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
            <CheckCircle2 size={40} className="text-green-500 animate-bounce" />
          </div>

          <h2 className="text-2xl font-black text-[var(--text-primary)]">Payment Successful!</h2>
          <p className="mt-2 text-[var(--text-secondary)]">Your AI credits have been topped up instantly.</p>

          <div className="my-8 py-6 rounded-2xl bg-green-500/5 border border-green-500/10 flex flex-col items-center">
            <div className="flex items-center gap-2 text-green-500 font-bold uppercase tracking-widest text-xs mb-1">
              <Sparkles size={12} />
              Recharged
            </div>
            <p className="text-4xl font-black text-[var(--text-primary)]">+{creditsAdded}</p>
            <p className="mt-2 text-xs text-[var(--text-secondary)]">New Balance: <span className="font-bold text-brand-500">{newBalance} Credits</span></p>
          </div>

          <div className="space-y-3">
            <Button onClick={onClose} className="w-full h-12 text-lg">
              Start Generating
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <button onClick={onClose} className="text-sm font-semibold text-[var(--text-secondary)] hover:text-brand-500 transition-colors">
              Back to Billing
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function PaymentFailedModal({ isOpen, onClose, onRetry }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[var(--bg-primary)]/40 backdrop-blur-md animate-fade-in">
      <div className="glass max-w-md w-full rounded-3xl p-8 border border-red-500/20 text-center shadow-2xl">
        <div className="h-20 w-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/20">
          <XCircle size={40} className="text-red-500 animate-pulse" />
        </div>

        <h2 className="text-2xl font-black text-[var(--text-primary)]">Payment Failed</h2>
        <p className="mt-2 text-[var(--text-secondary)]">We couldn't process your transaction at this time.</p>

        <div className="my-8 p-4 rounded-xl bg-red-500/5 border border-red-500/10 flex items-start gap-3 text-left">
          <ShieldAlert size={18} className="text-red-500 shrink-0 mt-0.5" />
          <p className="text-xs text-red-500/80 leading-relaxed">
            This could be due to insufficient funds, an expired card, or temporary network issues. No money was deducted from your account.
          </p>
        </div>

        <div className="space-y-3">
          <Button onClick={onRetry} className="w-full h-12 bg-red-500 hover:bg-red-600 text-white border-none">
            Try Different Method
          </Button>
          <button onClick={onClose} className="text-sm font-semibold text-[var(--text-secondary)] hover:text-brand-500 transition-colors">
            Cancel for Now
          </button>
        </div>
      </div>
    </div>
  )
}

export function PaymentProcessingOverlay({ isOpen }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-[var(--bg-primary)]/60 backdrop-blur-xl animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 bg-brand-500/20 blur-3xl animate-pulse rounded-full" />
        <div className="relative flex flex-col items-center">
          <Loader2 size={48} className="text-brand-500 animate-spin mb-6" />
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Verifying Payment</h2>
          <p className="mt-2 text-sm text-[var(--text-secondary)] animate-pulse">Finalizing your AI credits...</p>
        </div>
      </div>
    </div>
  )
}
