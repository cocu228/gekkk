import { PropsWithChildren } from "react";

import styles from "./style.module.scss";

interface Props {
  onClick?: () => void;
  active?: boolean;
}

function PercentBtn({ children, onClick, active }: PropsWithChildren<Props>) {
  return (
    <button onClick={onClick} className={styles.Btn + (active ? " active" : "")}>
      {children}
    </button>
  );
}

export default PercentBtn;
