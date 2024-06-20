import React from "react";
import { Decimal } from "decimal.js";

export const CtxInputCurrencyOptions = React.createContext<Decimal>(null);
export const CtxInputCurrencyValid = React.createContext<boolean>(null);
