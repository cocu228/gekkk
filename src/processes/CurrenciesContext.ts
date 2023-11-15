import React from "react";
import Decimal from "decimal.js";
import ETokensConst from "@/shared/config/coins/constants";
import {IResBalance, IResMarketAsset} from "@/shared/api";
import {getFlagsFromMask} from "@/shared/lib/helpers";
import {maskCurrencyFlags} from "@/shared/config/mask-currency-flags";


export class ICtxCurrency {
    id: null | number;
    name: null | string;
    flags: Record<string, boolean>;
    $const: null | ETokensConst;
    minOrder: null | number;
    roundPrec: null | number;
    ordersPrec: null | number;
    lockOrders: null | number;
    decimalPrec: null | number;
    userBalance: null | number;
    lockInBalance: null | number;
    lockOutBalance: null | number;
    availableBalance: null | Decimal;
    userBalanceEUREqu: null | number;
    defaultTokenNetworkIn: null | number;
    defaultTokenNetworkOut: null | number;

    constructor(asset: IResMarketAsset, wallet: IResBalance) {
        this.id = asset.unified_cryptoasset_id;
        this.name = asset.name;
        this.flags = getFlagsFromMask(asset.flags, maskCurrencyFlags);
        this.$const = asset.code;
        this.minOrder = asset.min_order;
        this.roundPrec = asset.round_prec;
        this.ordersPrec = asset.orders_prec;
        this.decimalPrec = asset.decimal_prec;
        this.defaultTokenNetworkIn = asset.default_token_network_in;
        this.defaultTokenNetworkOut = asset.default_token_network_out;

        this.lockOrders = wallet?.lock_orders;
        this.userBalance = wallet?.user_balance;
        this.lockInBalance = wallet?.lock_in_balance;
        this.lockOutBalance = wallet?.lock_out_balance;
        this.userBalanceEUREqu = wallet?.user_balance_EUR_equ;
        this.availableBalance = (wallet && wallet.free_balance) ? new Decimal(wallet.free_balance) : null;
    }
}

export type ITotalContainer = {
    EUR: Decimal | null;
    BTC: Decimal | null;
}

export interface ICtxCurrencies {
    ratesEUR: unknown;
    currencies: Map<string, ICtxCurrency>;
    totalAmount: ITotalContainer;
}

export const CtxCurrencies = React.createContext<ICtxCurrencies>(null);
