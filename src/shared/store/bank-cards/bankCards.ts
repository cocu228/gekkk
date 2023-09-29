import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import {IResCard, apiGetCards} from '@/shared/api';

export const CardStatusDescriptions: Record<string, string> = {
    LOCKED: 'Card locked',
    ACTIVE: 'Card is active',
    UNKNOWN: 'Unknown status',
    PENDING: 'Card is pending',
    CARD_EXPIRED: 'Card is expired',
    CLOSED_BY_BANK: 'Card is closed by bank',
    BLOCKED_BY_BANK: 'Card is blocked by bank',
    CLOSED_BY_CUSTOMER: 'Card is closed by customer',
    LOST: 'Lost',
    PLASTIC_IN_WAY: 'In delivery service',
    STOLEN: 'Stolen',
    DEBIT_BLOCKED: 'Debit is blocked',
    BLOCKED_BY_REGULATOR: 'Card is blocked by regulator'
}

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
            bankCards: data.result.sort(c => c.cardStatus === 'ACTIVE' ? -1 : c.cardStatus === 'LOCKED' ? 0 : 1),
        }))
    }
})));
