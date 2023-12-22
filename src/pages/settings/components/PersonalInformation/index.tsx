import { Box } from '@mui/material'

import { AreaWrapper } from '../AreaWrapper'
import { InfoItem } from './components/InfoItem'
import { useTranslation } from 'react-i18next';

export function PersonalInformation() {
  const {t} = useTranslation();
  
  return (
    <AreaWrapper title={t("personal_information")}>
      <Box
        display="flex"
        gap="24px"
        justifyContent={"space-between"}
        paddingTop="36px"
        flex="0 0 auto"
      >
        <Box width={"33%"} display="flex" flexDirection="column" gap="24px">
          <InfoItem firstString={t("profile_name")} secondString={'name'} />
          <InfoItem
            firstString={t("profile_phone")}
            secondString={`+333333`}
          />
        </Box>
        <Box width={"33%"} display="flex" flexDirection="column" gap="24px">
          <InfoItem firstString={t("profile_email")} secondString="no in for in account" />
          <InfoItem
            firstString={t("profile_citizenship")}
            secondString="no in for in account"
          />
        </Box>
        <Box width={"33%"} display="flex" flexDirection="column" gap="24px">

          <InfoItem
            firstString={t("profile_street")}
            secondString="no in for in account"
          />
        </Box>
      </Box>
    </AreaWrapper>
  )
}
