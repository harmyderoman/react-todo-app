import { useState, useEffect, useMemo } from "react"

export default function useHistoryEffect<T>(state: T, setState: ((arg0: T) => void)) {

  // const [state, setState] = useState(initialState)

  useEffect(() => {
    if(watch) {
      setHistory((oldHistory) => [...oldHistory, state])
      setIndex(history.length)
    } else {
      setWatch(true)
    }
    console.log('titles:', history)
    console.log('index:', historyIndex)
  }, [state])
  
  const [history, setHistory] = useState<T[]>([])

  const [historyIndex, setIndex] = useState(0)
  const [watch, setWatch] = useState(true)

  const redo = () => {
    setWatch(false)
    if(canRedo) {
      setIndex( index => index + 1 )
      setState( history[historyIndex + 1] )
      console.log('titles:', history)
      console.log('index:', historyIndex)
    }
  }
  const undo = () => {
    setWatch(false)
    if(canUndo) {
      setIndex( index => index - 1 )
      setState( history[historyIndex - 1] )
      console.log('titles:', history)
      console.log('index:', historyIndex)
    }
  }
  const canRedo = useMemo(() => {
    return historyIndex < (history.length - 1)
  }, [history, historyIndex])

  const canUndo = useMemo(() => {
    return historyIndex > 0
  }, [historyIndex])

  return {
    state,
    setState,
    redo,
    undo,
    canRedo,
    canUndo
  }
}