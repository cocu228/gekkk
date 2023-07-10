import Decimal from "decimal.js";
import {ICtxCurrencyData} from "@/processes/RootContext"
import { CurrencyFlags } from "@/shared/config/mask-currency-flags";

export type TypeInputCurrency = {
    onChange: (v: string) => void;
    onCurrencyChange?: (c: string) => void;
    value: string | number;
    disabled?: boolean;
    excludedCurrencies?: Array<string>;
    balanceFilter?: boolean;
    allowedFlags?: null | Array<CurrencyFlags>
    flags?: number;
    currencySelector?: boolean;
    validateBalance?: boolean;
    showWill?: boolean;
    minValue?: Decimal | number | null;
    header?: string | JSX.Element;
    currencyData: ICtxCurrencyData | null;
}
