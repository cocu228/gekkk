import { useTranslation } from "react-i18next";
import styles from './styles.module.scss'
import { IconFlag } from "@/shared/ui/icons/icon-flag";

const languages = [
    {
        title: 'English',
        code: 'en'
    },
    {
        title: 'Русский',
        code: 'ru',
        subTitle: 'Russian'
    },
    {
        title: 'Deutsch',
        code: 'de',
        subTitle: 'German'
    },
]

export function LanguageSettings() {
    const {i18n} = useTranslation();

    return(
        <div className={styles.LanguageWrap}>
            {
                languages.map((item, ind) => (
                    <div
                        key={ind}
                        className={styles.LanguageItem}
                        onClick={() => i18n.changeLanguage(item.code)}
                    >
                        <IconFlag code={item.code} size={28} />
                        <div>
                            <h4 className={styles.LanguageTitle}>{item.title}</h4>
                            {
                                item.subTitle && (
                                    <h4 className={styles.LanguageSubTitle}>{item.subTitle}</h4>
                                )
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
