import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import {uncoverResponse} from "@/shared/lib/helpers";
import {apiAssets} from "@/shared/(orval)api/shared";
import {CurrencysOut} from "@/shared/(orval)api/shared/model";

export interface IStoreAssets {
    assets: Array<CurrencysOut>;
    getAssets: () => Promise<Array<CurrencysOut>>
}

export const storeAssets = create<IStoreAssets>()(devtools((set) => ({
    assets: null,
    getAssets: async () => {
        const data = await apiAssets();

        set((state) => ({
            ...state,
            assets: uncoverResponse(data),
        }))

        return uncoverResponse(data)
    }
})));
