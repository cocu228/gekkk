import { useTranslation } from 'react-i18next';
import styles from './style.module.scss';
import { CardStatusDescriptions } from "@/shared/store/active-cards/activeCards";

interface CardData {
    expiresAt: string;
    cardNumber: string;
    holderName: string;
    className?: string;
    status?: string;
    size?: 'md' | 'lg';
}

const BankCard = ({
    cardNumber,
    status,
    expiresAt,
    holderName,
    className,
    size = 'md',
}: CardData) => {
    const {t} = useTranslation();

    return (
        <div className={`flex justify-center ${className}`}>
            {status && status !== 'ACTIVE' && (
                <div className='flex absolute w-full h-full items-center justify-center font-bold select-none text-black text-lg'>
                    <div className='mb-10 rounded-[6px] p-1'>
                        {t(CardStatusDescriptions[status])}
                    </div>
                </div>
            )}
            <div className={styles.BankCard}>
                <div className={styles.DataWrapper}>
                    <div className={`${styles.CardNumber} ${size !== 'lg' ? '' : styles.CardNumberLg}`}>
                        <span className={styles.Text}>{cardNumber}</span>
                    </div>

                    <div className={`${styles.CardData} ${size !== 'lg' ? '' : styles.CardDataLg}`}>
                        <div className={styles.Text}>{expiresAt}</div>
                        <div className={styles.Text}>{holderName}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BankCard;
