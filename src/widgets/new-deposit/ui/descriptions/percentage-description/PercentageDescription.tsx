import {useContext} from "react";
import {getGkePercent} from "@/shared/config/deposits/helpers";
import {CtxNewDeposit} from "@/widgets/new-deposit/model/context";

const PercentageDescription = () => {
    const {
        percentageType,
        isGkeDeposit: isGke
    } = useContext(CtxNewDeposit);
    
    const {risePercent, dropPercent} = getGkePercent(percentageType, isGke);
    
    return !percentageType ? null : (
        <div className="col px-7 mt-[40px] xl:hidden xxl:p-5">
            <div className="row flex gap-3 mb-2">
                <img width={17} height={10} src="/img/icon/RateGrowthIcon.svg" alt="UserIcon" />
                <p>
                    Get <b>100%</b> of deposit amount plus <b>{risePercent}%</b> of
                    the rate growth if the crypto rises in price
                </p>
            </div>
            <div className="row flex gap-3">
                <img width={17} height={10} src="/img/icon/RateDropIcon.svg" alt="UserIcon" />
                <p>
                    Get <b>{dropPercent >= 0
                        ? '100%'
                        : `at least ${100 + dropPercent}%`
                    }</b> of deposit amount {dropPercent <= 0
                        ? null
                        : <span>
                            and <b>{dropPercent}% p.a.</b>
                        </span>
                    } if the crypto drops in price
                </p>
            </div>
        </div>
    )
}

export default PercentageDescription;
