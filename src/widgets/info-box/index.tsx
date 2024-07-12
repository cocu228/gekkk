import { ReactNode } from "react";

import { HelperClassName } from "@/shared/lib/helper-class-name";

import styles from "./style.module.scss";

const hClassName = new HelperClassName(styles);

type Props = {
  icon?: JSX.Element;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
  message: string | JSX.Element;
};

const InfoBox = ({ icon, children, message = "", className = "", onClick = null }: Partial<Props>) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const cl = hClassName
    .while(!!className)
    .do(className)
    .while(onClick === null)
    .do("cursor-default")
    .scss("Wrapper");

  if (!message && !children) return null;

  return (
    <div onClick={onClick ?? (() => {})} className={cl}>
      <div className='shrink-0 flex col-auto w-[30px] h-[30px]'>{icon}</div>

      {!message ? children : <p className={hClassName.scss("Text")}>{message}</p>}
    </div>
  );
};

export default InfoBox;
