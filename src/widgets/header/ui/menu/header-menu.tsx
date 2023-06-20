import {useAuth} from "@/app/providers/AuthRouter";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useMemo, useRef, useState} from "react";
import styles from "@/widgets/header/ui/menu/style.module.scss";
import DropdownMenuFunctions from "../../model/dropdown-menu-functions"
import {TOnActionParams} from "@/widgets/header/model/types";


const HeaderMenu = ({children, items, className = ""}) => {

    const {logout} = useAuth()
    const navigation = useNavigate()
    const [isActive, toggleActive] = useState(false)
    const ref = useRef(null)

    const actionsForMenuFunctions: TOnActionParams = useMemo(() => [
        {type: "link", action: (value) => navigation(value)},
        {type: "change-person", action: async (value) => await navigation(value)},
        {type: "logout", action: () => logout(),}], [])

    const dropdownMenuFunctions = useMemo(() => new DropdownMenuFunctions(ref, toggleActive, actionsForMenuFunctions), [ref])


    useEffect(() => {
        (async () => {

        })()
    }, [])

    return <>
        <div ref={ref} onClick={dropdownMenuFunctions.onOpen}
             className={className + " flex items-center cursor-pointer h-full"}>
            <div className={`wrapper relative pl-7 pr-7 ${isActive ? "active" : ""}`}>
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