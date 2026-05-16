import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Lock, ArrowRight, Eye, EyeOff, Loader2, ShieldCheck, Fingerprint } from 'lucide-react'
import { Button, Input, Label } from '@/components/ui/AuthPrimitives'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, selectAuthLoading } from '@/features/auth/authSlice'

const resetSchema = z.object({
  otp: z.string().length(6, 'Verification code must be 6 digits'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
})

export default function ResetPassword() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const isLoading = useSelector(selectAuthLoading)
  const [showPassword, setShowPassword] = useState(false)
  
  const email = location.state?.email

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(resetSchema),
  })

  if (!email) {
    return <Navigate to="/forgot-password" replace />
  }

  const onSubmit = async (data) => {
    const resultAction = await dispatch(resetPassword({ 
      email, 
      otp: data.otp, 
      newPassword: data.password,
      confirmPassword: data.confirmPassword
    }))
    if (resetPassword.fulfilled.match(resultAction)) {
      navigate('/login', { replace: true })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-12">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-12 w-12 bg-brand-500 rounded-[1.25rem] flex items-center justify-center shadow-lg shadow-brand-500/20">
              <Fingerprint className="text-white" size={28} />
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-white">
              NoteGenius <span className="text-brand-500 underline decoration-2 underline-offset-4">AI</span>
            </h1>
          </div>
          
          <h2 className="text-3xl font-black tracking-tight text-white">Secure Reset</h2>
          <p className="text-sm text-zinc-400 font-medium">
            Resetting password for <span className="text-white font-bold">{email}</span>
          </p>
        </div>

        <div className="bg-zinc-900 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl border border-zinc-800 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 to-indigo-600" />
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* OTP Field */}
            <div className="space-y-3">
              <Label htmlFor="otp" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Verification Code</Label>
              <div className="relative">
                <ShieldCheck className="absolute left-4 top-4 h-5 w-5 text-zinc-500" />
                <Input 
                  id="otp" 
                  maxLength={6}
                  placeholder="000000" 
                  className="pl-12 h-14 bg-zinc-950 border-zinc-800 focus:border-brand-500 focus:ring-brand-500/20 rounded-2xl text-lg font-black tracking-[0.2em]" 
                  {...register('otp')} 
                />
              </div>
              {errors.otp && <p className="text-xs text-rose-500 font-bold tracking-tight ml-1">{errors.otp.message}</p>}
            </div>

            {/* New Password Field */}
            <div className="space-y-3">
              <Label htmlFor="password" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-4 h-5 w-5 text-zinc-500" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="pl-12 pr-12 h-14 bg-zinc-950 border-zinc-800 focus:border-brand-500 focus:ring-brand-500/20 rounded-2xl text-sm font-medium"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-zinc-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-rose-500 font-bold tracking-tight ml-1">{errors.password.message}</p>}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-3">
              <Label htmlFor="confirmPassword" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Confirm New Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-4 h-5 w-5 text-zinc-500" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="pl-12 h-14 bg-zinc-950 border-zinc-800 focus:border-brand-500 focus:ring-brand-500/20 rounded-2xl text-sm font-medium"
                  {...register('confirmPassword')}
                />
              </div>
              {errors.confirmPassword && <p className="text-xs text-rose-500 font-bold tracking-tight ml-1">{errors.confirmPassword.message}</p>}
            </div>

            <Button type="submit" className="w-full h-14 text-sm font-black uppercase tracking-widest bg-brand-500 hover:bg-brand-600 rounded-2xl shadow-lg shadow-brand-500/20" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  Reset Password
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
