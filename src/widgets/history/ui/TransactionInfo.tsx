import { GetHistoryTrasactionOut } from "@/shared/(orval)api/gek/model";
import { formatForHistoryTimeMobile } from "@/shared/lib/date-helper";
import styles from "./style.module.scss";
import { CtxCurrencies } from "@/processes/CurrenciesContext";
import { Dispatch, SetStateAction, useContext } from "react";
import { toLocaleCryptoRounding } from "@/shared/lib/number-format-helper";
import { IconApp } from "@/shared/ui/icons/icon-app";


type TypeProps = {
    item: GetHistoryTrasactionOut,
    showModal: () => void,
    setItem: Dispatch<SetStateAction<GetHistoryTrasactionOut>>
}

const TransactionInfo = ({ item, showModal, setItem, }: TypeProps) => {
    const { currencies } = useContext(CtxCurrencies);
    const cur = currencies?.get(item.currency);
    return <>
        <div 
            onClick={()=>{
                showModal()
                setItem(item)
            }} 
            className={styles.HistoryTxRow}
        >
            <svg className={styles.HTypeImg}><use href={"/img/gek_icons_lib1.svg?v3#type" + item.tx_type} /></svg>
            <div className={styles.HType}>
                {formatForHistoryTimeMobile(item.datetime)}{" "}
                {item.tx_type_text}
            </div>
            <div className={(item.tx_type === 3 && item.partner_info === "" ? styles.HStateOrg : styles.HState)}>
                {item.status_text}
            </div>
            <div className={styles.HTypeImg2}>
                <IconApp code='t08' color="#29354C" size={12} />
            </div>
            <div className={styles.HTag}>{item.tag}</div>
            <div className={styles.HAmount}>
                <span className={`${[15, 16].includes(item.tx_type) ? ""
                    : item.is_income ? styles.HAmountGreen : styles.HAmountRed}`}>
                    {toLocaleCryptoRounding(item.result_amount, cur?.roundPrec ?? 2)} {item.currency}
                </span>
            </div>
        </div>
    </>
}

export default TransactionInfo;
