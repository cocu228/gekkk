import React from "react";
import Decimal from "decimal.js";
import {ICtxCurrencyData} from "@/processes/RootContext";

export const CtxInputCurrencyOptions = React.createContext<Decimal>(null);
export const CtxSelectorCurrency = React.createContext<ICtxCurrencyData>(null);
