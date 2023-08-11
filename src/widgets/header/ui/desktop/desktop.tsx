import styles from "./style.module.scss";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/app/providers/AuthRouter";
import {CtxRootData} from "@/processes/RootContext";
import {defaultItems} from "../../model/header-menu-items";
import HeaderMenu from "@/widgets/header/ui/menu/HeaderMenu";
import {TOnActionParams} from "@/widgets/header/model/types";
import {memo, useContext, useEffect, useMemo, useState} from "react";
import {ItemOrganization, ItemAccount} from "@/widgets/header/ui/menu/HeaderMenuIComponents";
import {storeOrganizations} from "@/shared/store/organizations";
import {getFormattedIBAN} from "@/shared/lib/helpers";
import { AccountRights } from "@/shared/config/account-rights";
import SvgSchema from "@/shared/ui/icons/IconSchema";

const HeaderDesktop = memo((props) => {

    const {logout} = useAuth();
    const {account, setAccount} = useContext(CtxRootData);
    const navigate = useNavigate();
    const organizations = storeOrganizations(state => state.organizations);

    const [items, setItems] = useState(defaultItems)
    const [activeAccountForDisplay, setActiveAccountForDisplay] = useState({
        number: null,
        name: null,
        isJuridical: null
    })

    const actionsForMenuFunctions: TOnActionParams = useMemo(() => [
        {type: "logout", action: () => logout()},
        {type: "link", action: (value) => navigate(value.toString())},
        {
            type: "change-account", action: (value: {
                number: string,
                client: string,
                id: string
            }) => setAccount(value.number, value.id, value.client)
        }
    ], []);

    useEffect(() => {
        let newItems = [...defaultItems]

        organizations.accounts
            .sort((a) => a.accountType === 'PHYSICAL' ? 1 : -1)
            .forEach(it => {
                let name = organizations.trustedClients.find(item => item.clientId === it.clientId).title

                if (account.number === it.number) {
                    setActiveAccountForDisplay({
                        number: account.number,
                        name: name,
                        isJuridical: it.accountType === 'JURIDICAL'
                    })
                }

                newItems.unshift({
                    id: it.clientId,
                    item: it.accountType === 'PHYSICAL' ? (
                        <ItemAccount
                            number={getFormattedIBAN(it.number)}
                            name={name}
                            active={account.number === it.number}
                        />
                    ) : (
                        <ItemOrganization
                            number={getFormattedIBAN(it.number)}
                            name={name}
                            active={account.number === it.number}
                        />
                    ),
                    action: {
                        type: "change-account",
                        value: {
                            number: it.number,
                            client: it.clientId,
                            id: it.id
                        },
                    },
                    style: {
                        backgroundColor: "var(--color-gray-300)"
                    }
                })
            })

        setItems(account.rights && !account.rights[AccountRights.IsJuridical]
            ? newItems
            : newItems.filter(i => !(i.id === 'investPlatform' || i.id === 'partnership'))
        );
    }, [account.number]);

    return <>
        <header className={`flex ${styles.Header}`}>
            <div className={`flex hover:cursor-pointer items-center ${styles.ContainerLogo}`}>
                <a onClick={() => navigate('/')}>
                    <img src="/img/logo.svg" width={165} height={55} alt="logo"/>
                </a>
            </div>

            <HeaderMenu
                className="ml-auto"
                actions={actionsForMenuFunctions}
                items={items}
            >
                <div className="flex items-center justify-end">
                    <div className="wrapper mr-2">
                        {activeAccountForDisplay.isJuridical ? (
                            <SvgSchema width={32} height={22}/>
                        ) : (
                            <img width={32} height={32} src="/img/icon/UserIcon.svg" alt="UserIcon"/>
                        )}
                    </div>
                    {activeAccountForDisplay.number && <div className="wrapper">
                        <div className="row">
                            <span className="text-sm font-bold">{activeAccountForDisplay.name}</span>
                        </div>

                        <div className="row text-start flex">
                            <span className="text-xs text-start text-gray-400 font-bold leading-3">
                                ID: {getFormattedIBAN(activeAccountForDisplay.number)}
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
