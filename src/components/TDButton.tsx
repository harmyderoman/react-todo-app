import { useMemo } from "react"

type TDButtonProps = {
  onClick: () => void,
  children: string,
  disabled?: boolean
  dark?: boolean
  bgColor?: string
  type?: "button" | "submit" | "reset" | undefined
}

function TDButton({ onClick, 
  children, 
  type="button",
  dark=false,
  bgColor="none",
  ...rest }: TDButtonProps) {

  const classes = useMemo(()=> {
    return (`td-base-button ${dark?'text-white':'text-grey-600'} bg-${bgColor}`)
  }, [dark, bgColor])

  return  (
    <button
      className={classes}
      type={type}
      onClick={onClick}
      {...rest}
      >
      {children}
    </button>
  )
}

export default TDButton