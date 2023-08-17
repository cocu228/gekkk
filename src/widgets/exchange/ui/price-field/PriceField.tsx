import {Input} from 'antd';
import {useContext} from 'react';
import styles from './style.module.scss';
import {CtxExchangeData} from '../../model/context';
import {formatAsNumberAndDot} from '@/shared/lib/formatting-helper';

function PriceField() {
    const {
        to,
        from,
        price,
        onPriceAmountChange,
        onPriceCurrenciesSwap
    } = useContext(CtxExchangeData);
    
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
            disabled={!(from.currency && to.currency)}
            value={!amount ? '' : amount}
            suffix={to.currency && from.currency && (
                <div className={styles.FieldPriceLabel}>
                    <span>{isSwapped
                        ? `${from.currency} per 1 ${to.currency}`
                        : `${to.currency} per 1 ${from.currency}`
                    }</span>
                    <button
                        className={styles.FieldSwitchBtn}
                        onClick={onPriceCurrenciesSwap}
                    >
                        <img
                            width={24}
                            height={24}
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
