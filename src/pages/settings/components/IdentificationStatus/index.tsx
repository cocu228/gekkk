import { Box, Typography } from '@mui/material'

import { AreaWrapper } from '../AreaWrapper'
import { useTranslation } from 'react-i18next';

export function IdentificationStatus() {
  const {t} = useTranslation();

  return (
    <AreaWrapper title="Identification status">
      <Box paddingTop="36px" display="flex" flexDirection="column" gap="24px">
        <Typography variant='b2' color="dark blue">
          {t('REGISTERED')}
        </Typography>
        <Typography paddingTop="24px" variant='b2' color="dark blue">
          {t('identification_status_message')}
        </Typography>
      </Box>
    </AreaWrapper>
  )
}
