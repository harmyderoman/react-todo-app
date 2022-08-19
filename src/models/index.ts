export type Todo = {
  id: string
  text: string
  completed: boolean
}

export type Note = {
  id: string
  title: string
  todos: Array<Todo>
}
