import { ActiveBonusProgram } from '@/shared/api/bank/deals';
import styles from '../ui/style.module.scss';
import { useEffect, useState } from 'react';



export const dealsData = {
  "EUR":[
    {
      id: ActiveBonusProgram.CASHBACK1,
      name: 'cashback_programs.1_perc_cash',
      accrualPeriod: 'cashback_programs.paid_monthly',
      conditions: [
        'cashback_programs.block_GKE_tokens',
        'cashback_programs.cashback_accrued',
        'cashback_programs.gke_blocked_30days'
      ],
      className: styles.CashbackCardLightOrange,
      mobileModalColor: styles.CashbackCardLightOrange,
      iconPath: "/img/cashback/one-cashback.svg",
      isActive: false
    },
    {
      id: ActiveBonusProgram.CASHBACK_FIAT,
      name: 'cashback_programs.cash_without_commision',
      accrualPeriod: '',
      conditions: [
        'cashback_programs.necessary_block',
        'cashback_programs.gke_blocked_90days'
      ],
      className: styles.CashbackCardLightBlue,
      mobileModalColor: styles.CashbackCardLightBlue,
      iconPath: "/img/cashback/exchange-without-comission.svg",
      isActive: false
    }
  ],
  "EURG":[
    {
      id: ActiveBonusProgram.CASHBACK,
      name: 'cashback_programs.4_perc_cash',
      accrualPeriod: 'cashback_programs.paid_monthly_interest',
      conditions: [
        'cashback_programs.higher_300',
        'cashback_programs.limit_100000'
      ],
      className: styles.CashbackCardLightGreen,
      mobileModalColor: styles.CashbackCardLightGreen,
      iconPath: "/img/cashback/monthly-payout.svg",
      isActive: false
    },
    {
      id: ActiveBonusProgram.CASHBACK_FIAT,
      name: 'cashback_programs.cash_without_commision',
      accrualPeriod: '',
      conditions: [
        'cashback_programs.block_GKE_tokens',
        'cashback_programs.cashback_accrued',
        'cashback_programs.once_month'
      ],
      className: styles.CashbackCardLightBlue,
      mobileModalColor: styles.CashbackCardLightBlue,
      iconPath: "/img/cashback/exchange-without-comission.svg",
      isActive: false
    }
  ],
  "GKE":[
    {
      id: ActiveBonusProgram.CASHBACK,
      name: 'cashback_programs.5_perc_cash',
      accrualPeriod: 'cashback_programs.paid_monthly_interest',
      conditions: [
        'cashback_programs.first_year',
        'cashback_programs.second_year'
      ],
      className: styles.CashbackCardLightGreen,
      mobileModalColor: styles.CashbackCardLightGreen,
      iconPath: "/img/cashback/monthly-payout.svg",
      isActive: false
    },
    {
      id: ActiveBonusProgram.CASHBACK1,
      name: 'cashback_programs.1_perc_cash',
      accrualPeriod: 'cashback_programs.paid_monthly',
      conditions: [
        'cashback_programs.block_GKE_tokens',
        'cashback_programs.cashback_accrued',
        'cashback_programs.gke_blocked_30days'
      ],
      className: styles.CashbackCardLightOrange,
      mobileModalColor: styles.CashbackCardLightOrange,
      iconPath: "/img/cashback/one-cashback.svg",
      isActive: false
    },
    {
      id: ActiveBonusProgram.CASHBACK_FIAT,
      name: 'cashback_programs.cash_without_commision',
      accrualPeriod: '',
      conditions: [
        'cashback_programs.necessary_block',
        'cashback_programs.gke_blocked_90days'
      ],
      className: styles.CashbackCardLightBlue,
      mobileModalColor: styles.CashbackCardLightBlue,
      iconPath: "/img/cashback/exchange-without-comission.svg",
      isActive: false
    }
  ]


}