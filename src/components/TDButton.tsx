import { useMemo } from 'react'

type TDButtonProps = {
  onClick: () => void
  children: string
  disabled?: boolean
  dark?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset' | undefined
  small?: boolean
}

function TDButton({
  onClick,
  children,
  type = 'button',
  dark = false,
  className = 'bg-slate-50',
  small = false,
  ...rest
}: TDButtonProps) {
  const classes = useMemo(() => {
    return `td-base-button 
      ${dark ? 'text-white' : 'text-grey-600'} 
      ${className}
      ${small ? 'td-button-small' : ''}`
  }, [dark, className, small])

  return (
    <button className={classes} type={type} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}

export default TDButton
