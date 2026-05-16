import { Camera, Loader2, CheckCircle2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, updateProfile } from '@/features/auth/authSlice'
import { Button, Input, Label } from '@/components/ui/AuthPrimitives'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

export default function ProfileSection() {
  const user = useSelector(selectCurrentUser)
  const dispatch = useDispatch()
  const [isUpdating, setIsUpdating] = useState(false)
  
  const { register, handleSubmit, formState: { isDirty } } = useForm({
    defaultValues: {
      username: user?.username || '',
      email: user?.email || ''
    }
  })

  const onSubmit = async (data) => {
    setIsUpdating(true)
    await dispatch(updateProfile(data))
    setIsUpdating(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="flex items-center gap-6">
        <div className="relative group">
          <div className="h-20 w-20 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-xl font-medium text-[var(--text-primary)] border border-[var(--border-primary)] uppercase">
            {user?.username?.[0] || 'U'}
          </div>
          <button type="button" className="absolute bottom-0 right-0 p-1.5 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            <Camera size={14} />
          </button>
        </div>
        <div>
          <h3 className="text-lg font-medium text-[var(--text-primary)]">{user?.username || 'User'}</h3>
          <p className="text-sm text-[var(--text-secondary)] mt-0.5">Update your photo and personal details.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-[var(--text-primary)]">Username</Label>
          <Input 
            {...register('username')}
            className="h-10 bg-transparent border-[var(--border-primary)]" 
          />
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-[var(--text-primary)]">Email Address</Label>
          <Input 
            {...register('email')}
            className="h-10 bg-transparent border-[var(--border-primary)]" 
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={!isDirty || isUpdating}
          className="h-10 px-8 rounded-xl bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/20 disabled:opacity-50 disabled:grayscale transition-all font-bold"
        >
          {isUpdating ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              <CheckCircle2 size={16} className="mr-2" />
              Save Profile
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
