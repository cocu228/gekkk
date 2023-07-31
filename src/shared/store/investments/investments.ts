import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import {apiInvestments, IResInvestment} from "@/shared/api";

export interface IStoreInvestments {
    noFeeInvestment: IResInvestment;
    cashbackInvestment: IResInvestment;
    getInvestments: () => void;
    updateNoFeeInvestment: (investment: IResInvestment) => void;
    updateCashbackInvestment: (investment: IResInvestment) => void;
}

export const storeInvestments = create<IStoreInvestments>()(devtools((set) => ({
    noFeeInvestment: null,
    cashbackInvestment: null,
    getInvestments: async () => {
        const {data} = await apiInvestments(null, null);

        set((state) => ({
            ...state,
            // Get noFee investment data
            noFeeInvestment: data.result.find(i => i.dep_type === 4),
            
            // Get cashback investment data
            cashbackInvestment: data.result.find(i => i.dep_type === 3)
        }));
    },
    updateNoFeeInvestment: (investment: IResInvestment) => {
        set((state) => ({
            ...state,
            noFeeInvestment: investment
        }));
    },
    updateCashbackInvestment: (investment: IResInvestment) => {
        set((state) => ({
            ...state,
            cashbackInvestment: investment
        }));
    },
})));
