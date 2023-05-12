import {useState} from "react";
import {IResMarketAsset} from "@/shared/api";
import {CtxNewDeposit, ICtxNewDeposit} from "./context";
import { DepositType, PercentageType, StructedDepositStrategy } from "@/shared/config/deposits/types";

interface IProps {
    children: React.ReactNode
}

const NewDepositProvider = ({children, ...props}: IProps) => {
    const initialState: ICtxNewDeposit = {
        step: 0,
        token: null,
        amount: null,
        minAmount: 1000,
        structedStrategy: null,
        term_in_days: null,
        percentageType: null,
        type: DepositType.FIXED
    }

    const [state, setState] = useState<ICtxNewDeposit>(initialState);

    const handleTypeChange = (value: DepositType) => {
        setState(prev => ({
            ...prev,
            type: value,
            minAmount: value === DepositType.FIXED ? 1000 : 100
        }));
    }
    
    const handleAmountChange = (value: number) => {
        setState(prev => ({
            ...prev,
            amount: value
        }));
    }

    const handleRiskLevelChange = (value: StructedDepositStrategy) => {
        setState(prev => ({
            ...prev,
            structedStrategy: value,
            percentageType: prev.step < 2 ? null : value.percentageTypes[0]
        }));
    }

    const handlePercentageTypeChange = (value: PercentageType) => {
        setState(prev => ({
            ...prev,
            percentageType: value
        }));
    }

    const handleTermChange = (value: number) => {
        setState(prev => ({
            ...prev,
            term_in_days: value
        }));
    }

    const handleTokenChange = (value: IResMarketAsset) => {
        setState(prev => ({
            ...prev,
            token: value
        }));
    }

    const handleNextStep = () => {
        const {
            token,
            amount,
            minAmount,
            structedStrategy: riskLevel,
            term_in_days,
            percentageType
        } = state

        const step = (amount >= minAmount ? 1 : 0)
        + (riskLevel !== null ? 1 : 0)
        + (percentageType !== null ? 1 : 0)
        + (term_in_days !== null ? 1 : 0)
        + (token !== null ? 1 : 0);

        setState(prev => ({
            ...prev,
            step: step
        }));
    }
    
    return <CtxNewDeposit.Provider value={({
        ...state,
        onDepositTypeChange: handleTypeChange,
        onRiskLevelChange: handleRiskLevelChange,
        onAmountChange: handleAmountChange,
        onPersentageTypeChange: handlePercentageTypeChange,
        onTermChange: handleTermChange,
        onTokenChange: handleTokenChange,
        onNextStep: handleNextStep
    })}>
        {children}
    </CtxNewDeposit.Provider>
};

export default NewDepositProvider;
