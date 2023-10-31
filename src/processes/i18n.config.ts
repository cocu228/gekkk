import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import en from '../localization/en.json';
import ru from '../localization/ru.json';
import de from '../localization/de.json';

const resources = {
    en: {
        translation: en.locale
    },
    ru: {
        translation: ru.locale
    },
    de: {
        translation: de.locale
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;
