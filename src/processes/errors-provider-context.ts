import React from "react";
import {TResponseErrorProvider} from "@/processes/errors-provider-types";

export const CtxNeedConfirm = React.createContext<{ actionConfirmResponse: TResponseErrorProvider | null, setSuccess: () => void }>(null);
