import { ConfirmDialogProps } from 'models'
import { ComponentType } from 'react'
import { createRoot } from 'react-dom/client'

const confirmRoot = document.createElement('div')
const body = document.querySelector('body')
body?.appendChild(confirmRoot)

const useConfirmDialog = (DialogContent: ComponentType<ConfirmDialogProps>, message: string) =>
  new Promise(res => {
    
    const root = createRoot(confirmRoot)
    const unmount = () => {
      root.unmount()
    }
    const onConfirm = (answer: boolean) => {
      unmount()
      res(answer)
    }
    root.render(
      <DialogContent
        message={message}
        confirm={onConfirm} 
        cancel={() => {onConfirm(false)}}
      />)
  })

export default useConfirmDialog
