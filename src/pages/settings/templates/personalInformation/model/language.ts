import { getInitialProps } from "react-i18next";


export const languageName = () => {
    const {initialLanguage} = getInitialProps();
    switch (initialLanguage) {
        case "en":
            return "English"
        case "de":
            return "Deutsch"
        case "ru":
            return "Русский"
    }
}