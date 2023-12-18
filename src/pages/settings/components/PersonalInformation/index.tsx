import { Box } from '@mui/material'

import { AreaWrapper } from '../AreaWrapper'
import { InfoItem } from './components/InfoItem'

export function PersonalInformation() {
  return (
    <AreaWrapper title="Personal information">
      <Box
        display="flex"
        flexDirection="column"
        gap="24px"
        paddingTop="36px"
        flex="0 0 auto"
      >
        <InfoItem firstString="Name" secondString={'name'} />
        <InfoItem
          firstString="Phone number"
          secondString={`+333333`}
        />
        <InfoItem firstString="Email" secondString="no in for in account" />
        <InfoItem
          firstString="Citizenship"
          secondString="no in for in account"
        />
        <InfoItem
          firstString="Residence address"
          secondString="no in for in account"
        />
      </Box>
    </AreaWrapper>
  )
}
