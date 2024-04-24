import styles from "./style.module.css";
import { NavLink } from 'react-router-dom';
import { IconCoin } from "@/shared/ui/icons/icon-coin";
import { toLocaleCryptoRounding, toLocaleFiatRounding } from "@/shared/lib/number-format-helper";
import { IconApp } from "@/shared/ui/icons/icon-app";

export function TokenBar(props) {
    return (<NavLink onClick={props.NavLinkEvent} to={`wallet?currency=${props.item.$const}`}
        className={({ isActive }) => isActive && props.currency === props.item.$const ? ('active ' + styles.CurLink) : styles.CurLink}>
        <div className={styles.CurBox}>
            <div className={styles.ActiveChoice} />
            <IconCoin className={styles.CurIcon} code={props.item.$const} height={50} />
            <div className={styles.CurBox2}>
                <span className={styles.CurName}>{props.item.name}</span>
                <span className={styles.Sum}>{`${toLocaleCryptoRounding(props.item.balance.user_balance, props.item.roundPrec)} ${props.item.$const}`}</span>
                <div className={styles.CurBox3}>
                    {!props.item.balance.lock_in_balance ? "" :
                        <span className={styles.Income}>
                            +{toLocaleCryptoRounding(props.item.balance.lock_in_balance, props.item.roundPrec) ?? '-'}
                        </span>}
                    {props.item.balance.user_balance_EUR_equ === null ? "" :
                        <span className={styles.EuroEqv}>
                            {toLocaleFiatRounding(props.item.balance.user_balance_EUR_equ)}
                        </span>}
                </div>
            </div>
            <IconApp className={styles.ArrowMobile} code="t08" size={11} />
        </div>
    </NavLink>);
}