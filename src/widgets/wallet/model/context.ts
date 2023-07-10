import React from 'react';
import {IResTokenNetwork} from "@/shared/api";
import {ICtxCurrencyData} from '@/processes/RootContext';
import {TNetworksForSelector} from "@/widgets/wallet/model/types";

export interface ICtxWalletNetworks {
    networksDefault: null | Array<IResTokenNetwork>,
    networksForSelector: null | TNetworksForSelector,
    networkIdSelect: null | number,
    addressesForQR: null | string,
    loading: boolean,
    refreshKey: null | string,
    setLoading: (loading: boolean) => void
    setNetworkId: (networkId: number) => void
    setRefresh: (refreshKey: string) => void
}

export const CtxWalletData = React.createContext<null | ICtxCurrencyData>(null);
export const CtxWalletNetworks = React.createContext<null | ICtxWalletNetworks>({
    networksDefault: null,
    networksForSelector: null,
    networkIdSelect: null,
    addressesForQR: null,
    loading: true,
    refreshKey: null,
    setLoading: function (loading: boolean) {
    },
    setNetworkId: function (networkId: number) {
    },
    setRefresh: function (refreshKey: string) {
    }
});
