import { Input, InputAdornment, inputBaseClasses, styled } from '@mui/material'
import Search from '@/assets/search.svg?react'

export const SearchItem = styled(
  Input,
  {},
)(({ theme }) => ({
  'padding': '3px 12px',
  'borderRadius': '10px',
  'background': theme.palette['pale grey'],
  'color': theme.palette['pale blue'],
  '&:before': {
    display: 'none',
  },
  '&:after': {
    display: 'none',
  },
  [`& .${inputBaseClasses.input}`]: {
    padding: 0,
  },
  ...theme.typography['b2 - bold'],
}))

SearchItem.defaultProps = {
  endAdornment: (
    <InputAdornment position="end">
      <Search />
    </InputAdornment>
  ),
}
