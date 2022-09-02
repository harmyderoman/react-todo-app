import { Todo } from 'models'
import TDButton from './TDButton'

type TodoProps = {
  todo: Todo
  onDelete: (index: number) => void
  onUpdate: (todo: Todo) => void
  index: number
}

export default function TodoItem({
  todo,
  onDelete,
  onUpdate,
  index
}: TodoProps) {
  const changeText = (e: React.FormEvent<HTMLInputElement>) => {
    onUpdate({
      ...todo,
      text: e.currentTarget.value
    })
  }

  return (
    <div className="py-1 flex gap-3 ">
      <input
        className="w-6"
        type="checkbox"
        checked={todo.completed}
        onChange={() => onUpdate({ ...todo, completed: !todo.completed })}
      />
      <input
        className="text-xl rounded px-3 py-1 focus:outline-sky-200"
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        type="text"
        value={todo.text}
        onChange={changeText}
      />
      <TDButton small bgColor="bg-red-600" dark onClick={() => onDelete(index)}>
        Delete
      </TDButton>
    </div>
  )
}
