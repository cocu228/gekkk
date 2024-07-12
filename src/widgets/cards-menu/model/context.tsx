import { createContext, useContext } from "react";

import { IOrderCardContext } from "./types";

export const OrderCardContext = createContext<IOrderCardContext>({
  state: {
    card: null,
    cardType: null,
    linkedPhone: null,
    step: "IssueNewCard",
    cardholderName: null,
    isExpressDelivery: false,
    isResidenceAddress: false
  },
  close: () => {},
  setStep: () => {},
  setState: () => {},
  switchResidenceAddress: () => {}
});

export function useOrderCardContext() {
  return useContext(OrderCardContext);
}
