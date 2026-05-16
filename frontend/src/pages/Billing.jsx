import { CreditCard, ShieldCheck, Zap } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import CurrentCreditsCard from '@/components/billing/CurrentCreditsCard'
import PricingCard from '@/components/billing/PricingCard'
import PaymentHistoryTable from '@/components/billing/PaymentHistoryTable'
import BillingSkeleton from '@/components/billing/BillingSkeleton'
import { loadRazorpayScript } from '@/utils/loadRazorpay'
import paymentService from '@/services/paymentService'
import { selectCurrentUser, updateCredits } from '@/features/auth/authSlice'
import { useState } from 'react'
import { PaymentSuccessModal, PaymentFailedModal, PaymentProcessingOverlay } from '@/components/billing/PaymentModals'

const TIERS = [
  {
    id: 'starter',
    name: 'Starter Pack',
    credits: 50,
    price: 99,
    features: ['Standard AI generation', 'PDF downloads', '7-day history'],
    isPopular: false
  },
  {
    id: 'pro',
    name: 'Genius Pro',
    credits: 500,
    price: 499,
    features: ['High-priority generation', 'Diagrams & Charts included', 'Unlimited history', 'Early access to features'],
    isPopular: true
  },
  {
    id: 'ultimate',
    name: 'Ultimate Scholar',
    credits: 1500,
    price: 999,
    features: ['Everything in Pro', 'Custom study roadmaps', 'Dedicated support', 'No credit expiration'],
    isPopular: false
  }
]

export default function Billing() {
  const dispatch = useDispatch()
  const user = useSelector(selectCurrentUser)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showFailed, setShowFailed] = useState(false)
  const [purchaseDetails, setPurchaseDetails] = useState({ added: 0, balance: 0 })

  const handlePurchase = async (tier) => {
    try {
      setIsProcessing(true)
      // 1. Load Razorpay Script
      const isLoaded = await loadRazorpayScript()
      if (!isLoaded) {
        toast.error('Razorpay SDK failed to load. Are you offline?')
        return
      }

      // 2. Create Order on Backend
      const response = await paymentService.createOrder(tier.id)
      const { id: order_id, amount, currency } = response.data.data

      // 3. Configure Razorpay Options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Ensure this is in .env
        amount: amount,
        currency: currency,
        name: 'NoteGenius AI',
        description: `Purchase of ${tier.credits} AI Credits`,
        image: '/logo.png', // Replace with actual logo path
        order_id: order_id,
        handler: async (response) => {
          // 4. Handle Success -> Verify on Backend
          try {
            setIsProcessing(true)
            const verifyRes = await paymentService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })

            setIsProcessing(false)
            if (verifyRes.data.success) {
              const newBalance = verifyRes.data.data.user.credits
              setPurchaseDetails({ added: tier.credits, balance: newBalance })
              setShowSuccess(true)
              dispatch(updateCredits(newBalance))
            } else {
              setShowFailed(true)
            }
          } catch (error) {
            setIsProcessing(false)
            setShowFailed(true)
            toast.error('Payment verification failed. Contact support.')
          }
        },
        prefill: {
          name: user?.username,
          email: user?.email,
        },
        theme: {
          color: '#6366f1', // Brand-500
        },
      }

      // 5. Open Checkout
      const paymentObject = new window.Razorpay(options)
      paymentObject.on('payment.failed', function (response) {
        setIsProcessing(false)
        setShowFailed(true)
        toast.error(response.error.description || 'Payment Failed')
      })
      
      setIsProcessing(false) // Ready to open UI
      paymentObject.open()

    } catch (error) {
      setIsProcessing(false)
      const message = error.response?.data?.message || 'Failed to initialize payment'
      toast.error(message)
    }
  }

  if (isProcessing && !showSuccess && !showFailed) return <PaymentProcessingOverlay isOpen={true} />

  return (
    <div className="space-y-12 animate-fade-in pb-20 px-4 sm:px-6 lg:px-8 mt-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--text-primary)] flex items-center gap-3">
          <CreditCard className="text-brand-500" />
          Billing & Plans
        </h1>
        <p className="mt-2 text-[var(--text-secondary)]">Manage your AI credits and subscription tiers.</p>
      </div>

      {/* Credit Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <CurrentCreditsCard />
        </div>
        <div className="lg:col-span-4">
          <div className="glass h-full rounded-3xl p-8 border border-[var(--border-primary)] flex flex-col justify-center text-center space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-green-500 mx-auto">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-[var(--text-primary)]">Secure Payments</h4>
              <p className="text-xs text-[var(--text-secondary)] mt-1">Transactions are encrypted and handled securely via Razorpay.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Tiers */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Choose Your Powerup</h2>
          <p className="text-sm text-[var(--text-secondary)]">Select the credit pack that best fits your study needs.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {TIERS.map((tier) => (
            <PricingCard 
              key={tier.name} 
              tier={tier} 
              onPurchase={handlePurchase} 
            />
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-[var(--text-primary)]">
          <Zap size={20} className="text-brand-500" />
          <h2 className="text-xl font-bold">Billing Activity</h2>
        </div>
        <PaymentHistoryTable />
      </div>
      {/* Modals */}
      <PaymentSuccessModal 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
        creditsAdded={purchaseDetails.added}
        newBalance={purchaseDetails.balance}
      />
      <PaymentFailedModal 
        isOpen={showFailed} 
        onClose={() => setShowFailed(false)}
        onRetry={() => setShowFailed(false)}
      />
      <PaymentProcessingOverlay isOpen={isProcessing} />
    </div>
  )
}
