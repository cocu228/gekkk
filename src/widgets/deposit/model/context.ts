import React from "react";
import {PercentageType} from "./types";
import {IResMarketAsset} from "@/shared/api";
import {RiskLevel} from "@/shared/config/deposits/risk-level";
import {DepositType} from "@/shared/config/deposits/deposit-type";

export type ICtxNewDeposit = {
    type: DepositType;
    minAmount: number;
    amount: number;
    riskLevel: null | RiskLevel;
    percentageType: null | PercentageType;
    term_in_days: null | number;
    token: null | IResMarketAsset;
    depositTypeChange?: (value: DepositType) => void;
    amountChange?: (value: number) => void;
    riskLevelChange?: (value: RiskLevel) => void;
    persentageTypeChange?: (value: PercentageType) => void;
    termChange?: (value: number) => void;
    tokenChange?: (value: IResMarketAsset) => void;
}

export const CtxNewDeposit = React.createContext<ICtxNewDeposit>(null);
