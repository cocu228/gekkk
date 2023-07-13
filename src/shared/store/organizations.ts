import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import {uncoverArray} from "@/shared/lib/helpers";
import {apiGetBankData, IBankData} from "@/shared/api";

export interface IStoreBankData {
    organizations: IBankData;
    getOrganizations: () => Promise<void>;
}

export const storeOrganizations = create<IStoreBankData>()(devtools((set) => ({
    organizations: null,
    getOrganizations: async () => {
        const {data} = await apiGetBankData();
        set((state) => ({
            ...state,
            organizations: uncoverArray<IBankData | null>(data),
        }))
    },
})));
