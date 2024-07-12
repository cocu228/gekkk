import { Dispatch, SetStateAction, useContext } from "react";

import { IconApp } from "@/shared/ui/icons/icon-app";
import { CtxCurrencies } from "@/processes/CurrenciesContext";
import { GetHistoryTrasactionOut } from "@/shared/(orval)api/gek/model";
import { toLocaleCryptoRounding } from "@/shared/lib/number-format-helper";

import { formatTime } from "../../model/helpers";
import styles from "./style.module.scss";

type TypeProps = {
  item: GetHistoryTrasactionOut;
  setItem: Dispatch<SetStateAction<GetHistoryTrasactionOut>>;
  showModal: () => void;
};

const TxInfoRow = ({ item, setItem, showModal }: TypeProps) => {
  const { currencies } = useContext(CtxCurrencies);
  const cur = currencies?.get(item.currency);

  return (
    <div
      onClick={() => {
        setItem(item);
        showModal();
      }}
      className={styles.HistoryTxRow}
    >
      <svg className={item.tx_type === 3 && item.partner_info === "" ? styles.HTypeImgOrg : styles.HTypeImg}>
        <use href={`/img/gek_icons_lib1.svg?v4#type${item.tx_type}`} />
      </svg>

      <div className={item.tx_type === 3 && item.partner_info === "" ? styles.HTypeOrg : styles.HType}>
        {formatTime(item.datetime)} {item.tx_type_text}
      </div>

      <div className={item.tx_type === 3 && item.partner_info === "" ? styles.HStateOrg : styles.HState}>
        {item.status_text}
      </div>

      <div className={styles.HTypeImg2}>
        <IconApp code='t08' color='#285E69' size={12} />
      </div>

      <div className={styles.HTag}>{item.tag}</div>

      <div className={styles.HAmount}>
        <span
          className={`${
            [15, 16].includes(item.tx_type) ? "" : item.is_income ? styles.HAmountGreen : styles.HAmountRed
          }`}
        >
          {toLocaleCryptoRounding(item.result_amount, cur?.roundPrec ?? 2)} {item.currency}
        </span>
      </div>
    </div>
  );
};

export default TxInfoRow;
