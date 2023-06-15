import React from "react";
import {IRoomInfo} from "@/shared/api";

interface IExchangeField {
    amount: string;
    currency: string;
}

export interface ICtxExchangeData {
    price: number;
    to: IExchangeField;
    from: IExchangeField;
    validationErrors: false;
    roomInfo: IRoomInfo | null;
    roomType: 'default' | 'creator' | 'visitor';
    onCurrenciesSwap?: () => void;
    onRoomCreation?: (id: IRoomInfo) => void;
    onToValueChange?: (value: string) => void;
    onFromValueChange?: (value: string) => void;
    onRoomClosing?: (roomNumber: string) => void;
    onToCurrencyChange?: (value: string) => void;
    onFromCurrencyChange?: (value: string) => void;
};

export const CtxExchangeData = React.createContext<ICtxExchangeData>(null);
