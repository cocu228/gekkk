import { FC, useRef, useState } from "react";

import styles from "./styles.module.scss";
import { IconApp } from "../icons/icon-app";

interface TypeSelectorProps {
  placeholder: string;
  mobile?: boolean;
  options: any[];
  onChange?: (v: any) => void;
  value: string | number;
  listHeight?: number;
  typeChange?: (id: any) => void;
}

export const TypeSelector: FC<TypeSelectorProps> = ({
  placeholder,
  options,
  onChange,
  typeChange,
  value,
  mobile,
  listHeight
}) => {
  const [active, setActive] = useState(false);

  const optionHandler = (feeLabel: string, id: any) => {
    typeChange ? typeChange(id) : onChange(feeLabel);
    setActive(false);
  };

  const bodyRef = useRef(null);

  return (
    <div
      ref={bodyRef}
      className={`${styles.SelectWrap} ${active && styles.active} ${listHeight && styles.ScrollStyle} ${
        mobile && styles.MobileHeight
      }`}
    >
      <div onClick={() => setActive(!active)} className={styles.SelectActive}>
        <span className={`${styles.SelectTitle} ${!value && placeholder && styles.Placeholder}`}>
          {value || placeholder}
        </span>
        <IconApp code='t08' size={10} className={`${!active ? "rotate-[90deg]" : "rotate-[-90deg]"}`} color='#285E69' />
      </div>
      <div className={styles.SelectListWrap} style={{ height: listHeight && `${listHeight}px` }}>
        <div className={styles.SelectList}>
          {options &&
            options.map(item => (
              <div
                key={item.label}
                onClick={() => optionHandler(item.label, item.value)}
                className={`${styles.SelectOption} ${value === item.label && styles.SelectedOption}`}
              >
                {item.label}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
