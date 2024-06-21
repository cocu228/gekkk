import { createContext } from "react";

import { ICtxCurrency } from "@/processes/CurrenciesContext";
import { TNetworksForSelector } from "@/widgets/wallet/transfer/model/types";
import { TokensNetwork } from "@/shared/(orval)api/gek/model";

export interface ICtxWalletNetworks {
  tokenNetworks: null | Array<TokensNetwork>;
  networksForSelector: null | TNetworksForSelector;
  networkTypeSelect: number | null;
  addressesForQR: null | string;
  loading: boolean;
  refreshKey: null | string;
  setLoading: (loading: boolean) => void;
  setNetworkType: (networkId: number) => void;
  setRefresh: (quite?: boolean, amount?: number) => void;
}

export const CtxWalletData = createContext<null | ICtxCurrency>(null);
export const CtxWalletNetworks = createContext<null | ICtxWalletNetworks>({
  tokenNetworks: null,
  networksForSelector: null,
  networkTypeSelect: null,
  addressesForQR: null,
  loading: true,
  refreshKey: null,
  setLoading: function (_: boolean) {},
  setNetworkType: function (_: number) {},
  setRefresh: function (_: boolean, __: number) {}
});
