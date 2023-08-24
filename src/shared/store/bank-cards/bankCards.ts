import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import {IResCard, apiGetCards} from '@/shared/api';

export interface IStoreBankCards {
    bankCards: IResCard[];
    getBankCards: () => Promise<void>;
}

export const storeBankCards = create<IStoreBankCards>()(devtools((set) => ({
    bankCards: null,
    getBankCards: async () => {
        const {data} = await apiGetCards();

        set((state) => ({
            ...state,
            bankCards: data.result,
        }))
    }
})));
