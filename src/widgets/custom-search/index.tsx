import styles from './style.module.scss';
import Select from '@/shared/ui/select/Select';
import SearchSelect from '@/shared/ui/search-select/SearchSelect';
import CurrencySelector from '@/shared/ui/input-currency/ui/currency-selector/CurrencySelector';
export default function customSearch() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.filters}>
                <Select className={styles.selector}/>
                <SearchSelect className={styles.selector}/>
                <CurrencySelector />
            </div>
        </div>
    );
}