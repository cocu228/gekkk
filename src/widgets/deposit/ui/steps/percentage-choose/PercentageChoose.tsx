import { useContext } from "react";
import { CtxNewDeposit } from "@/widgets/deposit/model/context";
import ChooseButton from "../../buttons/choose-button/ChooseButton";

const PersentageChoose = () => {
    const {
        percentageType,
        structedStrategy,
        onPersentageTypeChange
    } = useContext(CtxNewDeposit);

    return (
        <div className='px-10 pb-5 xxl:py-3 xxl:px-4'>
            <p className="text-gray-400 mb-2 font-medium text-base md:text-sm">
                Choose the rate of return
            </p>

            <div className="flex">
                {structedStrategy.percentageTypes.map((pt) => (
                    <ChooseButton
                        isSelected={pt === percentageType}
                        onClick={() => onPersentageTypeChange(pt)}
                    >
                        {pt.risePercentage}/{pt.dropPercentage}
                    </ChooseButton>
                ))}
            </div>
        </div>
    )
}

export default PersentageChoose;
