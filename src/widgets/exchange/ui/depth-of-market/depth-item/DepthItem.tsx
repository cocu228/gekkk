import { FC } from "react";

import styles from "./style.module.css";

interface Props {
  price?: number | string;
  amount?: string | number;
  color?: "red" | "green";
  percent?: number;
  setPrice: (price: string) => void;
}

const DepthItem: FC<Props> = ({ price, amount, color = "red", percent, setPrice }) => {
  const setPriceF = (price: string | number) => {
    price !== null && setPrice(price.toString());
  };

  return (
    <div className={`${styles.Item} ${styles[color]}`} onClick={() => setPriceF(price)}>
      {percent && percent > 0 && <span className={styles.ItemPercent} style={{ width: `${percent}%` }} />}
      <div className={styles.ItemText}>
        <span>{price && +price > 0 ? price.toString() : "-"}</span>
        <span>{amount || "-"}</span>
      </div>
    </div>
  );
};

export default DepthItem;
