import { ComponentType } from 'react'
import ReactDOM from 'react-dom'

type ConfirmDialogProps = {
  confirm: (answer: unknown) => void,
  cancel: () => void
}

const confirmRoot = document.createElement('div')
const body = document.querySelector('body')
body?.appendChild(confirmRoot)

const useConfirmDialog = (DialogContent: ComponentType<ConfirmDialogProps>) =>
  new Promise(res => {
    const unmount = () => {
      ReactDOM.unmountComponentAtNode(confirmRoot)
    }
    const giveAnswer = (answer: unknown) => {
      unmount()
      res(answer)
    }
    ReactDOM.render(<DialogContent confirm={giveAnswer} cancel={unmount}/>, confirmRoot)
  })

export default useConfirmDialog
