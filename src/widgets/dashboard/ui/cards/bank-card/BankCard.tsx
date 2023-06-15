import styles from './style.module.scss';

interface CardData {
    cardNumber: string;
    expiresAt: string;
    holderName: string;
}

const BankCard = ({cardNumber, expiresAt, holderName}: CardData) => {
    return (
        <div className={styles.Card}>
            <img
                src='/img/payment-card/payment-card.svg'
                className='absolute'
            />
            <div className={`${styles.Data} ml-5 mt-auto`}>
                <div className='text-[22px] mb-2'>{cardNumber}</div>
                <div>Holder: {holderName}</div>
                <div className='mb-3'>Expires: {expiresAt}</div>
            </div>
        </div>
    )
}

export default BankCard;
