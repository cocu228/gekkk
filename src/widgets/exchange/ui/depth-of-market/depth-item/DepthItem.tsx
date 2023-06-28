import Decimal from 'decimal.js';
import styles from './style.module.scss';

interface Props {
    price?: Decimal,
    amount?: string | number,
    color?: 'red' | 'green',
    percent?: Decimal
}

function DepthItem({price, amount, color = 'red', percent}: Props) {
    return (
        <div className={`${styles.Item} ${styles[color]}`}>
            {percent.greaterThan(0) && (
                <span className={styles.ItemPercent} style={{width: `${percent}%`}}/>
            )}
            <div className={`flex justify-between p-1 text-md lg:text-sm md:text-xs ${styles.ItemText}`}>
                <span>{price?.greaterThan(0) ? +price.toString() : '-'}</span>
                <span>{amount || '-'}</span>
            </div>
        </div>
    );
}

export default DepthItem;
