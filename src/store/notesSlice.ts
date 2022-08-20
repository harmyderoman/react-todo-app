import { createSlice } from '@reduxjs/toolkit'
import { Note, Todo } from 'models'

export const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    value: [] as Todo[]
  },
  reducers: {
    addNote: (state, action) => {
      state.value.push(action.payload)
    },
    deleteNote(state, action) {
      state.value = state.value.filter((note) => note.id != action.payload)
    },
    updateNote(state, action) {
      const index = state.value.findIndex(
        (note) => note.id === action.payload.id
      )
      state.value[index] = action.payload
    }
  }
})

export const { addNote, deleteNote, updateNote } = notesSlice.actions

export const selectNotes = (state: { notes: { value: Note[] } }) =>
  state.notes.value

export default notesSlice.reducer
