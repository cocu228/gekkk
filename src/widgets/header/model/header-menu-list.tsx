import React from "react";
import {ItemOrganization, ItemPerson, PromoCodeModal} from "@/widgets/header/ui/menu/header-menu-items";

export default [
    {
        item: <ItemPerson active={true}/>,
        id: 'id',
        event: {
            action: undefined, value: "",
        },
        style: {
            backgroundColor: "var(--color-gray-300)"
        }
    },
    {
        item: <ItemOrganization/>,
        id: 'id',
        event: {
            action: undefined, value: "/",
        },
        style: {
            backgroundColor: "var(--color-gray-300)"
        }
    },
    {
        item: 'Dashboard', id: 'dashboard', event: {action: "link", value: "/"},
        style: {
            borderTop: "1px solid var(--color-gray-400)"
        }
    },
    {item: 'Deposit types', id: 'deposit', event: {action: "link", value: "deposit"}},
    {item: 'Limits', id: 'limits'},
    {item: 'Partnership program', id: 'item-4'},
    {
        item: <PromoCodeModal/>, id: 'item-4',
        event: {action: "onclick", value: null}
    },
    {item: 'Settings', id: 'item-4'},
    {
        item: 'Logout', id: 'logout',
        event: {action: "logout", value: null},
        style: {
            borderTop: "1px solid var(--color-gray-400)"
        }
    },
]