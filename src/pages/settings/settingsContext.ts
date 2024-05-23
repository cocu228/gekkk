import { createContext, useContext } from 'react'

export const settingsContext = createContext({
  closeArea: () => {},
})
export function useSettingsContext() {
  return useContext(settingsContext)
}