import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
import toast from 'react-hot-toast'

// ─── Async Thunks ──────────────────────────────────────────

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials)
      toast.success('Login successful!')
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      toast.error(message)
      return rejectWithValue(message)
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData)
      toast.success('Registration successful! Please verify your email.')
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed'
      toast.error(message)
      return rejectWithValue(message)
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout()
      toast.success('Logged out successfully')
      return null
    } catch (error) {
      return rejectWithValue(error.response?.data?.message)
    }
  }
)

export const fetchCurrentUser = createAsyncThunk(
  'auth/me',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.getMe()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message)
    }
  }
)

export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async (otpData, { rejectWithValue }) => {
    try {
      const response = await authService.verifyOtp(otpData)
      toast.success('Email verified successfully!')
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Verification failed'
      toast.error(message)
      return rejectWithValue(message)
    }
  }
)

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (emailData, { rejectWithValue }) => {
    try {
      const response = await authService.forgotPassword(emailData)
      toast.success('Reset code sent to your email!')
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send reset code'
      toast.error(message)
      return rejectWithValue(message)
    }
  }
)

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (resetData, { rejectWithValue }) => {
    try {
      const response = await authService.resetPassword(resetData)
      toast.success('Password reset successful! Please login.')
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Reset failed'
      toast.error(message)
      return rejectWithValue(message)
    }
  }
)

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await authService.updateProfile(profileData)
      toast.success('Profile updated successfully!')
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Update failed'
      toast.error(message)
      return rejectWithValue(message)
    }
  }
)

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await authService.changePassword(passwordData)
      toast.success('Password changed successfully!')
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to change password'
      toast.error(message)
      return rejectWithValue(message)
    }
  }
)


// ─── Auth Slice ──────────────────────────────────────────────

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false, 
  isInitializing: true, 
  error: null,
  registrationEmail: localStorage.getItem('pendingEmail') || null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    updateCredits: (state, action) => {
      if (state.user) {
        state.user.credits = action.payload
      }
    },
    setRegistrationEmail: (state, action) => {
      state.registrationEmail = action.payload
      localStorage.setItem('pendingEmail', action.payload)
    },
    clearRegistrationEmail: (state) => {
      state.registrationEmail = null
      localStorage.removeItem('pendingEmail')
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.data.user
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        // We can store the email if the backend returns it, 
        // or we handle it in the component. Let's ensure it's in state.
        if (action.meta.arg?.email) {
          state.registrationEmail = action.meta.arg.email
          localStorage.setItem('pendingEmail', action.meta.arg.email)
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.data.user
        state.registrationEmail = null
        localStorage.removeItem('pendingEmail')
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
      })
      // Fetch User (Initial Load)
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isInitializing = true
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload.data.user
        state.isAuthenticated = true
        state.isInitializing = false
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.isInitializing = false
        state.isAuthenticated = false
      })
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.data.user
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Change Password
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Forgot Password
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.isLoading = false
      })
      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(resetPassword.rejected, (state) => {
        state.isLoading = false
      })

  }
})

export const { clearError, updateCredits } = authSlice.actions

// Selectors
export const selectCurrentUser = (state) => state.auth.user
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectAuthLoading = (state) => state.auth.isLoading
export const selectIsInitializing = (state) => state.auth.isInitializing
export const selectAuthError = (state) => state.auth.error
export const selectRegistrationEmail = (state) => state.auth.registrationEmail

export default authSlice.reducer
