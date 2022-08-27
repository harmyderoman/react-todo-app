import { ConfirmDialogProps } from 'models'

export default function ConfirmDialog(props: ConfirmDialogProps) {

  return (
    <div>
      <h2>{props.message}</h2>
      <button onClick={()=>{props.confirm(true)}}>Confirm</button>
      <button onClick={props.cancel}>Cancel</button>
    </div>
  )
}