import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import DashboardLayout from '@/components/layout/DashboardLayout'

// Auth Pages
const Login = lazy(() => import('@/pages/auth/Login'))
const Register = lazy(() => import('@/pages/auth/Register'))
const VerifyOtp = lazy(() => import('@/pages/auth/VerifyOtp'))
const ForgotPassword = lazy(() => import('@/pages/auth/ForgotPassword'))
const ResetPassword = lazy(() => import('@/pages/auth/ResetPassword'))

// Dashboard Pages
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const GenerateNotes = lazy(() => import('@/pages/GenerateNotes'))
const NotesHistory = lazy(() => import('@/pages/NotesHistory'))
const Billing = lazy(() => import('@/pages/Billing'))
const Settings = lazy(() => import('@/pages/Settings'))

const NoteDetails = lazy(() => import('@/pages/NoteDetails'))

const AppRoutes = () => {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-full items-center justify-center bg-[var(--bg-primary)]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-500/20 border-t-brand-500" />
      </div>
    }>
      <Routes>
        {/* Protected Routes inside DashboardLayout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/generate-notes" element={<GenerateNotes />} />
            <Route path="/notes/:id" element={<NoteDetails />} />
            <Route path="/notes-history" element={<NotesHistory />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Route>


        {/* Public Auth Routes - Guarded against logged-in users */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        
        {/* 404 */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
