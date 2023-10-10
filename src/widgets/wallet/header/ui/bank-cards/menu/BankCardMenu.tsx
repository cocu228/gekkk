import {Switch} from "antd";
import styles from './style.module.scss';
import {useContext, useState} from "react";
import {apiUpdateCard, IResCard} from "@/shared/api";
import {numberWithSpaces} from "@/shared/lib/helpers";
import {CtxCurrencies} from "@/processes/CurrenciesContext";
import {storeBankCards} from "@/shared/store/bank-cards/bankCards";

interface IParams {
    card: IResCard;
}

const BankCardMenu = ({
    card
}: IParams) => {
    const {currencies} = useContext(CtxCurrencies);
    const eurWallet = currencies.get('EUR');
    
    const {
        updateCard,
    } = storeBankCards(state => state);
    const [switchChecked, setSwitchChecked] = useState(false);
    
    const blockCard = () => {
        switch (card.cardStatus) {
            case "ACTIVE":
                return (
                    <div className={`${styles.MenuItem} ${styles.Alert}`}
                         onClick={() => {
                             apiUpdateCard(card.cardId, {status: 'LOCKED'})
                                 .then(res => {
                                     updateCard(res.data as IResCard)
                                 });
                         }}
                    >
                        Block card
                    </div>
                )
            case "BLOCKED_BY_CUSTOMER":
                return (
                    <div className={styles.MenuItem}
                         onClick={() => {
                             apiUpdateCard(card.cardId, {status: 'ACTIVE'})
                                 .then(res => {
                                     updateCard(res.data as IResCard)
                                 });
                         }}
                    >
                        Unblock card
                    </div>
                )
            default:
                return null;
        }
    }
    
    return (<>
        <div className={`${styles.MenuItem} pointer-events-none`}>
            <div className='font-bold'>
                Available funds
            </div>
            
            <div className='font-bold'>
                {eurWallet.availableBalance ? eurWallet.availableBalance.toNumber() : '-'} EUR
            </div>
        </div>
        
        <div className={`${styles.MenuItem} rounded-b-none`}>
            <div className='grid gap-1'>
                <span className='row font-bold'>Set day limits</span>

                <span className='row text-gray-500'>Available</span>
            </div>

            <div className='grid gap-1'>
                <span className='row font-bold'>{numberWithSpaces(1000)} EUR</span>

                <span className='row text-gray-500'>{numberWithSpaces(1000)} EUR</span>
            </div>
        </div>
        
        <div className={`${styles.MenuItem} rounded-t-none -mt-[11px]`}>
            <div className='grid gap-1'>
                <span className='row font-bold'>Set month limits</span>

                <span className='row text-gray-500'>Available</span>
            </div>

            <div className='grid gap-1'>
                <span className='row font-bold'>{numberWithSpaces(1000)} EUR</span>

                <span className='row text-gray-500'>{numberWithSpaces(1000)} EUR</span>
            </div>
        </div>
        
        <div
            className={styles.MenuItem}
            onClick={() => {
                setSwitchChecked(!switchChecked);
            }}
        >
            Disable limits temporarily
            
            <Switch
                checked={switchChecked}
            />
        </div>
        
        <div className={styles.MenuItem}>
            Show card data
        </div>
        
        {blockCard()}
    </>);
}

export default BankCardMenu;
