import { createContext } from "react";

export interface ICtxAuth {
  token: string;
  phone?: string;
}

export const CtxAuthInfo = createContext<{
  loading: boolean;
  config: ICtxAuth | null;
}>({
  loading: false,
  config: null
});
