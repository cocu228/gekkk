import React from 'react';
import styles from './style.module.scss';

interface Props {
    price?: string | number,
    amount?: string | number,
    color?: 'red' | 'green',
    percent?: number
}

function DepthItem({price, amount, color = 'red', percent}: Props) {
    return (
        <div className={`${styles.Item} ${styles[color]}`}>
            {percent && (
                <span className={styles.ItemPercent} style={{width: `${percent}%`}}/>
            )}
            <div className={`flex justify-between p-1 text-md lg:text-sm md:text-xs ${styles.ItemText}`}>
                <span>{price || '-'}</span>
                <span>{amount || '-'}</span>
            </div>
        </div>
    );
}

export default DepthItem;