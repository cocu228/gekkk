import React from "react";
import {TFunction} from "i18next";
import {THeaderMenuList} from "@/widgets/header/model/types";
import {IconApp} from "@/shared/ui/icons/icon-app";
import {EnableNotifications, GekkoinInvestPlatform} from "@/widgets/header/ui/menu/HeaderMenuIComponents";
// import {GekkardPersonalAccount} from "@/widgets/header/ui/menu/HeaderMenuIComponents";

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
            item: t("settings"),
            id:"settings",
            action:{
                type: "link",
                value:"settings"
            },
            icon: <IconApp size={18} color="var(--gek-additional)" code="t13" />,
            style: {
                borderTop: "1px solid var(--color-gray-400)",
                padding: "12px 12px"
            }
        },
        {
            item: <GekkoinInvestPlatform/>,
            id: 'investPlatform',
            action: {
                type: null,
                value: null,
            },
            icon: <IconApp color="var(--gek-additional)" size={18} code="t21" />,
            style: {
                padding: "12px 12px"
            }
        },
        {
            item: t('header_menu.support'),
            id: 'support',
            action: {
                type: "link",
                value: "support",
            },
            icon:<IconApp color="var(--gek-additional)" size={18} code="t25" />,
            style: {
                padding: "12px 12px"
            }
        },
        ('Notification' in window && Notification?.permission === 'granted' ? null : {
            item: <EnableNotifications/>,
            id: 'enableNotifications',
            action: {
                type: null,
                value: null,
            },
            icon: <IconApp color="var(--gek-additional)" size={20} code="t23" />,
            style: {
                padding: "12px 12px"
            }
        }),
        /*{
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
            },
            style: {
                padding: "12px 12px"
            }
        },*/
        // {
        //     item: <GekkardPersonalAccount/>,
        //     id: 'investPlatform',
        //     action: {
        //         type: null,
        //         value: null,
        //     },
        // },
        // {
        //     item: t('header_menu.support'),
        //     id: 'support',
        //     action: {
        //         type: "link",
        //         value: "support",
        //     },
        //     style: {
        //         padding: "12px 12px"
        //     }
        // },
        {
            item: t('header_menu.logout'),
            id: 'logout',
            action: {
                type: "logout",
                value: null,
            },
            style: {
                borderTop: "1px solid var(--color-gray-400)",
                padding: "12px 12px"
            }
        },
    ]
}
