import {create} from 'zustand'
import {immer} from "zustand/middleware/immer";
import {devtools} from "zustand/middleware";
import {persist} from "zustand/middleware";
import {apiMarketAssets, IApiMarketAssets} from "@/shared/api";
import {AxiosResponse} from "axios";

interface IResponse {
    assets: Array<IApiMarketAssets> | [];
    getAssets: (phone: string, token: string) => void

}

export const assetsRootLayout = create<IResponse>()(persist(devtools((set) => ({
    assets: [],
    getAssets: async (phone: string, token: string) => {

        const result = await apiMarketAssets(phone, token)
        const {data} = result

        //todo creat errorHandler
        set((state) => ({...state, assets: data ?? []}))
    },
})), {name: "assets", version: 1}))