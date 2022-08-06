export interface Todo {
  text: string
  completed: boolean
}

export interface Note {
  title: string
  todos: Array<Todo>
  id: number
}
