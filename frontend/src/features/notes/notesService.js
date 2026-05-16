import api from '@/services/api'

const notesService = {
  generateNote: (config) => api.post('/notes/generate', config),
  
  /**
   * Fetches notes with optional query parameters for filtering/pagination.
   * @param {Object} params - { search, classLevel, examType, page, limit }
   */
  getNotes: (params) => api.get('/notes', { params }),
  
  getNoteById: (id) => api.get(`/notes/${id}`),

  /**
   * Downloads the PDF version of a note.
   * Sends the structured note content to the backend.
   */
  downloadPdf: (noteData) => api.post(`/pdf/download`, { result: noteData }, { responseType: 'blob' }),

  deleteNote: (id) => api.delete(`/notes/${id}`),
}

export default notesService
