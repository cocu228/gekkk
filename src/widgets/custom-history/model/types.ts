import { TransactTypeEnum } from "@/shared/(orval)api/gek/model";
import { ICtxCurrency } from "@/processes/CurrenciesContext";

export interface ISelectTxTypes {
  t: string;
  label: string;
  value: TransactTypeEnum[];
}

export interface ISelectCard {
  label: string;
  value: string;
}

export type SelectorType = "type" | "card" | "currency";
export type CurrenciesOptionType = { $const: string; currency: ICtxCurrency };
