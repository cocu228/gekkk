import { create } from 'zustand'
import { devtools } from "zustand/middleware";
import { ActiveBonusProgram, apiGetDeals, AvailableDeal, Deal } from '@/shared/api/bank/deals/get-deals';
import styles from '@/widgets/wallet/programs/cashback/EUR/ui/style.module.scss';
import { apiOrganizations } from '@/shared/api/(no-usages)bank';

export interface IStoreDeals {
  deals: Deal[];
  getDeals: () => Promise<void>;
  toggleDeal: (id: ActiveBonusProgram) => void;
  resetDeals: () => void;
}

const initialDealsState = [
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

export const storeDeals = create<IStoreDeals>()(devtools((set) => ({
  deals: initialDealsState,

  getDeals: async () => {
    const { data: dataAvailableDeals } = await apiGetDeals();

    const { data: dataOrganizations } = await apiOrganizations();

    const activeProgramsBCC = dataOrganizations[0].accounts.filter((account) => account.accountType === 'PHYSICAL' && account.status !== 'DEBIT_BLOCKED')[0].activeBonusPrograms;

    const convertedDeals = dataAvailableDeals.availableDeals.map(deal => getConvertedDeal(deal));

    if (activeProgramsBCC.length) {
      convertedDeals.forEach(deal => {
        if (activeProgramsBCC.includes(deal.id)) deal.isActive = true
      } );
    }

    set(() =>  ({
        deals: [...convertedDeals, ...initialDealsState],
      })
    )
  },

  toggleDeal: async (id: ActiveBonusProgram) => {
    set((state) => {
      const newDealState = state.deals.map(deal => {
        if (deal.id === id) {
          return { ...deal, isActive: !deal.isActive };
        } else {
          return { ...deal, isActive: false };
        }
      });
      return ({
        deals: newDealState,
      })
    })
  },

  resetDeals: () => {
    set(() => {
      return ({
        deals: initialDealsState
      })
    })
  }
})));


const getConvertedDeal = (deal: AvailableDeal): Deal  => {
  return DealText[deal.dealName];
}


const DealText: { [key: string]: any } = {
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




