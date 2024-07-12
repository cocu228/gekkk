import { ReactNode } from "react";

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
  return (
    <div className={styles.TableItem}>
      <span className={styles.TableItemTitle}>{title}</span>
      {rows.map((item, index) => {
        const { title, value } = item;
        return (
          /* eslint-disable-next-line react/no-array-index-key */
          <span key={index} className={styles.TableItemTextWrap}>
            <li className='flex-1'>{title}</li>
            <span className={styles.TableItemValue}>{value}</span>
          </span>
        );
      })}
      {description ? <span className={styles.DescriptionText}>{description}</span> : null}
    </div>
  );
}
