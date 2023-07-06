import React from "react";
import {
    GekkoinInvestPlatform,
    PromoCodeModal
} from "@/widgets/header/ui/menu/HeaderMenuIComponents";
import {THeaderMenuList} from "@/widgets/header/model/types";

export class HeaderMenuItems {

    items: THeaderMenuList

    constructor(defaultItems: THeaderMenuList) {
        this.items = defaultItems
    }

    get() {
        return this.items
    }

    set(item: THeaderMenuList[0]) {
        this.items.unshift(item)
    }
}


export const defaultItems: THeaderMenuList = [
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
        item: 'Partnership program',
        id: null,
        action: {
            type: "link",
            value: "partnership-program",
        }
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