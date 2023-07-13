import styles from "./style.module.scss";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/app/providers/AuthRouter";
import {CtxRootData} from "@/processes/RootContext";
import {defaultItems} from "../../model/header-menu-items";
import HeaderMenu from "@/widgets/header/ui/menu/HeaderMenu";
import {TOnActionParams} from "@/widgets/header/model/types";
import {memo, useContext, useEffect, useMemo, useState} from "react";
import {ItemOrganization, ItemAccount, EmptyAccount} from "@/widgets/header/ui/menu/HeaderMenuIComponents";
import {storeOrganizations} from "@/shared/store/organizations";

const HeaderDesktop = memo((props) => {

    const {logout} = useAuth();
    const {account, setAccount} = useContext(CtxRootData);

    const navigate = useNavigate();
    const [items, setItems] = useState(defaultItems)
    const organizations = storeOrganizations(state => state.organizations);

    const actionsForMenuFunctions: TOnActionParams = useMemo(() => [
        {type: "logout", action: () => logout()},
        {type: "link", action: (value) => navigate(value.toString())},
        {type: "change-account", action: (value: null | string) => setAccount(value)}
    ], []);

    useEffect(() => {

        let newItems = [...defaultItems]

        organizations.accounts.forEach(it => {
            newItems.unshift({
                id: it.clientId,
                item: <ItemOrganization
                    clientId={it.clientId}
                    name={organizations.trustedClients.find(item => item.clientId === it.clientId).title}
                    active={account.id === it.number}
                />,
                action: {
                    type: "change-account",
                    value: it.number,
                },
                style: {
                    backgroundColor: "var(--color-gray-300)"
                }
            })
        })

        setItems(newItems);

    }, [account]);

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
                items={account ? items : [
                    {
                        id: 'AccountPlaceholder',
                        item: <EmptyAccount/>,
                        style: {
                            backgroundColor: "var(--color-gray-300)"
                        },
                    },
                    ...items
                ]}
            >
                <div className="flex items-center justify-end">
                    {/*<div className="wrapper mr-2">*/}
                    {/*    {account && account.type === 'JURIDICAL' ? (*/}
                    {/*        <SvgSchema width={32} height={22}/>*/}
                    {/*    ) : (*/}
                    {/*        <img width={32} height={32} src="/img/icon/UserIcon.svg" alt="UserIcon"/>*/}
                    {/*    )}*/}
                    {/*</div>*/}
                    <div className="wrapper">
                            <div className="row">
                                <span className="text-sm font-bold">ID: {account.id}</span>
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
                                    {/*{account.name}*/}
                                </span>
                            </div>
                    </div>
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
