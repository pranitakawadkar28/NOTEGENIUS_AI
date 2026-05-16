import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Mail, ArrowRight, ArrowLeft, Loader2, KeyRound } from 'lucide-react'
import { Button, Input, Label } from '@/components/ui/AuthPrimitives'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, selectAuthLoading } from '@/features/auth/authSlice'

const forgotSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

export default function ForgotPassword() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoading = useSelector(selectAuthLoading)
  const [isSent, setIsSent] = useState(false)
  const [emailValue, setEmailValue] = useState('')

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(forgotSchema),
  })

  const onSubmit = async (data) => {
    setEmailValue(data.email)
    const resultAction = await dispatch(forgotPassword(data))
    if (forgotPassword.fulfilled.match(resultAction)) {
      // Redirect to reset password page with email in state
      navigate('/reset-password', { state: { email: data.email } })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-12">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-12 w-12 bg-indigo-600 rounded-[1.25rem] flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <KeyRound className="text-white" size={28} />
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-white">
              NoteGenius <span className="text-brand-500 underline decoration-2 underline-offset-4">AI</span>
            </h1>
          </div>
          
          <h2 className="text-3xl font-black tracking-tight text-white">Access Recovery</h2>
          <p className="text-sm text-zinc-400 font-medium">
            Lost your credentials? We&apos;ll help you get back in.
          </p>
        </div>

        <div className="bg-zinc-900 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl border border-zinc-800 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-brand-600" />
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-4 h-5 w-5 text-zinc-500" />
                <Input 
                  id="email" 
                  placeholder="name@example.com" 
                  className="pl-12 h-14 bg-zinc-950 border-zinc-800 focus:border-indigo-500 focus:ring-indigo-500/20 rounded-2xl text-sm font-medium" 
                  {...register('email')} 
                />
              </div>
              {errors.email && <p className="text-xs text-rose-500 font-bold tracking-tight ml-1">{errors.email.message}</p>}
            </div>

            <Button type="submit" className="w-full h-14 text-sm font-black uppercase tracking-widest bg-indigo-600 hover:bg-indigo-700 rounded-2xl shadow-lg shadow-indigo-600/20" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending Code...
                </>
              ) : (
                <>
                  Request Reset Code
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>
        </div>

        <div className="text-center">
          <Link to="/login" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-zinc-600 hover:text-indigo-400 transition-all group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}
