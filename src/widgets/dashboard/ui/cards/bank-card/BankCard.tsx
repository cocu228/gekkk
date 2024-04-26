import { useTranslation } from 'react-i18next';
import styles from './style.module.css';
import { CardStatusDescriptions } from "@/shared/store/active-cards/activeCards";

interface CardData {
    expiresAt: string;
    cardNumber: string;
    holderName: string;
    status?: string;
    size?: 'md' | 'lg';
}

const BankCard = ({
    cardNumber,
    status,
    expiresAt,
    holderName,
    size = 'md',
}: CardData) => {
    const { t } = useTranslation();

    return (
        <div className={`${styles.BankCard} ${size !== 'lg' ? '' : styles.Lg}`}>
            <div className={styles.CardStatus}>
                {status && status !== 'ACTIVE' && t(CardStatusDescriptions[status])}
            </div>
            <div className={`${styles.Text} ${styles.CardNumber}`}>{cardNumber}</div>
            <div className={`${styles.Text} ${styles.CardData}`}>
                {expiresAt}<br/>
                {holderName}
            </div>
        </div>)
}

export default BankCard;
