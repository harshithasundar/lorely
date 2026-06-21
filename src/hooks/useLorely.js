import { useContext } from 'react'
import { LorelyContext } from '../context/contextStore'

export function useLorely() {
  const context = useContext(LorelyContext)
  if (!context) {
    throw new Error('useLorely must be used within a LorelyProvider')
  }
  return context
}
