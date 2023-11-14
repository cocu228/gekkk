import {useContext} from "react";
import styles from "./style.module.scss";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "@/app/providers/AuthRouter";
import {CtxRootData} from "@/processes/RootContext";
import SvgSchema from "@/shared/ui/icons/IconSchema";
import {getFormattedIBAN} from "@/shared/lib/helpers";
import HeaderMenu from "@/widgets/header/ui/menu/HeaderMenu";
import {AccountRights} from "@/shared/config/account-rights";
import {LocalizationMenu} from "@/widgets/header/ui/LocalizationMenu";

const HeaderDesktop = ({items, actions}) => {
    const {logout} = useAuth();
    const navigate = useNavigate();
    const {account} = useContext(CtxRootData);

    return <>
        <header className={`flex ${styles.Header}`}>
            <div className={`flex hover:cursor-pointer items-center ${styles.ContainerLogo}`}>
                <a onClick={() => navigate('/')}>
                    <img src="/img/logo.svg" width={165} height={55} alt="logo"/>
                </a>
            </div>


            
            <div className="flex ml-auto items-center gap-10">
                <Link to="/new">go to new layout</Link>

                <LocalizationMenu/>
            </div>
            
            <HeaderMenu
                items={items}
                actions={actions}
            >
                <div className="flex items-center justify-end" data-testid="HeaderMenuContainer">
                    <div className="wrapper mr-2">
                        {account.rights[AccountRights.IsJuridical] ? <SvgSchema width={32} height={22}/> :
                            <img width={32} height={32} src="/img/icon/UserIcon.svg" alt="UserIcon"/>}
                    </div>
                    
                    {account.number && <div className="wrapper">
                        <div className="row">
                            <span className="text-sm font-bold">{account.name}</span>
                        </div>

                        <div className="row text-start flex">
                            <span className="text-xs text-start text-gray-400 font-bold leading-3">
                                ID: {getFormattedIBAN(account.number)}
                            </span>
                        </div>
                    </div>}
                    
                    <img
                        className="inline-flex mb-3"
                        src="/img/icon/DropdownTriangleIcon.svg"
                        alt="DropdownTriangleIcon"
                    />
                </div>
            </HeaderMenu>
            
            <button onClick={logout}>
                <div className="flex items-center justify-end ml-10" data-testid="Logout">
                    <img width={26} height={26} src="/img/icon/LogoutIcon.svg" alt="UserIcon"/>
                </div>
            </button>
        </header>
    </>
}

export default HeaderDesktop;
