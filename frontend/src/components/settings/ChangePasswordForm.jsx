import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Lock, Eye, EyeOff, Loader2, ShieldCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button, Input, Label } from '@/components/ui/AuthPrimitives'

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string()
    .min(8, 'New password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Must contain at least one number'),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export default function ChangePasswordForm() {
  const [showPasswords, setShowPasswords] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(changePasswordSchema)
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    // Placeholder for API integration
    console.log('Password Data:', data)
    
    setTimeout(() => {
      setIsLoading(false)
      toast.success('Password updated successfully!')
      reset()
    }, 1500)
  }

  return (
    <div className="glass rounded-3xl p-8 border border-[var(--border-primary)] space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-2">
        <div className="h-10 w-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
          <ShieldCheck size={20} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[var(--text-primary)]">Update Password</h3>
          <p className="text-sm text-[var(--text-secondary)]">Ensure your account is using a strong, unique password.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-2">
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Current Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-[var(--text-secondary)]" />
            <Input 
              id="currentPassword" 
              type={showPasswords ? "text" : "password"} 
              disabled={isLoading}
              placeholder="••••••••"
              className="pl-10" 
              {...register('currentPassword')} 
            />
          </div>
          {errors.currentPassword && <p className="text-xs text-red-500 font-medium">{errors.currentPassword.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input 
              id="newPassword" 
              type={showPasswords ? "text" : "password"} 
              disabled={isLoading}
              placeholder="Min. 8 characters"
              {...register('newPassword')} 
            />
            {errors.newPassword && <p className="text-xs text-red-500 font-medium leading-relaxed">{errors.newPassword.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input 
              id="confirmPassword" 
              type={showPasswords ? "text" : "password"} 
              disabled={isLoading}
              placeholder="Repeat new password"
              {...register('confirmPassword')} 
            />
            {errors.confirmPassword && <p className="text-xs text-red-500 font-medium">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[var(--border-primary)]">
          <button 
            type="button"
            onClick={() => setShowPasswords(!showPasswords)}
            className="text-xs font-bold text-brand-500 flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            {showPasswords ? <EyeOff size={14} /> : <Eye size={14} />}
            {showPasswords ? 'Hide' : 'Show'} Passwords
          </button>
          
          <Button type="submit" disabled={isLoading} className="px-8">
            {isLoading ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" />
                Updating...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
