import { TFunction } from "i18next";

import { EnableNotifications, PromoCodeModal } from "@/widgets/header/ui/menu/HeaderMenuIComponents";
import { THeaderMenuList } from "@/widgets/header/model/types";
import { IconApp } from "@/shared/ui/icons/icon-app";
import Button from "@/shared/ui/button/Button";
import { IS_GEKKARD_APP } from "@/shared/lib";

/**
 * @param t translation function
 */
export const getDefaultItems = (t?: TFunction, mobile?: boolean): THeaderMenuList => [
  {
    item: t("settings"),
    id: "settings",
    action: {
      type: "link",
      value: "settings"
    },
    icon: <IconApp size={18} color='var(--gek-additional)' code='t13' />,
    style: {
      padding: "12px 12px"
    }
  },
  IS_GEKKARD_APP() && {
    item: t("payment_cards"),
    id: "paymentCards",
    action: {
      type: "link",
      value: mobile ? "card-menu" : "wallet?currency=EUR&tab=bank_cards"
    },
    icon: <IconApp size={18} color='var(--gek-additional)' code='t22' />,
    style: {
      padding: "12px 12px"
    }
  },
  // {
  //     item: <CrossPlatformNav/>,
  //     id: 'investPlatform',
  //     action: {
  //         type: null,
  //         value: null,
  //     },
  //     icon: <IconApp color="var(--gek-additional)" size={18} code="t21" />,
  //     style: {
  //         padding: "12px 12px"
  //     }
  // },
  {
    item: t("header_menu.support"),
    id: "support",
    action: {
      type: "link",
      value: "support"
    },
    icon: <IconApp color='var(--gek-additional)' size={18} code='t25' />,
    style: {
      padding: "12px 12px"
    }
  },
  "Notification" in window && Notification?.permission === "granted"
    ? null
    : {
        item: <EnableNotifications />,
        id: "enableNotifications",
        action: {
          type: null,
          value: null
        },
        icon: <IconApp color='var(--gek-additional)' size={20} code='t23' />,
        style: {
          padding: "12px 12px"
        }
      },
  {
    item: t("header_menu.partnership"),
    id: "partnership",
    action: {
      type: "link",
      value: "partnership-program"
    },
    icon: <IconApp color='var(--gek-additional)' size={17} code='t17' />,
    style: {
      padding: "12px 12px"
    }
  },
  {
    item: <PromoCodeModal />,
    id: "promoCode",
    action: {
      type: null,
      value: null
    },
    icon: <IconApp color='var(--gek-additional)' size={20} code='t18' />,
    style: {
      padding: "12px 12px"
    }
  },
  {
    item: (
      <Button className='!bg-[var(--gek-dark-blue)] !h-[32px] !text-[12px] min-w-[150px] !font-semibold !max-w-[170px]'>
        {t("get_gekkard_pro")}
      </Button>
    ),
    id: "GetGekkardPRO",
    action: {
      type: "link",
      value: "gekkard-pro"
    },
    style: {
      display: "grid",
      justifyContent: "center",
      width: "100%",
      alignSelf: "center",
      padding: "12px 12px"
    }
  },
  {
    item: t("header_menu.logout"),
    id: "logout",
    action: {
      type: "logout",
      value: null
    },
    icon: <IconApp size={20} code='t20' color='var(--gek-additional)' />,
    style: {
      borderTop: "1px solid var(--gek-dark-blue)",
      padding: "12px 12px"
    }
  }
];
