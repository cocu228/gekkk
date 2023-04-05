import Styles from './style.module.scss';

interface CardData {
    cardNumber: string;
    expiresAt: string;
    holderName: string;
}

const BankCard = ({cardNumber, expiresAt, holderName}: CardData) => {
    return (
        <div className='
                flex
                p-0
                opacity-95
                bg-[url(/img/payment-card/payment-card-background.png)]
                hover:bg-[url(/img/payment-card/payment-card-background.png)]
                hover:opacity-100
                hover:shadow-[0_10px_27px_0px_rgba(0,0,0,0.16)]
                min-h-[195px]
                max-w-[310px]
                sm:min-h-[216px]
                min-w-[310px]
                transition-all
                rounded-[4px]'>
            <img
                src='/img/payment-card/payment-card.svg'
                className='absolute'
            />
            <div className={`${Styles.CardData} ml-5 mt-auto`}>
                <div className='text-[22px] mb-2'>{cardNumber}</div>
                <div>{expiresAt}</div>
                <div className='mb-3'>{holderName}</div>
            </div>
        </div>
    )
}

export default BankCard;
