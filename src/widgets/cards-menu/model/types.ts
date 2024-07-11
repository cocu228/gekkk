import { Card as ICardData } from "@/shared/(orval)api/gek/model/card";

export type IOrderCardStep = "IssueNewCard" | "OrderConfirmation" | "SuccessCardOrder" | "DeliveryInfo";

export interface IOrderCardState {
  step: IOrderCardStep;
  isExpressDelivery: boolean;
  isResidenceAddress: boolean;

  // For ordering new card
  linkedPhone?: string;
  cardholderName?: string;
  cardType?: "VIRTUAL" | "PLASTIC";

  // For ordering existing card
  card?: ICardData | null;

  // Address
  city?: string | null;
  street?: string | null;
  postalCode?: string | null;
  houseNumber?: string | null;
  countryCode?: string | null;
  recipientName?: string | null;
  apartmentNumber?: string | null;
}

export type IOrderCardContext = {
  close: () => void;
  state: IOrderCardState;
  switchResidenceAddress: () => void;
  setState: (state: IOrderCardState) => void;
  setStep: (nextStep: IOrderCardStep) => void;
};

export interface ICardStorage {
  cards: ICardData[];
  refreshKey: string;
}
