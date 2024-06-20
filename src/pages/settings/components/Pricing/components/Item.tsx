import { ReactNode, useId } from "react";

import styles from "../styles.module.scss";

export interface ItemProps {
  title: ReactNode;
  description?: ReactNode;
  rows: {
    title: ReactNode;
    value: ReactNode;
  }[];
}
export function Item({ title, rows, description }: ItemProps) {
  const id = useId();
  return (
    <div className={styles.TableItem}>
      <span className={styles.TableItemTitle}>{title}</span>
      {rows.map(item => {
        const { title, value } = item;
        return (
          <span key={id} className={styles.TableItemTextWrap}>
            <span>{title}</span>
            <span className={styles.TableItemValue}>{value}</span>
          </span>
        );
      })}
      {description ? <span className={styles.DescriptionText}>{description}</span> : null}
    </div>
  );
}
