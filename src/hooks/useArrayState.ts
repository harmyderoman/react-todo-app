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

  const deleteItemsByProperty = (prop: Record<string, unknown>) => {
    const key = Object.keys(prop)[0]

    setState((state) => state.filter((item) => item[key] != prop[key]))
  }

  const updateItemByIndex = (index: number, item: T) => {
    setState((state) => {
      const updatedItem = Object.assign({}, state[index], item)

      return [...state.slice(0, index), updatedItem, ...state.slice(index + 1)]
    })
  }

  const updateItemsByProperty = (prop: Record<string, unknown>, newItem: T) => {
    const key = Object.keys(prop)[0]

    setState((state) => {
      const newState: T[] = []

      state.forEach((item) => {

        if (item[key] == prop[key]) {
          const updatedItem = Object.assign({}, item, newItem)

          newState.push(updatedItem)
        } else {
          newState.push(item)
        }
      })

      return newState
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
    deleteItemsByProperty,
    updateItemByIndex,
    updateItemsByProperty
  }
}
