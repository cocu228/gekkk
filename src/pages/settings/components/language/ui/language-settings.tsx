import { useTranslation } from "react-i18next";
import styles from '../styles.module.scss'
import { IconFlag } from "@/shared/ui/icons/icon-flag";

export function LanguageSettings() {
    const {i18n} = useTranslation();

    return(
        <div className={styles.LanguageWrap}>
            <div 
                className={styles.LanguageItem}
                onClick={() => i18n.changeLanguage('en')}
            >
                <IconFlag code="en" size={28} />
                <h4 className={styles.LanguageTitle}>English</h4>
            </div>
            <div 
                className={styles.LanguageItem}
                onClick={() => i18n.changeLanguage('ru')}
            >
                <IconFlag code="ru" size={28} />
                <div>
                    <h4 className={styles.LanguageTitle}>Русский</h4>
                    <h4 className={styles.LanguageSubTitle}>Russian</h4>
                </div>
            </div>
            <div 
                className={styles.LanguageItem}
                onClick={() => i18n.changeLanguage('de')}
            >
                <IconFlag code="de" size={28} />
                <div>
                    <h4 className={styles.LanguageTitle}>Deutsch</h4>
                    <h4 className={styles.LanguageSubTitle}>German</h4>
                </div>
            </div>
        </div>
    );
}
