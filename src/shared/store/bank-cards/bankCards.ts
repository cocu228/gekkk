import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import {randomId} from "@/shared/lib/helpers";
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
    BLOCKED_BY_REGULATOR: 'Card blocked by regulator',
    BLOCKED_BY_CUSTOMER: 'Card blocked by client'
}

export interface IStoreBankCards {
    refreshKey: string;
    bankCards: IResCard[] | null;
    getBankCards: () => Promise<void>;
    updateCard: (card: IResCard) => void;
}

export const storeBankCards = create<IStoreBankCards>()(devtools((set) => ({
    bankCards: null,
    refreshKey: null,
    getBankCards: async () => {
        const {data} = await apiGetCards();
        
        set((state) => ({
            ...state,
            refreshKey: randomId(),
            bankCards: data.result,
        }));},
    updateCard: (card: IResCard) => {
        set((state) => {
            return ({
                ...state,
                refreshKey: randomId(),
                bankCards: [
                    ...state.bankCards.filter(c => c.cardId !== card.cardId),
                    card
                ]
            });
        });}
})));
