import React from "react";
import {IRoomInfo} from "@/shared/api";
import {IExchangeField, IExchangePrice} from "./types";

export interface ICtxExchangeData {
    to: IExchangeField;
    from: IExchangeField;
    price: IExchangePrice;
    isLimitOrder: boolean;
    roomInfo: IRoomInfo | null;
    roomType: 'default' | 'creator' | 'visitor';
    onCurrenciesSwap?: () => void;
    onPriceCurrenciesSwap?: () => void;
    onRoomCreation?: (id: IRoomInfo) => void;
    onToValueChange?: (value: string) => void;
    onFromValueChange?: (value: string) => void;
    onRoomClosing?: (roomNumber: number) => void;
    onToCurrencyChange?: (value: string) => void;
    onPriceAmountChange?: (valie: string) => void;
    onFromCurrencyChange?: (value: string) => void;
    onIsLimitOrderChange?: (value: boolean) => void;
};

export const CtxExchangeData = React.createContext<ICtxExchangeData>(null);
