import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import notesService from './notesService'
import toast from 'react-hot-toast'
import { updateCredits } from '@/features/auth/authSlice'

// ─── Async Thunks ──────────────────────────────────────────

export const generateNote = createAsyncThunk(
  'notes/generate',
  async (noteConfig, { rejectWithValue, dispatch }) => {
    try {
      const response = await notesService.generateNote(noteConfig)
      toast.success('Notes generated successfully!')

      // ✅ Immediately sync credit balance in Redux
      if (typeof response.data.remainingCredits === 'number') {
        dispatch(updateCredits(response.data.remainingCredits))
      }

      return response.data
    } catch (error) {
      const status = error.response?.status
      const message = error.response?.data?.message || 'Generation failed'
      if (status === 402) toast.error('Insufficient credits!')
      else toast.error(message)
      return rejectWithValue({ message, status })
    }
  }
)

export const fetchNotes = createAsyncThunk(
  'notes/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const response = await notesService.getNotes(params)
      return response.data // Expected: { notes, pagination: { total, page, limit, pages } }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch notes')
    }
  }
)

export const downloadNotePdf = createAsyncThunk(
  'notes/downloadPdf',
  async ({ noteData, title }, { rejectWithValue }) => {
    try {
      const response = await notesService.downloadPdf(noteData)
      
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${title.replace(/\s+/g, '_')}_NoteGenius.pdf`)
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
      
      toast.success('PDF download started')
      return null
    } catch (error) {
      toast.error('Failed to download PDF')
      return rejectWithValue('Download failed')
    }
  }
)

export const fetchNoteById = createAsyncThunk(
  'notes/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await notesService.getNoteById(id)
      return response.data // Expected: { note }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch note')
    }
  }
)

export const deleteNote = createAsyncThunk(
  'notes/delete',
  async (id, { rejectWithValue }) => {
    try {
      await notesService.deleteNote(id)
      toast.success('Note deleted successfully')
      return id
    } catch (error) {
      toast.error('Failed to delete note')
      return rejectWithValue(error.response?.data?.message || 'Failed to delete note')
    }
  }
)

// ─── Notes Slice ─────────────────────────────────────────────

const initialState = {
  notes: [],
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    pages: 1,
  },
  currentNote: null,
  isLoading: false,
  error: null,
}

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    clearCurrentNote: (state) => {
      state.currentNote = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Generate Note
      .addCase(generateNote.pending, (state) => {
        state.isLoading = true
      })
      .addCase(generateNote.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentNote = action.payload.data
      })
      // Fetch Notes
      .addCase(fetchNotes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.isLoading = false
        // Backend returns notes in 'data' field
        state.notes = action.payload.data || []
        // Fallback pagination if backend doesn't provide it
        state.pagination = action.payload.pagination || {
          total: (action.payload.data || []).length,
          page: 1,
          limit: 10,
          pages: 1
        }
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Fetch Note By ID
      .addCase(fetchNoteById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchNoteById.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentNote = action.payload.data
      })
      .addCase(fetchNoteById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Delete Note
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter(note => note._id !== action.payload)
        if (state.currentNote?._id === action.payload) {
          state.currentNote = null
        }
      })
  }
})

export const { clearCurrentNote } = notesSlice.actions

export const selectAllNotes = (state) => state.notes.notes
export const selectNotesPagination = (state) => state.notes.pagination
export const selectCurrentNote = (state) => state.notes.currentNote
export const selectNotesLoading = (state) => state.notes.isLoading
export const selectIsGenerating = (state) => state.notes.isLoading

export default notesSlice.reducer
