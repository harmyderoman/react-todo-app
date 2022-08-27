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

export type ConfirmDialogProps = {
  message: string
  confirm: (answer: boolean) => void,
  cancel: () => void
}
