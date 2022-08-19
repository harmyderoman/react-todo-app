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

function Note() {
  const { noteId } = useParams()
  const notes: NoteType[] = useSelector(selectNotes)
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const onTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const todos = useArrayState<Todo>([])

  useEffect(() => {
    if (noteId) {
      const note = notes.find((note) => note.id === noteId)

      if (note) {
        setTitle(note.title)
        todos.setState(note.todos)
      }
    }
  }, [noteId, notes, todos])

  const addNewTodo = () => {
    const RANDOM_ID = crypto.randomUUID()
    todos.push({ id: RANDOM_ID, text: '', completed: false })
  }

  const deleteTodo = (id: string) => {
    todos.deleteItemByProperty({ id: id })
  }

  const updateTodo = (todo: Todo) => {
    todos.updateItemByProperty({ id: todo.id }, todo)
  }

  const saveNoteHandler = () => {
    const newNote = {
      title,
      todos: todos.state,
      id: noteId ?? crypto.randomUUID()
    }

    if (!noteId) {
      dispatch(addNote(newNote))
    } else {
      dispatch(updateNote(newNote))
    }
  }

  return (
    <div>
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
          {todos.state.map((todo) => (
            <TodoItem
              todo={todo}
              key={todo.id}
              onDelete={deleteTodo}
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
