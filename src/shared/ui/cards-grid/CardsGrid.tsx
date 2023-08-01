import styles from './style.module.scss';

function CardsGrid({children}: any) {
    return (
        <div className={styles.CardsGrid}>
            {children}
        </div>
    );
}

export default CardsGrid;
