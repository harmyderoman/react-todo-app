import { useState, useEffect, useMemo } from "react"

export default function useHistoryEffect<T>(state: T, setState: ((arg0: T) => void)) {

  useEffect(() => {
    if(watch) {
      setHistory((oldHistory) => [...oldHistory, state])
      setIndex(history.length)
    } else {
      setWatch(true)
    }
  }, [state])
  
  const [history, setHistory] = useState<T[]>([])

  const [historyIndex, setIndex] = useState(0)
  const [watch, setWatch] = useState(true)

  const redo = () => {
    setWatch(false)
    if(canRedo) {
      setIndex( index => index + 1 )
      setState( history[historyIndex + 1] )
    }
  }
  const undo = () => {
    setWatch(false)
    if(canUndo) {
      setIndex( index => index - 1 )
      setState( history[historyIndex - 1] )
    }
  }
  const canRedo = useMemo(() => {
    if(history.length === 0) return false

    return historyIndex < (history.length - 1)
  }, [history, historyIndex])

  const canUndo = useMemo(() => {
    if(history.length === 0) return false
    
    return historyIndex > 0
  }, [historyIndex])

  const clearHistory = () => {
    setWatch(false)
    setHistory([])
    setIndex(0)
  }

  return {
    state,
    setState,
    redo,
    undo,
    canRedo,
    canUndo,
    clearHistory
  }
}