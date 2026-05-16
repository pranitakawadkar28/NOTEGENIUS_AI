import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { selectIsAuthenticated, selectAuthLoading, selectCurrentUser } from '@/features/auth/authSlice'

/**
 * PublicRoute - Prevents verified logged-in users from visiting auth pages (Login/Register).
 * But allows unverified users to stay on the verification flow.
 */
export default function PublicRoute() {
  const user = useSelector(selectCurrentUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const isLoading = useSelector(selectAuthLoading)

  if (isLoading) return null 

  if (isAuthenticated) {
    // If logged in but not verified, they can only see the verify page
    if (user && !user.isVerified) {
        return <Outlet /> 
    }
    // If fully verified, go to dashboard
    return <Navigate to="/dashboard" replace />
  }

  return <Outlet />
}
