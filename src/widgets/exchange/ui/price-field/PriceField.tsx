import {useContext} from 'react';
import styles from './style.module.scss';
import Input from "@/shared/ui/input/Input";
import {CtxExchangeData} from '../../model/context';
import {useBreakpoints} from '@/app/providers/BreakpointsProvider';
import {formatAsNumberAndDot} from '@/shared/lib/formatting-helper';

function PriceField({disabled}: {disabled?: boolean}) {
    const {
        to,
        from,
        price,
        onPriceAmountChange,
        onPriceCurrenciesSwap
    } = useContext(CtxExchangeData);

    const {md} = useBreakpoints();
    
    const {
        amount,
        isSwapped
    } = price;

    return (
        <Input
            className={styles.Field}
            onChange={({target}) => onPriceAmountChange(formatAsNumberAndDot(target.value))}
            type="text"
            placeholder='0.00'
            disabled={!(from.currency && to.currency) || disabled}
            value={!amount ? '' : amount}
            prefix={to.currency && from.currency && (
                <div className={styles.FieldPriceLabel}>
                    <button
                        className={styles.FieldSwitchBtn}
                        onClick={onPriceCurrenciesSwap}
                    >
                        <span>{isSwapped
                            ? `${from.currency} per 1 ${to.currency}`
                            : `${to.currency} per 1 ${from.currency}`
                        }</span>

                        <img
                            width={md ? 20 : 24}
                            height={md ? 20 : 24}
                            src='/img/icon/ExchangeOrange.svg'
                            alt="ExchangeIcon"
                        />
                    </button>
                </div>
            )}
        />
    );
}

export default PriceField;
