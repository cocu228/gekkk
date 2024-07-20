import { useEffect, useState } from "react";
import { getInitialProps, useTranslation } from "react-i18next";

import { Dropdown } from "@/shared/ui/!dropdown";
import { IconFlag } from "@/shared/ui/icons/icon-flag";
import { DropdownCItem } from "@/shared/ui/!dropdown/item";
import styles from "@/widgets/header/ui/desktop/style.module.scss";

export const LocalizationMenu = () => {
  const [state, setState] = useState("en");
  const { i18n, t } = useTranslation();
  const { initialLanguage } = getInitialProps();

  const onChange = str => {
    setState(str);
    i18n.changeLanguage(str);
  };

  useEffect(() => {
    setState(initialLanguage);
  }, [initialLanguage]);

  const menu = [
    { key: "en" },
    { key: "de" },
    { key: "ru" },
    { key: "CN" },
    { key: "ES" },
    { key: "TR" },
    { key: "FR" },
    { key: "IT" }
  ];

  return (
    <>
      <Dropdown
        className="items-center"
        trigger={
          <span className="flex items-center gap-2">
            <IconFlag code={state} size={24} />
            <span className={styles.HeaderMenuTitles}>{t("language_name")}</span>
          </span>
        }
      >
        {menu.map(item => (
          <DropdownCItem
            key={item.key}
            className='uppercase'
            onClick={() => onChange(item.key)}
            icon={<IconFlag code={item.key} size={24} />}
          >
            {item.key}
          </DropdownCItem>
        ))}
      </Dropdown>
    </>
  );
};
