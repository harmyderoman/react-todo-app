import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { Todo } from 'models'
import TodoItem from 'components/TodoItem'

function Note() {
  const { noteId } = useParams()

  const [title, setTitle] = useState('')
  const onTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const initTodos = [
    {
      id: '123',
      text: 'Do i!',
      completed: false
    }
  ]

  const [todos, setTodos] = useState(initTodos as Todo[])

  const addNewTodo = () => {
    const randomUUID = crypto.randomUUID()
    console.log(todos)
    setTodos((todos) => [
      ...todos,
      { id: randomUUID, text: '', completed: false }
    ])
  }

  const deleteTodo = (id: string) => {
    setTodos((todos) => [...todos.filter((todo) => todo.id !== id)])
    console.log('delete!')
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

  return (
    <div>
      <h1 className="text-2xl">Note: {noteId}</h1>
      <div className="rounded bg-slate-100 p-2 shadow">
        <h2>{title}</h2>
        <input type="text" value={title} onChange={onTitleChange} />
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
      </div>
    </div>
  )
}

export default Note
