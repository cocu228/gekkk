import React from "react";

export const CtxDisplayHistory = React.createContext<{displayHistory: () => void}>({
    displayHistory: () => {}
});
