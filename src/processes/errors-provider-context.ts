import React from "react";
import {TResponseErrorProvider} from "@/processes/errors-provider-types";
import {AxiosResponse} from "axios";

export const CtxNeedConfirm = React.createContext<{
    setSuccess: () => void;
    actionConfirmResponse: TResponseErrorProvider | null;
    pending?: {
        resolve: (value: any) => void;
        reject: (reason?: any) => void;
    }
}>(null);

export const CtxOfflineMode = React.createContext<{
    offline: boolean;
}>({offline: false});
