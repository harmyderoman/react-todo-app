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
      state.value = state.value.filter((note) => note.id != action.payload.id)
    },
    updateNote(state, action) {
      // const note = state.value.find((note) => note.id === state.currentId)
      const index = state.value.indexOf(action.payload)
      // const id = state.currentId
      state.value[index] = action.payload
    }
  }
})

export const { addNote, deleteNote, updateNote } = notesSlice.actions

export const selectNotes = (state: { notes: { value: any } }) =>
  state.notes.value

export default notesSlice.reducer
