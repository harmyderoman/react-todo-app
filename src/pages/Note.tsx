import { useParams } from 'react-router-dom'
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

import useArrayState from './../utils/useArrayState'
import useHistoryEffect from './../utils/useHistoryEffect'
import { nanoid } from 'nanoid/non-secure'

function Note() {
  const { noteId } = useParams()
  const notes: NoteType[] = useSelector(selectNotes)
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')

  const onTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const todos = useArrayState<Todo>([])
  const {
    undo, 
    redo
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
          <button onClick={saveNoteHandler}>Save Note</button>
          <button
            disabled={!noteId}
            onClick={() => dispatch(deleteNote(noteId))}
          >
            Delete Note
          </button>
        </div>
      </div>
    </div>
  )
}

export default Note
