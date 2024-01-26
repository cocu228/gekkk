import { create } from 'zustand'
import { devtools } from "zustand/middleware";
import { GetStatementsResponseType, StatementsByIBAN, apiGetStatements } from '@/shared/api/statements';
import { mockResponse } from './statementsMock';

export interface IStoreStatements {
    statementsOrigin: GetStatementsResponseType | null;
    getStatements: () => Promise<void>;
    filterByIBAN: (iban: string) => StatementsByIBAN[]
}

export const storeStatements = create<IStoreStatements>()(devtools((set, get) => ({
    statementsOrigin: null,
    getStatements: async () => {
        const {data} = await apiGetStatements();
        
        set((store) => {
            return {
                ...store,
                statementsOrigin: data.result || null
                // statementsOrigin: mockResponse as any
            };
        })
       
    },
    filterByIBAN: (iban: string) => {
        const result =  get().statementsOrigin.statements[iban];
        if(!result) {
            return [];
        }

        return result;
    }
})));