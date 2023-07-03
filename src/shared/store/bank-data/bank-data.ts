import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import {uncoverArray} from "@/shared/lib/helpers";
import {apiGetBankData, IBankAccount, IBankData} from "@/shared/api";

export interface IStoreBankData {
    bankData: IBankData;
    bankAccounts: Array<IBankAccount>;
    getBankData: () => Promise<{
        bankData: IBankData;
        bankAccounts: Array<IBankAccount>;
    }>;
}

export const storeBankData = create<IStoreBankData>()(devtools((set) => ({
    bankData: null,
    bankAccounts: [],
    getBankData: async () => {
        const {data} = await apiGetBankData();
        const bankData = uncoverArray<IBankData | null>(data);
        const accounts = bankData.accounts.filter(a =>
            a.name = bankData.trustedClients.find(tc => tc.clientId === a.clientId)?.name
        );

        set((state) => ({
            ...state,
            bankData: bankData,
            bankAccounts: accounts
        }));
        return {
            bankData: bankData,
            bankAccounts: accounts
        };
    },
})));
