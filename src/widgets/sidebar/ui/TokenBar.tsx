import { NavLink } from "react-router-dom";

import { IconCoin } from "@/shared/ui/icons/icon-coin";
import { toLocaleCryptoRounding, toLocaleFiatRounding } from "@/shared/lib/number-format-helper";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { ICtxCurrency } from "@/processes/CurrenciesContext";
import Loader from "@/shared/ui/loader";
import constants from "@/shared/config/coins/constants";

import styles from "./style.module.scss";

interface TokenBarParams {
  navLinkEvent: () => void;
  curActive?: string;
  item: ICtxCurrency;
}

export default ({ navLinkEvent, curActive = "", item }: TokenBarParams) =>
  !item ? (
    <div className={styles.CurBox}>
      <div className={styles.ActiveChoice} />
      <div className="min-h-[100px]">
        <Loader className={styles.IconLoader} />
      </div>
      <div className={styles.CurBox2}>
        <span className={styles.CurName}>...</span>
        <span className={styles.Sum}>-</span>
      </div>
      <IconApp className={styles.ArrowMobile} code='t08' size={12} />
    </div>
  ) : (
    <NavLink
      onClick={navLinkEvent}
      to={`wallet?currency=${item.$const}`}
      className={({ isActive }) =>
        isActive && (curActive as constants) === item.$const ? `active ${styles.CurLink}` : styles.CurLink
      }
    >
      <div className={styles.CurBox}>
        <div className={styles.ActiveChoice} />
        <IconCoin className={styles.CurIcon} code={item.$const} height={50} />
        <div className={styles.CurBox2}>
          <span className={styles.CurName}>{item.name}</span>
          <span className={styles.Sum}>
            {!item.balance
              ? "-"
              : `${toLocaleCryptoRounding(item.balance?.user_balance, item.roundPrec) ?? "-"}  ${
                  item.$const == constants.EUR ? "€" : item.$const
                }`}
          </span>
          <div className={styles.CurBox3}>
            {!item.balance?.lock_in_balance || item.$const === constants.EUR ? (
              ""
            ) : (
              <span className={styles.Income}>
                +{toLocaleCryptoRounding(item.balance?.lock_in_balance, item.roundPrec) ?? "-"}
              </span>
            )}
            {item.balance?.user_balance_EUR_equ === null || item.$const === constants.EUR ? (
              ""
            ) : (
              <span className={styles.EuroEqv}>{toLocaleFiatRounding(item.balance?.user_balance_EUR_equ) ?? "-"}</span>
            )}
          </div>
        </div>
        <IconApp className={styles.ArrowMobile} code='t08' size={12} />
      </div>
    </NavLink>
  );
