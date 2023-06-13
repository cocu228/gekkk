import React from "react";
// import { IResMarketAsset } from "@/shared/api";
import { DepositType, PercentageType, StructedDepositStrategy } from "@/shared/config/deposits/types";

export type ICtxNewDeposit = {
    step: number;
    rate: number;
    type: DepositType;
    amount: number | string | null;
    minAmount: number | null;
    term_in_days: number | null;
    tokenCurrency: string | null;
    percentageType: PercentageType | null;
    structedStrategy: StructedDepositStrategy | null;
    onNextStep?: () => void;
    onTermChange?: (value: number) => void;
    onAmountChange?: (value: string) => void;
    onTokenChange?: (value: string) => void;
    onDepositTypeChange?: (value: DepositType) => void;
    onPersentageTypeChange?: (value: PercentageType) => void;
    onRiskLevelChange?: (value: StructedDepositStrategy) => void;
}

export const CtxNewDeposit = React.createContext<ICtxNewDeposit>(null);
