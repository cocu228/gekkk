import { FC, MutableRefObject, ReactNode, useEffect, useRef, useState } from "react";

import style from "./styles.module.scss";

interface DropdownProps {
  className?: string;
  position?: string;
  isOpen?: boolean;
  onOpen?: (value: boolean) => void | undefined;
  trigger: ReactNode;
  children: ReactNode;
  customBodyClassName?: string;
}

export const Dropdown: FC<DropdownProps> = ({ trigger, children, position, customBodyClassName }) => {
  const [opened, setOpened] = useState(false);
  const bodyRef = useRef(null);

  const useOutsideAlerter = (ref: MutableRefObject<HTMLElement | null>) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpened(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  useOutsideAlerter(bodyRef);

  return (
    <div ref={bodyRef} className={`${style.DropdownWrap}`}>
      <div className={style.DropdownTriggerWrap}>
        <div className={style.DropdownTrigger} onClick={() => setOpened(!opened)}>
          {trigger}
        </div>
        <div
          onClick={() => setOpened(false)}
          className={`${style.DropdownBody} ${customBodyClassName} ${position === "right" && style.DropdownBodyRight} ${
            opened && style.DropdownBodyActive
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
