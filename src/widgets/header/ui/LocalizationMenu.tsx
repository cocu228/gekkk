import {useState} from "react";
import Dropdown from "@/shared/ui/dropdown/Dropdown";
import DropdownItem from "@/shared/ui/dropdown/dropdown-item/DropdownItem";
import {useTranslation} from 'react-i18next';

export const LocalizationMenu = () => {
    const [state, setState] = useState("EN")
    const {i18n} = useTranslation();

    const onChange = (str) => {
        setState(str)
        i18n.changeLanguage(str)
    }

    const menu = [{
        key: 'EN',
        label: (<DropdownItem onClick={() => onChange("en")} icon={<img width={32}
                                                                        height={32}
                                                                        src="/img/EN.png"
                                                                        alt="EN"/>}>EN</DropdownItem>)
    },
        // {
        //     key: 'RU',
        //     label: (<DropdownItem onClick={() => onChange("ru")} icon={<img width={32}
        //                                                                 height={32}
        //                                                                 src="/img/RU.png"
        //                                                                 alt="RUS"/>}>RU</DropdownItem>)
        // }
    ]

    return <>
        <Dropdown items={menu}
                  trigger={state === "ru" ? <img width={32} height={32} src="/img/RU.png" alt="RUS"/> :
                      <img width={32} height={32} src="/img/EN.png" alt="EN"/>}>
        </Dropdown>
    </>
}
