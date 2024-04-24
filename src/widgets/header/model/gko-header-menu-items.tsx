import React from "react";
import {TFunction} from "i18next";
import {THeaderMenuList} from "@/widgets/header/model/types";
import {GekkardPersonalAccount} from "@/widgets/header/ui/menu/HeaderMenuIComponents";

// export class HeaderMenuItems {
//
//     items: THeaderMenuList
//
//     constructor(defaultItems: THeaderMenuList) {
//         this.items = defaultItems
//     }
//
//     get() {
//         return this.items
//     }
//
//     set(item: THeaderMenuList[0]) {
//         this.items.unshift(item)
//     }
// }

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
            item: t('header_menu.deposit_types'),
            id: 'depositTypes',
            action: {
                type: "link",
                value: "/deposit-types",
            }
        },
        {
            item: <GekkardPersonalAccount/>,
            id: 'investPlatform',
            action: {
                type: null,
                value: null,
            },
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
