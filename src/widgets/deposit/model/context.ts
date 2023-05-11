import React from "react";
import {IResMarketAsset} from "@/shared/api";
import {DepositType, PercentageType, StructedDepositStrategy} from "@/shared/config/deposits/types";

export type ICtxNewDeposit = {
    type: DepositType;
    minAmount: number;
    amount: number;
    structedStrategy: null | StructedDepositStrategy;
    percentageType: null | PercentageType;
    term_in_days: null | number;
    token: null | IResMarketAsset;
    step: number;
    onDepositTypeChange?: (value: DepositType) => void;
    onAmountChange?: (value: number) => void;
    onRiskLevelChange?: (value: StructedDepositStrategy) => void;
    onPersentageTypeChange?: (value: PercentageType) => void;
    onTermChange?: (value: number) => void;
    onTokenChange?: (value: IResMarketAsset) => void;
    onNextStep?: () => void;
}

export const CtxNewDeposit = React.createContext<ICtxNewDeposit>(null);
