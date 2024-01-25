import React from "react";
import Decimal from "decimal.js";
import ETokensConst from "@/shared/config/coins/constants";
import {GetBalanceOut, CurrencysOut} from "@/shared/(orval)api/shared/model";
import {getFlagsFromMask} from "@/shared/lib/helpers";
import {maskCurrencyFlags} from "@/shared/config/mask-currency-flags";

export class ICtxCurrency {
    // Asset params
    id: null | number;
    name: null | string;
    flags: Record<string, boolean>;
    $const: null | ETokensConst;
    minOrder: null | number;
    roundPrec: null | number;
    ordersPrec: null | number;
    decimalPrec: null | number;
    defaultTokenNetworkIn: null | number;
    defaultTokenNetworkOut: null | number;

    // Wallet params
    lockOrders: null | number = null;
    userBalance: null | number = null;
    lockInBalance: null | number = null;
    lockOutBalance: null | number = null;
    availableBalance: null | Decimal = null;
    userBalanceEUREqu: null | number = null;

    constructor(asset: CurrencysOut, wallet?: GetBalanceOut | null) {
        this.id = asset.unified_cryptoasset_id;
        this.name = asset.name;
        this.flags = getFlagsFromMask(asset.flags, maskCurrencyFlags);
        this.$const = asset.code as ETokensConst;
        this.minOrder = asset.min_order;
        this.roundPrec = asset.round_prec;
        this.ordersPrec = asset.orders_prec;
        this.decimalPrec = asset.decimal_prec;
        this.defaultTokenNetworkIn = asset.default_token_network_in;
        this.defaultTokenNetworkOut = asset.default_token_network_out;

        if (wallet) {
            this.lockOrders = wallet.lock_orders;
            this.userBalance = wallet.user_balance;
            this.lockInBalance = wallet.lock_in_balance;
            this.lockOutBalance = wallet.lock_out_balance;
            this.userBalanceEUREqu = wallet.user_balance_EUR_equ;
            this.availableBalance = wallet.free_balance ? new Decimal(wallet.free_balance) : null;
        }
    }
}

export interface ICtxCurrencies {
    ratesEUR: unknown;
    currencies: Map<string, ICtxCurrency>;
    totalAmount: Decimal | null;
}

export const CtxCurrencies = React.createContext<ICtxCurrencies>({
    ratesEUR: null,
    currencies: null,
    totalAmount: null
});
