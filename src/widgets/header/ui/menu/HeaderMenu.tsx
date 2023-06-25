import React, {useMemo, useRef, useState} from "react";
import styles from "@/widgets/header/ui/menu/style.module.scss";
import DropdownMenuFunctions from "../../model/dropdown-menu-functions"
import {TPropsHeaderMenu} from "@/widgets/header/model/types";


const HeaderMenu = ({children, items, className = "", actions}: TPropsHeaderMenu) => {
    const [isActive, toggleActive] = useState(false)
    const ref = useRef(null)
    const dropdownMenuFunctions =
        useMemo(() => new DropdownMenuFunctions(ref, toggleActive, actions), [ref])

    return <>
        <div ref={ref} onClick={dropdownMenuFunctions.onOpen}
             className={className + " flex items-center cursor-pointer h-full"}>
            <div className={`wrapper relative pl-7 pr-7 min-w-[250px] ${isActive ? "active" : ""}`}>
                {children}
                <div className={`${styles.DropdownMenu} ${isActive ? "active" : ""}`}>

                    {items.map((item, i) => <span key={"ItemMenu_" + i}
                                                  style={item.style}
                                                  onClick={() => dropdownMenuFunctions.onAction(item.action)}
                                                  className={`${styles.DropdownItem} h-full`}> {item.item} </span>)}
                </div>
            </div>
        </div>
    </>
}

export default HeaderMenu