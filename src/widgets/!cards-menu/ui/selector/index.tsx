import { useTranslation } from "react-i18next";
import { ReactNode, useEffect, useState } from "react";

import Input from "@/shared/ui/input/Input";
import { IconApp } from "@/shared/ui/icons/icon-app";

import styles from "./styles.module.scss";

interface IOption {
  value: string;
  label: ReactNode;
}

interface IParams {
  label: string;
  title?: string;
  value?: string;
  search?: boolean;
  className?: string;
  options?: IOption[];
  children?: ReactNode;
  placeholder?: string;
  preContent?: ReactNode;
  onSelect?: (value: string) => void;
}

const ExtendedSelect = ({
  value,
  title,
  label,
  search,
  options,
  children,
  onSelect,
  className,
  preContent,
  placeholder
}: IParams) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(value);
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    setSelected(value);
  }, [value]);

  return (
    <>
      <div className={`${styles.Container} ${className}`}>
        {preContent}
        <div className={styles.Label}>{title}</div>
        <div className={styles.Suffix} onClick={() => setIsOpen(!isOpen)}>
          <div className={styles.Selector}>{value ? options.find(o => o.value === selected)?.label : placeholder}</div>

          <div className={styles.Icon}>
            <IconApp code='t08' color='#fff' size={12} className='rotate-90' />
          </div>
        </div>
      </div>

      {!isOpen ? (
        children
      ) : (
        <>
          <div className={`${styles.Label} mb-5`}>{label}</div>

          {search && (
            <div className='bg-[white] mb-4 h-[40px] items-center border-solid w-full flex gap-[9px] px-[18px] py-2.5 rounded-lg'>
              <IconApp size={20} code='t12' color='#000' />
              <Input
                className='w-full text-[10px] border-[none]'
                placeholder={t("crypto_assets.search_currency")}
                onChange={({ target }) => setSearchValue(target.value)}
              />
            </div>
          )}

          <div className={styles.OptionsContainer}>
            {options
              .filter(option => option.label.toString().toLowerCase().includes(searchValue.toLowerCase().trim()))
              .map(option => (
                <div
                  key={option.value}
                  className={styles.Option}
                  onClick={() => {
                    setSelected(option.value);
                    onSelect(option.value);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </div>
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default ExtendedSelect;
