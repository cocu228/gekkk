import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "@public/localization/en.json";
import ru from "@public/localization/ru.json";
import de from "@public/localization/de.json";
import it from "@public/localization/it.json";
import cn from "@public/localization/cn.json";
import sp from "@public/localization/sp.json";
import tu from "@public/localization/tu.json";
import fr from "@public/localization/fr.json";

const resources = {
  en: {
    translation: en.locale
  },
  ru: {
    translation: ru.locale
  },
  de: {
    translation: de.locale
  },
  IT: {
    translation: it.locale
  },
  FR: {
    translation: fr.locale
  },
  TR: {
    translation: tu.locale
  },
  ES: {
    translation: sp.locale
  },
  CN: {
    translation: cn.locale
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
