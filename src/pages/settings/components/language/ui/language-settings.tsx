import { useTranslation } from "react-i18next";
import GB from '@/assets/GB.svg?react';
import RU from '@/assets/RU.svg?react';
import DE from '@/assets/DE.svg?react';
import { Typography } from "@/shared/ui/typography/typography";
import styles from '../styles.module.scss'
import { IconFlag } from "@/shared/ui/icons/icon-flag";

export function LanguageSettings() {
    const {i18n} = useTranslation();

    return(
        <div className={styles.languageWrap}>
            <div 
                className={styles.languageItem}
                onClick={() => i18n.changeLanguage('en')}
            >
                <IconFlag code="en" size={28} />
                <h4 className={styles.languageTitle}>English</h4>
            </div>
            <div 
                className={styles.languageItem}
                onClick={() => i18n.changeLanguage('ru')}
            >
                <IconFlag code="ru" size={28} />
                <div>
                    <h4 className={styles.languageSubTitle}>Русский</h4>
                    <h4 className={styles.languageTitle}>English</h4>
                </div>
            </div>
            <div 
                className={styles.languageItem}
                onClick={() => i18n.changeLanguage('de')}
            >
                <IconFlag code="de" size={28} />
                <div>
                    <h4 className={styles.languageSubTitle}>Deutsch</h4>
                    <h4 className={styles.languageTitle}>German</h4>
                </div>
            </div>
        </div>
    );
}