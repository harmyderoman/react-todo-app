import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import type { Note } from 'models'
import { useSelector, useDispatch } from 'react-redux'
import { deleteNote, selectNotes } from './../store/notesSlice'
import Dialog from './../components/ConfirmDialog'
import TDButton from './../components/TDButton'
import useConfirmDialog from 'hooks/useConfirmDialog'

function List() {
  const notes: Note[] = useSelector(selectNotes)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('notes:', notes)
  })

  const handleDeleteNote = async (id: string) => {
    const response = await useConfirmDialog(Dialog, 'Are you sure?')

    if (response) {
      dispatch(deleteNote(id))
    }
  }

  return (
    <>
      <div className="pt-6 flex gap-4">
        {notes.map((note) => (
          <div className="td-list-card flex justify-between" key={note.id}>
            <NavLink type="button" to={`note/${note.id}`}>
              <h2 className="text-xl">#{note.title}</h2>
            </NavLink>
            <ul className='border rounded-lg px-2 py-2 h-full'>
              {note.todos.map((todo) => (
                <li
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none'
                  }}
                >
                  {todo.text}
                </li>
              ))}
            </ul>
            <TDButton
              dark
              className="bg-red-600"
              onClick={() => {
                handleDeleteNote(note.id)
              }}
            >
              Delete Note
            </TDButton>
          </div>
        ))}
      </div>
    </>
  )
}

export default List
