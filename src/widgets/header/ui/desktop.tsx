import styles from "./desktop.module.scss"
import {useAuth} from "@/app/providers/AuthRouter";
import {Dropdown, MenuProps} from "antd";
import {useNavigate} from "react-router-dom";


const items = [
    {label: 'Dashboard', key: '/'},
    {label: 'Deposit types', key: 'deposit'},
    {label: 'Limits', key: 'item-3'},
    {label: 'Settings', key: 'item-4'},
    {label: 'Contacts', key: 'item-5'},
    {label: 'Logout', key: 'logout'},
]
const HeaderDesktop = () => {

    const {logout} = useAuth()
    const navigation = useNavigate()
    const onBtnProfile = () => {

    }

    const onBtnLogout = () => {
        logout()
    }

    const onClick: MenuProps['onClick'] = ({key}) => {

        if (key === "logout") {
            logout()
        } else {
            navigation(key)
        }
    };

    return <>
        <header className={`flex ${styles.Header}`}>
            <div className={`flex items-center ${styles.ContainerLogo}`}>
                <a href="/">
                    <img src="/img/logo.svg" width={165} height={55} alt="logo"/>
                </a>
            </div>
            <button className="ml-auto" onClick={onBtnProfile}>
                <Dropdown trigger={['click']} menu={{items, onClick}}>
                    <div className="flex items-center justify-end">
                        <div className="wrapper mr-2">
                            <img width={26} height={26} src="/img/icon/UserIcon.svg" alt="UserIcon"/>
                        </div>
                        <div className="wrapper">
                            <div className="row">
                                <span className="text-sm">ID: 208294110048</span>
                                <span>$</span>
                            </div>
                            <div className="row">
                                <span className="text-xs text-gray font-semibold">Your current status: Start</span>
                                <img className="inline-flex" src="/img/icon/DropdownTriangleIcon.svg"
                                     alt="DropdownTriangleIcon"/>
                            </div>
                        </div>
                    </div>
                </Dropdown>
            </button>
            <button onClick={onBtnLogout}>
                <div className="flex items-center justify-end ml-10">
                    <img width={26} height={26} src="/img/icon/LogoutIcon.svg" alt="UserIcon"/>
                </div>
            </button>
        </header>
    </>

}

export default HeaderDesktop