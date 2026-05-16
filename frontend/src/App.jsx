import React, { useEffect } from 'react'
import { Provider, useDispatch } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { store } from './app/store'
import { ThemeProvider } from './context/ThemeContext'
import { selectIsInitializing, fetchCurrentUser } from './features/auth/authSlice'
import { useSelector } from 'react-redux'
import LoadingScreen from './components/ui/LoadingScreen'
import AppRoutes from './routes/AppRoutes'
import './index.css'

function AuthInitializer({ children }) {
  const dispatch = useDispatch()
  const isInitializing = useSelector(selectIsInitializing)

  useEffect(() => {
    // Attempt to persist session on mount
    dispatch(fetchCurrentUser())

    // Re-sync user (and credits) whenever the tab becomes visible
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        dispatch(fetchCurrentUser())
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [dispatch])

  if (isInitializing) {
    return <LoadingScreen />
  }

  return children
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthInitializer>
          <Router>
            <AppRoutes />
            <Toaster 
              position="top-right"
              toastOptions={{
                className: 'glass text-sm font-medium',
                style: {
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-primary)',
                },
              }}
            />
          </Router>
        </AuthInitializer>
      </ThemeProvider>
    </Provider>
  )
}

export default App
