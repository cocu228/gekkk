import {Skeleton} from "antd";
import styles from "./style.module.scss";
import {useEffect, useState} from "react";
import {IBankData} from "@/shared/api/bank";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/app/providers/AuthRouter";
import headerMenuList from "../../model/header-menu-list";
import HeaderMenu from "@/widgets/header/ui/menu/header-menu";
import {storeBankData} from "@/shared/store/bank-data/bank-data";

const HeaderDesktop = () => {

    const {logout} = useAuth();
    const navigate = useNavigate();
    const [bankData, setBankData] = useState<IBankData>(null);
    const getBankData = storeBankData(state => state.getBankData);

    const onBtnLogout = () => {
        logout();
    }

    useEffect(() => {
        (async function() {
            if(!bankData){
                const data = await getBankData();
                setBankData(data);
            }
        })();
    }, []);

    return <>
        <header className={`flex ${styles.Header}`}>
            <div className={`flex hover:cursor-pointer items-center ${styles.ContainerLogo}`}>
                <a onClick={() => navigate('/')}>
                    <img src="/img/logo.svg" width={165} height={55} alt="logo"/>
                </a>
            </div>
            <HeaderMenu className="ml-auto" items={headerMenuList}>
                <div className="flex items-center justify-end">
                    <div className="wrapper mr-2">
                        <img width={32} height={32} src="/img/icon/UserIcon.svg" alt="UserIcon"/>
                    </div>
                    <div className="wrapper">
                        {!bankData ? <div className="flex flex-col gap-2">
                            <Skeleton.Input className="mt-1" style={{height: 14}} active/>
                            <Skeleton.Input style={{height: 12}} active/>
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