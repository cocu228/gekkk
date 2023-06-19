import {useAuth} from "@/app/providers/AuthRouter";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useMemo, useRef, useState} from "react";
import styles from "@/widgets/header/ui/menu/style.module.scss";

class DropdownMenuFunctions {

    ref: React.MutableRefObject<null | HTMLDivElement>;
    toggleOpen: React.Dispatch<React.SetStateAction<boolean>>

    constructor(ref, toggleOpen) {
        this.ref = ref
        this.toggleOpen = toggleOpen
    }

    onOpen = () => {
        this.toggleOpen(prev => !prev)
        document.addEventListener('click', this.onClick)
    }


    onClick = ({target}) => {
        if (!this.ref.current.contains(target)) {
            this.toggleOpen(false)
            this.removeEventListener()
        }
    }


    removeEventListener = () => document.removeEventListener('click', this.onClick)

}


const HeaderMenu = ({children, items, className = ""}) => {

    const {logout} = useAuth()
    const navigation = useNavigate()
    const [isActive, toggleActive] = useState(false)
    const ref = useRef(null)
    const dropdownMenuFunctions = useMemo(() => new DropdownMenuFunctions(ref, toggleActive), [ref])


    useEffect(() => {
        (async () => {

        })()
    }, [])


    const handlerClick = (event) => {

        switch (event.action) {
            case "link":
                dropdownMenuFunctions.removeEventListener()
                navigation(event.value)
                break
            case "logout":
                logout()
                dropdownMenuFunctions.removeEventListener()
                break
            case undefined:
                break
        }
    }


    //

    return <>
        <div ref={ref} onClick={dropdownMenuFunctions.onOpen}
             className={className + " flex items-center cursor-pointer h-full"}>
            <div className={`wrapper relative pl-7 pr-7 ${isActive ? "active" : ""}`}>
                {isActive && <span data-menu="event-helper"
                                   className="absolute cursor-pointer w-full h-[100%] top-[0] left-[0]"/>}
                {children}

                <div className={`${styles.DropdownMenu} ${isActive ? "active" : ""}`}>
                    {items.map((obj, i) => <span key={"ItemMenu_" + i} style={obj.style ?? {}}
                                                 onClick={() => handlerClick(obj.event)}
                                                 className={`${styles.DropdownItem} h-full`}> {obj.item} </span>)}
                </div>
            </div>
        </div>
    </>
}

export default HeaderMenu