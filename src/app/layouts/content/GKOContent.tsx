import { FC, PropsWithChildren } from "react";

import styles from "./style.module.scss";

const GKOContent: FC<PropsWithChildren> = ({ children }): JSX.Element | null => (
  <div className='w-full h-full md:mb-3 mb-10' style={{ overflow: "hidden" }}>
    <div className={`${styles.Content} ${styles.ContentPadding}`}>{children}</div>
  </div>
);

export default GKOContent;
