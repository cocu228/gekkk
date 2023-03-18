import {create} from 'zustand'
// import {immer} from "zustand/middleware/immer";
import {devtools} from "zustand/middleware";
import {persist} from "zustand/middleware";
import {apiGetBalance, IResBalance} from "@/shared/api";

// import {AxiosResponse} from "axios";

export interface IAssetsCoinsName {
    cryptoAssets: Array<IResBalance>;
    get: (phone: string, token: string) => void

}

export const cryptoAssets = create<IAssetsCoinsName>()(persist(devtools((set) => ({

    cryptoAssets: [],
    get: async () => {
        const result = await apiGetBalance()

        const {data} = result
        //todo creat errorHandler
        set((state) => ({...state, cryptoAssets: data ?? []}))
    },
    set: (value) => {
        set((state) => ({...state, cryptoAssets: value ?? []}))
    }
})), {name: "assets", version: 1}))