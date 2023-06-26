import React from "react";
import {IRoomInfo} from "@/shared/api";

interface IExchangeField {
    amount: string | null;
    currency: string | null;
}

interface IExchangePrice {
    isSwapped: boolean;
    amount: number | null;
}

export interface ICtxExchangeData {
    to: IExchangeField;
    from: IExchangeField;
    price: IExchangePrice;
    validationErrors: false;
    roomInfo: IRoomInfo | null;
    roomType: 'default' | 'creator' | 'visitor';
    onCurrenciesSwap?: () => void;
    onPriceCurrenciesSwap?: () => void;
    onRoomCreation?: (id: IRoomInfo) => void;
    onToValueChange?: (value: string) => void;
    onFromValueChange?: (value: string) => void;
    onRoomClosing?: (roomNumber: string) => void;
    onToCurrencyChange?: (value: string) => void;
    onFromCurrencyChange?: (value: string) => void;
};

export const CtxExchangeData = React.createContext<ICtxExchangeData>(null);
