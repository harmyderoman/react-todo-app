import { renderHook, act } from '@testing-library/react-hooks'
import { useState } from 'react'
import useHistoryEffect from 'hooks/useHistoryEffect'

describe('useHistoryEffect', () => {
  test('should return init state', () => {

    const { result } = renderHook(() => {
      const [state, setState] = useState(0)
      const history = useHistoryEffect(state, setState)

      return history
    })
  
    expect(result.current.state).toBe(0)
  })
  test(`should write snapshot on update, and shold undo changes on 'undo()',
   and redo changes on 'redo()'`, () => {

    const { result } = renderHook(() => {
      const [state, setState] = useState(0)
      const history = useHistoryEffect(state, setState)

      return history
    })

    act(() => {
      result.current.setState(1)
    })
  
    expect(result.current.state).toBe(1)

    act(() => {
      result.current.undo()
    })

    expect(result.current.state).toBe(0)
    expect(result.current.canRedo).toBe(true)
    expect(result.current.canUndo).toBe(false)

    act(() => {
      result.current.redo()
    })

    expect(result.current.state).toBe(1)
    expect(result.current.canRedo).toBe(false)
    expect(result.current.canUndo).toBe(true)
  })

  test('should clear state on clearHistory', () => {

    const { result } = renderHook(() => {
      const [state, setState] = useState(0)
      const history = useHistoryEffect(state, setState)

      return history
    })

    act(() => {
      result.current.setState(1)
    })
    act(() => {
      result.current.clearHistory()
    })
  
    expect(result.current.canRedo).toBe(false)
    expect(result.current.canUndo).toBe(false)
  })
})