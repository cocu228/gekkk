import { ActiveBonusProgram } from "@/shared/api/bank/deals/get-deals";
import { Deal } from "./types";
import styles from '../ui/style.module.scss';


export const initialDealsState = [
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


export function convertDeal(deal): Deal {
  return DealText[deal.dealName];
}

const DealText: { [key: string]: any } = {
  // [ActiveBonusProgram.CASHBACK1]: {
  //   id: ActiveBonusProgram.CASHBACK1,
  //   name: 'bonusCard.interest.main_title',
  //   accrualPeriod: 'bonusCard.cachback.label_7',
  //   conditions: [
  //     'bonusCard.cachback.label_4'
  //   ],
  //   isActive: false
  // },
  [ActiveBonusProgram.CASHBACK2]: {
    id: ActiveBonusProgram.CASHBACK2,
    name: '0,1% cashback on card transactions',
    accrualPeriod: 'Monhly interest payout',
    conditions: [
      'Card purchases amount - more than 200 € per month',
      'ATM withdrawals, card to card transfers, and transfers to the other financial services are excluded from cashback'
    ],
    className: styles.CashbackCardBlue,
    mobileModalColor: styles.CashbackCardMobileModalBlue,
    iconPath: "/img/cashback/eur-cashback.png",
    isActive: false
  },
  // [ActiveBonusProgram.CASHBACK3]: {
  //   id: ActiveBonusProgram.CASHBACK3,
  //   name: '3% cashback from WILDBERRIES',
  //   accrualPeriod: 'bonusCard.wildberries.sub_title',
  //   conditions: [
  //     'bonusCard.cachback.label_1',
  //     'bonusCard.cachback.label_2',
  //     'bonusCard.wildberries.description_3',
  //   ],
  //   isActive: false
  // },
  [ActiveBonusProgram.CASHBACK_AMAZON]: {
    id: ActiveBonusProgram.CASHBACK_AMAZON,
    name: '2% cashback on Amazon purchases',
    accrualPeriod: 'Paid monthly',
    conditions: [
      '2% cashback on all purchases made on Amazon with your Gekkard',
      'Maximum monthly payout is €50',
      'Minimum monthly payout is €0.10'
    ],
    className: styles.CashbackCardOrange,
    mobileModalColor: styles.CashbackCardMobileModalOrange,
    iconPath: "/img/cashback/amazon-cashback.svg",
    isActive: false
  },
  [ActiveBonusProgram.CASHBACK_MOBILE_STORES]: {
    id: ActiveBonusProgram.CASHBACK_MOBILE_STORES,
    name: '5% cashback on Google Play purchases',
    accrualPeriod: 'Paid monthly',
    conditions: [
      '5% cashback on all Google Play purchases made with your Gekkard',
      'Minimum monthly payout is €0.10'
    ],
    className: styles.CashbackCardGreen,
    mobileModalColor: styles.CashbackCardMobileModalGreen,
    iconPath: "/img/cashback/google-cashback.svg",
    isActive: false
  },
};