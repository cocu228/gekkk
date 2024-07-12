import { createContext } from "react";

export const CtxDisplayHistory = createContext<{ displayHistory: (value?: boolean) => void }>({
  displayHistory: (_?: boolean) => {}
});
