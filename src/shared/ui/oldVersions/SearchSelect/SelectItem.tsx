import { Dispatch, FC, SetStateAction } from "react";

import { ICtxCurrency } from "@/processes/CurrenciesContext";

import style from "./styles.module.scss";
import { IconCoin } from "../../icons/icon-coin";

interface SelectItemProps {
  item: ICtxCurrency;
  disabled?: boolean;
  onSelect: Dispatch<any>;
  selectTitle: Dispatch<any>;
  setVisibility: Dispatch<SetStateAction<boolean>>;
  isToken?: boolean;
}

export const SelectItem: FC<SelectItemProps> = ({
  item,
  onSelect,
  disabled,
  setVisibility,
  selectTitle,
  isToken = false
}) => {
  const handleChange = () => {
    if (disabled) {
      return null;
    } else {
      setVisibility(false);
      onSelect(item.id);
      selectTitle(item.name);
    }
  };

  return (
    <div data-disabled={disabled} onClick={handleChange} className={style.SelectItem}>
      {isToken && (
        <span className={style.SelectItemIcon} role='img' aria-label={item.name}>
          <IconCoin code={item.id.toString()} />
        </span>
      )}
      <div>{item.name}</div>
    </div>
  );
};
