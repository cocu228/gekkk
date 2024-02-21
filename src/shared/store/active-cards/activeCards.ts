import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import {randomId} from "@/shared/lib/helpers";
import {apiBankGetCards} from '@/shared/(orval)api/gek';
import {Card as ICardData, CardFilter} from "@/shared/(orval)api/gek/model";

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
    //refreshKey: string;
    mainCard: ICardData | null;
    activeCards: ICardData[] | null;
    getActiveCards: () => Promise<void>;
    //updateCard: (card: IResCard) => void;
}

export const storeActiveCards = create<IStoreBankCards>()(devtools((set) => ({
    activeCards: null,
    mainCard: null,
    //refreshKey: null,
    getActiveCards: async () => {
        const {data} = await apiBankGetCards({filter: CardFilter.Active});
        
        set((state) => ({
            ...state,
            refreshKey: randomId(),
            activeCards: data.result,
            mainCard: data.result.find(c => c.productType === 'MAIN')
        }));},
    // updateCard: (card: IResCard) => {
    //     set((state) => {
    //         return ({
    //             ...state,
    //             refreshKey: randomId(),
    //             activeCards: [
    //                 ...state.activeCards.filter(c => c.cardId !== card.cardId),
    //                 card
    //             ]
    //         });
    //     });}
})));
