import { PropsWithChildren } from "react";

import { CloseWindowButton } from "@/shared/ui/CloseWindowButton";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";

import styles from "../../styles.module.scss";
import { useSettingsContext } from "../../settingsContext";

export type AreaWrapperProps = PropsWithChildren<{ title: React.ReactNode; secondary?: boolean; nonClose?: boolean }>;
export function AreaWrapper({ children, title, secondary, nonClose }: AreaWrapperProps) {
  const { closeArea } = useSettingsContext();
  const { xxl } = useBreakpoints();

  return (
    <div className={styles.areaWrapper}>
      <div className={styles.areaWrapperBody}>
        <h3 className={`${styles.areaWrapperTitle} ${xxl && styles.areaWrapperTitleColor}`}>{title}</h3>
        {!secondary && !nonClose && <CloseWindowButton onClick={closeArea} />}
      </div>
      {children}
    </div>
  );
}
