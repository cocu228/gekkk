import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import {apiListTxCodes, IResListTxCodes} from "@/widgets/wallet/code-transfer/api/list-tx-codes";
import {AxiosResponse} from "axios";

// import {AxiosResponse} from "axios";

export interface IListTxCode {
    listTxCode: Array<IResListTxCodes>;
    getListTxCode: () => Promise<Array<IResListTxCodes>>
}

export const storeListTxCode = create<IListTxCode>()(devtools((set) => ({

    listTxCode: [],
    getListTxCode: async () => {
        const result: AxiosResponse = await apiListTxCodes()
        const {data} = result
        set((state) => ({...state, listTxCode: data.result ?? []}))
        return data.result
    },
})))
