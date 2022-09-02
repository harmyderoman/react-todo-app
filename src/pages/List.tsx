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
    const response = await useConfirmDialog(Dialog, 'Are you?')

    if (response) {
      dispatch(deleteNote(id))
    }
  }

  return (
    <>
      <h1 className="text-2xl">List of Notes:</h1>
      <div className='pt-2'>
        {notes.map((note) => (
          <div
            className='border py-4 px-4 rounded-xl flex flex-col gap-2' 
            key={note.id}
            >
            <NavLink type="button" to={`note/${note.id}`}>
              <h2 className='text-xl'>#{note.title}</h2>
            </NavLink>
            <TDButton
              dark
              className='bg-red-600'
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
