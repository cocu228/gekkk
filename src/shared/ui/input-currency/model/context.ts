import { createContext } from "react";
import { Decimal } from "decimal.js";

export const CtxInputCurrencyOptions = createContext<Decimal>(null);
export const CtxInputCurrencyValid = createContext<boolean>(null);
