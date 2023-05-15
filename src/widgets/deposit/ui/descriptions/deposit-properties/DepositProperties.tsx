import { useContext } from 'react';
import styles from './styles.module.scss';
import InlineProperty from '@/shared/ui/inline-property';
import { DepositType } from '@/shared/config/deposits/types';
import { CtxNewDeposit } from '@/widgets/deposit/model/context';

interface IParams {
    className?: string;
}

const DepositProperties = ({className}: IParams) => {
    const {
        type,
        step,
        rate,
        token,
        amount,
        term_in_days: term,
        percentageType,
        structedStrategy
    } = useContext(CtxNewDeposit);

    if (!amount || (type === DepositType.STRUCTED && step < 5))
        return null;

    return (
        <div className={`${className} -mt-10`}>
            <div className={`wrapper ${styles.InvestBlock}`}>
                <p className="text-lg font-bold mb-5">
                    You invest {amount} EURG {type === DepositType.STRUCTED && (
                        `in ${token.name} (${token.code}) `
                    )} for {type === DepositType.FIXED ? 360 : term} days
                </p>

                <div className='flex flex-col gap-3 md:gap-2'>
                    {type === DepositType.STRUCTED && (
                        <InlineProperty left="Current rate" right={`1 ${token.code} ~ ${rate.toFixed(2)} EURG`} />
                    )}

                    <InlineProperty left="Risk level" right={
                        type === DepositType.FIXED ? "Fixed rate deposit" : `${structedStrategy.name} strategy`
                    } />

                    <InlineProperty left="Returns rate" right={
                        type === DepositType.FIXED ? "0,8% per month" : `
                        ${percentageType.risePercentage}% rates growth 
                        ${token.code} or ${percentageType.dropPercentage}% p.a
                    `} />
                </div>
            </div>
        </div>
    );
};

export default DepositProperties;