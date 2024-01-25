import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import {apiGetInvestments} from "@/shared/(orval)api/shared";
import {GetDepositOut} from "@/shared/(orval)api/shared/model";

export interface IStoreInvestments {
    noFeeInvestment: GetDepositOut;
    cashbackInvestment: GetDepositOut;
    getInvestments: () => void;
    updateNoFeeInvestment: (investment: GetDepositOut) => void;
    updateCashbackInvestment: (investment: GetDepositOut) => void;
}

export const storeInvestments = create<IStoreInvestments>()(devtools((set) => ({
    noFeeInvestment: null,
    cashbackInvestment: null,
    getInvestments: async () => {
        const {data} = await apiGetInvestments({
            end: null,
            start: null,
            investment_types: [3, 4]
        });
        
        set((state) => ({
            ...state,
            // Get noFee investment data
            noFeeInvestment: data.result.find(i => i.dep_type === 4),
            
            // Get cashback investment data
            cashbackInvestment: data.result.find(i => i.dep_type === 3)
        }));
    },
    updateNoFeeInvestment: (investment: GetDepositOut) => {
        set((state) => ({
            ...state,
            noFeeInvestment: investment
        }));
    },
    updateCashbackInvestment: (investment: GetDepositOut) => {
        set((state) => ({
            ...state,
            cashbackInvestment: investment
        }));
    },
})));
