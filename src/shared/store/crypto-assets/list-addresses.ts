import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import {apiListAddresses, IResListAddresses} from "@/shared/api";

export interface IListAddresses {
    listAddresses: Array<IResListAddresses>;
    getListAddresses: () => Promise<Array<IResListAddresses>>
}

export const storeListAddresses = create<IListAddresses>()(devtools((set) => ({

    listAddresses: [],

    getListAddresses: async () => {
        const result = await apiListAddresses()
        const {data} = result
        set((state) => ({...state, listAddresses: data ?? []}))
        return data
    },
})))