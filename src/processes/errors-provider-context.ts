import React from "react";
import {TDataErrorsBank} from "@/processes/errors-provider-types";

export const CtxNeedConfirm = React.createContext<{ data: TDataErrorsBank | null, setSuccess: () => void }>(null);
