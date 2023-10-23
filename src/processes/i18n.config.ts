import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import en from '../../public/localization/en.json';
import ru from '../../public/localization/ru.json';


const resources = {
    en: {
        translation: en.locale
    },
    ru: {
        translation: ru.locale
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
