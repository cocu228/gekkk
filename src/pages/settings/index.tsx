import { Box, Typography } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { makeStyles } from 'tss-react/mui'

import Ok from '@/assets/ok.svg?react'
import Info from '@/assets/info.svg?react';
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
import { SettingsButton } from '@/shared/ui/ButtonsMobile/settings-button';

import { PersonalInformation } from './templates/personalInformation';

import { AccessManagement } from './components/ApplicationPassword'
import { IdentificationStatus } from './components/IdentificationStatus'
import { LegalNotices } from './components/LegalNotices'
import { MyReports } from './components/MyReports'
// import { PersonalInformation } from './components/PersonalInformation'
import { Pricing} from './components/Pricing'
import { settingsContext } from './settingsContext'
import { useBreakpoints } from '@/app/providers/BreakpointsProvider'
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { AppVersion } from './templates/app-version';
import { ChangePassword } from './templates/change-password';
import { UserKeys } from './templates/user-keys/ui/user-keys';
import { storeAccountDetails } from '@/shared/store/account-details/accountDetails';
import { LoginAndSignHistory } from './templates/history';
import { UserSession } from './templates/user-session';
import { LanguageSettings } from './templates/language';

const areaMap = {
  'identification-status': <IdentificationStatus />,
  'personal-information': <PersonalInformation />,
  'my-reports': <MyReports />,
  'access-management': <AccessManagement />,
  'pricing': <Pricing />,
  'legal-notices': <LegalNotices />,
  'app-version': <AppVersion/>,
  'change-password': <ChangePassword/>,
  'user-keys' : <UserKeys />,
  'history': <LoginAndSignHistory/>,
  'user-sessions': <UserSession/>,
  'language': <LanguageSettings/>
}

type SettingsSections = keyof typeof areaMap | '';

export function Settings() {
  const {t} = useTranslation();
  const {xxl, md, lg, xl } = useBreakpoints();
  const [searchParams, setSearchParams] = useSearchParams();
  const {getAccountDetails} = storeAccountDetails();
  const selectedArea = useMemo(() => searchParams.get('sestinasSection') || '',[searchParams]) as SettingsSections;
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
      {!md && <Box
        padding={xxl ? "0" : "16px 30px 0 30px"}
        marginBottom="36px"
        component={Typography}
        variant="h1"
        className='text-lg'
      >
        {t('my_settings')}
      </Box>}

      <Box
        display="flex"
        flexDirection={selectedArea ? "row": "column"} 
        gap='15px'
        height="100%"
        overflow={xxl && selectedArea ? "visible" : "auto"}
        padding={xxl ? "0" : "0 60px 60px 30px"}
      >
        {
          (!xl || !area) && (

        <Box
          display="flex"
          flexDirection={"column"}
          gap="30px"
          marginBottom="19px"
        >
          <Box display="flex" flexDirection="column" gap="24px" >
            <Typography noWrap variant="h2" color={!md ? "pale blue" : "#7B797C"} fontWeight={md && '400'} fontSize={md && '18px'} className='typography-b1'>
              {t('general_information')}
            </Typography>

            <Box display="flex" flexDirection="column" gap={md ? "5px" : "24px"}>
              <SettingsButton 
                icon={<AccountIcon/>} 
                text={t('personal_information')}  
                onClick={() => {setSelectedArea('personal-information')}} 
                isSelected={selectedArea === 'personal-information'}
              />
              <SettingsButton 
                icon={<Info/>} 
                text={t("app_version")}  
                onClick={() => {setSelectedArea('app-version')}} 
                isSelected={selectedArea === 'app-version'}
              />
              <SettingsButton 
                icon={<World/>} 
                text={t('language')}  
                onClick={() => {setSelectedArea('language')}} 
                isSelected={selectedArea === 'language'}
              />
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" gap="24px" >
            <Typography noWrap variant="h2" color={!md ? "pale blue" : "#7B797C"} fontWeight={md && '400'} fontSize={md && '18px'} className='typography-b1'>
              {md ? 'Access management' : t('account_and_app_settings')}
            </Typography>

            <Box display="flex" flexDirection="column" gap={md ? "5px" : "24px"}>
            <SettingsButton 
                icon={<Guard/>} 
                text={t('change_password')} 
                onClick={() => {setSelectedArea('change-password')}} 
                isSelected={selectedArea === 'change-password'}
            />
            <SettingsButton 
                icon={<Keys/>} 
                text={t("user_keys")}
                onClick={() => {setSelectedArea('user-keys')}} 
                isSelected={selectedArea === 'user-keys'}  
            />
            <SettingsButton 
                icon={<Docs/>} 
                text={t("login_and_sign_history")}  
                onClick={() => {setSelectedArea('history')}} 
                isSelected={selectedArea === 'history'}
            />
            <SettingsButton 
                icon={<Chain/>} 
                text={t("user_sessions")}  
                onClick={() => {setSelectedArea('user-sessions')}} 
                isSelected={selectedArea === 'user-sessions'}
            />
            {/* <SettingsButton 
              icon={<PinCodeIcon/>} 
              text={t('access_management')}  
              onClick={() => {setSelectedArea('access-management')}} 
              isSelected={selectedArea === 'access-management'}
            /> */}
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" gap="24px">
            <Typography noWrap variant="h2" color={!md ? "pale blue" : "#7B797C"} fontWeight={md && '400'} fontSize={md && '18px'} className='typography-b1'>
              {md ? 'Documents and legal notices' : t('documents')}
            </Typography>

            <Box display="flex" flexDirection="column" gap={md ? "5px" : "24px"}>
              <SettingsButton 
                icon={<EuroIcon/>} 
                text={t('pricing')}  
                onClick={() => {
                  setSelectedArea('pricing')
                  
                }} 
                isSelected={selectedArea === 'pricing'}
              />
              <a href="https://gekkard.com/terms-and-conditions.html">
                <SettingsButton 
                  icon={<DocumentsDocumentsIcon/>} 
                  text={t('terms_and_conditions')}
                />
              </a>
              <SettingsButton 
                icon={<ReportIcon/>} 
                text={t('my_reports')}  
                onClick={() => {setSelectedArea('my-reports')}} 
                isSelected={selectedArea === 'my-reports'}
              />
              <a href="https://gekkard.com/data-protection-policy.html">
                <SettingsButton 
                  icon={<DocumentsDocumentsIcon />} 
                  text={t('data_protection')}  
                />
              </a>
            </Box>
          </Box>
        </Box>
          )
        }
        {area}
      </Box>
    </settingsContext.Provider>
  )
}
