import Card from '@/shared/ui/card/Card';
import Styles from './style.module.scss';

interface CardData {
    cardNumber: string;
    expiresAt: string;
    holderName: string;
}

const BankCard = ({cardNumber, expiresAt, holderName}: CardData) => {
    return (
        <div className='max-w-[310px]'>
            <Card className='flex opacity-95 bg-[url(/img/payment-card/payment-card-background.png)] hover:bg-[url(/img/payment-card/payment-card-background.png)] hover:opacity-100 p-0'>
                <img
                    src='/img/payment-card/payment-card.svg'
                    className='absolute'
                />
                <div className={`${Styles.CardData} ml-5 mt-[110px]`}>
                    <div className='text-[22px] mb-2'>{cardNumber}</div>
                    <div>{expiresAt}</div>
                    <div>{holderName}</div>
                </div>
            </Card>
        </div>
    )
}

export default BankCard;
