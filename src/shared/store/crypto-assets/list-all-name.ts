import {create} from 'zustand'
// import {immer} from "zustand/middleware/immer";
import {devtools} from "zustand/middleware";
import {persist} from "zustand/middleware";
import {apiGetMarketAssets, IResMarketAsset} from "@/shared/api";

// import {AxiosResponse} from "axios";

export interface IListAllCryptoName {
    listAllCryptoName: Array<IResMarketAsset>;
    getListAllCryptoName: () => Promise<Array<IResMarketAsset>>

}

export const storeListAllCryptoName = create<IListAllCryptoName>()(devtools((set) => ({

    listAllCryptoName: [],

    getListAllCryptoName: async () => {
        const result = await apiGetMarketAssets()
        const {data} = result
        set((state) => ({...state, listAllCryptoName: data.result ?? []}))
        return data.result
    },
})))