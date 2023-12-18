import { Box, Typography } from '@mui/material'
import { useState } from 'react'

import { ListOfQuestions } from './components/ListOfQuestions'
import { faqContext } from './faqContext'
import { AvailableFaqAreas, faqAreasMap } from './faqAreasMap'

export function Faq() {
  const [selectedArea, setSelectedArea] = useState<AvailableFaqAreas>('')
  const currentArea = faqAreasMap[selectedArea]

  return (
    <faqContext.Provider value={{ setSelectedArea, selectedArea }}>
      <Typography padding="0 30px 0 30px" variant="h1">
        Frequently Asked Questions
      </Typography>
      <Box
        padding="0 30px"
        paddingTop="36px"
        display="flex"
        gap="30px"
        width="100%"
        height="100%"
        overflow="auto"
      >
        <ListOfQuestions isSelected={Boolean(currentArea)} />
        {currentArea ? <Box>{currentArea.area}</Box> : null}
      </Box>
    </faqContext.Provider>
  )
}
