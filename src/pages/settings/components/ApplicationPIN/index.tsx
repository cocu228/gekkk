import { Box, TextField } from '@mui/material'
import Button from "@/shared/ui/button/Button";
import { AreaWrapper } from '../AreaWrapper'

export function ApplicationPIN() {
  return (
    <AreaWrapper title="Change application PIN">
      <Box display="flex" padding="36px 0" gap="24px" flexDirection="column">
        <TextField label="Current online bank PIN" placeholder="Enter PIN" />
        <TextField label="New online bank PIN" placeholder="Enter new PIN" />
      </Box>
      <Button>Save</Button>
    </AreaWrapper>
  )
}
