import React, {Dispatch, SetStateAction} from 'react';
import {ISortedListBalance} from "@/shared/model/sorting-list-balance";
import {TAddressesForSelector} from "@/widgets/wallet-stage/top-up/model/types";

export interface ICtxWalletNetworks {
    addressesForSelector: null | TAddressesForSelector,
    loading: boolean,
    refreshKey: null | string,
    setState: Dispatch<SetStateAction<Omit<ICtxWalletNetworks, "setState">>>
}
export const CtxWalletCurrency = React.createContext<null | ISortedListBalance>(null);
export const CtxWalletNetworks = React.createContext<null | ICtxWalletNetworks>(null);