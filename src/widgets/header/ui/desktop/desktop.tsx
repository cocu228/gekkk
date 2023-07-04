import {Skeleton} from "antd";
import styles from "./style.module.scss";
import {useNavigate} from "react-router-dom";
import {IBankAccount} from "@/shared/api/bank";
import {useAuth} from "@/app/providers/AuthRouter";
import {CtxRootData, ICtxAccount} from "@/app/RootContext";
import SvgSchema from "@/shared/ui/icons/IconSchema";
import {getFormattedIBAN} from "@/shared/lib/helpers";
import {defaultItems} from "../../model/header-menu-items";
import HeaderMenu from "@/widgets/header/ui/menu/HeaderMenu";
import {TOnActionParams} from "@/widgets/header/model/types";
import {storeBankData} from "@/shared/store/bank-data/bank-data";
import {memo, useContext, useEffect, useMemo, useState} from "react";
import {ItemOrganization, ItemAccount, EmptyAccount} from "@/widgets/header/ui/menu/HeaderMenuIComponents";

const HeaderDesktop = memo((props) => {

    const {logout} = useAuth();
    const {account, setAccount} = useContext(CtxRootData);

    const navigate = useNavigate();
    const [items, setItems] = useState(defaultItems)

    const getBankData = storeBankData(state => state.getBankData);
    const [bankAccounts, setBankAccounts] = useState<IBankAccount[]>(null);

    const actionsForMenuFunctions: TOnActionParams = useMemo(() => [
        {type: "logout", action: () => logout()},
        {type: "link", action: (value) => navigate(value.toString())},
        {type: "change-person", action: (value: ICtxAccount) => setAccount(value)}
    ], []);

    useEffect(() => {
        (async function () {
            if (!bankAccounts) {
                const {bankAccounts} = await getBankData();
                setBankAccounts(bankAccounts);
            }

            let newItems = [...defaultItems]

            newItems.unshift(...bankAccounts
                .filter(a => a.accountType === 'JURIDICAL')
                .map(organization => ({
                    id: organization.number,
                    item: <ItemOrganization
                        id={organization.number}
                        title={organization.name}
                        active={account?.id === organization.number}
                    />,
                    action: {
                        type: "change-person",
                        value: {
                            id: organization.number,
                            name: organization.name,
                            type: organization.accountType
                        },
                    },
                    style: {
                        backgroundColor: "var(--color-gray-300)"
                    }
                }
            )));

            newItems.unshift(...bankAccounts
                .filter(a => a.accountType === 'PHYSICAL')
                .map(acc => ({
                    id: acc.number,
                    item: <ItemAccount
                        id={acc.number}
                        title={acc.name}
                        active={account?.id === acc.number}
                    />,
                    action: {
                        type: "change-person",
                        value: {
                            id: acc.number,
                            name: acc.name,
                            type: acc.accountType
                        }
                    },
                    style: {
                        backgroundColor: "var(--color-gray-300)"
                    },
                }
            )));

            if (!account) setAccount(newItems[0]?.action.value as ICtxAccount);
            setItems(newItems);
        })();
    }, [account, bankAccounts]);

    return <>
        <header className={`flex ${styles.Header}`}>
            <div className={`flex hover:cursor-pointer items-center ${styles.ContainerLogo}`}>
                <a onClick={() => navigate('/')}>
                    <img src="/img/logo.svg" width={165} height={55} alt="logo"/>
                </a>
            </div>

            <HeaderMenu
                actions={actionsForMenuFunctions}
                className="ml-auto"
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
                    <div className="wrapper mr-2">
                        {account && account.type === 'JURIDICAL' ? (
                            <SvgSchema width={32} height={22}/>
                        ) : (
                            <img width={32} height={32} src="/img/icon/UserIcon.svg" alt="UserIcon"/>
                        )}
                    </div>
                    <div className="wrapper">
                        {!bankAccounts || !account ? <div className="flex flex-col gap-2">
                            <Skeleton.Input className="mt-1" style={{height: 14, width: 200}} active/>
                            <Skeleton.Input style={{height: 12, width: 200}} active/>
                        </div> : <>
                            <div className="row">
                                <span className="text-sm font-bold">ID: {getFormattedIBAN(account.id)}</span>
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
                                    {account.name}
                                </span>
                            </div>
                        </>}
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
