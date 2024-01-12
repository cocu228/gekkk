import { Box, styled, Typography } from '@mui/material'
import { useFaqContext } from '../faqContext'
import { FaqItem } from './FaqItem'
import { faqAreasMap, faqAreasMapKeys } from '../faqAreasMap'
import { useBreakpoints } from '@/app/providers/BreakpointsProvider'

export const Wrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isMobile',
})<{ isSelected?: boolean, isMobile: boolean }>(({ isSelected, isMobile }) => ({
  display: 'flex',
  justifyContent: isSelected ? undefined : 'start',
  flexWrap: isSelected ? undefined : 'wrap',
  flexDirection: isSelected ? isMobile ? 'row' : 'column' : undefined,
  overflow: isSelected && isMobile ? "auto" : undefined,
  gap: '30px',
  minWidth: '400px',
}))

export function ListOfQuestions() {
  const { setSelectedArea, selectedArea } = useFaqContext()
  const {xxl} = useBreakpoints();

  return (
    <Wrapper isSelected={Boolean(selectedArea)} isMobile={xxl}>
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
