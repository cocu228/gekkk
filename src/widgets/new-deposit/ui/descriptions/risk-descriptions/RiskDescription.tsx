import {useContext} from "react";
import {CtxNewDeposit} from "@/widgets/new-deposit/model/context";

const RiskDescription = () => {
    const {
        step,
        structuredStrategy
    } = useContext(CtxNewDeposit);

    return step < 1 ? null : (
        <div className="col px-7 mt-[50px] xl:hidden xxl:p-5">
            <div className="wrapper">{structuredStrategy?.descriptionLong}</div>
        </div>
    )
}

export default RiskDescription;
