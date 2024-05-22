import {useContext} from 'react';
import styles from './styles.module.scss';
import InlineProperty from '@/shared/ui/inline-property';
import {DepositType} from '@/shared/config/deposits/types';
import {CtxCurrencies} from "@/processes/CurrenciesContext";
import {getGkePercent} from '@/shared/config/deposits/helpers';
import {CtxNewDeposit} from '@/widgets/new-deposit/model/context';

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
        percentageType,
        structuredStrategy,
        term_in_days: term,
        isGkeDeposit: isGke
    } = useContext(CtxNewDeposit);

    const {
        risePercent,
        dropPercent
    } = getGkePercent(percentageType, isGke);

    const {currencies} = useContext(CtxCurrencies);
    if (!currencies) return null

    const tokenData = currencies.get(tokenCurrency);


    if (!amount || (type === DepositType.STRUCTED && step < 5)) return null;

    return (
        <div className={`${className} -mt-10`}>
            <div className={`wrapper ${styles.InvestBlock}`}>
                <p className="text-lg font-bold mb-5">
                    You invest {amount} EURG {type === DepositType.STRUCTED && (
                    `in ${tokenData.name} (${tokenData.$const}) `
                )} for {type === DepositType.FIXED ? 360 : term} days
                </p>

                <div className='flex flex-col gap-3 md:gap-2'>
                    {type === DepositType.STRUCTED && (
                        <InlineProperty left="Current rate" right={`1 ${tokenData.$const} ~ ${rate.toFixed(2)} EURG`}/>
                    )}

                    <InlineProperty left="Risk level" right={
                        type === DepositType.FIXED ? "Fixed rate deposit" : `${structuredStrategy.name} strategy`
                    }/>

                    <InlineProperty
                        left="Returns rate"
                        // rightClassName={type === DepositType.STRUCTED ? '' : ''}
                        right={type === DepositType.FIXED
                            ? `${isGke ? '1,6' : '0,8'}% per month`
                            : `${risePercent}/${dropPercent}`}
                    />
                </div>
            </div>
        </div>
    );
};

export default DepositProperties;
