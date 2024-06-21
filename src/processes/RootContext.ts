import { createContext } from "react";

import { IWalletInfo } from "@/shared/store/accounts/accounts";

export interface ICtxRootData {
  refreshKey: string;
  account: IWalletInfo;
  setRefresh: () => void;
  setAccount: (number: string) => void;
}

export const CtxRootData = createContext<ICtxRootData>(null);
