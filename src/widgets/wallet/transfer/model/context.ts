import { createContext } from "react";

import { ICtxCurrency } from "@/processes/CurrenciesContext";
import { TNetworksForSelector } from "@/widgets/wallet/transfer/model/types";
import { PaymentDetails, TokensNetwork } from "@/shared/(orval)api/gek/model";

export interface ICtxFeeNetworks {
  tokenNetworks: null | Array<TokensNetwork>;
  networkTypeSelect: number | null;
}

export interface ICtxWalletNetworks extends ICtxFeeNetworks {
  networksForSelector: null | TNetworksForSelector;
  addressesForQR: null | string;
  loading: boolean;
  refreshKey: null | string;
  localErrorInfoBox: JSX.Element;
  localErrorClear: () => void;
  setLoading: (loading: boolean) => void;
  setNetworkType: (networkId: number) => void;
  setRefresh: (quite?: boolean, amount?: number) => void;
  setBankRefresh: (paymentDetails: PaymentDetails) => void;
}

export type WalletNetworksStateType = Omit<
  ICtxWalletNetworks,
  "setRefresh" | "setLoading" | "setNetworkType" | "setBankRefresh" | "localErrorInfoBox" | "localErrorClear"
>;

export const CtxWalletData = createContext<null | ICtxCurrency>(null);
export const CtxWalletNetworks = createContext<null | ICtxWalletNetworks>({
  tokenNetworks: null,
  networksForSelector: null,
  networkTypeSelect: null,
  addressesForQR: null,
  loading: true,
  refreshKey: null,
  localErrorInfoBox: null,
  localErrorClear: () => {},
  setLoading: function () {},
  setNetworkType: function () {},
  setRefresh: function () {},
  setBankRefresh: function () {}
});

export const CtxFeeNetworks = createContext<ICtxFeeNetworks>({
  tokenNetworks: null,
  networkTypeSelect: null
});
