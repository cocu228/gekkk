import HeaderMobile from "./mobile/mobile";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import HeaderDesktop from "./desktop/desktop";
import {useAuth} from "@/app/providers/(no-usages)AuthRouter";
import {CtxRootData} from "@/processes/RootContext";
import {getFormattedIBAN} from "@/shared/lib/helpers";
import {AccountRights} from "@/shared/config/account-rights";
import {TOnActionParams} from "@/widgets/header/model/types";
import {storeAccounts} from "@/shared/store/accounts/accounts";
import {useContext, useEffect, useMemo, useState} from "react";
import {BreakpointsContext} from "@/app/providers/BreakpointsProvider";
import {getDefaultItems} from "@/widgets/header/model/header-menu-items";
import {ItemAccount, ItemOrganization} from "@/widgets/header/ui/menu/HeaderMenuIComponents";



const Header = () => {

    const {logout} = useAuth();
    const navigate = useNavigate();
    const {t, i18n} = useTranslation();
    const {md} = useContext(BreakpointsContext);
    const {account, setAccount} = useContext(CtxRootData);
    const accounts = storeAccounts(state => state.accounts);
    const defaultMenuItems = useMemo(() => getDefaultItems(t), [i18n.language]);
    const [items, setItems] = useState(defaultMenuItems);
    
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
        if (!account?.rights) return;

        let newItems = [...defaultMenuItems]
        
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
                        backgroundColor: "#FFF",
                        borderRadius: "6px",
                        marginBottom: "3px"
                    },
                })
            })

        setItems(!account.rights[AccountRights.IsJuridical]
            ? newItems
            : newItems.filter(i => !(i.id === 'investPlatform' || i.id === 'partnership'))
        );


    }, [account?.rights, defaultMenuItems]);

    return md
        ? <HeaderMobile items={items} actions={actionsForMenuFunctions}/>
        : <HeaderDesktop items={items} actions={actionsForMenuFunctions}/>;
}

export default Header;
