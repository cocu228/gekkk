import React, {useContext, useMemo, useRef, useState} from "react";
import RefreshButton from "@/shared/ui/refresh-button";
import {TPropsHeaderMenu} from "@/widgets/header/model/types";
import {storeAccounts} from "@/shared/store/accounts/accounts";
import styles from "@/widgets/header/ui/menu/style.module.scss";
import DropdownMenuFunctions from "../../model/dropdown-menu-functions";
import {useTranslation} from "react-i18next";
import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";

const HeaderMenu = ({children, items, className = "", actions}: TPropsHeaderMenu) => {
    const ref = useRef(null);
    const {t} = useTranslation();
    const [isActive, toggleActive] = useState(false);
    const getAccounts = storeAccounts(state => state.getAccounts);
    const dropdownMenuFunctions =
        useMemo(() => new DropdownMenuFunctions(ref, toggleActive, actions), [ref])
    const { sm, md, xxxl } = useContext(BreakpointsContext);
    

    return <>
        <div ref={ref} onClick={dropdownMenuFunctions.onOpen}
             className={className + " flex items-center cursor-pointer h-full"}>
            <div className={`wrapper relative ${!md && "md:pl-14 pl-7"}   md:pr-0  pr-7 min-w-[250px] ${isActive ? "active" : ""}`}>
                {children}
                <div className={`${styles.DropdownMenu} ${isActive ? "active" : ""}`}>
                    {items.map((item, i) => <span key={"ItemMenu_" + i}
                                                  style={item.style}
                                                  onClick={() => dropdownMenuFunctions.onAction(item.action)}
                                                  className={`${styles.DropdownItem} h-full gap-[3%]`}>  {item.icon}{item.item} </span>)}
                    
                </div>
            </div>
        </div>
    </>
}

export default HeaderMenu;
