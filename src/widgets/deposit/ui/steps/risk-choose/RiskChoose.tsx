import { useContext } from "react";
import { CtxNewDeposit } from "@/widgets/deposit/model/context";
import ChooseButton from "../../buttons/choose-button/ChooseButton";
import StructedDepositStrategies from "@/shared/config/deposits/structed-strategies";

const RiskChoose = () => {
    const {
        structedStrategy,
        onRiskLevelChange,
    } = useContext(CtxNewDeposit);

    return (
        <div className='px-10 mt-5 md:px-3 md:my-3'>
            <p className="text-gray-400 mb-2 font-medium text-base md:text-sm">
                Choose the risk level
            </p>

            <div className="flex">
                {StructedDepositStrategies.map((strategy) => (
                    <ChooseButton
                        key={`STRATEGY_${strategy.id}`}
                        isSelected={structedStrategy === strategy}
                        onClick={() => onRiskLevelChange(strategy)}
                    >
                        <div className="flex flex-col items-start text-start gap-3 justify-between h-full w-full md:items-center">
                            <div>
                                <p className="font-medium text-xl mb-1 md:text-sm md:text-center">{strategy.name} strategy</p>
                                <p className="text-gray-400 text-sm md:hidden">
                                    {strategy.descriptionShort}
                                </p>
                            </div>
                            <div className="flex flex-wrap justify-between w-full md:flex-col gap-2 xxl:gap-1">
                                <div className="flex items-center gap-2 md:flex-col">
                                    <p className="text-gray-400 text-sm">Risk</p>
                                    <div className="flex gap-1">
                                        {[1, 2, 3].map((_, index) => (
                                            <div className={`${index >= strategy.riskPoints ? 'bg-gray-200' : 'bg-red-800'} w-[0.5rem] h-[0.5rem] rounded-full`} />
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 md:flex-col">
                                    <p className="text-gray-400 text-sm">Return</p>
                                    <div className="flex gap-1">
                                        {[1, 2, 3].map((_, index) => (
                                            <div className={`${index >= strategy.returnPoints ? 'bg-gray-200' : 'bg-green'} w-[0.5rem] h-[0.5rem] rounded-full`} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ChooseButton>
                ))}
            </div>
        </div>
    )
}

export default RiskChoose;
