import { useTranslation } from "react-i18next";

import { MobileWrapper } from "@/shared/ui/mobile-wrapper/mobile-wrapper";
import versions from "@/../versions.json";

import styles from "../../styles.module.scss";
import { VersionCard } from "./version-card";

export function AppVersion() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const appVersion = import.meta.env.VITE_APP_VERSION.split("")
    .map((elem: string) => elem.replace('"', ""))
    .join("");

  const { t } = useTranslation();

  return (
    <MobileWrapper className='w-full'>
      <div className={styles.appVersionBlock}>
        <div className={styles.versionGroup}>
          <h4 className={styles.versionTitle}>{t("current_app_version")}:</h4>
          <h4 className={styles.versionValue}>{appVersion}</h4>
        </div>
        <div className={styles.versionGroup} style={{ paddingTop: "2.5rem" }}>
          <h4 className={styles.versionTitle}>{t("current_api_version")}:</h4>
          <h4 className={styles.versionValue}>2.0.3-20231230-1327.5649</h4>
        </div>
      </div>
      <div className='flex flex-col'>
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call */}
        {versions[import.meta.env.VITE_APP_TYPE].map(ver => (
          <VersionCard key={ver.version} date={ver.date} description={ver.description} version={ver.version} />
        ))}
      </div>
    </MobileWrapper>
  );
}
