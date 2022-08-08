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

function List() {
  const notes: Note[] = useSelector(selectNotes)
  useEffect(() => {
    console.log('notes:', notes)
  })
  return (
    <>
      <h1 className="text-2xl">List of Notes:</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <NavLink type="button" to={`note/${note.id}`}>
              {note.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  )
}

export default List
