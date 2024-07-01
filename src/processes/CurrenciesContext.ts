import React from "react";
import Decimal from "decimal.js";
import ETokensConst from "@/shared/config/coins/constants";
import {GetBalanceOut, CurrencysOut} from "@/shared/(orval)api/gek/model";
import {getFlagsFromMask} from "@/shared/lib/helpers";
import {maskCurrencyFlags} from "@/shared/config/mask-currency-flags";

export class ICtxCurrency {
    [key: string]: unknown;
    // Asset params
    id: null | number;
    name: null | string;
    flags: Record<string, boolean>;
    $const: null | ETokensConst;
    minOrder: null | number;
    roundPrec: null | number;
    marketFee: null | number;
    ordersPrec: null | number;
    decimalPrec: null | number;
    defaultTokenNetworkIn: null | number;
    defaultTokenNetworkOut: null | number;

    // Wallet params
    balance: null | GetBalanceOut;

    constructor(asset: CurrencysOut, bal?: GetBalanceOut | null) {
        this.id = asset.unified_cryptoasset_id;
        this.name = asset.name;
        this.flags = getFlagsFromMask(asset.flags, maskCurrencyFlags);
        this.$const = asset.code as ETokensConst;
        this.minOrder = asset.min_order;
        this.roundPrec = asset.round_prec;
        this.marketFee = asset.market_fee;
        this.ordersPrec = asset.orders_prec;
        this.decimalPrec = asset.decimal_prec;
        this.defaultTokenNetworkIn = asset.default_token_network_in;
        this.defaultTokenNetworkOut = asset.default_token_network_out;

        this.balance = bal;
    }
}

export interface ICtxCurrencies {
    currencies: Map<string, ICtxCurrency>;
    totalAmount: Decimal | null;
}

export const CtxCurrencies = React.createContext<ICtxCurrencies>({
    currencies: null,
    totalAmount: null
});
