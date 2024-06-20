import {useEffect, useState} from "react";
import {getInitialProps, useTranslation} from 'react-i18next';
import {Dropdown} from "@/shared/ui/!dropdown";
import { IconFlag } from "@/shared/ui/icons/icon-flag";
import { DropdownCItem } from "@/shared/ui/!dropdown/item";

export const LocalizationMenu = () => {
    const [state, setState] = useState("en")
    const {i18n} = useTranslation();
    const {initialLanguage} = getInitialProps();

    const onChange = (str) => {
        setState(str)
        i18n.changeLanguage(str)
    }

    useEffect(()=>{
        setState(initialLanguage)
    }, [initialLanguage])

    const menu = [{
        key: 'en',
    }, {
        key: 'de',
    }, {
        key: 'ru',
    }, {
        key: 'CN',
    },{
        key: 'ES',
    },{
        key: 'TR',
    },{
        key: 'FR',
    },{
        key: 'IT',
    }
    ];

    return <>
        <Dropdown trigger={<IconFlag code={state} size={24} />}>
            {menu.map((item, ind) => (
                <DropdownCItem key={ind} className="uppercase" onClick={() => onChange(item.key)} icon={<IconFlag code={item.key}  size={24} />}>{item.key}</DropdownCItem>
            ))}
        </Dropdown>
    </>
}
