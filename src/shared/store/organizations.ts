import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import {uncoverArray} from "@/shared/lib/helpers";
import {apiGetBankData, IBankData} from "@/shared/api";
// REMOVE TEMPORARY STORAGE
// import $axios from '../lib/(cs)axios';
// import TEMP_ORG_STORAGE from './TEMP-ORG-STORAGE';

export interface IStoreBankData {
    organizations: IBankData;
    getOrganizations: () => Promise<void>;
    cleaning: () => void;
}

export const storeOrganizations = create<IStoreBankData>()(devtools((set) => ({
    organizations: null,
    getOrganizations: async () => {
       const {data} = await apiGetBankData();
       set((state) => ({
           ...state,
           organizations: uncoverArray<IBankData | null>(data),
       }))
    },
    cleaning: () => {
        set((state) => ({
            ...state,
            organizations: null
        }))
    },

    // REMOVE TEMPORARY STORAGE
    // getOrganizations: async () => {
    //     set((state) => ({
    //         ...state,
    //         organizations: TEMP_ORG_STORAGE[$axios.defaults.headers['Authorization'].toString()]
    //     }))
    // }
})));
