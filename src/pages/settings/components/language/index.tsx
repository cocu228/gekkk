import { useTranslation } from "react-i18next";

import { IconFlag } from "@/shared/ui/icons/icon-flag";

import styles from "./styles.module.scss";

const languages = [
  {
    title: "English",
    code: "en"
  },
  {
    title: "Русский",
    code: "ru",
    subTitle: "Russian"
  },
  {
    title: "Deutsch",
    code: "de",
    subTitle: "German"
  },
  {
    title: "Français",
    code: "FR",
    subTitle: "French"
  },
  {
    title: "Italiano",
    code: "IT",
    subTitle: "Italian"
  },
  {
    title: "汉语",
    code: "CN",
    subTitle: "Chinese"
  },
  {
    title: "Türkçe",
    code: "TR",
    subTitle: "Turkish"
  },
  {
    title: "Español",
    code: "ES",
    subTitle: "Spanish"
  }
];

export function LanguageSettings() {
  const { i18n } = useTranslation();

  return (
    <div className={styles.LanguageWrap}>
      {languages.map(item => (
        <div key={item.code} className={styles.LanguageItem} onClick={() => i18n.changeLanguage(item.code)}>
          <IconFlag code={item.code} size={28} />
          <div>
            <h4 className={styles.LanguageTitle}>{item.title}</h4>
            {item.subTitle && <h4 className={styles.LanguageSubTitle}>{item.subTitle}</h4>}
          </div>
        </div>
      ))}
    </div>
  );
}
