import { Box, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { makeStyles } from 'tss-react/mui'

import Ok from '@/assets/ok.svg?react'
import EuroIcon from '@/assets/euro.svg?react'
import DocumentsDocumentsIcon from '@/assets/documents-documents.svg?react'
import PinCodeIcon from '@/assets/pin-code.svg?react'
import ReportIcon from '@/assets/report.svg?react'
import AccountIcon from '@/assets/account.svg?react'

import { FrameItem } from '@/shared/ui/FrameItem'

import { AccessManagement } from './components/ApplicationPassword'
import { IdentificationStatus } from './components/IdentificationStatus'
import { LegalNotices } from './components/LegalNotices'
import { MyReports } from './components/MyReports'
import { PersonalInformation } from './components/PersonalInformation'
import { Pricing} from './components/Pricing'
import { settingsContext } from './settingsContext'
import { useBreakpoints } from '@/app/providers/BreakpointsProvider'
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom'

const areaMap = {
  'identification-status': <IdentificationStatus />,
  'personal-information': <PersonalInformation />,
  'my-reports': <MyReports />,
  'access-management': <AccessManagement />,
  'pricing': <Pricing />,
  'legal-notices': <LegalNotices />,
}
type SettingsSections = keyof typeof areaMap | '';
export function Settings() {
  const {t} = useTranslation();
  const {xxl} = useBreakpoints();

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedArea = (searchParams.get('sestinasSection') || '') as SettingsSections;
  const area = areaMap[selectedArea] || null


  const setSelectedArea = useCallback((selectedArea: SettingsSections) => {
    if (!areaMap[selectedArea]) {
      searchParams.delete('sestinasSection')
      setSearchParams(searchParams, {replace: true});
    } else {
      searchParams.set('sestinasSection', selectedArea);
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    setSelectedArea(selectedArea);
  }, [])

  return (
    <settingsContext.Provider
      value={{ closeArea: useCallback(() => setSelectedArea(''), []) }}
    >
      {xxl && selectedArea ? null : <Box
        padding={xxl ? "0" : "16px 30px 0 30px"}
        marginBottom="36px"
        component={Typography}
        variant="h1"
      >
        {t('my_settings')}
      </Box>}

      <Box
      position={"relative"}
        display="flex"
        flexDirection="column" 
        height="100%"
        overflow={xxl && selectedArea ? "visible" : "auto"}
        padding={xxl ? "0" : "0 60px 60px 30px"}
      >
        <Box
          // visibility={xxl && selectedArea ? 'hidden' : undefined}
          display="flex"
          flexDirection={xxl ? "column" : 'row'}
          gap="30px"
          marginBottom="19px"
        >
          <Box display="flex" flexDirection="column" gap="24px" width="100%">
            <Typography noWrap variant="h2" color="pale blue">
              {t('general_information')}
            </Typography>

            <Box display="flex" flexDirection="column" gap="24px">
              <FrameItem
                component="button"
                onClick={() => {
                  setSelectedArea('identification-status')
                }}
                isSelected={selectedArea === 'identification-status'}
              >
                <Ok />
                <Typography noWrap variant="h3">{t('identification_status')}</Typography>
              </FrameItem>

              <FrameItem
                onClick={() => {
                  setSelectedArea('personal-information')
                }}
                isSelected={selectedArea === 'personal-information'}
              >
                <AccountIcon />
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
                  setSelectedArea('my-reports')
                }}
                isSelected={selectedArea === 'my-reports'}
              >
                <ReportIcon />
                <Typography noWrap variant="h3">{t('my_reports')}</Typography>
              </FrameItem>
              <FrameItem
                onClick={() => {
                  setSelectedArea('access-management')
                }}
                isSelected={selectedArea === 'access-management'}
              >
                <PinCodeIcon />
                <Typography noWrap variant="h3">{t('access_management')}</Typography>
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
                  setSelectedArea('pricing')
                }}
                isSelected={selectedArea === 'pricing'}
              >
                <EuroIcon />
                <Typography noWrap variant="h3">{t('pricing')}</Typography>
              </FrameItem>

              <FrameItem
                onClick={() => {
                  setSelectedArea('legal-notices')
                }}
                isSelected={selectedArea === 'legal-notices'}
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
