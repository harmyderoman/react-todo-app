import { useState } from 'react'

export type ArrayItem = {
  [key: string | symbol | number]: unknown
}

export default function useArrayState<T extends ArrayItem>(
  initialState = [] as T[]
) {
  const [state, setState] = useState(initialState)

  const deleteItemByIndex = (index: number) => {
    setState((state) => state.filter((_, i) => i != index))
  }

  const deleteItemByProperty = (prop: Record<string, unknown>) => {
    const key = Object.keys(prop)[0]

    setState((state) => [...state.filter((item) => item[key] != prop[key])])
  }

  const updateItemByIndex = (index: number, item: T) => {
    setState((state) => {
      return [...state.slice(0, index), item, ...state.slice(index + 1)]
    })
  }

  const updateItemByProperty = (prop: Record<string, unknown>, newItem: T) => {
    const key = Object.keys(prop)[0]

    setState((state) => {
      const newState: T[] = []

      state.forEach((item) => {
        if (item[key] == prop[key]) {
          newState.push(newItem)
        } else {
          newState.push(item)
        }
      })

      return [...newState]
    })
  }

  const push = (newItem: T) => {
    setState((state) => [...state, newItem])
  }

  return {
    state,
    push,
    setState,
    deleteItemByIndex,
    deleteItemByProperty,
    updateItemByIndex,
    updateItemByProperty
  }
}
