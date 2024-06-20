import React from "react";

export const UasToken = React.createContext<{
    uasToken: string;
    getUasToken: () => void;
}>(null);
