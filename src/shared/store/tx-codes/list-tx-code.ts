import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import {apiListTxCodes} from "@/shared/api/(gen)new";
import type {TxCodesOut} from "@/shared/api/(gen)new/model";

export interface IListTxCode {
    listTxCode: Array<TxCodesOut>;
    getListTxCode: () => Promise<Array<TxCodesOut>>
}

export const storeListTxCode = create<IListTxCode>()(devtools((set) => ({
    listTxCode: [],
    getListTxCode: async () => {
        const {data} = await apiListTxCodes();
        
        set((state) => ({
            ...state,
            listTxCode: data.result ?? []
        }));
        
        return data.result;
    },
})));
