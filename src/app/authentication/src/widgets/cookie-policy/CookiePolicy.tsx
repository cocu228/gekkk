import styles from './style.module.css';
import {memo, useState} from 'preact/compat';
import {getCookieData, setCookieData} from '../../shared';
import Button from '../components/button/Button';
import CookieIcon from '../components/icons/CookieIcon';

export const CookiePolicy = memo(() => {
    const {CookieAccepted} = getCookieData<{CookieAccepted: boolean}>();
    const [isShown, setIsShown] = useState(!CookieAccepted);
    
    const acceptCookies = () => {
        setIsShown(false);
        setCookieData([{
            key: 'CookieAccepted',
            value: 'true'
        }]);
    }
    
    return !isShown ? null : <div className={styles.Body}>
        <div className={styles.Header}>
            <CookieIcon height={50} width={50}/>
            <span>Cookie policy applies</span>
        </div>

        <div className={styles.Description} style={{ color: 'var(--new-dark-blue)'}}>
            Our website uses cookies. The policy objective is to explain how Papaya (hereafter referred to as “we”) uses cookies and processes personal data.
            
            <div>
                Read more information <a className='typography-b2'>here</a>.
            </div>
        </div>
        
        <div className={styles.FormButtons}>
            <Button type="button" onClick={acceptCookies}>Accept</Button>
            <Button secondary type="button" onClick={() => setIsShown(false)}>Cancel</Button>
        </div>
    </div>
});
