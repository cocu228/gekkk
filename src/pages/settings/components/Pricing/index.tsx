import { Box, Typography } from '@mui/material'

import { AreaWrapper } from '../AreaWrapper'
import { Item } from './components/Item'
import { useContext } from 'react'
import { BreakpointsContext } from '@/app/providers/BreakpointsProvider'
import { useTranslation } from 'react-i18next'

export function Pricing() {
  const {xl} = useContext(BreakpointsContext)
  const {t} = useTranslation()
  return (
    <AreaWrapper title={t("my_tariffs")}>
      <Box paddingTop="36px" gap="16px" display="flex" flexDirection={xl ? 'column' : 'row'} justifyContent="space-between">
        <Box display="flex" gap="36px" flexDirection="column">
          <Item
            title={t("fees_and_limits_on_transfers")}
            rows={[
              { title: t("sepa_payments"), value: t("free_of_charge") },
              { title: t("internal_payment_account"), value: '0 EUR' },
              { title: t("internal_payment_card"), value: '0 EUR' },
            ]}
          />
          <Item
            title={t("service_fees")}
            rows={[
              { title: t("account_maintenance"), value: t("account_maintenance_value", {value: "0.00", payments: 5}) },
              { title: t("account_maintenance"), value: t("account_maintenance_value_additional", {value: "2.00", payments: 5}) },
              { title: t("commission_for_using_mobile"), value: '0 EUR' },
            ]}
          />
        </Box>
        <Box display="flex" gap="36px" flexDirection="column">
          <Item
            title={t("bonus_programs")}
            rows={[
              { title: t("csh_purchases_card"), value: t("csh_purchases_card_value", {percent: "0.1%", payout: "0,10"}) },
              { title: t("csh_purchases_amazon"), value: t("csh_purchases_amazon_value", {percent: "1%", payout: "50"}) },
              { title: t("csh_purchases_playmarket"), value: t("csh_purchases_playmarket_value", {percent: "5%", payout: "0,10"}) },
            ]}
          />
          <Item
            title={t("comissions_and_limits")}
            rows={[
              { title: t("cash_withdrawal_at_atms_in_the_eu"), value: t("cash_withdrawal_at_atms_in_the_eu_value", {amount: 200, percent: "1%"})},
              { title: t("cash_withdrawal_at_atms_outside_the_eu"), value: t("cash_withdrawal_at_atms_outside_the_eu_value", {percent: "1%", amount: "1.50"}) },
              { title: t("daily_cash_withdrawal_limit"), value: '5 000 EUR' },
              { title: t("monthly_cash_withdrawal_limit"), value: '10 000 EUR' },
              { title: t("dormancy_fee"), value: '15 EUR' },
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
