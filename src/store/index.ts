import { configureStore } from '@reduxjs/toolkit'
import notesReducer from './notesSlice'

import { save, load } from 'redux-localstorage-simple'

export default configureStore({
  reducer: {
    notes: notesReducer
  },
  middleware: [save()],
  preloadedState: load()
})
