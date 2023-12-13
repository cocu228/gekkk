import { createContext, useContext } from 'react'
import { AvailableFaqAreas } from './faqAreasMap'

export const faqContext = createContext({
  setSelectedArea: (_: AvailableFaqAreas) => {},
  selectedArea: '' as AvailableFaqAreas,
})
export function useFaqContext() {
  return useContext(faqContext)
}
