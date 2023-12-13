import { Box, Button } from '@mui/material'

import { AreaWrapper } from '../AreaWrapper'

export function LegalNotices() {
  return (
    <AreaWrapper title="Change application PIN">
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
          Terms & Conditions
        </Button>
        <Button
          href="https://gekkard.com/data-protection-policy.html"
          target="_blank"
          rel="noreferrer noopener"
          variant="text-button"
          LinkComponent="a"
        >
          Data protection
        </Button>
        <Button
          href="/"
          target="_blank"
          rel="noreferrer noopener"
          LinkComponent="a"
          variant="text-button"
        >
          Third-party software libraries
        </Button>
      </Box>
    </AreaWrapper>
  )
}
