import React from "react";
import {IAccountInfo} from "@/shared/store/accounts/accounts";

export interface ICtxRootData {
    refreshKey: string;
    account: IAccountInfo;
    setRefresh: () => void;
    setAccount: (number: string) => void;
}

export const CtxRootData = React.createContext<ICtxRootData>(null);
