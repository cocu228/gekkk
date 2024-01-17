import React from 'react';
import {IResTokenNetwork} from "@/shared/api";
import {ICtxCurrency} from '@/processes/CurrenciesContext';
import {TNetworksForSelector} from "@/widgets/wallet/transfer/model/types";

export interface ICtxWalletNetworks {
    tokenNetworks: null | Array<IResTokenNetwork>,
    networksForSelector: null | TNetworksForSelector,
    networkTypeSelect: number | null,
    addressesForQR: null | string,
    loading: boolean,
    refreshKey: null | string,
    setLoading: (loading: boolean) => void
    setNetworkType: (networkId: number) => void
    setRefresh: (quite?: boolean, amount?: number) => void
}

export const CtxWalletData = React.createContext<null | ICtxCurrency>(null)
export const CtxWalletNetworks = React.createContext<null | ICtxWalletNetworks>({
    tokenNetworks: null,
    networksForSelector: null,
    networkTypeSelect: null,
    addressesForQR: null,
    loading: true,
    refreshKey: null,
    setLoading: function (loading: boolean) {},
    setNetworkType: function (networkId: number) {},
    setRefresh: function (quite: boolean, amount: number) {}
});
