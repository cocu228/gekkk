import {useState} from "react";
import {useTranslation} from 'react-i18next';
import Dropdown from "@/shared/ui/dropdown/Dropdown";
import DropdownItem from "@/shared/ui/dropdown/dropdown-item/DropdownItem";

export const LocalizationMenu = () => {
    const [state, setState] = useState("en")
    const {i18n} = useTranslation();

    const onChange = (str) => {
        setState(str)
        i18n.changeLanguage(str)
    }

    const menu = [{
        key: 'en',
        label: (<DropdownItem onClick={() => onChange("en")} icon={<svg className="!w-[24px] !h-[24px]">
            <use href='/img/gek_flags_lib.svg#en'></use>
        </svg>}>EN</DropdownItem>)
    }, {
        key: 'de',
        label: (<DropdownItem onClick={() => onChange("de")} icon={<svg className="!w-[24px] !h-[24px]">
            <use href='/img/gek_flags_lib.svg#de'></use>
        </svg>}>DE</DropdownItem>)
    }, {
        key: 'ru',
        label: (<DropdownItem onClick={() => onChange("ru")} icon={<svg className="!w-[24px] !h-[24px]">
            <use href='/img/gek_flags_lib.svg#ru'></use>
        </svg>}>RU</DropdownItem>)
    }];

    return <>
        <Dropdown items={menu}
                  trigger={<svg className="w-[24px] h-[24px]" >
                    <use href={`/img/gek_flags_lib.svg#${state}`}></use>
                </svg>}>
        </Dropdown>
    </>
}
