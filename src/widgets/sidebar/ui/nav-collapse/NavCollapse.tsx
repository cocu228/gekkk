import { useState } from "react";

import useSessionStorage from "@/shared/model/hooks/useSessionStorage";
import { IconApp } from "@/shared/ui/icons/icon-app";

import styles from "./style.module.scss";

const NavCollapse = ({ children, id, header }) => {
  const [value, setValue] = useSessionStorage("collapse-nav", {
    [id]: null
  });
  const initActiveStorage = value[id] === null ? true : value[id];

  const [isActive, toggleActive] = useState(initActiveStorage);

  const handlerToggle = () => {
    setValue(() => ({ [id]: !isActive }));

    toggleActive(prev => !prev);
  };

  return (
    <>
      <button onClick={handlerToggle} className={styles.Header + (isActive ? " active" : "")}>
        <div className={`flex flex-nowrap items-center justify-end pr-4 pt-2 pb-2`}>
          <span className='text-gray-400 text-sm mr-4 font-medium'>{header}</span>
          <IconApp size={10} code='t08' className={`${styles.Arrow} rotate-[90deg]`} color='#285E69' />
        </div>
      </button>
      <div className={`${styles.List}`}>{children}</div>
    </>
  );
};
export default NavCollapse;
