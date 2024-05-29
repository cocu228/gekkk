import styles from './style.module.css';
import {useTranslation} from 'react-i18next';

const NewBankCard = () => {
	const {t} = useTranslation();

	return (
		<div className={styles.BankCard}>
            <div className={`${styles.CardStatus} ${styles.White}`}>
                {t('no_active_cards')}
            </div>
        </div>
	)
}

export default NewBankCard;
