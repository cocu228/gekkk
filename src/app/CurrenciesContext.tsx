import React from "react";


export const CtxCurrencyData = React.createContext<{
    // currencies: Map<string, ICtxCurrencyData>,
    setRefresh: () => void
    refreshKey: string
}>(null);
