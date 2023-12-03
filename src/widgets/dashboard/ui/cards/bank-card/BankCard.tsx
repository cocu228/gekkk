import styles from './style.module.scss';
import { CardStatusDescriptions } from "@/shared/store/bank-cards/bankCards";

interface CardData {
    expiresAt: string;
    cardNumber: string;
    holderName: string;
    className?: string;
    status: 'LOCKED' | 'ACTIVE' | 'UNKNOWN' | 'PENDING'
    | 'CARD_EXPIRED' | 'CLOSED_BY_BANK' | 'BLOCKED_BY_BANK'
    | 'CLOSED_BY_CUSTOMER' | 'LOST' | 'PLASTIC_IN_WAY'
    | 'STOLEN' | 'DEBIT_BLOCKED' | 'BLOCKED_BY_REGULATOR' | 'BLOCKED_BY_CUSTOMER';
}

const BankCard = ({ cardNumber, status, expiresAt, holderName, className }: CardData) => {
    return (
        <div className="flex justify-center">
            {status !== 'ACTIVE' && (
                <div className='flex absolute w-full h-full items-center justify-center font-bold select-none text-black text-lg'>
                    <div className='mb-10 rounded-[6px] p-1'>
                        {CardStatusDescriptions[status]}
                    </div>
                </div>
            )}
            <div className={styles.BankCard}>
                <div className={styles.CardNumber}>{cardNumber}</div>
                <div className={styles.CardData}>{expiresAt}</div>
                <div className={styles.CardData +' '+ styles.CardHolderName}>{holderName}</div>
            </div>
        </div>
    )
}

export default BankCard;
