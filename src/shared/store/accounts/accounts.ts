import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { apiGetInfo } from "@/shared/(orval)api/gek";
import { getFlagsFromMask } from "@/shared/lib/helpers";
import { WalletInfo } from "@/shared/(orval)api/gek/model";
import { maskAccountRights } from "@/shared/config/mask-account-rights";

export type IWalletInfo = Omit<WalletInfo, "flags" | "account"> & {
  number: string;
  rights: Record<string, boolean>;
};

export interface IStoreAccounts {
  accounts: IWalletInfo[];
  setAccounts: (accounts: WalletInfo[]) => void;
  getAccounts: (refresh?: boolean) => Promise<void>;
}

export const storeAccounts = create<IStoreAccounts>()(
  devtools(set => ({
    accounts: null,
    setAccounts: (accounts: WalletInfo[]) => {
      set(state => ({
        ...state,
        accounts: accounts.map(acc => getAccountWithRights(acc))
      }));
    },
    getAccounts: async (refresh: boolean = false) => {
      const { data } = await apiGetInfo({ refresh });

      set(state => ({
        ...state,
        accounts: data.result.map(acc => getAccountWithRights(acc))
      }));
    }
  }))
);

const getAccountWithRights = (account: WalletInfo): IWalletInfo => {
  const accountRights = getFlagsFromMask(account.flags, maskAccountRights);

  return {
    name: account.name,
    phone: account.phone,
    rights: accountRights,
    number: account.account,
    current: account.current,
    account_id: account.account_id,
    date_update: account.date_update
  };
};
