import styles from '../ui/style.module.scss';

export const CASHBACK_DATA = [
  {
    subtitle: 'Monhly interest payout',
    className: styles.CashbackCardBlue,
    mobileModalColor: styles.CashbackCardMobileModalBlue,
    iconPath: "/img/cashback/eur-cashback.png",
    description: '0,1% cashback on card transactions',
    conditions: [
      'Card purchases amount - more than 200 € per month',
      'ATM withdrawals, card to card transfers, and transfers to the other financial services are excluded from cashback'
    ],
  },
  {
    subtitle: 'Paid monthly',
    className: styles.CashbackCardOrange,
    mobileModalColor: styles.CashbackCardMobileModalOrange,
    iconPath: "/img/cashback/amazon-cashback.svg",
    description: '2% cashback on Amazon purchases',
    conditions: [
      '2% cashback on all purchases made on Amazon with your Gekkard',
      'Maximum monthly payout is €50',
      'Minimum monthly payout is €0.10'
    ],
  },
  {
    subtitle: 'Paid monthly',
    className: styles.CashbackCardGreen,
    mobileModalColor: styles.CashbackCardMobileModalGreen,
    iconPath: "/img/cashback/google-cashback.svg",
    description: '5% cashback on Google Play purchases',
    conditions: [
      '5% cashback on all Google Play purchases made with your Gekkard',
      'Minimum monthly payout is €0.10'
    ],
  }
]