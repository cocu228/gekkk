import React from 'react';
import {ICtxCurrency} from '@/processes/CurrenciesContext';
import {TNetworksForSelector} from "@/widgets/wallet/transfer/model/types";
import { PaymentDetails, TokensNetwork } from "@/shared/(orval)api/gek/model";

export interface ICtxWalletNetworks {
    tokenNetworks: null | Array<TokensNetwork>,
    networksForSelector: null | TNetworksForSelector,
    networkTypeSelect: number | null,
    addressesForQR: null | string,
    loading: boolean,
    refreshKey: null | string,
    localErrorInfoBox: JSX.Element;
    setLoading: (loading: boolean) => void
    setNetworkType: (networkId: number) => void
    setRefresh: (quite?: boolean, amount?: number) => void
    setBankRefresh: (paymentDetails: PaymentDetails) => void
}

export type WalletNetworksStateType = Omit<ICtxWalletNetworks, "setRefresh" | "setLoading" | "setNetworkType" | "setBankRefresh" | "localErrorInfoBox">

export const CtxWalletData = React.createContext<null | ICtxCurrency>(null)
export const CtxWalletNetworks = React.createContext<null | ICtxWalletNetworks>({
    tokenNetworks: null,
    networksForSelector: null,
    networkTypeSelect: null,
    addressesForQR: null,
    loading: true,
    refreshKey: null,
    localErrorInfoBox: null,
    setLoading: function (loading: boolean) {},
    setNetworkType: function (networkId: number) {},
    setRefresh: function (quite: boolean, amount: number) {},
    setBankRefresh: function (paymentDetails: PaymentDetails) {}
});
