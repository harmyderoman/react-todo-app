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

function Note() {
  const { noteId } = useParams()
  const notes: NoteType[] = useSelector(selectNotes)
  const dispatch = useDispatch()

  useEffect(() => {
    if (noteId) {
      console.log(noteId)
    }
    console.log('notes:', notes)
  })

  const [title, setTitle] = useState('')
  const onTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const [todos, setTodos] = useState([] as Todo[])

  const addNewTodo = () => {
    const randomUUID = crypto.randomUUID()
    setTodos((todos) => [
      ...todos,
      { id: randomUUID, text: '', completed: false }
    ])
  }

  const deleteTodo = (id: string) => {
    setTodos((todos) => [...todos.filter((todo) => todo.id !== id)])
  }

  const updateTodo = (todo: Todo) => {
    const newTodos: Todo[] = []

    todos.forEach((item) => {
      if (item.id === todo.id) {
        newTodos.push(todo)
      } else {
        newTodos.push(item)
      }
    })
    setTodos(newTodos)
  }

  const addNoteHandler = () => {
    const newNote = {
      title,
      todos,
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
          {todos.map((todo) => (
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
          <button onClick={addNoteHandler}>Save Note</button>
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
