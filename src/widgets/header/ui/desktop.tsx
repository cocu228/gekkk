import styles from "./desktop.module.scss"
import {useAuth} from "@/app/providers/AuthRouter";
import {Dropdown} from "antd";
// import {DropdownMenuItem} from "../module/dropdown-menu";


const items = [
    {label: 'Dashboard', key: 'item-1'},
    {label: 'Deposit types', key: 'item-2'},
    {label: 'Limits', key: 'item-3'},
    {label: 'Settings', key: 'item-4'},
    {label: 'Contacts', key: 'item-5'},
    {label: 'Logout', key: 'item-6'},
]
const HeaderDesktop = () => {

    const {logout} = useAuth()

    const onBtnProfile = () => {

    }

    const onBtnLogout = () => {
        logout()
    }

    return <>
        <header className={`flex ${styles.Header}`}>
            <div className={`flex items-center ${styles.ContainerLogo}`}>
                <a href="/">
                    <img src="/public/img/logo.svg" width={165} height={55} alt="logo"/>
                </a>
            </div>
            <button className="ml-auto" onClick={onBtnProfile}>
                <Dropdown trigger={['click']} menu={{items}}>
                    <div className="flex items-center justify-end">
                        <div className="wrapper mr-2">
                            <img width={26} height={26} src="/public/img/icon/UserIcon.svg" alt="UserIcon"/>
                        </div>
                        <div className="wrapper">
                            <div className="row">
                                <span className="text-sm">ID: 208294110048</span>
                                <span>$</span>
                            </div>
                            <div className="row">
                                <span className="text-xs text-gray font-semibold">Your current status: Start</span>
                            </div>
                        </div>
                    </div>
                </Dropdown>
            </button>
            <button onClick={onBtnLogout}>
                <div className="flex items-center justify-end ml-10">
                    <img width={26} height={26} src="/public/img/icon/LogoutIcon.svg" alt="UserIcon"/>
                </div>
            </button>
        </header>
    </>

}

export default HeaderDesktop