import styles from "./style.module.scss";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/app/providers/AuthRouter";
import {CtxRootData} from "@/processes/RootContext";
import SvgSchema from "@/shared/ui/icons/IconSchema";
import {getFormattedIBAN} from "@/shared/lib/helpers";
import {defaultItems} from "../../model/header-menu-items";
import HeaderMenu from "@/widgets/header/ui/menu/HeaderMenu";
import {TOnActionParams} from "@/widgets/header/model/types";
import {AccountRights} from "@/shared/config/account-rights";
import {storeAccounts} from "@/shared/store/accounts/accounts";
import {memo, useContext, useEffect, useMemo, useState} from "react";
import {ItemOrganization, ItemAccount} from "@/widgets/header/ui/menu/HeaderMenuIComponents";

const HeaderDesktop = memo((props) => {

    const {logout} = useAuth();
    const {account, setAccount} = useContext(CtxRootData);
    const navigate = useNavigate();
    const accounts = storeAccounts(state => state.accounts);

    const [items, setItems] = useState(defaultItems)

    const actionsForMenuFunctions: TOnActionParams = useMemo(() => [
        {type: "logout", action: () => logout()},
        {type: "link", action: (value) => navigate(value.toString())},
        {
            type: "change-account", action: (value) => {
                navigate("/");
                setAccount(value.toString());
                window.location.reload();
            }
        }
    ], []);

    useEffect(() => {
        if (!account.rights) return;

        let newItems = [...defaultItems]

        accounts
            .sort(acc => acc.rights[AccountRights.IsJuridical] ? -1 : 1)
            .forEach(acc => {
                newItems.unshift({
                    id: acc.number,
                    item: acc.rights[AccountRights.IsJuridical] ? (
                        <ItemOrganization
                        number={getFormattedIBAN(acc.number)}
                        name={acc.name}
                        active={account.number === acc.number}
                        />
                    ) : (
                        <ItemAccount
                            number={getFormattedIBAN(acc.number)}
                            name={acc.name}
                            active={account.number === acc.number}
                        />
                    ),
                    action: {
                        type: "change-account",
                        value: acc.number,
                    },
                    style: {
                        backgroundColor: "var(--color-gray-300)"
                    }
                })
            })

        setItems(!account.rights[AccountRights.IsJuridical]
            ? newItems
            : newItems.filter(i => !(i.id === 'investPlatform' || i.id === 'partnership'))
        );

    }, [account.rights]);

    return <>
        <header className={`flex ${styles.Header}`}>
            <div className={`flex hover:cursor-pointer items-center ${styles.ContainerLogo}`}>
                <a onClick={() => navigate('/')}>
                    <img src="/img/logo.svg" width={165} height={55} alt="logo"/>
                </a>
            </div>

            <HeaderMenu
                items={items}
                className="ml-auto"
                actions={actionsForMenuFunctions}
            >
                <div className="flex items-center justify-end">
                    <div className="wrapper mr-2">
                        {account.rights[AccountRights.IsJuridical] ? (
                            <SvgSchema width={32} height={22}/>
                        ) : (
                            <img width={32} height={32} src="/img/icon/UserIcon.svg" alt="UserIcon"/>
                        )}
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
                <div className="flex items-center justify-end ml-10">
                    <img width={26} height={26} src="/img/icon/LogoutIcon.svg" alt="UserIcon"/>
                </div>
            </button>
        </header>
    </>
})

export default HeaderDesktop;
