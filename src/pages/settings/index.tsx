import { Box, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { makeStyles } from 'tss-react/mui'

import Ok from '@/assets/ok.svg?react'
import Arrow from '@/assets/arrow.svg?react';
import World from '@/assets/world.svg?react';
import Guard from '@/assets/guard.svg?react';
import Chain from '@/assets/chain.svg?react';
import Docs from '@/assets/docs.svg?react';
import Keys from '@/assets/keys.svg?react';
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
  const {xxl, md } = useBreakpoints();

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedArea = (searchParams.get('sestinasSection') || '') as SettingsSections;
  const area = areaMap[selectedArea] || null


  const setSelectedArea = useCallback((selectedArea: SettingsSections) => {
    if (!areaMap[selectedArea]) {``
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
      {xxl && (md || selectedArea) ? null : <Box
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
            <Typography noWrap variant="h2" color={!md ? "pale blue" : "#7B797C"} fontWeight={md && '400'} fontSize={md && '18px'}>
              {t('general_information')}
            </Typography>

            <Box display="flex" flexDirection="column" gap={md ? "5px" : "24px"}>
            <FrameItem
                onClick={() => {
                  setSelectedArea('personal-information')
                }}
                isSelected={selectedArea === 'personal-information'}
                justifyContent={'space-between'}

              >
                <div className='flex gap-7'>
                  <AccountIcon />
                  <Typography noWrap variant="h3" color={md && '#29354C'} fontWeight={md && '400'}>{t('personal_information')}</Typography>
                </div>
                {md && <Arrow />}
              </FrameItem>
              <FrameItem
                component="button"
                onClick={() => {
                  setSelectedArea('identification-status')
                }}
                isSelected={selectedArea === 'identification-status'}
                justifyContent={'space-between'}
              >
                <div className='flex gap-7'>
                  <Ok />
                  <Typography noWrap variant="h3" color={md && '#29354C'} fontWeight={md && '400'}>{t('identification_status')}</Typography>
                </div>
                {md && <Arrow />}
              </FrameItem>
              {md && <FrameItem
                component="button"
                onClick={() => {
                  setSelectedArea('identification-status')
                }}
                isSelected={selectedArea === 'identification-status'}
                justifyContent={'space-between'}
              >
                <div className='flex gap-7'>
                  <World />
                  <Typography noWrap variant="h3" color={md && '#29354C'} fontWeight={md && '400'}>Language</Typography>
                </div>
                {md && <div className='flex gap-4'>
                  <Typography noWrap variant="h4" color={"#7B797C"} fontWeight={'400'} fontSize={'14px'}>
                    English
                  </Typography>
                  <Arrow />
                </div>}
              </FrameItem>}

              
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" gap="24px" width="100%">
            <Typography noWrap variant="h2" color={!md ? "pale blue" : "#7B797C"} fontWeight={md && '400'} fontSize={md && '18px'}>
              {md ? 'Access management' : t('account_and_app_settings')}
            </Typography>

            <Box display="flex" flexDirection="column" gap={md ? "5px" : "24px"}>
            {md && <FrameItem
                onClick={() => {
                  setSelectedArea('access-management')
                }}
                isSelected={selectedArea === 'access-management'}
                justifyContent={'space-between'}
              >
                <div className='flex gap-7'>
                  <Guard />
                  <Typography noWrap variant="h3" color={md && '#29354C'} fontWeight={md && '400'}>{'Change password'}</Typography>
                </div>
                {md && <Arrow />}
              </FrameItem>}
              {md && <FrameItem
                onClick={() => {
                  setSelectedArea('access-management')
                }}
                isSelected={selectedArea === 'access-management'}
                justifyContent={'space-between'}
              >
                <div className='flex gap-7'>
                  <Keys />
                  <Typography noWrap variant="h3" color={md && '#29354C'} fontWeight={md && '400'}>{'User keys'}</Typography>
                </div>
                {md && <Arrow />}
              </FrameItem>}
              {md && <FrameItem
                onClick={() => {
                  setSelectedArea('access-management')
                }}
                isSelected={selectedArea === 'access-management'}
                justifyContent={'space-between'}
              >
                <div className='flex gap-7'>
                  <Docs />
                  <Typography noWrap variant="h3" color={md && '#29354C'} fontWeight={md && '400'}>{'Login and sign history'}</Typography>
                </div>
                {md && <Arrow />}
              </FrameItem>}
              {md && <FrameItem
                onClick={() => {
                  setSelectedArea('access-management')
                }}
                isSelected={selectedArea === 'access-management'}
                justifyContent={'space-between'}
              >
                <div className='flex gap-7'>
                  <Chain />
                  <Typography noWrap variant="h3" color={md && '#29354C'} fontWeight={md && '400'}>{'User sessions'}</Typography>
                </div>
                {md && <Arrow />}
              </FrameItem>}
              <FrameItem
                onClick={() => {
                  setSelectedArea('access-management')
                }}
                isSelected={selectedArea === 'access-management'}
                justifyContent={'space-between'}
              >
                <div className='flex gap-7'>
                  <PinCodeIcon />
                  <Typography noWrap variant="h3" color={md && '#29354C'} fontWeight={md && '400'}>{t('access_management')}</Typography>
                </div>
                {md && <Arrow />}
              </FrameItem>
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" gap="24px" width="100%">
            <Typography noWrap variant="h2" color={!md ? "pale blue" : "#7B797C"} fontWeight={md && '400'} fontSize={md && '18px'}>
              {md ? 'Documents and legal notices' : t('documents')}
            </Typography>

            <Box display="flex" flexDirection="column" gap={md ? "5px" : "24px"}>
              <FrameItem
                onClick={() => {
                  setSelectedArea('pricing')
                }}
                isSelected={selectedArea === 'pricing'}
                justifyContent={'space-between'}
              >
                <div className='flex gap-7'>
                  <EuroIcon />
                  <Typography noWrap variant="h3" color={md && '#29354C'} fontWeight={md && '400'}>{t('pricing')}</Typography>
                </div>
                {md && <Arrow />}
              </FrameItem>

              <FrameItem
                onClick={() => {
                  setSelectedArea('legal-notices')
                }}
                isSelected={selectedArea === 'legal-notices'}
                justifyContent={'space-between'}
              >
                <div className='flex gap-7'>
                  <DocumentsDocumentsIcon />
                  <Typography noWrap variant="h3" color={md && '#29354C'} fontWeight={md && '400'}>{t('legal_notices')}</Typography>
                </div>
                {md && <Arrow />}
              </FrameItem>
              <FrameItem
                onClick={() => {
                  setSelectedArea('my-reports')
                }}
                isSelected={selectedArea === 'my-reports'}
                justifyContent={'space-between'}
              >
                <div className='flex gap-7'>
                  <ReportIcon />
                  <Typography noWrap variant="h3" color={md && '#29354C'} fontWeight={md && '400'}>{t('my_reports')}</Typography>
                </div>
                {md && <Arrow />}
              </FrameItem>
              {md && <FrameItem
                onClick={() => {
                  setSelectedArea('my-reports')
                }}
                isSelected={selectedArea === 'my-reports'}
                justifyContent={'space-between'}
              >
                <div className='flex gap-7'>
                  <DocumentsDocumentsIcon />
                  <Typography noWrap variant="h3" color={md && '#29354C'} fontWeight={md && '400'}>{'Terms and conditions'}</Typography>
                </div>
                {md && <Arrow />}
              </FrameItem>}
              <FrameItem
                onClick={() => {
                  setSelectedArea('my-reports')
                }}
                isSelected={selectedArea === 'my-reports'}
                justifyContent={'space-between'}
              >
                <div className='flex gap-7'>
                  <DocumentsDocumentsIcon />
                  <Typography noWrap variant="h3" color={md && '#29354C'} fontWeight={md && '400'}>{'Data protection'}</Typography>
                </div>
                {md && <Arrow />}
              </FrameItem>
            </Box>
          </Box>
        </Box>
        {area}
      </Box>
    </settingsContext.Provider>
  )
}
