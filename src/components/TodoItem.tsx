import { Todo } from 'models'

type TodoProps = {
  todo: Todo
  onDelete: (index: number) => void
  onUpdate: (todo: Todo) => void
  index: number
}

export default function TodoItem({ todo, onDelete, onUpdate, index }: TodoProps) {
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
      <button onClick={() => onDelete(index)}>Delete</button>
    </div>
  )
}
