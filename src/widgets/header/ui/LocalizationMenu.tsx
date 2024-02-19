import {useState} from "react";
import {useTranslation} from 'react-i18next';
import Dropdown from "@/shared/ui/dropdown/Dropdown";
import DropdownItem from "@/shared/ui/dropdown/dropdown-item/DropdownItem";
import {$ENV} from "@/shared/lib";

export const LocalizationMenu = () => {
    const [state, setState] = useState("en")
    const {i18n} = useTranslation();

    const onChange = (str) => {
        setState(str)
        i18n.changeLanguage(str)
    }

    const menu = [{
        key: 'en',
        label: (<DropdownItem onClick={() => onChange("en")} icon={<img width={25}
                                                                        height={25}
                                                                        src="/img/en.svg"
                                                                        alt="en"/>}>EN</DropdownItem>)
    }, ...(!$ENV.DEV ? [] : [{
        key: 'de',
        label: (<DropdownItem onClick={() => onChange("de")} icon={<img width={25}
                                                                        height={25}
                                                                        src="/img/de.svg"
                                                                        alt="de"/>}>DE</DropdownItem>)
    }, {
        key: 'ru',
        label: (<DropdownItem onClick={() => onChange("ru")} icon={<img width={25}
                                                                        height={25}
                                                                        src="/img/ru.svg"
                                                                        alt="ru"/>}>RU</DropdownItem>)
    }])];

    return <>
        <Dropdown items={menu}
                  trigger={<img width={25} height={25} src={`/img/${state}.svg`} alt={state}/>}>
        </Dropdown>
    </>
}
