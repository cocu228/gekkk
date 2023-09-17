import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import {uncoverArray, uncoverResponse} from "@/shared/lib/helpers";
import {apiGetMarketAssets, apiOrganizations, IResMarketAsset, IResponseOrganizations} from "@/shared/api";
import {AxiosResponse} from "axios";

export interface IStoreAssets {
    assets: Array<IResMarketAsset>;
    getAssets: () => Promise<Array<IResMarketAsset>>
}

export const storeAssets = create<IStoreAssets>()(devtools((set) => ({
    assets: null,
    getAssets: async () => {
        const data = await apiGetMarketAssets();

        set((state) => ({
            ...state,
            assets: uncoverResponse(data),
        }))

        return uncoverResponse(data)
    }
})));
