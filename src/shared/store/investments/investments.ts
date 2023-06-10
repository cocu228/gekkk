import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import {apiInvestments, IResInvestment} from "@/shared/api";

export interface IStoreInvestments {
    investments: IResInvestment[];
    noFeeInvestment: IResInvestment;
    cashbackInvestment: IResInvestment;
    getInvestments: () => void
}

export const storeInvestments = create<IStoreInvestments>()(devtools((set) => ({
    investments: null,
    noFeeInvestment: null,
    cashbackInvestment: null,
    getInvestments: async () => {
        const {data} = await apiInvestments();

        set((state) => ({
            ...state,
            // Filter cashback and noFee investments
            investments: data.result.filter(i => ![3, 4].includes(i.dep_type)) ?? [],
            
            // Get noFee investment data
            noFeeInvestment: data.result.find(i => i.dep_type === 4),
            
            // Get cashback investment data
            cashbackInvestment: data.result.find(i => i.dep_type === 3)
        }));
    }
})));
