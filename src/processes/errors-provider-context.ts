import { createContext } from "react";

import { TResponseErrorProvider } from "@/processes/errors-provider-types";

export const UasConfirmCtx = createContext<{
  setSuccess: () => void;
  actionConfirmResponse: TResponseErrorProvider | null;
  pending?: {
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
  };
  uasToken: string;
  getUasToken: () => void;
}>(null);
