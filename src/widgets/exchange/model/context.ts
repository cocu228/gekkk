import React from "react";
import {IExchangeField, IExchangePrice} from "./types";
import {RoomInfo} from "@/shared/(orval)api/shared/model";

export interface ICtxExchangeData {
    to: IExchangeField;
    from: IExchangeField;
    price: IExchangePrice;
    isLimitOrder: boolean;
    roomInfo: RoomInfo | null;
    roomType: 'default' | 'creator' | 'visitor';
    onCurrenciesSwap?: () => void;
    onIsLimitOrderChange?: () => void;
    onPriceCurrenciesSwap?: () => void;
    onRoomCreation?: (roomInfo: RoomInfo) => void;
    onToValueChange?: (value: string) => void;
    onFromValueChange?: (value: string) => void;
    onRoomClosing?: (roomNumber: number) => void;
    onToCurrencyChange?: (value: string) => void;
    onPriceAmountChange?: (valie: string) => void;
    onFromCurrencyChange?: (value: string) => void;
}

export const CtxExchangeData = React.createContext<ICtxExchangeData>(null);
