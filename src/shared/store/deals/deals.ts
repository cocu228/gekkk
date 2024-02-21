import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import {apiBankGetPrograms} from '@/shared/(orval)api/gek';
import {ActiveBonusProgram} from '@/shared/api/bank/deals/get-deals';

export interface IStoreDeals {
  deals: ActiveBonusProgram[];
  getDeals: () => Promise<void>;
}

const initialDealsState = [ActiveBonusProgram.CASHBACK_GKE] 

export const storeDeals = create<IStoreDeals>()(devtools((set) => ({
  deals: initialDealsState,

  getDeals: async () => {

    //! get available deals from BCC
    // const { data: dataAvailableDeals } = await apiGetDeals();

    // console.log('Available deals BCC', dataAvailableDeals)

     //! get active user deals using organsation API from BCC

    // const { data: dataOrganizations } = await apiOrganizations();

    // console.log('Organisations BCC', dataOrganizations)


    // const activeProgramsBCC = dataOrganizations[0].accounts.filter((account) => account.accountType === 'PHYSICAL' && account.status !== 'DEBIT_BLOCKED')[0].activeBonusPrograms;

    const {data: userActivePrograms} = await apiBankGetPrograms();
    const convertedPrograms: ActiveBonusProgram[] =
        userActivePrograms.result.map(program => ActiveBonusProgram[program.programType]);

    set(() =>  ({
        deals: [...convertedPrograms, ...initialDealsState],
      })
    )
  },

  // toggleDeal: async (id: ActiveBonusProgram) => {
  //   set((state) => {
  //     const newDealState = state.deals.map(deal => {
  //       if (deal.id === id) {
  //         return { ...deal, isActive: !deal.isActive };
  //       } else {
  //         return { ...deal, isActive: false };
  //       }
  //     });
  //     return ({
  //       deals: newDealState,
  //     })
  //   })
  // },
})));




