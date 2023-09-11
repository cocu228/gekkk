import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import {uncoverArray} from "@/shared/lib/helpers";
import {apiOrganizations, IResponseOrganizations} from "@/shared/api";

export interface IStoreOrganizations {
    organizations: IResponseOrganizations;
    getOrganizations: () => Promise<void>;
    cleaning: () => void;
}

export const storeOrganizations = create<IStoreOrganizations>()(devtools((set) => ({
    organizations: null,
    getOrganizations: async () => {
       const {data} = await apiOrganizations();
       set((state) => ({
           ...state,
           organizations: uncoverArray<IResponseOrganizations | null>(data),
       }))
    },
    cleaning: () => {
        set((state) => ({
            ...state,
            organizations: null
        }))
    },
})));
