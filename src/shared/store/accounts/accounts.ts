import {create} from 'zustand'
import {devtools} from "zustand/middleware";
import {apiGetInfo} from "@/shared/api/(gen)new";
import {getFlagsFromMask} from '@/shared/lib/helpers';
import {WalletInfo} from "@/shared/api/(gen)new/model";
import {maskAccountRights} from '@/shared/config/account-rights';

export type IWalletInfo = Omit<WalletInfo, "flags" | "account"> & {
    number: string;
    rights: Record<string, boolean>;
}

export interface IStoreAccounts {
    accounts: IWalletInfo[];
    getAccounts: (refresh?: boolean) => Promise<void>;
}

export const storeAccounts = create<IStoreAccounts>()(devtools((set) => ({
    accounts: null,
    getAccounts: async (refresh: boolean = false) => {
        const {data} = await apiGetInfo({refresh});

        set((state) => ({
            ...state,
            accounts: data.result.map(acc => getAccountWithRights(acc)),
        }))
    }
})));

const getAccountWithRights = (account: WalletInfo): IWalletInfo => {
    const accountRights = getFlagsFromMask(account.flags, maskAccountRights);

    return ({
        name: account.name,
        phone: account.phone,
        rights: accountRights,
        number: account.account,
        current: account.current,
        account_id: account.account_id,
        date_update: account.date_update
    });
}
