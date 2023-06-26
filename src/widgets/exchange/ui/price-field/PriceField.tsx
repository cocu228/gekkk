import { useContext } from 'react';
import styles from '@/shared/ui/input-currency/style.module.scss';
import { CtxExchangeData } from '../../model/context';

function PriceField() {
    const {
        to,
        from,
        price,
        onPriceCurrenciesSwap
    } = useContext(CtxExchangeData);
    
    const {
        amount,
        isSwapped
    } = price;

    return (
        <div
            className={`flex items-center ${styles.Field} ${styles.disabled} border-gray-400`}
            style={{background: 'white'}}
        >
            <div className="h-full flex-grow relative">
                <input className={styles.FieldInput} type="text" value={amount && amount > 0 ? amount : '0.00'}/>
            </div>

            <div className="flex items-center ml-auto shrink h-full">
                {to.currency && from.currency && (
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
            </div>
        </div>
    );
}

export default PriceField;
