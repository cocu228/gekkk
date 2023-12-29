import { Box, Typography } from '@mui/material'

import { AreaWrapper } from '../AreaWrapper'
import { Item } from './components/Item'
import { useContext } from 'react'
import { BreakpointsContext } from '@/app/providers/BreakpointsProvider'

export function Pricing() {
  const {xl} = useContext(BreakpointsContext)
  return (
    <AreaWrapper title="My tariffs">
      <Box paddingTop="36px" gap="16px" display="flex" flexDirection={xl ? 'column' : 'row'} justifyContent="space-between">
        <Box display="flex" gap="36px" flexDirection="column">
          <Item
            title="Fees and limits on transfers"
            rows={[
              { title: 'SEPA payments to another bank (account to account)', value: 'Free of charge up to 5 SEPA payments per month. Starting from the 6th payment - EUR 0,20' },
              { title: 'Internal Payment (account to account)', value: '0 EUR' },
              { title: 'Internal Payment (card to card)', value: '0 EUR' },
            ]}
          />
          <Item
            title="Service fees"
            rows={[
              { title: 'Account maintenance fee', value: '0.00 EUR monthly, 5 free Interbank SEPA payments included (1 IBAN account + 1 card)' },
              { title: 'Account maintenance fee', value: '2.00 EUR monthly, 5 free Interbank SEPA payments included (1 IBAN account + 1 card + additional cards)' },
              { title: 'Commission for using a mobile bank per month', value: '0 EUR' },
            ]}
          />
        </Box>
        <Box display="flex" gap="36px" flexDirection="column">
          <Item
            title="Bonus programs"
            rows={[
              { title: 'Cashback for card purchases (excluding ATM withdrawals and transfers)', value: '0.1% (min payout is 0,10 EUR per month)' },
              { title: 'Cashback for purchases on Amazon', value: '1% (max payout is 50 EUR per month)' },
              { title: 'Cashback for purchases at Play Market', value: '5% (min payout is 0,10 EUR per month)' },
            ]}
          />
          <Item
            title="Commissions and limits on card transactions"
            rows={[
              { title: 'Cash withdrawal at ATMs in the EU', value: 'Free of charge up to 200 EUR/month then 1% of the withdrawal amount' },
              { title: 'Cash withdrawal at ATMs outside the EU', value: '1% of the withdrawal amount, minimum 1.50 EUR' },
              { title: 'Daily cash withdrawal limit', value: '5 000 EUR' },
              { title: 'Monthly cash withdrawal limit', value: '10 000 EUR' },
              { title: 'Dormancy fee* (Effective May 9, 2020)', value: '15 EUR' },
            ]}
            description={'*The fee to be taken on a monthly basis from accounts with no transactions for more than 6 calendar months'}
          />
        </Box>
        <Box display="flex" gap="36px" flexDirection="column">
          <Item
            title="Additional services"
            rows={[
              { title: 'Account closure', value: '0 EUR' },
              { title: 'Additional card issue', value: '7,00 EUR' },
              { title: 'Extra fee if name on additional card is different from the main card', value: '5,00 EUR' },
              { title: 'Reissue of the card at the request of the client', value: '7,00 EUR' },
              { title: 'Account statement in paper format', value: '5,00 EUR' },
              { title: 'Card express delivery', value: 'Price depends on the client’s address and is shown in the App before placing order.' },
            ]}
          />
        </Box>
      </Box>
    </AreaWrapper>
  )
}
