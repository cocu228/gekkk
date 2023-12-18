import { Box, styled } from '@mui/material'

export const AccountBadgeBig = styled(Box)<{ disabled?: boolean }>(
  ({ theme, disabled }) => ({
    display: 'flex',
    padding: '3px 12px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    borderRadius: 10,
    color: disabled ? theme.palette['mid grey'] : theme.palette['pale blue'],
    backgroundColor: theme.palette[disabled ? 'brand white' : 'light blue'],
    boxShadow: theme.customShadows['dark-inner-glow'],
    flex: '0 0 auto',
    ...theme.typography.b1,
  }),
)
