import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import {apiGetBalance, IResBalance, IResMarketAssets} from "@/shared/api";
import {sortingListBalance, ISortedListBalance} from "@/shared/model/sorting-list-balance";

export interface IAvailableBalance {
    defaultListBalance: Array<IResBalance>;
    // filterListBalance: null,
    sortedListBalance: Array<ISortedListBalance> | null,
    getDefaultListBalance: () => Promise<boolean>;
    setSortedListBalance: (value: Array<IResMarketAssets>) => boolean;

}

export const storeListAvailableBalance = create<IAvailableBalance>()(devtools((set) => ({

    defaultListBalance: [],
    // filterListBalance: null,
    sortedListBalance: null,

    getDefaultListBalance: async () => {

        const result = await apiGetBalance()

        const {data} = result

        set((state) => ({...state, defaultListBalance: data ?? []}))

        return true

    },

    setSortedListBalance: (value) => {

        set((state) => {
            const result = sortingListBalance(state.defaultListBalance, value)
            return {...state, sortedListBalance: result}
        })

        return true
    }
})))