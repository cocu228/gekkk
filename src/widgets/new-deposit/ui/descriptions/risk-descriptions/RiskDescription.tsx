import { useContext } from "react";
import { CtxNewDeposit } from "@/widgets/new-deposit/model/context";

const RiskDescription = () => {
    const { structedStrategy, step } = useContext(CtxNewDeposit);

    if (step < 1) return;

    return (
        <div className="col px-7 mt-[50px] xl:hidden xxl:p-5">
            <div className="wrapper">
                {structedStrategy?.descriptionLong}
            </div>
        </div>
    )
}

export default RiskDescription;
