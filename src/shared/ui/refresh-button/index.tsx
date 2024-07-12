import { useState, MouseEvent } from "react";

import { isActiveClass } from "@/shared/lib/helpers";

import styles from "./style.module.scss";
import { IconApp } from "../icons/icon-app";

const RefreshButton = ({ calloutFunc }: { calloutFunc: (e?: MouseEvent<HTMLSpanElement>) => void }) => {
  const [active, setActive] = useState<boolean>(false);

  const onClick = async (e?: MouseEvent<HTMLSpanElement>) => {
    setActive(true);
    calloutFunc(e);
    setTimeout(() => setActive(false), 3000);
  };

  return (
    <span className={`cursor-pointer ${styles.UpdateBtn} ${isActiveClass(active)}`} onClick={e => onClick(e)}>
      <IconApp size={18} code='t01' color='var(--gek-additional)' />
    </span>
  );
};

export default RefreshButton;
