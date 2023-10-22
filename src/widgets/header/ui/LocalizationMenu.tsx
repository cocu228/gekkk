import {useState} from "react";
import Dropdown from "@/shared/ui/dropdown/Dropdown";
import DropdownItem from "@/shared/ui/dropdown/dropdown-item/DropdownItem";

export const LocalizationMenu = () => {
    const [state, setState] = useState("EN")
    // const [isOpen, toggleOpen] = useState(false)


    const onChange = (str) => {
        setState(str)
        // toggleOpen(false)
    }

    const menu = [{
        key: 'RU',
        label: (<DropdownItem onClick={() => onChange("RU")} icon={<img width={24}
                                                                        height={24}
                                                                        src="/img/RU.png"
                                                                        alt="RUS"/>}>RU</DropdownItem>)
    }, {
        key: 'EN',
        label: (<DropdownItem onClick={() => onChange("EN")} icon={<img width={24}
                                                                        height={24}
                                                                        src="/img/EN.png"
                                                                        alt="EN"/>}>EN</DropdownItem>)
    }]

    return <>
        <Dropdown items={menu}
                  // onOpen={toggleOpen}
                  // isOpen={isOpen}
                  trigger={state === "RU" ? <img width={24} height={24} src="/img/RU.png" alt="RUS"/> :
                      <img width={24} height={24} src="/img/EN.png" alt="EN"/>}>
        </Dropdown>
    </>
}
