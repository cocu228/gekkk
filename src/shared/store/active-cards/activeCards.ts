import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { randomId } from "@/shared/lib/helpers";
import { apiGetCards } from "@/shared/(orval)api/gek";
import { Card as ICardData, CardFilter } from "@/shared/(orval)api/gek/model";

export const CardStatusDescriptions: Record<string, string> = {
  LOCKED: "card_locked",
  ACTIVE: "card_is_active",
  UNKNOWN: "unknown_status",
  PENDING: "card_is_pending",
  CARD_EXPIRED: "card_is_expired",
  CLOSED_BY_BANK: "card_is_closed_by_bank",
  BLOCKED_BY_BANK: "card_is_blocked_by_bank",
  CLOSED_BY_CUSTOMER: "card_is_closed_by_customer",
  LOST: "lost",
  PLASTIC_IN_WAY: "in_delivery_service",
  STOLEN: "stolen",
  DEBIT_BLOCKED: "debit_is_blocked",
  BLOCKED_BY_REGULATOR: "card_blocked_by_regulator",
  BLOCKED_BY_CUSTOMER: "card_blocked_by_client"
};

export interface IStoreBankCards {
  loading: boolean;
  mainCard: ICardData | null;
  activeCards: ICardData[] | null;
  getActiveCards: () => Promise<void>;
}

export const storeActiveCards = create<IStoreBankCards>()(
  devtools(set => ({
    loading: false,
    mainCard: null,
    activeCards: null,
    getActiveCards: async () => {
      set(state => ({
        ...state,
        loading: true
      }));

      const { data } = await apiGetCards({ filter: CardFilter.Active });

      set(state => ({
        ...state,
        loading: false,
        refreshKey: randomId(),
        activeCards: data.result,
        mainCard: data.result?.find(c => c.productType === "MAIN")
      }));
    }
  }))
);
