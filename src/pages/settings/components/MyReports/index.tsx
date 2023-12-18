import { Box } from '@mui/material'

import CircleIcon from '@/assets/color-circle-green.svg?react'
import { AccountBadgeBig } from '@/shared/ui/AccountBadgeBig'

import { AreaWrapper } from '../AreaWrapper'
import { Table } from './components/Table'
import { TitleContentAndBottomBorder } from '@/shared/ui/TitleContentAndBottomBorder'

export function MyReports() {
  return (
    <AreaWrapper title="My reports">
      <Box paddingTop="36px" display="flex" flexDirection="column" gap="12px">
        <TitleContentAndBottomBorder title="Account owner">
          <AccountBadgeBig>Igor Koroshev</AccountBadgeBig>
          <AccountBadgeBig>Cardination LLC</AccountBadgeBig>
        </TitleContentAndBottomBorder>
        <TitleContentAndBottomBorder title="Account number">
          <AccountBadgeBig>
            <CircleIcon /> My main account
          </AccountBadgeBig>
        </TitleContentAndBottomBorder>
      </Box>
      <Table />
    </AreaWrapper>
  )
}
