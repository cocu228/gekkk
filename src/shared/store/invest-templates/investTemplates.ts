import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import {apiTemplates, ITemplateType} from "@/shared/api";

export interface IStoreInvestTemplates {
    noFeeTemplate: ITemplateType;
    cashbackTemplate: ITemplateType;
    getInvestTemplates: () => Promise<void>;
}

export const storeInvestTemplates = create<IStoreInvestTemplates>()(devtools((set) => ({
    noFeeTemplate: null,
    cashbackTemplate: null,
    getInvestTemplates: async () => {
       const {data} = await apiTemplates();
       set((state) => ({
           ...state,
           noFeeTemplate: data.result.find(i => i.depo_type === 4),
           cashbackTemplate: data.result.find(i => i.depo_type === 3),
       }))
    }
})));
