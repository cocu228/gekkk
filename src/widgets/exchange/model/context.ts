import { createContext } from "react";

import { RoomInfo } from "@/shared/(orval)api/gek/model";

import { IExchangeField, IExchangePrice } from "./types";

export interface ICtxExchangeData {
  to: IExchangeField;
  from: IExchangeField;
  price: IExchangePrice;
  isLimitOrder: boolean;
  roomInfo: RoomInfo | null;
  roomType: "default" | "creator" | "visitor";
  onCurrenciesSwap?: () => void;
  onIsLimitOrderChange?: () => void;
  onPriceCurrenciesSwap?: () => void;
  onToValueChange?: (value: string) => void;
  onFromValueChange?: (value: string) => void;
  onToCurrencyChange?: (value: string) => void;
  onPriceAmountChange?: (valie: string) => void;
  onFromCurrencyChange?: (value: string) => void;
}

export const CtxExchangeData = createContext<ICtxExchangeData>(null);
