import { ConfirmDialogProps } from 'models'
import { ComponentType } from 'react'
import { createRoot } from 'react-dom/client'

const confirmRoot = document.createElement('div')
const body = document.querySelector('body')
body?.appendChild(confirmRoot)

const useConfirmDialog = (DialogContent: ComponentType<ConfirmDialogProps>) =>
  new Promise(res => {
    
    const root = createRoot(confirmRoot)
    const unmount = () => {
      root.unmount()
    }
    const giveAnswer = (answer: unknown) => {
      unmount()
      res(answer)
    }
    root.render(
      <DialogContent 
        confirm={giveAnswer} 
        cancel={() => {giveAnswer(false)}}
      />)
  })

export default useConfirmDialog
