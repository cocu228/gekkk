import React from "react";
import ETokensConst from "@/shared/config/coins/constants";
import Decimal from "decimal.js";
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
    lockInBalance: null | number;
    lockOutBalance: null | number;
    availableBalance: null | Decimal;
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

        this.lockOrders = wallet ? wallet.lock_orders : null;
        this.lockInBalance = wallet ? wallet.lock_in_balance : null;
        this.lockOutBalance = wallet ? wallet.lock_out_balance : null;
        this.availableBalance = wallet ? new Decimal(wallet.free_balance) : null;
    }
}
export interface ICtxCurrencies {
    currencies: Map<string, ICtxCurrency>;
}

export const CtxCurrencies = React.createContext<ICtxCurrencies>(null);
