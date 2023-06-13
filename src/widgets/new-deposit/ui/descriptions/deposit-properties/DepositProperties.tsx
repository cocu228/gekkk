import { useContext } from 'react';
import styles from './styles.module.scss';
import InlineProperty from '@/shared/ui/inline-property';
import { DepositType } from '@/shared/config/deposits/types';
import { CtxNewDeposit } from '@/widgets/new-deposit/model/context';
import { CtxCurrencyData } from '@/app/CurrenciesContext';

interface IParams {
    className?: string;
}

const DepositProperties = ({className}: IParams) => {
    const {
        type,
        step,
        rate,
        amount,
        tokenCurrency,
        term_in_days: term,
        percentageType,
        structuredStrategy
    } = useContext(CtxNewDeposit);

    // const {currencies} = useContext(CtxCurrencyData);
    // const tokenData = currencies.get(tokenCurrency);

    if (!amount || (type === DepositType.STRUCTED && step < 5))
        return null;

    return (
        <div className={`${className} -mt-10`}>
            <div className={`wrapper ${styles.InvestBlock}`}>
                <p className="text-lg font-bold mb-5">
                    You invest {amount} EURG {type === DepositType.STRUCTED && (
                    // `in ${tokenData.name} (${tokenData.currency}) `
                    ``
                )} for {type === DepositType.FIXED ? 360 : term} days
                </p>

                <div className='flex flex-col gap-3 md:gap-2'>
                    {type === DepositType.STRUCTED && (
                        // <InlineProperty left="Current rate" right={`1 ${tokenData.currency} ~ ${rate.toFixed(2)} EURG`} />
                        <InlineProperty left="Current rate" right={`1 null ~ ${rate.toFixed(2)} EURG`}/>
                    )}

                    <InlineProperty left="Risk level" right={
                        type === DepositType.FIXED ? "Fixed rate deposit" : `${structuredStrategy.name} strategy`
                    }/>

                    <InlineProperty left="Returns rate" right={
                        type === DepositType.FIXED ? "0,8% per month" : `
                        ${percentageType.risePercentage}% rates growth
                    `}/>
                    {/*<InlineProperty left="Returns rate" right={*/}
                    {/*    type === DepositType.FIXED ? "0,8% per month" : `*/}
                    {/*    ${percentageType.risePercentage}% rates growth */}
                    {/*    ${tokenData.currency} or ${percentageType.dropPercentage}% p.a*/}
                    {/*    ${tokenData.currency} or ${percentageType.dropPercentage}% p.a*/}
                    {/*`} />*/}
                </div>
            </div>
        </div>
    );
};

export default DepositProperties;
