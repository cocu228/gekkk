import {useAuth} from "@/app/providers/AuthRouter";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import styles from "@/widgets/header/ui/menu/style.module.scss";
import {apiOrganizations} from "@/shared/api";

const HeaderMenu = ({children, items, className = ""}) => {

    const {logout} = useAuth()
    const navigation = useNavigate()
    const [isActive, toggleActive] = useState(false)
    const ref = useRef(null)
    const [orgList, setOrgList] = useState([])


    useEffect(() => {
        (async () => {

            // const organizationList = await apiOrganizations()
            //
            //
            //

        })()
    }, [])

    const handlerClickOutside = useRef(({target}) => {

        if (target !== undefined
            && ref.current !== null
            && (!ref.current.contains(target)
                || target.getAttribute("data-menu") === "event-helper")) {

            toggleActive(false)
            remEvent()

        }
    })
    const handlerOpen = () => {
        toggleActive(prev => !prev)
        document.addEventListener('click', handlerClickOutside.current)
    }

    const remEvent = () => document.removeEventListener('click', handlerClickOutside.current)

    const handlerClick = (event) => {
        if (event?.action === "link") {
            toggleActive(false)
            remEvent()
            navigation(event.value)
        } else if (event?.action === "logout") {
            logout()
            remEvent()
        } else if (event?.action === undefined) {
            //
        }
    }

    //

    return <>
        <div ref={ref} onClick={handlerOpen} className={className + " flex items-center cursor-pointer h-full"}>
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