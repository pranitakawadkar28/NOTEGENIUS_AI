import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { ShieldCheck, ArrowLeft, Loader2, BrainCircuit } from 'lucide-react'
import { Button, Input, Label } from '@/components/ui/AuthPrimitives'
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { verifyOtp, selectAuthLoading, selectIsAuthenticated, selectCurrentUser, selectRegistrationEmail } from '@/features/auth/authSlice'

const otpSchema = z.object({
  otp: z.string().length(6, 'Verification code must be 6 digits'),
})

export default function VerifyOtp() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const user = useSelector(selectCurrentUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const isLoading = useSelector(selectAuthLoading)
  const persistedEmail = useSelector(selectRegistrationEmail)
  
  const email = location.state?.email || persistedEmail || user?.email

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(otpSchema),
  })

  // Only redirect to dashboard if FULLY verified
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/dashboard" replace />
  }

  // Only redirect to register if we have NO email to verify
  if (!email) {
    return <Navigate to="/register" replace />
  }

  const onSubmit = async (data) => {
    const resultAction = await dispatch(verifyOtp({ email, otp: data.otp }))
    if (verifyOtp.fulfilled.match(resultAction)) {
      navigate('/dashboard', { replace: true })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg-primary)] px-4 py-12">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-12 w-12 bg-brand-500 rounded-[1.25rem] flex items-center justify-center shadow-lg shadow-brand-500/20">
              <BrainCircuit className="text-white" size={28} />
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-[var(--text-primary)]">
              NoteGenius <span className="text-brand-500 underline decoration-2 underline-offset-4">AI</span>
            </h1>
          </div>
          
          <h2 className="text-3xl font-black tracking-tight text-[var(--text-primary)]">Verify Security</h2>
          <p className="text-sm text-[var(--text-secondary)] font-medium">
            We&apos;ve sent a 6-digit code to <br />
            <span className="text-brand-500 font-bold">{email}</span>
          </p>
        </div>

        <div className="glass rounded-[2.5rem] p-8 lg:p-10 shadow-2xl border border-[var(--border-primary)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 to-indigo-600" />
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <Label htmlFor="otp" className="text-center block text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Verification Code</Label>
              <div className="relative">
                 <Input
                  id="otp"
                  maxLength={6}
                  placeholder="• • • • • •"
                  className="text-center text-3xl tracking-[0.4em] h-16 font-black bg-[var(--bg-tertiary)] border-[var(--border-primary)] focus:border-brand-500 focus:ring-brand-500/20 rounded-2xl text-[var(--text-primary)]"
                  disabled={isLoading}
                  {...register('otp')}
                />
              </div>
              {errors.otp && <p className="text-center text-xs text-rose-500 font-bold tracking-tight">{errors.otp.message}</p>}
            </div>

            <Button type="submit" className="w-full h-14 text-sm font-black uppercase tracking-widest bg-brand-500 hover:bg-brand-600 text-white rounded-2xl shadow-lg shadow-brand-500/20" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Confirm Access
                  <ShieldCheck className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>

            <div className="text-center">
              <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">
                Didn&apos;t receive the code?
              </p>
              <button type="button" className="mt-2 text-xs text-brand-500 hover:text-brand-600 font-bold transition-colors">Resend Verification</button>
            </div>
          </form>
        </div>

        <div className="text-center">
          <Link to="/login" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] hover:text-brand-500 transition-all group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Return to Login
          </Link>
        </div>
      </div>
    </div>
  )
}
