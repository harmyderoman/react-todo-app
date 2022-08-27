import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import type { Note } from 'models'
import { useSelector, useDispatch } from 'react-redux'
import { deleteNote, selectNotes } from './../store/notesSlice'
import Dialog from './../components/ConfirmDialog'
import useConfirmDialog from 'hooks/useConfirmDialog'

function List() {
  const notes: Note[] = useSelector(selectNotes)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('notes:', notes)
  })

  const handleDeleteNote = async (id: string) => {
    const response = await useConfirmDialog(Dialog, 'Are you?')

    if (response) {
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
            <button
              onClick={() => {
                handleDeleteNote(note.id)
              }}
            >
              Delete Note
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default List
