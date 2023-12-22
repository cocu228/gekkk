import { Box, Typography } from '@mui/material'
import { useCallback, useState } from 'react'
import { makeStyles } from 'tss-react/mui'

import Ok from '@/assets/ok.svg?react'
import EuroIcon from '@/assets/euro.svg?react'
import DocumentsDocumentsIcon from '@/assets/documents-documents.svg?react'
import PinCodeIcon from '@/assets/pin-code.svg?react'
import ReportIcon from '@/assets/report.svg?react'

import { FrameItem } from '@/shared/ui/FrameItem'

import { ApplicationPassword } from './components/ApplicationPassword'
import { IdentificationStatus } from './components/IdentificationStatus'
import { LegalNotices } from './components/LegalNotices'
import { MyReports } from './components/MyReports'
import { PersonalInformation } from './components/PersonalInformation'
import { Pricing} from './components/Pricing'
import { settingsContext } from './settingsContext'
import { useBreakpoints } from '@/app/providers/BreakpointsProvider'
import { useTranslation } from 'react-i18next';

const areaMap: any = {
  'Identification status': <IdentificationStatus />,
  'Personal information': <PersonalInformation />,
  'My reports': <MyReports />,
  'Application password': <ApplicationPassword />,
  'Pricing': <Pricing />,
  'Legal notices': <LegalNotices />,
}
export function Settings() {
  const {t} = useTranslation();
  const [selectedArea, setSelectedArea] = useState('')
  const area = areaMap[selectedArea] || null
  const {xl} = useBreakpoints();

  return (
    <settingsContext.Provider
      value={{ closeArea: useCallback(() => setSelectedArea(''), []) }}
    >
      <Box
        padding="16px 30px 0 30px"
        marginBottom="36px"
        component={Typography}
        variant="h1"
      >
        {t('my_settings')}
      </Box>

      <Box
        display="flex"
        flexDirection="column" 
        height="100%"
        overflow="auto"
        padding="0 60px 60px 30px"
      >
        <Box display="flex" flexDirection={xl ? "column" : 'row'} gap="30px" marginBottom="19px">
          <Box display="flex" flexDirection="column" gap="24px" width="100%">
            <Typography noWrap variant="h2" color="pale blue">
              {t('general_information')}
            </Typography>

            <Box display="flex" flexDirection="column" gap="24px">
              <FrameItem
                component="button"
                onClick={() => {
                  setSelectedArea('Identification status')
                }}
                isSelected={selectedArea === 'Identification status'}
              >
                <Ok />
                <Typography noWrap variant="h3">{t('identification_status')}</Typography>
              </FrameItem>

              <FrameItem
                onClick={() => {
                  setSelectedArea('Personal information')
                }}
                isSelected={selectedArea === 'Personal information'}
              >
                <Typography noWrap variant="h3">{t('personal_information')}</Typography>
              </FrameItem>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" gap="24px" width="100%">
            <Typography noWrap variant="h2" color="pale blue">
              {t('account_and_app_settings')}
            </Typography>

            <Box display="flex" flexDirection="column" gap="24px">
              <FrameItem
                onClick={() => {
                  setSelectedArea('My reports')
                }}
                isSelected={selectedArea === 'My reports'}
              >
                <ReportIcon />
                <Typography noWrap variant="h3">{t('my_reports')}</Typography>
              </FrameItem>
              <FrameItem
                onClick={() => {
                  setSelectedArea('Application password')
                }}
                isSelected={selectedArea === 'Application password'}
              >
                <PinCodeIcon />
                <Typography noWrap variant="h3">{t('application_password')}</Typography>
              </FrameItem>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" gap="24px" width="100%">
            <Typography noWrap variant="h2" color="pale blue">
              {t('documents')}
            </Typography>

            <Box display="flex" flexDirection="column" gap="24px">
              <FrameItem
                onClick={() => {
                  setSelectedArea('Pricing')
                }}
                isSelected={selectedArea === 'Pricing'}
              >
                <EuroIcon />
                <Typography noWrap variant="h3">{t('pricing')}</Typography>
              </FrameItem>

              <FrameItem
                onClick={() => {
                  setSelectedArea('Legal notices')
                }}
                isSelected={selectedArea === 'Legal notices'}
              >
                <DocumentsDocumentsIcon />
                <Typography noWrap variant="h3">{t('legal_notices')}</Typography>
              </FrameItem>
            </Box>
          </Box>
        </Box>
        {area}
      </Box>
    </settingsContext.Provider>
  )
}
