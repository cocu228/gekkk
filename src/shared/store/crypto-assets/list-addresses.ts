import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import {apiListAddresses, IResListAddresses} from "@/shared/api";

export interface IListAddresses {
    listAddresses: Array<IResListAddresses> | null;
    getListAddresses: () => Promise<Array<IResListAddresses>>
}

export const storeListAddresses = create<IListAddresses>()(devtools((set) => ({
    listAddresses: null,
    getListAddresses: async () => {
        const result = await apiListAddresses()
        const {data} = result
        set((state) => ({...state, listAddresses: data ?? []}))
        return data
    },
})))