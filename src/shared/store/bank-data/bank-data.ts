import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import {apiGetBankData, IBankData} from "@/shared/api";

// import {AxiosResponse} from "axios";

export interface IStoreBankData {
    bankData: IBankData;
    getBankData: () => Promise<IBankData>
}

export const storeBankData = create<IStoreBankData>()(devtools((set) => ({
    bankData: null,
    getBankData: async () => {
        const {data} = await apiGetBankData();

        set((state) => ({...state, bankData: data[0] ?? null}));
        return data[0];
    },
})));
