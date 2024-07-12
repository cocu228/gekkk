import styles from './style.module.css';

interface Props {
    price?: number | string,
    amount?: string | number,
    color?: 'red' | 'green',
    percent?: number
}

function DepthItem({ price, amount, color = 'red', percent }: Props) {
    return (
        <div className={`${styles.Item} ${styles[color]}`}>
            {percent && percent > 0 && (
                <span className={styles.ItemPercent} style={{ width: `${percent}%` }} />
            )}
            <div className={styles.ItemText}>
                <span>{price && +price > 0 ? price.toString() : '-'}</span>
                <span>{amount || '-'}</span>
            </div>
        </div>
    );
}

export default DepthItem;
