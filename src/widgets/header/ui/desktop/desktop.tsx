import styles from "./style.module.scss"
import {useAuth} from "@/app/providers/AuthRouter";
import React, { useEffect, useState } from "react";
import HeaderMenu from "@/widgets/header/ui/menu/header-menu";
import headerMenuList from "../../model/header-menu-list"
import Button from "@/shared/ui/button/Button";
import { IBankData, apiGetBankData } from "@/shared/api/bank";
import { Skeleton } from "antd";
import { storeBankData } from "@/shared/store/bank-data/bank-data";

const HeaderDesktop = () => {

    const {logout} = useAuth();
    const getBankData = storeBankData(state => state.getBankData);
    const [bankData, setBankData] = useState<IBankData>(null);

    const onBtnLogout = () => {
        logout()
    }

    useEffect(() => {
        (async function() {
            if(!bankData){
                const data = await getBankData();
                setBankData(data);
            }
        })()
    }, [])

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
                        {!bankData ? <div className="flex flex-col gap-1">
                            <Skeleton.Input className="mt-1" style={{height: 20}} active/>
                            <Skeleton.Input style={{height: 16}} active/>
                        </div> : <>
                            <div className="row">
                                <span className="text-sm font-bold">ID: 208294110048</span>
                                <span>
                                    <img
                                        className="inline-flex"
                                        src="/img/icon/DropdownTriangleIcon.svg"
                                        alt="DropdownTriangleIcon"
                                    />
                                </span>
                            </div>
                            <div className="row text-start flex">
                                <span className="text-xs text-start text-gray-400 font-bold leading-3">
                                    {bankData.clientName}
                                </span>
                            </div>
                        </>}
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