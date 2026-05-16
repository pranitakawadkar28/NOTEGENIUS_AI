import { ShieldAlert, Trash2, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/AuthPrimitives'
import { useDispatch } from 'react-redux'
import { logoutUser } from '@/features/auth/authSlice'

export function LogoutSection() {
  const dispatch = useDispatch()
  
  return (
    <div className="glass rounded-3xl p-8 border border-[var(--border-primary)] flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="space-y-1 text-center md:text-left">
        <h3 className="text-lg font-bold text-[var(--text-primary)]">Sign Out</h3>
        <p className="text-sm text-[var(--text-secondary)]">Securely log out of your current session.</p>
      </div>
      <Button 
        variant="outline" 
        onClick={() => dispatch(logoutUser())}
        className="w-full md:w-auto border-red-500/20 text-red-500 hover:bg-red-500/5"
      >
        <LogOut size={16} className="mr-2" />
        Logout of NoteGenius
      </Button>
    </div>
  )
}

export function DangerZone() {
  return (
    <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-8 space-y-6">
      <div className="flex items-center gap-3 text-red-500">
        <ShieldAlert size={24} />
        <h3 className="text-lg font-bold uppercase tracking-widest">Danger Zone</h3>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-t border-red-500/10">
        <div className="space-y-1 text-center md:text-left">
          <h4 className="font-bold text-[var(--text-primary)]">Delete Account</h4>
          <p className="text-xs text-[var(--text-secondary)]">Permanently delete your profile and all generated notes. This action is irreversible.</p>
        </div>
        <Button variant="outline" className="w-full md:w-auto bg-transparent border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white">
          <Trash2 size={16} className="mr-2" />
          Delete Profile
        </Button>
      </div>
    </div>
  )
}
