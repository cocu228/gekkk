import { Box, Typography } from '@mui/material'

import { AreaWrapper } from '../AreaWrapper'
import { Item } from './components/Item'

export function Pricing() {
  return (
    <AreaWrapper title="My tariffs">
      <Box paddingTop="36px" display="flex" justifyContent="space-between">
        <Box display="flex" gap="36px" flexDirection="column">
          <Item
            title="Account fees"
            rows={[
              { title: 'Account maintenance', value: '€ 10' },
              { title: 'Account maintenance', value: '€ 0' },
            ]}
          />
          <Item
            title="Account fees"
            rows={[
              { title: 'Account maintenance', value: '€ 10' },
              { title: 'Account maintenance', value: '€ 0' },
            ]}
          />
        </Box>
        <Box display="flex" gap="36px" flexDirection="column">
          <Item
            title="Account fees"
            rows={[
              { title: 'Account maintenance', value: '€ 10' },
              { title: 'Account maintenance', value: '€ 0' },
            ]}
          />
          <Item
            title="Account fees"
            rows={[
              { title: 'Account maintenance', value: '€ 10' },
              { title: 'Account maintenance', value: '€ 0' },
            ]}
          />
        </Box>
        <Box display="flex" gap="36px" flexDirection="column">
          <Item
            title="Account fees"
            rows={[
              { title: 'Account maintenance', value: '€ 10' },
              { title: 'Account maintenance', value: '€ 0' },
            ]}
          />
          <Item
            title="Account fees"
            rows={[
              { title: 'Account maintenance', value: '€ 10' },
              { title: 'Account maintenance', value: '€ 0' },
            ]}
          />
        </Box>
      </Box>
    </AreaWrapper>
  )
}
