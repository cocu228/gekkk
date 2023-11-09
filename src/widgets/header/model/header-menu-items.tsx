import React from "react";
import {TFunction} from "i18next";
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

/**
* @param t translation function
*/
export const getDefaultItems = (t?: TFunction): THeaderMenuList => {
    return [
        {
            item: t('header_menu.dashboard'),
            id: 'dashboard',
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
            id: 'promoCode',
            action: {
                type: null,
                value: null,
            },
        },
        {
            item: <GekkoinInvestPlatform/>,
            id: 'investPlatform',
            action: {
                type: null,
                value: null,
            },
        },
        {
            item: t('header_menu.partnership'),
            id: 'partnership',
            action: {
                type: "link",
                value: "partnership-program",
            }
        },
        {
            item: t('header_menu.support'),
            id: 'support',
            action: {
                type: "link",
                value: "support",
            }
        },
        {
            item: t('header_menu.logout'),
            id: 'logout',
            action: {
                type: "logout",
                value: null,
            },
            style: {
                borderTop: "1px solid var(--color-gray-400)"
            }
        },
    ]
}