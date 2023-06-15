import { useContext } from 'react';
import styles from '@/shared/ui/input-currency/style.module.scss';
import { CtxExchangeData } from '../../model/context';

function PriceField() {
    const {
        to,
        from,
        price
    } = useContext(CtxExchangeData);

    return (
        <div
            className={`flex items-center ${styles.Field} ${styles.disabled} border-gray-400`}
            style={{background: 'white'}}
        >
            <div className="h-full flex-grow relative">
                <input className={styles.FieldInput} type="text" value={price && price > 0 ? price : '0.00'}/>
            </div>

            <div className="flex items-center ml-auto shrink h-full">
                {to.currency && from.currency && (
                    <div className={styles.FieldPriceLabel}>
                        <span>{from.currency} per 1 {to.currency}</span>
                        <button
                            className={styles.FieldSwitchBtn}
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
