import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { Todo, Note as NoteType } from 'models'
import TodoItem from 'components/TodoItem'
import TDButton from 'components/TDButton'
import { useSelector, useDispatch } from 'react-redux'
import {
  addNote,
  deleteNote,
  updateNote,
  selectNotes
} from './../store/notesSlice'

import useArrayState from '../hooks/useArrayState'
import useHistoryEffect from '../hooks/useHistoryEffect'
import { nanoid } from 'nanoid/non-secure'
import useConfirmDialog from './../hooks/useConfirmDialog'
import ConfirmDialog from 'components/ConfirmDialog'

function Note() {
  const { noteId } = useParams()
  const notes: NoteType[] = useSelector(selectNotes)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [title, setTitle] = useState('')

  const onTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const todos = useArrayState<Todo>([])
  const { undo, redo, clearHistory, canRedo, canUndo } = useHistoryEffect(
    todos.state,
    todos.setState
  )

  useEffect(() => {
    if (noteId) {
      const note = notes.find((note) => note.id === noteId)

      if (note) {
        setTitle(note.title)
        todos.setState(note.todos)
      }
    }
  }, [])

  const addNewTodo = () => {
    const RANDOM_ID = nanoid(10)
    todos.push({ id: RANDOM_ID, text: '', completed: false })
  }

  // To delete Todo by id use this:
  // const deleteTodo = (id: string) => {
  //   todos.deleteItemsByProperty({ id: id })
  // }

  const deleteTodoByIndex = (index: number) => {
    todos.deleteItemByIndex(index)
  }

  const updateTodo = (todo: Todo) => {
    todos.updateItemsByProperty({ id: todo.id }, todo)
  }

  const saveNoteHandler = () => {
    const newNote = {
      title,
      todos: todos.state,
      id: noteId ?? nanoid(10)
    }

    if (!noteId) {
      dispatch(addNote(newNote))
    } else {
      dispatch(updateNote(newNote))
    }
    clearNote()
    navigate('/')
  }

  const clearNote = () => {
    setTitle('')
    todos.setState([])

    clearHistory()
  }

  async function cancelHandler() {
    const isConfirmed = await useConfirmDialog(ConfirmDialog, 'Are you sure?')

    if (isConfirmed) {
      clearNote()
      navigate('/')
    }
  }
  async function deleteNoteHandler() {
    const isConfirmed = await useConfirmDialog(ConfirmDialog, 'Are you sure?')

    if (isConfirmed) {
      dispatch(deleteNote(noteId))
      clearNote()
      navigate('/')
    }
  }

  return (
    <div>
      <h2 className="text-2xl mb-2">{noteId ? 'Updating Note' : 'New Note'}</h2>
      {/* <h1 className="text-2xl mt-2 mb-2">Note: {title}</h1> */}
      <div className="td-note-card" style={{ minWidth: '500px' }}>
        <div className="self-start space-x-2">
          <TDButton className="bg-white" small onClick={redo} disabled={!canRedo}>
            Redo
          </TDButton>
          <TDButton className="bg-white" small onClick={undo} disabled={!canUndo}>
            Undo
          </TDButton>
        </div>
        <input
          className="text-2xl rounded px-3 py-1 focus:outline-sky-200"
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={onTitleChange}
        />
        <div className="self-start">
          {todos.state.map((todo, index) => (
            <TodoItem
              todo={todo}
              key={todo.id}
              index={index}
              onDelete={deleteTodoByIndex}
              onUpdate={updateTodo}
            />
          ))}
          <div className="mt-2">
            <TDButton className="bg-white" onClick={addNewTodo}>Add New Todo</TDButton>
          </div>
        </div>
        <div className="w-full flex justify-end gap-2">
          <TDButton dark className="bg-amber-400" onClick={cancelHandler}>
            Cancel
          </TDButton>
          <TDButton dark className="bg-green-500" onClick={saveNoteHandler}>
            Save Note
          </TDButton>
          <TDButton
            dark
            className="bg-red-600"
            disabled={!noteId}
            onClick={deleteNoteHandler}
          >
            Delete Note
          </TDButton>
        </div>
      </div>
    </div>
  )
}

export default Note
