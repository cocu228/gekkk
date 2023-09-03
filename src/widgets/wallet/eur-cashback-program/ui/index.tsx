import {useContext} from 'react';
import styles from './style.module.scss';
import Button from '@/shared/ui/button/Button';
import Checkbox from '@/shared/ui/checkbox/Checkbox';
import {BreakpointsContext} from '@/app/providers/BreakpointsProvider';

const EurCashbackProgram = () => {
    return (
        <div className='grid grid-cols-1 justify-center'>
            <CashbackCard
                subtitle='Monhly interest payout'
                className={styles.CashbackCardBlue}
                iconPath='/img/eur-cashback-icon.png'
                description='0,1% cashback on card transactions'
                conditions={[
                    'Card purchases amount - more than 200 € per month',
                    'ATM withdrawals, card to card transfers, and transfers to the other financial services are excluded from cashback'
                ]}
            />

            <CashbackCard
                subtitle='Paid monthly'
                className={styles.CashbackCardOrange}
                iconPath='/img/amazon-icon.png'
                description='2% cashback on Amazon purchases'
                conditions={[
                    '2% cashback on all purchases made on Amazon with your Gekkard',
                    'Maximum monthly payout is €50',
                    'Minimum monthly payout is €0.10'
                ]}
            />

            <CashbackCard
                subtitle='Paid monthly'
                className={styles.CashbackCardGreen}
                iconPath='/img/eur-cashback-icon.png'
                description='0,1% cashback on card transactions'
                conditions={[
                    '5% cashback on all Google Play purchases made with your Gekkard',
                    'Minimum monthly payout is €0.10'
                ]}
            />
        </div>
    );
};

const CashbackCard = ({subtitle, className, description, iconPath, conditions}: {
    iconPath: string;
    subtitle: string;
    className: string;
    description: string;
    conditions: Array<string>;
}) => {
    const {sm} = useContext(BreakpointsContext);

    return (
        <div className='flex mb-10 justify-center'>
            <div className={`
                    ${className}
                    ${styles.CashbackCard}
                `}
            >
                <div className='flex'>
                    <div className={styles.CashbackCardTitle}>
                        {description}
                    </div>

                    <img
                        width={89}
                        height={89}
                        className='-mt-5 -ml-5 opacity-50'
                        src={iconPath}
                    />
                </div>

                <div className={styles.CashbackCardSubtitle}>
                    {subtitle}
                </div>

                <div className='mt-[23px]'>
                    <Checkbox
                        className='bg-white'
                    >
                        <span className={styles.CashbackCardCheckbox}>
                            Bonus payments are a part of a loyalty program, provided by FINTECH ASSETS OÜ.
                            Terms and Conditions can be found here
                        </span>
                    </Checkbox>
                </div>

                <div className='flex justify-center mt-3 -mb-[70px]'>
                    <Button>Activate</Button>
                </div>
            </div>

            
            {!sm && (
                <div className={styles.CashbackDescription}>
                    <div className={styles.CashbackDescriptionTitle}>
                        Conditions
                    </div>

                    <ul className={`list-disc ${styles.CashbackDescriptionList}`}>
                        {conditions.map(c => (
                            <li>{c}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default EurCashbackProgram;
