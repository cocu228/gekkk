import { useTranslation } from 'react-i18next';
import styles from './style.module.css';
import { CardStatusDescriptions } from "@/shared/store/active-cards/activeCards";

interface CardData {
    status?: string;
    expiresAt: string;
    cardNumber: string;
    holderName: string;
}

const BankCard = ({
    status,
    expiresAt,
    cardNumber,
    holderName
}: CardData) => {
    const { t } = useTranslation();

    return (
        <div className={styles.BankCard}>
            <div className={styles.CardStatus}>
                {status && status !== 'ACTIVE' && t(CardStatusDescriptions[status])}
            </div>
            <div className={`${styles.Text} ${styles.CardNumber}`}>{cardNumber}</div>
            <div className={`${styles.Text} ${styles.CardData}`}>
                {expiresAt}<br/>
                {holderName}
            </div>
        </div>
    );
}

export default BankCard;
