import React from "react";
import Decimal from "decimal.js";
import $const from "@/shared/config/coins/constants";
import { IResBalance, IResMarketAsset } from "@/shared/api";

export class ICtxCurrencyData {
    id: null | number;
    name: null | string;
    flags: null | number;
    currency: null | $const;
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
        this.flags = asset.flags;
        this.currency = asset.code;
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

export const CtxCurrencyData = React.createContext<{
    currencies: Map<string, ICtxCurrencyData>,
    setRefresh: () => void
    refreshKey: string
}>(null);
