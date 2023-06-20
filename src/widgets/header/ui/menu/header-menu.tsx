import {useAuth} from "@/app/providers/AuthRouter";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useMemo, useRef, useState} from "react";
import styles from "@/widgets/header/ui/menu/style.module.scss";
import DropdownMenuFunctions from "../../model/dropdown-menu-functions"


const HeaderMenu = ({children, items, className = ""}) => {

    const {logout} = useAuth()
    const navigation = useNavigate()
    const [isActive, toggleActive] = useState(false)
    const ref = useRef(null)

    const dropdownMenuFunctions = useMemo(() => new DropdownMenuFunctions(ref, toggleActive, [
        {type: "link", action: (value) => navigation(value),}, {type: "logout", action: (value) => logout(),}]), [ref])


    useEffect(() => {
        (async () => {

        })()
    }, [])

    return <>
        <div ref={ref} onClick={dropdownMenuFunctions.onOpen}
             className={className + " flex items-center cursor-pointer h-full"}>
            <div className={`wrapper relative pl-7 pr-7 ${isActive ? "active" : ""}`}>
                {isActive && <span data-menu="event-helper"
                                   className="absolute cursor-pointer w-full h-[100%] top-[0] left-[0]"/>}
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