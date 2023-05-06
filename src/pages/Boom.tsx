import { useState, useMemo } from 'react'
import { checkIfColorDark } from './../utils'

function ColorPicker () {
  const [color, setColor] = useState('#cecece')

  const isDark = useMemo(() => checkIfColorDark(color), [color])

  return(
    <div style={{ backgroundColor: color }}>
      <p style={{ color: isDark ? 'white' : 'black'}}>{ color }</p>
      <input
        type="color"
        defaultValue={color}
        onChange={(evn) => setColor(evn.target.value)}
      />
    </div>
  )
}

export default ColorPicker