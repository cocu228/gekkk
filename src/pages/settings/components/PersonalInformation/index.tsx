import { Box } from '@mui/material'

import { AreaWrapper } from '../AreaWrapper'
import { InfoItem } from './components/InfoItem'
import { useTranslation } from 'react-i18next';
import { useUserInfo } from './hooks/use-user-info';
export function PersonalInformation() {
  const {t} = useTranslation();

  const data = useUserInfo();
  
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
          <InfoItem 
            firstString={t("profile_name")} 
            secondString={data.name} 
          />
          <InfoItem
            firstString={t("profile_phone")}
            secondString={data.phone}
          />
        </Box>
        <Box width={"33%"} display="flex" flexDirection="column" gap="24px">
          <InfoItem 
            firstString={t("profile_email")} 
            secondString={data.email} />
          <InfoItem
            firstString={t("profile_citizenship")}
            secondString={data.citizenship}
          />
        </Box>
        <Box width={"33%"} display="flex" flexDirection="column" gap="24px">

          <InfoItem
            firstString={t("profile_street")}
            secondString={data.address}
          />
        </Box>
      </Box>
    </AreaWrapper>
  )
}
