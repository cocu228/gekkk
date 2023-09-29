import styles from './style.module.scss';

interface CardData {
    expiresAt: string;
    cardNumber: string;
    holderName: string;
    className?: string;
    status: 'LOCKED' | 'ACTIVE' | 'UNKNOWN' | 'PENDING'
        | 'CARD_EXPIRED' | 'CLOSED_BY_BANK' | 'BLOCKED_BY_BANK'
        | 'CLOSED_BY_CUSTOMER' | 'LOST' | 'PLASTIC_IN_WAY'
        | 'STOLEN' | 'DEBIT_BLOCKED' | 'BLOCKED_BY_REGULATOR';
}

const BankCard = ({cardNumber, status, expiresAt, holderName, className}: CardData) => {
    return (
        <div className={`
                ${styles.BankCard}
                ${className}
                grid-rows-6
            `}
        >
            <img
                src='/img/payment-card/gekkard-logo.svg'
                className='h-[37px]'
            />

            <div className='flex justify-end'>
                <img
                    src='/img/payment-card/contactless-icon.svg'
                    className='h-[22px] mr-5'
                />
            </div>

            <img
                src='/img/payment-card/chip-icon.svg'
                className='ml-2'
            />

            <div
                className={`
                    ${styles.CardNumber}
                    mt-2
                    mb-2
                    ml-2
                    text-[18px]
                `}
            >
                {cardNumber}
            </div>

            <div className='text-[#fefefe] text-[6px] font-semibold'>
                VALID THRU
            </div>

            <div className={styles.CardBottom}>
                <div>
                    <div className={styles.CardData}>
                        {expiresAt}
                    </div>

                    <div className={styles.CardData}>
                        {holderName}
                    </div>
                </div>

                <img
                    src='/img/payment-card/mastercard-logo.svg'
                    className='ml-2 mt-2 place-self-end'
                />
            </div>
        </div>
    )
}

export default BankCard;
