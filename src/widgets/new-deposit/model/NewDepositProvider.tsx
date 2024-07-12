import { ReactNode, useEffect, useState } from "react";

import { apiGetRates } from "@/shared/(orval)api/gek";
import { DepositType, PercentageType, StructedDepositStrategy } from "@/shared/config/deposits/types";

import { CtxNewDeposit, ICtxNewDeposit } from "./context";

interface IProps {
  children: ReactNode;
}

const NewDepositProvider = ({ children }: IProps) => {
  const initialState: ICtxNewDeposit = {
    step: 0,
    rate: null,
    amount: 1000,
    isGkeDeposit: false,
    tokenCurrency: null,
    minAmount: 1000,
    structuredStrategy: null,
    term_in_days: null,
    percentageType: null,
    type: DepositType.FIXED
  };

  const [state, setState] = useState<ICtxNewDeposit>(initialState);

  useEffect(() => {
    if (!state.tokenCurrency) return;

    (async () => {
      const { data } = await apiGetRates({ to: "EUR" });
      setState(prev => ({
        ...prev,
        rate: data.result[state.tokenCurrency]
      }));
    })();
  }, [state.tokenCurrency]);

  const handleTypeChange = (value: DepositType) => {
    function getMinAmount() {
      return value === DepositType.FIXED ? 1000 : 100;
    }

    setState(prev => ({
      ...prev,
      type: value,
      amount: getMinAmount(),
      minAmount: getMinAmount()
    }));
  };

  const handleAmountChange = (value: string) => {
    setState(prev => ({
      ...prev,
      amount: value
    }));
  };

  const handleRiskLevelChange = (value: StructedDepositStrategy) => {
    setState(prev => ({
      ...prev,
      structuredStrategy: value,
      percentageType: prev.step < 2 ? null : value.percentageTypes[0]
    }));
  };

  const handlePercentageTypeChange = (value: PercentageType) => {
    setState(prev => ({
      ...prev,
      percentageType: value
    }));
  };

  const handleTermChange = (value: number) => {
    setState(prev => ({
      ...prev,
      term_in_days: value
    }));
  };

  const handleTokenChange = (value: string) => {
    setState(prev => ({
      ...prev,
      tokenCurrency: value
    }));
  };

  const handleIsGkeChange = () => {
    setState(prev => ({
      ...prev,
      isGkeDeposit: !prev.isGkeDeposit
    }));
  };

  const handleNextStep = () => {
    const { amount, minAmount, term_in_days, tokenCurrency, percentageType, structuredStrategy } = state;

    const step =
      (+amount >= minAmount ? 1 : 0) +
      (structuredStrategy !== null ? 1 : 0) +
      (percentageType !== null ? 1 : 0) +
      (term_in_days !== null ? 1 : 0) +
      (tokenCurrency !== null ? 1 : 0);

    setState(prev => ({
      ...prev,
      step: step
    }));
  };

  return (
    <CtxNewDeposit.Provider
      value={{
        ...state,
        onNextStep: handleNextStep,
        onTermChange: handleTermChange,
        onTokenChange: handleTokenChange,
        onAmountChange: handleAmountChange,
        onDepositTypeChange: handleTypeChange,
        onIsGkeDepositChange: handleIsGkeChange,
        onRiskLevelChange: handleRiskLevelChange,
        onPercentageTypeChange: handlePercentageTypeChange
      }}
    >
      {children}
    </CtxNewDeposit.Provider>
  );
};

export default NewDepositProvider;
