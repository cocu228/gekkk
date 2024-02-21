import { ActiveBonusProgram } from '@/shared/api/bank/deals';
import styles from '../ui/style.module.scss';


export const dealsData = {
  "EUR":[
    {
      id: ActiveBonusProgram.CASHBACK1,
      name: '1% cashback on all card purchases',
      accrualPeriod: 'Paid monthly',
      conditions: [
        'To get this cashback, you need to block GKE tokens',
        'Cashback is accrued within the amount not exceeding the same number of blocked GKE tokens',
        'GKE funds are blocked for 30 days'
      ],
      className: styles.CashbackCardLightOrange,
      mobileModalColor: styles.CashbackCardLightOrange,
      iconPath: "/img/cashback/one-cashback.svg",
      isActive: false
    },
    {
      id: ActiveBonusProgram.CASHBACK_FIAT,
      name: 'Crypto-fiat exchange without commission',
      accrualPeriod: '',
      conditions: [
        'It is necessary to block the volume of GKE tokens corresponding to the turnover in fiat',
        'GKE funds are blocked for 90 days'
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
      name: '4% per annum on your balance EURG',
      accrualPeriod: 'Monhly interest payout',
      conditions: [
        'Your weighted average balance for the reporting period is equal to or higher than 300 EURG',
        'Our upper limit for the balance to pay the interest rate is 100,000 EURG'
      ],
      className: styles.CashbackCardLightGreen,
      mobileModalColor: styles.CashbackCardLightGreen,
      iconPath: "/img/cashback/monthly-payout.svg",
      isActive: false
    },
    {
      id: ActiveBonusProgram.CASHBACK_FIAT,
      name: 'Crypto-fiat exchange without commission',
      accrualPeriod: '',
      conditions: [
        'To get this cashback, you need to block GKE tokens',
        'Cashback is accrued within the amount not exceeding the same number of blocked GKE tokens',
        'Сashback is credited once a month at the end of the billing period'
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
      name: '5% per annum on your balance GKE',
      accrualPeriod: 'Monhly interest payout',
      conditions: [
        '5% p.a. first year from the date of issue',
        '3% p.a. second year from the date of issue'
      ],
      className: styles.CashbackCardLightGreen,
      mobileModalColor: styles.CashbackCardLightGreen,
      iconPath: "/img/cashback/monthly-payout.svg",
      isActive: false
    },
    {
      id: ActiveBonusProgram.CASHBACK1,
      name: '1% cashback on all card purchases',
      accrualPeriod: 'Paid monthly',
      conditions: [
        'To get this cashback, you need to block GKE tokens',
        'Cashback is accrued within the amount not exceeding the same number of blocked GKE tokens',
        'GKE funds are blocked for 30 days'
      ],
      className: styles.CashbackCardLightOrange,
      mobileModalColor: styles.CashbackCardLightOrange,
      iconPath: "/img/cashback/one-cashback.svg",
      isActive: false
    },
    {
      id: ActiveBonusProgram.CASHBACK_FIAT,
      name: 'Crypto-fiat exchange without commission',
      accrualPeriod: '',
      conditions: [
        'It is necessary to block the volume of GKE tokens corresponding to the turnover in fiat',
        'GKE funds are blocked for 90 days'
      ],
      className: styles.CashbackCardLightBlue,
      mobileModalColor: styles.CashbackCardLightBlue,
      iconPath: "/img/cashback/exchange-without-comission.svg",
      isActive: false
    }
  ]


}