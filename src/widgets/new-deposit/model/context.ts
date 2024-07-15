// import { IResMarketAsset } from "@/shared/api";
import { createContext } from "react";

import { DepositType, PercentageType, StructedDepositStrategy } from "@/shared/config/deposits/types";

export type ICtxNewDeposit = {
  step: number;
  rate: number;
  type: DepositType;
  isGkeDeposit: boolean;
  amount: number | string | null;
  minAmount: number | null;
  term_in_days: number | null;
  tokenCurrency: string | null;
  percentageType: PercentageType | null;
  structuredStrategy: StructedDepositStrategy | null;
  onNextStep?: () => void;
  onIsGkeDepositChange?: () => void;
  onTermChange?: (value: number) => void;
  onAmountChange?: (value: string) => void;
  onTokenChange?: (value: string) => void;
  onDepositTypeChange?: (value: DepositType) => void;
  onPercentageTypeChange?: (value: PercentageType) => void;
  onRiskLevelChange?: (value: StructedDepositStrategy) => void;
};

export const CtxNewDeposit = createContext<ICtxNewDeposit>(null);
