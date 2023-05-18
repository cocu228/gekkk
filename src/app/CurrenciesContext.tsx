import React from "react";
import Decimal from "decimal.js";
import $const from "@/shared/config/coins/constants";

export interface ICtxCurrencyData {
    id: null | number;
    name: null | string;
    flags: null | number;
    currency: null | $const;
    minOrder: null | number;
    roundPrec: null | number;
    ordersPrec: null | number;
    lockOrders: null | number;
    decimalPrec: null | number;
    lockInBalance: null | number;
    lockOutBalance: null | number;
    availableBalance: null | Decimal;
    defaultTokenNetworkIn: null | number;
    defaultTokenNetworkOut: null | number;
}

export const CtxCurrencyList = React.createContext<Map<string, ICtxCurrencyData>>(null);
