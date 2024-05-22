import {useContext} from "react";
import {CtxNewDeposit} from "@/widgets/new-deposit/model/context";
import ChooseButton from "../../buttons/choose-button/ChooseButton";

const TermChoose = () => {
    const {
        term_in_days: term,
        onTermChange
    } = useContext(CtxNewDeposit);

    return (
        <div className="px-10 md:px-3 my-5 md:my-3">
            <p className="text-gray-400 mb-2 font-medium text-base md:text-sm">
                Choose the deposit term (in days)
            </p>

            <div className="flex">
                {[90, 180, 270, 360].map((t => (
                    <ChooseButton
                        key={`TERM_IN_DAYS_${t}`}
                        isSelected={t === term}
                        onClick={() => onTermChange(t)}
                    >
                        {t} days
                    </ChooseButton>
                )))}
            </div>
        </div>
    )
}

export default TermChoose;
