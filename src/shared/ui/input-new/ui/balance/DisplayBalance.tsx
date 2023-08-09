import React, {FC} from 'react';
import styles from '../style.module.scss';
import {ICtxCurrencyData} from '@/processes/RootContext';

interface IParams {
    className?: string;
    children?: React.ReactNode;
    currency: ICtxCurrencyData;
}

const DisplayBalance: FC<IParams> = (({children, className, currency}: IParams) => {
    return (
        <div className={className}>
            {children}
            <div>{!currency ? null :
                <span className={styles.FieldInfoText}>Balance: {
                    currency.availableBalance
                        ? currency.availableBalance.toNumber()
                        : 0
                } {currency.$const}</span>
            }</div>
        </div>
    );
});

export default DisplayBalance;
