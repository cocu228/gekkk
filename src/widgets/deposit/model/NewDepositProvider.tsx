import {useState} from "react";
import {PercentageType} from "./types";
import {IResMarketAsset} from "@/shared/api";
import {CtxNewDeposit, ICtxNewDeposit} from "./context";
import {RiskLevel} from "@/shared/config/deposits/risk-level";
import {DepositType} from "@/shared/config/deposits/deposit-type";

interface IProps {
    children: React.ReactNode
}

const NewDepositProvider = ({children, ...props}: IProps) => {
    const initialState: ICtxNewDeposit = {
        type: DepositType.FIXED,
        amount: null,
        minAmount: null,
        riskLevel: null,
        percentageType: null,
        term_in_days: null,
        token: null
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

    const handleRiskLevelChange = (value: RiskLevel) => {
        setState(prev => ({
            ...prev,
            riskLevel: value
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
    
    return <CtxNewDeposit.Provider value={({
        ...state,
        depositTypeChange: handleTypeChange,
        riskLevelChange: handleRiskLevelChange,
        amountChange: handleAmountChange,
        persentageTypeChange: handlePercentageTypeChange,
        termChange: handleTermChange,
        tokenChange: handleTokenChange,
    })}>
        {children}
    </CtxNewDeposit.Provider>
};

export default NewDepositProvider;
