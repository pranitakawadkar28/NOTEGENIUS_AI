import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button, Input, Label } from '@/components/ui/AuthPrimitives'

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

import { useDispatch } from 'react-redux'
import { changePassword } from '@/features/auth/authSlice'

export default function SecuritySettings() {
  const [showPassword, setShowPassword] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const dispatch = useDispatch()
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(passwordSchema)
  })

  const onSubmit = async (data) => {
    setIsUpdating(true)
    const resultAction = await dispatch(changePassword(data))
    if (changePassword.fulfilled.match(resultAction)) {
      reset()
    }
    setIsUpdating(false)
  }

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h3 className="text-lg font-medium text-[var(--text-primary)]">Change Password</h3>
        <p className="text-sm text-[var(--text-secondary)]">Update your password to keep your account secure.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-[var(--text-primary)]">Current Password</Label>
          <Input 
            type={showPassword ? "text" : "password"} 
            className="h-10 bg-transparent border-[var(--border-primary)]" 
            {...register('currentPassword')} 
          />
          {errors.currentPassword && <p className="text-xs text-rose-500 font-medium">{errors.currentPassword.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[var(--text-primary)]">New Password</Label>
            <Input 
              type={showPassword ? "text" : "password"} 
              className="h-10 bg-transparent border-[var(--border-primary)]"
              {...register('newPassword')} 
            />
            {errors.newPassword && <p className="text-xs text-rose-500 font-medium">{errors.newPassword.message}</p>}
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[var(--text-primary)]">Confirm Password</Label>
            <Input 
              type={showPassword ? "text" : "password"} 
              className="h-10 bg-transparent border-[var(--border-primary)]"
              {...register('confirmPassword')} 
            />
            {errors.confirmPassword && <p className="text-xs text-rose-500 font-medium">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-2 transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            {showPassword ? 'Hide' : 'Show'}
          </button>
          <Button type="submit" disabled={isUpdating} className="h-9 px-5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white shadow-sm shadow-brand-500/20 transition-all">
            {isUpdating ? <Loader2 size={16} className="animate-spin" /> : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  )
}
