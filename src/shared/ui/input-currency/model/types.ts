import {ICtxCurrencyData} from "@/app/CurrenciesContext"
import Decimal from "decimal.js";

export type TypeInputCurrency = {
    onChange: (v: string) => void;
    value: number | null | string;
    disabled?: boolean;
    showWill?: boolean;
    minValue?: number;
    header?: string | JSX.Element;
    currencyData: ICtxCurrencyData;
}
