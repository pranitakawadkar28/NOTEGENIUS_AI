import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { selectIsAuthenticated, selectAuthLoading, selectCurrentUser } from '@/features/auth/authSlice'

/**
 * ProtectedRoute - Guards private dashboard pages.
 * Displays a loading state while session is being verified.
 */
export default function ProtectedRoute() {
  const user = useSelector(selectCurrentUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const isLoading = useSelector(selectAuthLoading)
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[var(--bg-primary)]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-500/20 border-t-brand-500" />
          <p className="text-sm font-medium text-[var(--text-secondary)]">Authenticating...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (user && !user.isVerified) {
    return <Navigate to="/verify-otp" state={{ email: user.email }} replace />
  }

  return <Outlet />
}
