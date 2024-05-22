import { useCallback, useEffect, useMemo } from "react";
import styles from './styles.module.scss'
import { SettingsButton } from "@/shared/ui/ButtonsMobile/settings-button";
import { settingsContext } from "./settingsContext";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { storeAccountDetails } from "@/shared/store/account-details/accountDetails";
import { PersonalInformation } from "./components/personalInformation";
import { Pricing } from "./components/Pricing";
import { IdentificationStatus } from "./components/IdentificationStatus";
import { LegalNotices } from "./components/LegalNotices";
import { MyReports } from "./components/MyReports";
import { AppVersion } from "./components/app-version";
import { ChangePassword } from "./components/change-password";
import { UserKeys } from "./components/user-keys/ui/user-keys";
import { LoginAndSignHistory } from "./components/history";
import { UserSession } from "./components/user-session";
import { LanguageSettings } from "./components/language";
import { IconApp } from "@/shared/ui/icons/icon-app";

const areaMap = {
  "identification-status": <IdentificationStatus />,
  "personal-information": <PersonalInformation />,
  "my-reports": <MyReports />,
  "pricing": <Pricing />,
  "legal-notices": <LegalNotices />,
  "app-version": <AppVersion />,
  "change-password": <ChangePassword />,
  "user-keys": <UserKeys />,
  "history": <LoginAndSignHistory />,
  "user-sessions": <UserSession />,
  "language": <LanguageSettings />,
};

type SettingsSections = keyof typeof areaMap | "";

export function Settings() {
  const { t } = useTranslation();
  const { xxl, md, lg, xl } = useBreakpoints();
  const [searchParams, setSearchParams] = useSearchParams();
  const { getAccountDetails } = storeAccountDetails();
  const selectedArea = useMemo(
    () => searchParams.get("sessionsSection") || "",
    [searchParams]
  ) as SettingsSections;
  const area = areaMap[selectedArea] || null;

  const setSelectedArea = useCallback(
    (selectedArea: SettingsSections) => {
      if (!areaMap[selectedArea]) {
        ``;
        searchParams.delete("sessionsSection");
        setSearchParams(searchParams, { replace: true });
      } else {
        searchParams.set("sessionsSection", selectedArea);
        setSearchParams(searchParams);
      }
    },
    [searchParams, setSearchParams]
  );

  useEffect(() => {
    setSelectedArea(selectedArea);
  }, []);

  return (
    <settingsContext.Provider
      value={{ closeArea: useCallback(() => setSelectedArea(""), []) }}
    >
      {!md && ( 
        <h1 
          className={styles.title}
        >
          {t("my_settings")}
        </h1>
      )}
      <div
        className={`
          ${styles.itemsWrap} ${xxl! && styles.itemsWrapPadding} ${xxl && selectedArea && styles.itemsWrapOverflow}
        `}
        style={{flexDirection: selectedArea ? 'row' : 'column'}}
      >
        {(!xl || !area) && (
          <div 
          className={`${styles.boxWrap} ${selectedArea && styles.boxWrapMin}`}
          >
            <div 
              className={styles.box}
            >
              <h2 
                className={`${styles.itemTitle} ${styles.mobTitle} ${!md && styles.itemTitleColor} ${md && styles.itemTitleWeight}`}
              >
                {t("general_information")}
              </h2>
              <div 
                className={`${styles.itemsList} ${md && styles.itemsListGap}`}
              >
                <SettingsButton
                  icon={<IconApp code="t53" size={23} color="#285E69" />}
                  text={t("app_version")}
                  onClick={() => {
                    setSelectedArea("app-version");
                  }}
                  isSelected={selectedArea === "app-version"}
                />
                <SettingsButton
                  icon={<IconApp code="t55" size={23} color="#285E69" />}
                  text={t("personal_information")}
                  onClick={() => {
                    setSelectedArea("personal-information");
                  }}
                  isSelected={selectedArea === "personal-information"}
                />
                <SettingsButton
                  icon={<IconApp code="t52" size={23} color="#285E69" />}
                  text={t("language")}
                  onClick={() => {
                    setSelectedArea("language");
                  }}
                  isSelected={selectedArea === "language"}
                />
              </div>
            </div>
            <div className={styles.box} >
              <h2 
                  className={`${styles.accessTitle} ${!md && styles.accessTitleColor} ${md && styles.accessTitleWeight} ${md && styles.accessTitleSize}`}
              >
                {md ? t("access_management") : t("account_and_app_settings")}
              </h2>
              <div 
                  className={`${styles.btnsWrap} ${md && styles.btnsWrapGap}`}
              >
                <SettingsButton
                    icon={<IconApp code="t54" size={23} color="#285E69" />}
                    text={t("change_password")}
                    onClick={() => {
                      setSelectedArea("change-password");
                    }}
                    isSelected={selectedArea === "change-password"}
                  />
                  <SettingsButton
                    icon={<IconApp code="t46" size={23} color="#285E69" />}
                    text={t("user_keys")}
                    onClick={() => {
                      setSelectedArea("user-keys");
                    }}
                    isSelected={selectedArea === "user-keys"}
                  />
                  <SettingsButton
                    icon={<IconApp code="t45" size={23} color="#285E69" />}
                    text={t("login_and_sign_history")}
                    onClick={() => {
                      setSelectedArea("history");
                    }}
                    isSelected={selectedArea === "history"}
                  />
                  <SettingsButton
                    icon={<IconApp code="t43" size={23} color="#285E69" />}
                    text={t("user_sessions")}
                    onClick={() => {
                      setSelectedArea("user-sessions");
                    }}
                    isSelected={selectedArea === "user-sessions"}
                  />
              </div>
            </div>
            <div className={styles.box} >
              <h2 
                className={`${styles.accessTitle} ${!md && styles.accessTitleColor} ${md && styles.accessTitleWeight} ${md && styles.accessTitleSize}`}
              >
                {md ? t("documents_and_legal_notices") : t("documents")}
              </h2>
              <div className={`${styles.itemsList} ${md && styles.itemsListGap}`} >
                <SettingsButton
                  icon={<IconApp code="t61" size={23} color="#285E69" />}
                  text={t("pricing")}
                  onClick={() => {
                    setSelectedArea("pricing");
                  }}
                  isSelected={selectedArea === "pricing"}
                />
                <a href="https://gekkard.com/terms-and-conditions.html">
                  <SettingsButton
                    icon={<IconApp code="t42" size={23} color="#285E69" />}
                    text={t("terms_and_conditions")}
                  />
                </a>
                <SettingsButton
                  icon={<IconApp code="t09" size={23} color="#285E69" />}
                  text={t("my_reports")}
                  onClick={() => {
                    setSelectedArea("my-reports");
                  }}
                  isSelected={selectedArea === "my-reports"}
                />
                <a href="https://gekkard.com/data-protection-policy.html">
                  <SettingsButton
                    icon={<IconApp code="t42" size={23} color="#285E69" />}
                    text={t("data_protection")}
                  />
                </a>
                <a href="https://gekkard.com/legal-agreements.html">
                  <SettingsButton
                    icon={<IconApp code="t42" size={23} color="#285E69" />}
                    text={t("legal_agreements")}
                  />
                </a>
              </div>
            </div>
          </div>
        )}
        {area}
      </div>
    </settingsContext.Provider>
  );
}
