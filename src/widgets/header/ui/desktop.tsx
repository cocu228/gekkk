import styles from "./desktop.module.scss"
import {useAuth} from "@/app/providers/AuthRouter";
import React from "react";
import {useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import PromoCode from "@/features/promo-code/ui/PromoCode";

const HeaderMenu = ({children, items, className = ""}) => {

    const {logout} = useAuth()
    const navigation = useNavigate()
    const [isActive, toggleActive] = useState(false)
    const ref = useRef(null)

    const handlerClickOutside = useRef(({target}) => {
        if (target !== undefined && ref.current !== null && !ref.current.contains(target)) {
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
            console.log("hello")
        }
    }

    return <>
        <button ref={ref} disabled={isActive} onClick={handlerOpen} className={className}>
            <div className={`wrapper relative pl-7 pr-7 ${isActive ? "active" : ""}`}>

                {children}

                <div className={`${styles.DropdownMenu} ${isActive ? "active" : ""}`}>
                    {items.map((obj, i) => <button style={obj.style ?? {}} onClick={() => handlerClick(obj.event)}
                                                   className={`${styles.DropdownItem}`}> {obj.item} </button>)}
                </div>
            </div>
        </button>
    </>
}


const items = [
    {
        item: <div className="flex items-center justify-end">
            <div className="wrapper mr-2">
                <svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M24.034 17.6c1.23.547 2.302 1.218 3.185 1.994a6.237 6.237 0 012.116 4.687v1.927a3.128 3.128 0 01-3.125 3.125H5.793a3.128 3.128 0 01-3.125-3.125v-1.927c0-1.797.771-3.506 2.115-4.687 1.088-.956 3.173-2.374 6.523-3.11a7.7 7.7 0 01-3.013-6.109c0-4.25 3.458-7.708 7.708-7.708s7.709 3.458 7.709 7.708-3.458 7.708-7.709 7.708c-5.724 0-8.79 2.151-9.843 3.076a4.154 4.154 0 00-1.407 3.122v1.927c0 .575.468 1.042 1.042 1.042H26.21c.574 0 1.041-.467 1.041-1.042v-1.927a4.154 4.154 0 00-1.407-3.122c-.725-.637-1.619-1.194-2.656-1.655a1.042 1.042 0 01.846-1.904zM16 4.75a5.631 5.631 0 00-5.625 5.625A5.631 5.631 0 0016.001 16a5.631 5.631 0 005.625-5.625 5.631 5.631 0 00-5.625-5.625z"
                          fill="#00AEEF"/>
                </svg>

            </div>
            <div className="wrapper">
                <div className="row">
                    <span className="text-sm font-bold text-blue-400">ID: 208294110048 </span>
                </div>
                <div className="row text-start">
                    <span className="text-xs text-start text-blue-400 font-bold">Alexandr Semikov</span>
                </div>
            </div>
        </div>, id: 'id', event: {action: undefined, value: "/"}
    },
    {item: 'Dashboard', id: 'dashboard', event: {action: "link", value: "/"}},
    {item: 'Deposit types', id: 'deposit', event: {action: "link", value: "deposit"}},
    {item: 'Limits', id: 'limits'},
    {item: 'Partnership program', id: 'item-4'},
    {item: 'Settings', id: 'item-4'},
    {
        item: <PromoCode/>,
        id: 'item-5'
    },
    {
        item: 'Logout', id: 'logout',
        event: {action: "logout", value: null},
        style: {
            borderTop: "1px solid var(--color-gray-400)"
        }
    },
]
const HeaderDesktop = () => {

    const {logout} = useAuth()

    const onBtnLogout = () => {
        logout()
    }

    return <>
        <header className={`flex ${styles.Header}`}>
            <div className={`flex items-center ${styles.ContainerLogo}`}>
                <a href="/">
                    <img src="/img/logo.svg" width={165} height={55} alt="logo"/>
                </a>
            </div>
            <HeaderMenu className={"ml-auto"} items={items}>
                <div className="flex items-center justify-end">
                    <div className="wrapper mr-2">
                        <img width={32} height={32} src="/img/icon/UserIcon.svg" alt="UserIcon"/>
                    </div>
                    <div className="wrapper">
                        <div className="row">
                            <span className="text-sm font-bold">ID: 208294110048 </span>
                            <span>
                                    <img className="inline-flex" src="/img/icon/DropdownTriangleIcon.svg"
                                         alt="DropdownTriangleIcon"/>
                                </span>
                        </div>
                        <div className="row text-start">
                            <span className="text-xs text-start text-gray-400 font-bold">Alexandr Semikov</span>
                        </div>
                    </div>
                </div>
            </HeaderMenu>
            <button onClick={onBtnLogout}>
                <div className="flex items-center justify-end ml-10">
                    <img width={26} height={26} src="/img/icon/LogoutIcon.svg" alt="UserIcon"/>
                </div>
            </button>
        </header>
    </>

}
export default HeaderDesktop