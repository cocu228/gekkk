import { useContext } from "react";
import { CtxNewDeposit } from "@/widgets/deposit/model/context";

const PersentageDescription = () => {
    const { percentageType } = useContext(CtxNewDeposit);

    if (!percentageType) return null;

    return (
        <div className="col px-7 mt-9 xl:hidden xxl:p-5">
            <div className="row flex gap-3 mb-1">
                <img width={17} height={10} src="/img/icon/RateGrowthIcon.svg" alt="UserIcon" />
                <p>Get <span className="font-bold">{
                    percentageType.risePercentage
                }%</span> of the rate growth if the crypto rises in price</p>
            </div>
            <div className="row flex gap-3">
                <img width={17} height={10} src="/img/icon/RateDropIcon.svg" alt="UserIcon" />
                <p>Get <span className='font-bold'>{
                    percentageType.dropPercentage
                }% p.a.</span> if the crypto drops in price</p>
            </div>
        </div>
    )
}

export default PersentageDescription;
