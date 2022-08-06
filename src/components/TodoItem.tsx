import { Todo } from 'models'

type TodoProps = {
  todo: Todo
  onDelete: (id: string) => void
  onUpdate: (todo: Todo) => void
}

export default function TodoItem({ todo, onDelete, onUpdate }: TodoProps) {
  const handleDeleteTodo = () => {
    onDelete(todo.id)
  }
  const changeText = (e: React.FormEvent<HTMLInputElement>) => {
    const newTodo = {
      ...todo,
      text: e.currentTarget.value
    }
    onUpdate(newTodo)
  }

  const toggleComplete = () => {
    const newTodo = {
      ...todo,
      completed: !todo.completed
    }

    onUpdate(newTodo)
  }
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={toggleComplete}
      />
      <input type="text" value={todo.text} onChange={changeText} />
      <button onClick={handleDeleteTodo}>Delete</button>
    </div>
  )
}
