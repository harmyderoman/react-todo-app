import { ConfirmDialogProps } from 'models'

export default function ConfirmDialog(props: ConfirmDialogProps) {

  return (
    <div>
      <h2>Confirm Delete?</h2>
      <button onClick={()=>{props.confirm(true)}}>Delete</button>
      <button onClick={props.cancel}>Cancel</button>
    </div>
  )
}