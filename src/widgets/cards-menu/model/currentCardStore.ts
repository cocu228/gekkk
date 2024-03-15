import { create } from "zustand";
import { Card as ICardData} from "@/shared/(orval)api/gek/model";

interface CardState {
    card: ICardData;
    setCard: (card: ICardData) => void
}
  
export const useCardStore = create<CardState>()((set) => ({
    card: null,
    setCard: (card) => set(() => ({ card })),
}))