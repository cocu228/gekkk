import { useContext, useState } from "react";
import { Link, NavLink, useLocation, useMatch, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { CtxRootData } from "@/processes/RootContext";
import SvgSchema from "@/shared/ui/icons/IconSchema";
import HeaderMenu from "@/widgets/header/ui/menu/HeaderMenu";
import { AccountRights } from "@/shared/config/mask-account-rights";
import { getFormattedIBAN } from "@/shared/lib/helpers";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { BreakpointsContext } from "@/app/providers/BreakpointsProvider";
import useModal from "@/shared/model/hooks/useModal";

import { ExchangeRoomMenu } from "./ExchangeRoomMenu";
import styles from "./style.module.scss";

const HeaderMobile = ({ items, actions }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { account } = useContext(CtxRootData);
  const { md } = useContext(BreakpointsContext);
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const roomCloseModal = useModal();

  const [params] = useSearchParams();
  const tab = params.get("tab");
  const roomId = params.get("roomId");
  const settingsTab = params.get("sessionsSection");
  const currency = params.get("currency");

  const homePage = useMatch("/");
  const exchangePage = useMatch("/exchange");
  const privateRoomPage = useMatch("/private-room");
  const historyPage = useMatch("/history");
  const walletPage = useMatch("/wallet");
  const isOnMainPages = !!homePage;

  const headerTitle = () => {
    switch (location.pathname.split("/")[1]) {
      case `wallet`:
        if (tab === "top_up") {
          return t("top_up_wallet");
        }
        if (tab === "about") {
          return `${t("about")} ${currency}`;
        }
        if (tab === "programs") {
          return `${t("programs")} ${currency}`;
        }
        return t("wallet").capitalize();
      case `partnership-program`:
        return t("partnership_program.title").capitalize();
      case `support`:
        return t("support.title").capitalize();
      case `faq`:
        return t("faq").toUpperCase();
      case `crypto-assets`:
        return t("crypto_assets.title").capitalize();
      case `profile-settings`:
        return t("profile_settings").capitalize();
      case `transfers`:
        return t("transfers").capitalize();
      case `exchange`:
        return t("exchange.title").capitalize();
      case `private-room`:
        return t("exchange.private_title").capitalize();
      case "card-menu":
        if (location.search === "?how_it_works=true") {
          return t("how_it_works").capitalize();
        } else if (location.search === "?card_info=true") {
          return t("card_data").capitalize();
        } else {
          return t("payment_cards").capitalize();
        }
      case "gekkard-pro":
        return t("gekkard_pro.title").capitalize();
      default:
        return t(`${location.pathname.slice(1).replace("-", "_")}`).capitalize();
    }
  };

  const settingsTabTitle = () => {
    switch (settingsTab) {
      case `personal-information`:
        return t("personal_information");
      case "app-version":
        return t("app_version");
      case "language":
        return t("language");
      case "change-password":
        return t("change_password");
      case "user-keys":
        return t("user_keys");
      case "sign-history":
        return t("sign_history");
      case "user-sessions":
        return t("user_sessions");
      case "pricing":
        return t("pricing");
      case "my-reports":
        return `${t("my_fiat_reports")} (EUR)`;
      default:
        return t("settings");
    }
  };

  const handleOnNavigate = (tabs?: string) => () => {
    const { state } = location;
    switch (tabs) {
      case "custom":
        navigate("/history");
        break;
      case settingsTab:
        settingsTab === "my-reports" ? navigate(state ? state : -2) : navigate("/settings");
        break;
      default:
        navigate(state ? state : "/");
    }
  };

  return (
    <>
      <header className={styles.Header}>
        {isOnMainPages ? (
          <HeaderMenu items={items} className='pl-5' actions={actions} onStateChange={setIsMenuOpened}>
            <div className='flex items-center justify-start' data-testid='HeaderMenuContainer'>
              {account?.rights[AccountRights.IsJuridical] ? (
                <SvgSchema width={32} height={22} />
              ) : (
                <IconApp code='t10' size={24} color='white' />
              )}

              {account?.number && (
                <div className='wrapper flex flex-col justify-center  self-stretch'>
                  <span className={styles.Name}>{account?.name}</span>

                  <span className={styles.Number}>{getFormattedIBAN(account?.number)}</span>
                </div>
              )}

              <button className={`${styles.ArrowBtn}`}>
                <IconApp size={14} code='t08' color='#fff' className={`rotate-[${isMenuOpened ? "-90" : "90"}deg]`} />
              </button>
            </div>
          </HeaderMenu>
        ) : tab === "custom" ? (
          <div
            className='flex items-center w-full'
            onClick={handleOnNavigate("custom")}
            data-testid='HeaderMenuContainer'
          >
            <IconApp className='rotate-[180deg] m-[0_5vw]' size={13} code='t08' color='#fff' />
            <span className={styles.HeaderTitle}>Custom search</span>
          </div>
        ) : settingsTab ? (
          <div
            className='flex items-center w-full'
            onClick={handleOnNavigate(settingsTab)}
            data-testid='HeaderMenuContainer'
          >
            <IconApp className='rotate-[180deg] m-[0_5vw] cursor-pointer' size={13} code='t08' color='#fff' />
            <span className={styles.HeaderTitle}>{settingsTabTitle()}</span>
          </div>
        ) : (
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center w-full' onClick={handleOnNavigate()} data-testid='HeaderMenuContainer'>
              <IconApp className='rotate-[180deg] m-[0_5vw] cursor-pointer' size={13} code='t08' color='#fff' />
              <span className={styles.HeaderTitle}>{headerTitle()}</span>
            </div>

            {walletPage?.pathname === "/wallet" &&
              params.get("currency") === "EUR" &&
              tab !== "programs" &&
              tab !== "top_up" && (
                <Link to='/settings?sessionsSection=my-reports' state={"/wallet?currency=EUR"}>
                  <div className='flex mr-[5vw] gap-[5px] items-center text-[14px] text-[#fff] font-bold'>
                    {t("reports")}
                    <IconApp code='t09' className='min-w-[9px]' size={9} color='#fff' />
                  </div>
                </Link>
              )}
          </div>
        )}

        {!(exchangePage || privateRoomPage) ? null : (
          <div className='flex items-center justify-end w-[20%] gap-2 pr-2' data-testid='ExchangeRoomMenu'>
            <ExchangeRoomMenu roomCloseModal={roomCloseModal} roomId={roomId} />
          </div>
        )}

        {historyPage && md && tab !== "custom" && (
          <div className='h-full items-center flex'>
            <NavLink to='/history?tab=custom'>
              <div className='flex justify-center w-[54px]'>
                <IconApp code='t30' color='#fff' size={15} />
              </div>
            </NavLink>
          </div>
        )}
      </header>
    </>
  );
};

export default HeaderMobile;
