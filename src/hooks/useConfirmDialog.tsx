import { ConfirmDialogProps } from 'models'
import { ComponentType } from 'react'
import { createRoot } from 'react-dom/client'

const confirmRoot = document.createElement('div')
const body = document.querySelector('body')
body?.appendChild(confirmRoot)

const useConfirmDialog = (DialogContent: ComponentType<ConfirmDialogProps>, message: string): Promise<boolean> =>
  new Promise(response => {
    
    const root = createRoot(confirmRoot)
    const unmount = () => {
      root.unmount()
    }
    const onConfirm = (answer: boolean) => {
      unmount()
      response(answer)
    }
    root.render(
      <DialogContent
        message={message}
        confirm={() => onConfirm(true)} 
        cancel={() => onConfirm(false)}
      />)
  })

export default useConfirmDialog
