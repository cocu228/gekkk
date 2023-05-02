import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import {apiListAddresses, IResListAddresses} from "@/shared/api";

export interface IListAddresses {
    listAddresses: Array<IResListAddresses> | null;
    getListAddresses: (token_network) => Promise<Array<IResListAddresses>>
}

export const storeListAddresses = create<IListAddresses>()(devtools((set) => ({
    listAddresses: null,
    getListAddresses: async (token_network) => {
        const result = await apiListAddresses(token_network)
        const {data} = result
        set((state) => ({...state, listAddresses: data ?? []}))
        return data
    },
})))