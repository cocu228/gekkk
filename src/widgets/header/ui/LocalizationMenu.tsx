import {useState} from "react";
import Dropdown from "@/shared/ui/dropdown/Dropdown";
import DropdownItem from "@/shared/ui/dropdown/dropdown-item/DropdownItem";
import {useTranslation} from 'react-i18next';

export const LocalizationMenu = () => {
    const [state, setState] = useState("en")
    const {i18n} = useTranslation();

    const onChange = (str) => {
        setState(str)
        i18n.changeLanguage(str)
    }

    const menu = [{
        key: 'en',
        label: (<DropdownItem onClick={() => onChange("en")} icon={<img width={32}
                                                                        height={32}
                                                                        src="/img/en.svg"
                                                                        alt="en"/>}>EN</DropdownItem>)
    },
        {
            key: 'de',
            label: (<DropdownItem onClick={() => onChange("de")} icon={<img width={32}
                                                                        height={32}
                                                                        src="/img/de.svg"
                                                                        alt="de"/>}>DE</DropdownItem>)
        }
    ]

    return <>
        <Dropdown items={menu}
                  trigger={<img width={32} height={32} src={`/img/${state}.svg`} alt={state}/>}>
        </Dropdown>
    </>
}
