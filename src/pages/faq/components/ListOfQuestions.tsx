import { Box, styled, Typography } from '@mui/material'

import { useFaqContext } from '../faqContext'
import { FaqItem } from './FaqItem'
import { faqAreasMap, faqAreasMapKeys } from '../faqAreasMap'

export const Wrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected?: boolean }>(({ isSelected }) => ({
  display: 'flex',
  justifyContent: isSelected ? undefined : 'start',
  flexWrap: isSelected ? undefined : 'wrap',
  flexDirection: isSelected ? 'column' : undefined,
  gap: '30px',
  minWidth: '400px',
}))

export interface ListOfQuestionsProps {
  isSelected: boolean
}

export function ListOfQuestions({ isSelected }: ListOfQuestionsProps) {
  const { setSelectedArea, selectedArea } = useFaqContext()
  return (
    <Wrapper isSelected={isSelected}>
      {faqAreasMapKeys.map((key) => {
        const info = faqAreasMap[key]
        if (!info) {
          return null
        }
        const { icon } = info
        return (
          <FaqItem
            isSelected={selectedArea === key}
            component="button"
            onClick={() => {
              setSelectedArea(key)
            }}
          >
            {icon}
            <Typography variant="h3">{key}</Typography>
          </FaqItem>
        )
      })}
    </Wrapper>
  )
}
