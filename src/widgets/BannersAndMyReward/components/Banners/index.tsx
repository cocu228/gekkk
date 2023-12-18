import { Box, IconButton, Typography, styled } from '@mui/material'

import { BannerWrapper } from './BannerWrapper'

const GoTo = styled(IconButton)(({ theme }) => ({
  borderRadius: '50%',
  border: '2px solid',
  borderColor: 'inherit',
  color: 'inherit',
  height: '24px',
  width: '24px',
}))

export function Banners() {
  return (
    <Box display="flex" flexDirection="column" gap="24px">
      <BannerWrapper
        color="dark blue"
        bgcolor="#54CFE7"
        width="100%"
        flex="0 0 auto"
      >
        <GoTo>{'>'}</GoTo>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor
        </Typography>
      </BannerWrapper>

      <Box display="flex" gap="24px">
        <BannerWrapper color="brand dark blue" bgcolor="#FFC7D4" width="100%">
          <GoTo>{'>'}</GoTo>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </Typography>
        </BannerWrapper>

        <BannerWrapper color="brand white" bgcolor="#1259AD" width="100%">
          <GoTo>{'>'}</GoTo>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </Typography>
        </BannerWrapper>
      </Box>
    </Box>
  )
}
