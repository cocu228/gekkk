import React from "react";

export const CtxDisplayHistory = React.createContext<{ displayHistory: (value?: boolean) => void }>({
  displayHistory: (value?: boolean) => {}
});
