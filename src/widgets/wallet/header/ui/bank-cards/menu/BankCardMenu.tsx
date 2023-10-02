import {Switch} from "antd";
import {IResCard} from "@/shared/api";
import styles from './style.module.scss';

interface IParams {
    card: IResCard;
}

const BankCardMenu = ({
    card
}: IParams) => {
    return (<>
        <div className={`${styles.MenuItem} rounded-b-none`}>
            Set day limits
        </div>
        
        <div className={`${styles.MenuItem} rounded-t-none -mt-[6px]`}>
            Set month limits
        </div>
        
        <div className={`${styles.MenuItem} leading-5 flex justify-between align-middle`}>
            Disable limits temporarily
            
            <Switch/>
        </div>
        
        <div className={styles.MenuItem}>
            Show card data
        </div>

        {card.cardStatus === 'ACTIVE' ? (
            <div
                className={`${styles.MenuItem} ${styles.Alert}`}
                onClick={() => {
                    
                }}
            >
                Block card
            </div>
        ) : (
            <div className={styles.MenuItem}>
                Unblock card
            </div>
        )}
    </>);
}

export default BankCardMenu;
