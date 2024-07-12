import { useTranslation } from "react-i18next";

import { BoxWrapper } from "@/shared/ui/mobile-wrapper/mobile-wrapper";
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
    <BoxWrapper className='w-full'>
      <div className={styles.appVersionBlock}>
        <div className={styles.versionGroup}>
          <h4 className={styles.versionTitle}>{t("current_app_version")}:</h4>
          <h4 title={appVersion} className={styles.versionValue}>
            {appVersion}
          </h4>
        </div>
        <div className={`${styles.versionGroup} md:pt-[2.5rem]`}>
          <h4 className={styles.versionTitle}>{t("current_api_version")}:</h4>
          <h4 title='2.0.3-20231230-1327.5649' className={styles.versionValue}>
            2.0.3-20231230-1327.5649
          </h4>
        </div>
      </div>
      <div className='flex flex-col'>
        <div className={styles.versionGroupTitle}>{t("versions_history")}</div>
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call */}
        {versions[import.meta.env.VITE_APP_TYPE].map(ver => (
          <VersionCard key={ver.version} date={ver.date} description={ver.description} version={ver.version} />
        ))}
      </div>
    </BoxWrapper>
  );
}
