import { FC, ReactNode, useState } from "react";

import useSessionStorage from "@/shared/model/hooks/useSessionStorage";
import { IconApp } from "@/shared/ui/icons/icon-app";

import styles from "./style.module.scss";

interface INavCollapseProps {
  children: ReactNode;
  id: string;
  header: string;
  className?: string;
}

const NavCollapse: FC<INavCollapseProps> = ({ children, id, header, className = "" }) => {
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
    <div className={`bg-[#fff] ${className}`}>
      <button onClick={handlerToggle} className={styles.Header + (isActive ? " active" : "")}>
        <div className={`flex flex-nowrap items-center justify-end pr-4 pt-2 pb-2`}>
          <span className='text-gray-400 text-sm mr-4 font-medium'>{header}</span>
          <IconApp code='t08' className='rotate-[90deg]' size={10} color='#285E69' />
        </div>
      </button>

      <div className={`${styles.List} bg-gray-300`}>{children}</div>
    </div>
  );
};
export default NavCollapse;
