import React from "react";
import {TFunction} from "i18next";
import {GekkoinInvestPlatform, PromoCodeModal} from "@/widgets/header/ui/menu/HeaderMenuIComponents";
import {THeaderMenuList} from "@/widgets/header/model/types";

import SettingsMobileIcon from "@public/img/icon/SettingsMobileIcon.svg"
import InvestMobileIcon from "@public/img/icon/InvestMobileIcon.svg"
import SupportMobileIcon from "@public/img/icon/SupportMobileIcon.svg"
import PartnershipMobileIcon from "@public/img/icon/PartnershipMobileIcon.svg"
import ActivatePromoMobileIcon from "@public/img/icon/ActivatePromoMobileIcon.svg"
import LogoutMobileIcon from "@public/img/icon/LogoutMobileIcon.svg"


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
            icon: <img src={SettingsMobileIcon}/>
        },
        {
            item: <GekkoinInvestPlatform/>,
            id: 'investPlatform',
            action: {
                type: null,
                value: null,
            },
            icon:<img src={InvestMobileIcon}/>
        },
        {
            item: t('header_menu.support'),
            id: 'support',
            action: {
                type: "link",
                value: "support",
            },
            icon:<img src={SupportMobileIcon}/>
        },
        {
            item: t('header_menu.partnership'),
            id: 'partnership',
            action: {
                type: "link",
                value: "partnership-program",
            },
            icon:<img src={PartnershipMobileIcon}/>
        },
        {
            item: <PromoCodeModal/>,
            id: 'promoCode',
            action: {
                type: null,
                value: null,
            },
            icon:<img src={ActivatePromoMobileIcon}/>
        },
        {
            item: t(''),
            id: 'GetGekkardPRO',
            action: {
                type: "link",
                value: null,
            },
            icon:<button className="flex text-sm font-normal border bg-[#29354C] text-[#F7F7F0] transition-[0.2s] cursor-pointer shadow-[0px_0px_4px_0px_rgba(195,195,195,0.50)_inset] px-6 py-1.5 rounded-lg border-solid border-[#29354C]">Get Gekkard PRO</button>,
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
            icon:<img src={LogoutMobileIcon}/>,
            style: {
                borderTop: "1px solid var(--color-gray-400)"
            }
        },
    ]
}