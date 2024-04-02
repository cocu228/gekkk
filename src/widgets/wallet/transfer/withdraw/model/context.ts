import React from "react";

export interface ITrxResultModalInfo {
    title?: string;
    content: JSX.Element;
}

export interface ITrxResultContext {
    handleCancel: () => void;
    setContent: (config: ITrxResultModalInfo) => void;
}

export const CtxModalTrxResult = React.createContext<ITrxResultContext>(null)
