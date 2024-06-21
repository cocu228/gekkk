import { createContext } from "react";

import { TResponseErrorProvider } from "@/processes/errors-provider-types";

export const CtxNeedConfirm = createContext<{
  setSuccess: () => void;
  actionConfirmResponse: TResponseErrorProvider | null;
  pending?: {
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
  };
}>(null);

export const CtxOfflineMode = createContext<{
  offline: boolean;
}>({ offline: false });
