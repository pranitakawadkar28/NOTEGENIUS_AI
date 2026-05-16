import { Check, Zap, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/AuthPrimitives'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function PricingCard({ tier, onPurchase }) {
  const { name, credits, price, features, isPopular } = tier
  const [isProcessing, setIsProcessing] = useState(false)

  const handleBuy = async () => {
    setIsProcessing(true)
    await onPurchase(tier)
    setIsProcessing(false)
  }

  return (
    <div className={cn(
      "relative flex flex-col rounded-3xl p-8 transition-all duration-300 group",
      isPopular 
        ? "bg-brand-500 text-white shadow-2xl shadow-brand-500/20 scale-105 z-10" 
        : "glass border border-[var(--border-primary)] hover:border-brand-500/50"
    )}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-indigo-600 text-[10px] font-black uppercase tracking-widest shadow-lg">
          Most Popular
        </div>
      )}

      <div className="mb-8">
        <h3 className={cn("text-lg font-bold", isPopular ? "text-white" : "text-[var(--text-primary)]")}>
          {name}
        </h3>
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-4xl font-black">₹{price}</span>
          <span className={cn("text-sm", isPopular ? "text-brand-100" : "text-[var(--text-secondary)]")}>
            / one-time
          </span>
        </div>
        <p className={cn("mt-4 text-sm font-medium flex items-center gap-2", isPopular ? "text-brand-100" : "text-brand-500")}>
          <Zap size={14} fill="currentColor" />
          {credits} AI Credits
        </p>
      </div>

      <ul className="flex-1 space-y-4 mb-8">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <div className={cn(
              "mt-0.5 rounded-full p-0.5",
              isPopular ? "bg-white/20 text-white" : "bg-brand-500/10 text-brand-500"
            )}>
              <Check size={12} strokeWidth={3} />
            </div>
            <span className={isPopular ? "text-brand-50" : "text-[var(--text-secondary)]"}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Button 
        onClick={handleBuy}
        disabled={isProcessing}
        className={cn(
          "w-full font-bold h-11",
          isPopular 
            ? "bg-white text-brand-600 hover:bg-brand-50 shadow-none" 
            : "bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-brand-500 hover:text-white border border-[var(--border-primary)]"
        )}
      >
        {isProcessing ? (
          <Loader2 className="animate-spin h-5 w-5" />
        ) : (
          `Buy ${credits} Credits`
        )}
      </Button>
    </div>
  )
}
