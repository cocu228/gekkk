import React from "react";
import {
    GekkoinInvestPlatform,
    ItemOrganization,
    ItemPerson,
    PromoCodeModal
} from "@/widgets/header/ui/menu/header-menu-items";

export type THeaderMenuList = Array<{
    item: string | JSX.Element,
    id?: null | number | string,
    action?: {
        type?: null | string,
        value?: null | string,
    },
    style?: object
}>

const HeaderMenuList: THeaderMenuList = [

    {
        item: <ItemPerson active={true}/>,
        id: null,
        action: {
            type: null,
            value: null,
        },
        style: {
            backgroundColor: "var(--color-gray-300)"
        }
    },
    {
        item: <ItemOrganization/>,
        id: null,
        action: {
            type: null,
            value: null,
        },
        style: {
            backgroundColor: "var(--color-gray-300)"
        }
    },
    {
        item: 'Dashboard',
        id: null,
        action: {
            type: "link",
            value: "/",
        },
        style: {
            borderTop: "1px solid var(--color-gray-400)"
        }
    },
    {
        item: <PromoCodeModal/>,
        id: null,
        action: {
            type: null,
            value: null,
        },
    },
    {
        item: <GekkoinInvestPlatform/>,
        id: null,
        action: {
            type: null,
            value: null,
        },
    },
    {
        item: 'Support',
        id: null,
        action: {
            type: "link",
            value: "support",
        }
    },
    {
        item: 'Logout',
        id: null,
        action: {
            type: "logout",
            value: null,
        },
        style: {
            borderTop: "1px solid var(--color-gray-400)"
        }
    },
]

export default HeaderMenuList