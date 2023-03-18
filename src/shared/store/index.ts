import {create} from 'zustand'
// import {immer} from "zustand/middleware/immer";
import {devtools} from "zustand/middleware";
import {persist} from "zustand/middleware";
import {apiGetMarketAssets, IResMarketAssets} from "@/shared/api";
// import {AxiosResponse} from "axios";

export interface IAssetsCoinsName {
    assets: Array<IResMarketAssets>;
    getAssets: (phone: string, token: string) => void

}

export const assetsCoinsName = create<IAssetsCoinsName>()(persist(devtools((set) => ({
    assets: [],
    getAssets: async (phone: string, token: string) => {
        const result = await apiGetMarketAssets()
        const {data} = result
        //todo creat errorHandler
        set((state) => ({...state, assets: data ?? []}))
    },
})), {name: "assets", version: 1}))