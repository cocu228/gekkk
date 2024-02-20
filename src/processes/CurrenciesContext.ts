import React from "react";
import Decimal from "decimal.js";
import ETokensConst from "@/shared/config/coins/constants";
import {GetBalanceOut, CurrencysOut} from "@/shared/(orval)api/gek/model";
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
    balance: null | GetBalanceOut;

    // TODO: Это удалить. тот кто писал просто гений
    lockOrders: null | number = null;
    userBalance: null | number = null;
    lockInBalance: null | number = null;
    lockOutBalance: null | number = null;
    availableBalance: null | Decimal = null;
    userBalanceEUREqu: null | number = null;

    constructor(asset: CurrencysOut, bal?: GetBalanceOut | null) {
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

        this.balance = bal;

        // TODO: Это удалить. тот кто писал просто гений
        if (bal) {
            this.lockOrders = bal.lock_orders;
            this.userBalance = bal.user_balance;
            this.lockInBalance = bal.lock_in_balance;
            this.lockOutBalance = bal.lock_out_balance;
            this.userBalanceEUREqu = bal.user_balance_EUR_equ;
            this.availableBalance = bal.free_balance ? new Decimal(bal.free_balance) : null; // что это такое? что за поле?
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
