import { ConfirmDialogProps } from 'models'
import TDButton from './TDButton'

export default function ConfirmDialog(props: ConfirmDialogProps) {

  return (
    <div className='absolute top-0 right-0 left-0 bottom-0 flex justify-center items-center bg-[#878787b0]'>
      <div className='w-max px-4 py-4 bg-slate-300 rounded-xl border'
        style={{minWidth: '400px'}}>
        <h2 className='text-xl'>{props.message}</h2>
        <div className='mt-4 space-x-2'>
          <TDButton onClick={()=>{props.confirm(true)}}>Confirm</TDButton>
          <TDButton onClick={props.cancel}>Cancel</TDButton>
        </div>
      </div>
    </div>
  )
}