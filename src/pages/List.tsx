import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import type { Todo, Note } from 'models'
import TodoItem from 'components/TodoItem'
import { useSelector, useDispatch } from 'react-redux'
import {
  addNote,
  deleteNote,
  updateNote,
  selectNotes
} from './../store/notesSlice'
import Dialog from './../components/ConfirmDialog'
import useConfirmDialog from 'utils/useConfirmDialog'

function List() {
  const notes: Note[] = useSelector(selectNotes)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('notes:', notes)
  })

  const handleDeleteNote = async (id: string) => {
    const response = await useConfirmDialog(Dialog)
    
    if(response) {
      dispatch(deleteNote(id))
    }
  }

  return (
    <>
      <h1 className="text-2xl">List of Notes:</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <NavLink type="button" to={`note/${note.id}`}>
              {note.title}
            </NavLink>
            <button onClick={() => {handleDeleteNote(note.id)}}>Delete Note</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default List
function dispatch(arg0: { payload: any; type: string }) {
  throw new Error('Function not implemented.')
}

