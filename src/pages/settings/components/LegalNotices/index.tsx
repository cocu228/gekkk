import { Box, Button } from '@mui/material'

import { AreaWrapper } from '../AreaWrapper'
import { useTranslation } from 'react-i18next'

export function LegalNotices() {
  const {t} = useTranslation();
  return (
    <AreaWrapper title={t("legal_notices")}>
      <Box
        display="flex"
        paddingTop="36px"
        gap="24px"
        flexDirection="column"
        alignItems="start"
      >
        <Button
          href="https://gekkard.com/terms-and-conditions.html"
          target="_blank"
          rel="noreferrer noopener"
          LinkComponent="a"
          variant="text-button"
        >
          {t('terms_and_conditions')}
        </Button>
        <Button
          href="https://gekkard.com/data-protection-policy.html"
          target="_blank"
          rel="noreferrer noopener"
          variant="text-button"
          LinkComponent="a"
        >
          {t('data_protection')}
        </Button>
        <Button
          href="/"
          target="_blank"
          rel="noreferrer noopener"
          LinkComponent="a"
          variant="text-button"
        >
          {t('third-party_software_libraries')}
        </Button>
      </Box>
    </AreaWrapper>
  )
}
