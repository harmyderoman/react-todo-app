import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { Todo, Note as NoteType } from 'models'
import TodoItem from 'components/TodoItem'
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

  const navigate = useNavigate();

  const [title, setTitle] = useState('')

  const onTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const todos = useArrayState<Todo>([])
  const {
    undo, 
    redo,
    clearHistory
  } = useHistoryEffect( todos.state, todos.setState)
  
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
  }

  const clearNote = () => {
    setTitle('')
    todos.setState([])

    clearHistory()
  }

  async function cancelHandler() {
    const isConfirmed = await useConfirmDialog(ConfirmDialog, 'Are you sure?')

    if(isConfirmed) {
      clearNote()
      navigate('/')
    }
  }
  async function deleteNoteHandler() {
    const isConfirmed = await useConfirmDialog(ConfirmDialog, 'Are you sure?')

    if(isConfirmed) {
      dispatch(deleteNote(noteId))
      clearNote()
      navigate('/')
    }
  }


  return (
    <div>
      <button onClick={redo}>Redo</button>
      <button onClick={undo}>Undo</button>
      <h1 className="text-2xl">Note: {noteId}</h1>
      <div className="rounded bg-slate-100 p-2 shadow">
        <h2>{title}</h2>
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={onTitleChange}
        />
        <div>
          {todos.state.map((todo, index) => (
            <TodoItem
              todo={todo}
              key={todo.id}
              index={index}
              onDelete={deleteTodoByIndex}
              onUpdate={updateTodo}
            />
          ))}
          <button onClick={addNewTodo}>Add New Todo</button>
        </div>
        <div>
          <h3>Actions</h3>
          <button onClick={cancelHandler}>Cancel</button>
          <button onClick={saveNoteHandler}>Save Note</button>
          <button
            disabled={!noteId}
            onClick={deleteNoteHandler}
          >
            Delete Note
          </button>
        </div>
      </div>
    </div>
  )
}

export default Note
