import React from 'react';
import {ISortedListBalance} from "@/shared/model/sorting-list-balance";
import {TNetworksForSelector} from "@/widgets/wallet/model/types";
import {IResListAddresses, IResTokenNetwork} from "@/shared/api";

export interface ICtxWalletNetworks {
    networksDefault: null | Array<IResTokenNetwork>,
    networksForSelector: null | TNetworksForSelector,
    networkIdSelect: null | number,
    addressesForQR: null | IResListAddresses,
    loading: boolean,
    refreshKey: null | string,
    setLoading: (loading: boolean) => void
    setNetworkId: (networkId: number) => void
    setRefresh: (refreshKey: string) => void
}

export const CtxWalletCurrency = React.createContext<null | ISortedListBalance>(null);
export const CtxWalletNetworks = React.createContext<null | ICtxWalletNetworks>(null);