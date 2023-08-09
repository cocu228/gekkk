import React, {FC} from 'react';
import styles from '../style.module.scss';
import {ICtxCurrencyData} from '@/processes/RootContext';

interface IParams {
    className?: string;
    children?: React.ReactNode;
    currencyData: ICtxCurrencyData;
}

const DisplayBalance: FC<IParams> = (({children, className, currencyData}: IParams) => {
    return (
        <div className={className}>
            {children}
            <div>{!currencyData ? null : 
                <span className={styles.FieldInfoText}>Balance: {
                    currencyData.availableBalance
                        ? currencyData.availableBalance.toNumber()
                        : 0
                } {currencyData.currency}</span>
            }</div>
        </div>
    );
});

export default DisplayBalance;
