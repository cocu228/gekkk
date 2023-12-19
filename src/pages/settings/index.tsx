import { Box, Typography } from '@mui/material'
import { useCallback, useState } from 'react'
import { makeStyles } from 'tss-react/mui'

import Ok from '@/assets/ok.svg?react'
import StatementIcon from '@/assets/statement-icon.svg?react'
import { FrameItem } from '@/shared/ui/FrameItem'

import { ApplicationPIN } from './components/ApplicationPIN'
import { IdentificationStatus } from './components/IdentificationStatus'
import { LegalNotices } from './components/LegalNotices'
import { MyReports } from './components/MyReports'
import { PersonalInformation } from './components/PersonalInformation'
import { Pricing } from './components/Pricing'
import { settingsContext } from './settingsContext'
import { useBreakpoints } from '@/app/providers/BreakpointsProvider'

export const useStyles = makeStyles({
  name: 'settings-page',
})(({ palette }) => ({
  okIcon: {
    color: palette.green,
  },
}))
const areaMap: any = {
  'Identification status': <IdentificationStatus />,
  'Personal information': <PersonalInformation />,
  'My reports': <MyReports />,
  'Application PIN': <ApplicationPIN />,
  'Pricing': <Pricing />,
  'Legal notices': <LegalNotices />,
}
export function Settings() {
  const { classes } = useStyles()
  const [selectedArea, setSelectedArea] = useState('')
  const area = areaMap[selectedArea] || null
  const {xl} = useBreakpoints();

  return (
    <settingsContext.Provider
      value={{ closeArea: useCallback(() => setSelectedArea(''), []) }}
    >
      <Box
        padding="0 30px 0 30px"
        marginBottom="36px"
        component={Typography}
        variant="h1"
      >
        My settings
      </Box>

      <Box
        display="flex"
        flexDirection="column" 
        height="100%"
        overflow="auto"
        padding="0 30px"
      >
        <Box display="flex" flexDirection={xl ? "column" : 'row'} gap="30px" marginBottom="19px">
          <Box display="flex" flexDirection="column" gap="24px" width="100%">
            <Typography noWrap variant="h2" color="pale blue">
              General information
            </Typography>

            <Box display="flex" flexDirection="column" gap="24px">
              <FrameItem
                component="button"
                onClick={() => {
                  setSelectedArea('Identification status')
                }}
                isSelected={selectedArea === 'Identification status'}
              >
                <Ok
                  className={
                    selectedArea !== 'Identification status'
                      ? classes.okIcon
                      : ''
                  }
                />
                <Typography noWrap variant="h3">Identification status</Typography>
              </FrameItem>

              <FrameItem
                onClick={() => {
                  setSelectedArea('Personal information')
                }}
                isSelected={selectedArea === 'Personal information'}
              >
                <Typography noWrap variant="h3">Personal information</Typography>
              </FrameItem>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" gap="24px" width="100%">
            <Typography noWrap variant="h2" color="pale blue">
              Account and app settings
            </Typography>

            <Box display="flex" flexDirection="column" gap="24px">
              <FrameItem
                onClick={() => {
                  setSelectedArea('My reports')
                }}
                isSelected={selectedArea === 'My reports'}
              >
                <StatementIcon />
                <Typography noWrap variant="h3">My reports</Typography>
              </FrameItem>
              <FrameItem
                onClick={() => {
                  setSelectedArea('Application PIN')
                }}
                isSelected={selectedArea === 'Application PIN'}
              >
                <Typography noWrap variant="h3">* * * *</Typography>
                <Typography noWrap variant="h3">Application PIN</Typography>
              </FrameItem>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" gap="24px" width="100%">
            <Typography noWrap variant="h2" color="pale blue">
              Documents
            </Typography>

            <Box display="flex" flexDirection="column" gap="24px">
              <FrameItem
                onClick={() => {
                  setSelectedArea('Pricing')
                }}
                isSelected={selectedArea === 'Pricing'}
              >
                <Typography noWrap variant="h3">Pricing</Typography>
              </FrameItem>

              <FrameItem
                onClick={() => {
                  setSelectedArea('Legal notices')
                }}
                isSelected={selectedArea === 'Legal notices'}
              >
                <Typography noWrap variant="h3">Legal notices</Typography>
              </FrameItem>
            </Box>
          </Box>
        </Box>
        {area}
      </Box>
    </settingsContext.Provider>
  )
}
