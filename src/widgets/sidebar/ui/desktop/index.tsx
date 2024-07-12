import { NavLink } from "react-router-dom";
import { useCallback, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { scrollToTop } from "@/shared/lib/helpers";
import { CtxRootData } from "@/processes/RootContext";
import { CtxCurrencies } from "@/processes/CurrenciesContext";
import { storeActiveCards } from "@/shared/store/active-cards/activeCards";
import { IS_GEKKARD_APP } from "@/shared/lib";

import BalanceBar from "../BalanceBar";
import styles from "./style.module.scss";
import ExchangeBar from "../ExchangeBar";

const SidebarDesktop = () => {
  const { t } = useTranslation();
  const { account } = useContext(CtxRootData);
  const { currencies } = useContext(CtxCurrencies);
  const { getActiveCards } = storeActiveCards(state => state);

  const NavLinkEvent = useCallback(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    if (account) {
      getActiveCards();
    }
  }, [account]);

  return (
    <div className={styles.Sidebar}>
      <BalanceBar NavLinkEvent={NavLinkEvent} />
      {/* Assets link */}

      <div className={`${!currencies ? "disabled" : ""} ${styles.AssetInfo3}`}>
        <NavLink onClick={NavLinkEvent} to={"crypto-assets"}>
          <div className={styles.AssetInfo4}>{t("new_asset")}</div>
        </NavLink>
      </div>

      {IS_GEKKARD_APP() && <ExchangeBar NavLinkEvent={NavLinkEvent} />}
    </div>
  );
};

export default SidebarDesktop;
