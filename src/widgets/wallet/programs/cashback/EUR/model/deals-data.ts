import { ActiveBonusProgram } from '@/shared/api/bank/deals';
import styles from '../ui/style.module.scss';


export const dealsData = [
  {
    id: ActiveBonusProgram.CASHBACK,
    name: '0,1% cashback on card transactions',
    accrualPeriod: 'Monhly interest payout',
    conditions: [
      'Card purchases amount - more than 200 € per month',
      'ATM withdrawals, card to card transfers, and transfers to the other financial services are excluded from cashback'
    ],
    className: styles.CashbackCardBlue,
    mobileModalColor: styles.CashbackCardMobileModalBlue,
    iconPath: "/img/cashback/eur-cashback.png",
    isActive: true
  },
  {
    id: ActiveBonusProgram.CASHBACK_GKE,
    name: '1% cashback on all card purchases',
    accrualPeriod: 'Paid monthly',
    conditions: [
      'To get this cashback, you need to block GKE tokens',
      'Cashback is accrued within the amount not exceeding the same number of blocked GKE tokens',
      'Сashback is credited once a month at the end of the billing period'
    ],
    className: styles.CashbackCardPurple,
    mobileModalColor: styles.CashbackCardMobileModalPurple,
    iconPath: "/img/cashback/one-cashback.svg",
    isActive: false
  }

]