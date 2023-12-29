import { Box, Typography } from '@mui/material'
import { useState } from 'react'

import { ListOfQuestions } from './components/ListOfQuestions'
import { faqContext } from './faqContext'
import { AvailableFaqAreas, faqAreasMap } from './faqAreasMap'
import { makeStyles } from 'tss-react/mui'
import { useTranslation } from 'react-i18next'

export const useStyles = makeStyles({ name: 'ListOfQuestions'})(({ palette }) => ({
  root: {
    ['& ol']: {
      margin: '8px 0',
      listStyleType: 'decimal',
      "& li": {
        marginBottom: '8px',
      }
    },
  },
}))
export function Faq() {
  const [selectedArea, setSelectedArea] = useState<AvailableFaqAreas>('')
  const currentArea = faqAreasMap[selectedArea]
  const { classes } = useStyles();
  const {t} = useTranslation();

  return (
    <faqContext.Provider value={{ setSelectedArea, selectedArea }}>
      <Typography padding="16px 30px 0 30px" variant="h1">
        {t('frequently_asked_questions')}
      </Typography>
      <Box
        padding="0 60px 60px 30px"
        paddingTop="36px"
        display="flex"
        gap="30px"
        width="100%"
        height="100%"
        overflow="auto"
      >
        <ListOfQuestions isSelected={Boolean(currentArea)} />
        {currentArea ? <Box className={classes.root}>{currentArea.area}</Box> : null}
      </Box>
    </faqContext.Provider>
  )
}
