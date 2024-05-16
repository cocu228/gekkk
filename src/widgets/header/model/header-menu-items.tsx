import React from "react";
import {TFunction} from "i18next";
import {EnableNotifications, GekkoinInvestPlatform, PromoCodeModal} from "@/widgets/header/ui/menu/HeaderMenuIComponents";
import {THeaderMenuList} from "@/widgets/header/model/types";


import { IconApp } from "@/shared/ui/icons/icon-app";

/**
* @param t translation function
*/
export const getDefaultItems = (t?: TFunction, mobile?: boolean): THeaderMenuList => {
    return [
        {
            item: t("settings"),
            id:"settings",
            action:{
                type: "link",
                value:"settings"
            },
            icon: <IconApp size={18} color="#285E69" code="t13" />
        },
        {
            item: t("card_management"),
            id:"cardManagment",
            action:{
                type: "link",
                value: mobile ? "card-menu" : "wallet?currency=EUR&tab=bank_cards"
            },
            icon: <IconApp size={18} color="#285E69" code="t22" />
        },
        {
            item: <GekkoinInvestPlatform/>,
            id: 'investPlatform',
            action: {
                type: null,
                value: null,
            },
            icon: <IconApp color="#285E69" size={18} code="t21" />
        },
        {
            item: t('header_menu.support'),
            id: 'support',
            action: {
                type: "link",
                value: "support",
            },
            icon:<IconApp color="#285E69" size={18} code="t25" />
        },
        ('Notification' in window && Notification?.permission === 'granted' ? null : {
            item: <EnableNotifications/>,
            id: 'enableNotifications',
            action: {
                type: null,
                value: null,
            },
            icon: <IconApp color="#285E69" size={20} code="t23" />
        }),
        {
            item: t('header_menu.partnership'),
            id: 'partnership',
            action: {
                type: "link",
                value: "partnership-program",
            },
            icon: <IconApp color="#285E69" size={17} code="t17" />
        },
        {
            item: <PromoCodeModal/>,
            id: 'promoCode',
            action: {
                type: null,
                value: null,
            },
            icon: <IconApp color="#285E69" size={20} code="t18" />
        },
        {
            item: t(''),
            id: 'GetGekkardPRO',
            action: {
                type: "link",
                value: "gekkard-pro",
            },
            icon:<button className="flex text-sm font-normal border bg-[var(--gek-dark-blue)] text-[var(--gek-background)] transition-[0.2s] cursor-pointer shadow-[0px_0px_4px_0px_rgba(195,195,195,0.50)_inset] px-6 py-1.5 rounded-lg border-solid border-[var(--gek-dark-blue)]">{t("get_gekkard_pro")}</button>,
            style:{
                display:'flex',
                justifyContent:"center",
                width:"100%",
                alignSelf:"center"
            }
        },
        {
            item: t('header_menu.logout'),
            id: 'logout',
            action: {
                type: "logout",
                value: null,
            },
            icon: <IconApp size={20} code="t20" color="#285E69" />,
            style: {
                borderTop: "1px solid var(--color-gray-400)"
            }
        },
    ]
}