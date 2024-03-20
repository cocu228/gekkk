import styles from './style.module.scss';
import { CardStatusDescriptions } from "@/shared/store/active-cards/activeCards";

interface CardData {
    expiresAt: string;
    cardNumber: string;
    holderName: string;
    className?: string;
    status?: string;
}

const BankCard = ({ cardNumber, status, expiresAt, holderName, className }: CardData) => {
    return (
        <div className={`flex justify-center ${className}`}>
            {status && status !== 'ACTIVE' && (
                <div className='flex absolute w-full h-full items-center justify-center font-bold select-none text-black text-lg'>
                    <div className='mb-10 rounded-[6px] p-1'>
                        {CardStatusDescriptions[status]}
                    </div>
                </div>
            )}
            <div className={styles.BankCard}>
                <img
                    src='/img/payment-card/payment-card-background2.jpg'
                    className='rounded-[10px]'
                />
                <div className='absolute w-full max-w-[220px]'>
                    <div className={styles.CardNumber}>{cardNumber}</div>
                    <div className={styles.CardData}>{expiresAt}</div>
                    <div className={styles.CardData +' '+ styles.CardHolderName}>{holderName}</div>
                </div>
            </div>
        </div>
    )
}

export default BankCard;
