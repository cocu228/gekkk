import {useContext} from 'react';
import {CtxNewDeposit} from '@/widgets/deposit/model/context';
import TypeDescriptions from '@/shared/config/deposits/deposit-type';
import StructuredProperties from '@/widgets/deposit/ui/deposit-structured/structured-properties/StructuredProperties';
import { DepositType } from '@/shared/config/deposits/types';

const AboutStructured = () => {
    const context = useContext(CtxNewDeposit);

    return (
        <>
            <div className='wrapper mb-[252px]'>
                {TypeDescriptions[DepositType.STRUCTED]}
            </div>

            {context.structedStrategy == null ? null : (
                <div className="wrapper mb-[120px]">
                    {context.structedStrategy.descriptionLong}
                </div>
            )}

            {context.percentageType == null ? null : (<div className="wrapper mb-[86px]">
                <div className="row flex gap-3 mb-1">
                    <img width={17} height={10} src="/img/icon/RateGrowthIcon.svg" alt="UserIcon"/>
                    <p>Get <span className="font-bold">{context.percentageType.risePercentage}%</span> of the rate growth if the crypto rises in price</p>
                </div>
                <div className="row flex gap-3">
                    <img width={17} height={10} src="/img/icon/RateDropIcon.svg" alt="UserIcon"/>
                    <p>Get <span className='font-bold'>{context.percentageType.dropPercentage}% p.a.</span> if the crypto drops in price</p>
                </div>
            </div>)}

            {context.term_in_days == null ? null : (<div className="wrapper mb-4">
                <p>You will get return in <span className="font-bold">{context.term_in_days} days</span></p>
            </div>)}

            {context.token === null ? null : <StructuredProperties/>}
        </>
    )
}

export default AboutStructured
