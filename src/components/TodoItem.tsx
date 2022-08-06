import { Todo } from 'models'

type TodoProps = {
  todo: Todo
  onDelete: (id: string) => void
  onUpdate: (todo: Todo) => void
}

export default function TodoItem({ todo, onDelete, onUpdate }: TodoProps) {
  const changeText = (e: React.FormEvent<HTMLInputElement>) => {
    onUpdate({
      ...todo,
      text: e.currentTarget.value
    })
  }

  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onUpdate({ ...todo, completed: !todo.completed })}
      />
      <input type="text" value={todo.text} onChange={changeText} />
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  )
}
