import { createContext } from "react";

export interface ICtxAuth {
    uasToken: string;
    phone?: string;
}

export default createContext<ICtxAuth | null>(null);
