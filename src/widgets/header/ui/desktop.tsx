import styles from "./desktop.module.scss"
import {useAuth} from "@/app/providers/AuthRouter";
import React from "react";
import HeaderMenu from "@/widgets/header/ui/header-menu";
import headerMenuList from "../model/header-menu-list"

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
            <HeaderMenu className={"ml-auto"} items={headerMenuList}>
                <div className="flex items-center justify-end">
                    <div className="wrapper mr-2">
                        <img width={32} height={32} src="/img/icon/UserIcon.svg" alt="UserIcon"/>
                    </div>
                    <div className="wrapper">
                        <div className="row">
                            <span className="text-sm font-bold">ID: 208294110048</span>
                            <span>
                                    <img className="inline-flex" src="/img/icon/DropdownTriangleIcon.svg"
                                         alt="DropdownTriangleIcon"/>
                                </span>
                        </div>
                        <div className="row text-start flex">
                            <span
                                className="text-xs text-start text-gray-400 font-bold leading-3">Alexandr Semikov</span>
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