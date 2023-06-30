import {Skeleton} from "antd";
import styles from "./style.module.scss";
import {IBankData} from "@/shared/api/bank";
import {useNavigate} from "react-router-dom";
import {useAuth} from "@/app/providers/AuthRouter";
import {CtxRootData} from "@/app/CurrenciesContext";
import {defaultItems} from "../../model/header-menu-items";
import HeaderMenu from "@/widgets/header/ui/menu/HeaderMenu";
import {TOnActionParams} from "@/widgets/header/model/types";
import {storeBankData} from "@/shared/store/bank-data/bank-data";
import {memo, useContext, useEffect, useMemo, useState} from "react";
import {ItemOrganization, ItemPerson} from "@/widgets/header/ui/menu/HeaderMenuIComponents";

const HeaderDesktop = memo((props) => {

    const {logout} = useAuth();
    const {person, setPerson} = useContext(CtxRootData);

    const navigate = useNavigate();
    const [items, setItems] = useState(defaultItems)

    const [bankData, setBankData] = useState<IBankData>(null);
    const getBankData = storeBankData(state => state.getBankData);


    const actionsForMenuFunctions: TOnActionParams = useMemo(() => [
        {type: "link", action: (value) => navigate(value.toString())},
        {type: "change-person", action: (value: { id: number, type: string }) => setPerson(value)},
        {type: "logout", action: () => logout()}
    ], [])

    useEffect(() => {
        (async function () {
            if (!bankData) {
                const data = await getBankData();
                setBankData(data);
            }

            let newItems = [...defaultItems]

            newItems.unshift({
                item: <ItemOrganization id={1} active={person.id === 1}/>,
                id: 1,
                action: {
                    type: "change-person",
                    value: {id: 1, type: "organization"},
                },
                style: {
                    backgroundColor: "var(--color-gray-300)"
                }
            },)

            newItems.unshift({
                item: <ItemPerson id={0} active={person.id === 0}/>,
                id: 0,
                action: {
                    type: "change-person",
                    value: {id: 0, type: "individual"}
                },
                style: {
                    backgroundColor: "var(--color-gray-300)"
                },
            })

            setItems(newItems)

        })();
    }, [person.id]);

    return <>
        <header className={`flex ${styles.Header}`}>
            <div className={`flex hover:cursor-pointer items-center ${styles.ContainerLogo}`}>
                <a onClick={() => navigate('/')}>
                    <img src="/img/logo.svg" width={165} height={55} alt="logo"/>
                </a>
            </div>
            <HeaderMenu actions={actionsForMenuFunctions} className="ml-auto" items={items}>
                <div className="flex items-center justify-end">
                    <div className="wrapper mr-2">
                        <img width={32} height={32} src="/img/icon/UserIcon.svg" alt="UserIcon"/>
                    </div>
                    <div className="wrapper">
                        {false ? <div className="flex flex-col gap-2">
                            <Skeleton.Input className="mt-1" style={{height: 14}} active/>
                            <Skeleton.Input style={{height: 12}} active/>
                        </div> : <>
                            <div className="row">
                                <span className="text-sm font-bold">ID: {person.id}</span>
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
                                    {person.type}
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
export default HeaderDesktop