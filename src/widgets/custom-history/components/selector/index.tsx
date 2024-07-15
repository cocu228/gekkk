import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import styles from "@/widgets/custom-history/ui/style.module.scss";
import { IconApp } from "@/shared/ui/icons/icon-app";

export interface ISelectorProps<V> {
  label: string;
  value: V;
  renderInput: (value: V) => ReactNode;
  onClick: () => void;
}

const Selector = <V,>({ label, value, renderInput, onClick }: ISelectorProps<V>) => {
  const { t } = useTranslation();
  return (
    <div className={styles.SelectBlock} onClick={onClick}>
      <span className={styles.SelectTitle}>{label}:</span>
      <div className={`${styles.SelectActive} ${value && styles.SelectCurrencyActive}`}>
        <div className={styles.SelectPickedValue}>
          {!value ? (
            <span className={styles.NonePickedTitle}>-{t("select")}-</span>
          ) : (
            <span className={styles.SelectActiveToken}>{renderInput(value)}</span>
          )}
        </div>
        <div className={styles.SelectIconBlock}>
          <IconApp className='rotate-90' color='#fff' code='t08' size={12} />
        </div>
      </div>
    </div>
  );
};

export default Selector;
