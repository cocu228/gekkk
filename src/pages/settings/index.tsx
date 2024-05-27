import { useCallback, useEffect, useMemo } from "react";
import styles from './styles.module.scss'
import { SettingsButton } from "@/shared/ui/ButtonsMobile/settings-button";
import { settingsContext } from "./settingsContext";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { PersonalInformation } from "./components/personalInformation";
import { Pricing } from "./components/Pricing";
import { IdentificationStatus } from "./components/IdentificationStatus";
import { MyReports } from "./components/MyReports";
import { AppVersion } from "./components/app-version";
import { ChangePassword } from "./components/change-password";
import { UserKeys } from "./components/user-keys/index";
import { LoginAndSignHistory } from "./components/history";
import { UserSession } from "./components/user-session";
import { LanguageSettings } from "./components/language";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { IS_GEKKARD_APP } from "@/shared/lib";

const areaMap = {
  "identification-status": <IdentificationStatus />,
  "personal-information": <PersonalInformation />,
  "my-reports": <MyReports />,
  "pricing": <Pricing />,
  "app-version": <AppVersion />,
  "change-password": <ChangePassword />,
  "user-keys": <UserKeys />,
  "history": <LoginAndSignHistory />,
  "user-sessions": <UserSession />,
  "language": <LanguageSettings />,
};

const settingsList = [
  {
    iconCode: 't53',
    text: 'app_version',
    selectArea: 'app-version',
  },
  ...(IS_GEKKARD_APP() ?
    [{
      iconCode: 't55',
      text: 'personal_information',
      selectArea: 'personal-information',
    }] : []
  ),
  {
    iconCode: 't52',
    text: 'language',
    selectArea: 'language',
  },
  {
    iconCode: 't54',
    text: 'change_password',
    selectArea: 'change-password',
  },
  {
    iconCode: 't46',
    text: 'user_keys',
    selectArea: 'user-keys',
  },
  {
    iconCode: 't45',
    text: 'history',
    selectArea: 'history',
  },
  {
    iconCode: 't43',
    text: 'user_sessions',
    selectArea: 'user-sessions',
  },
  {
    iconCode: 't61',
    text: 'pricing',
    selectArea: 'pricing',
  },
  {
    iconCode: 't09',
    text: 'my_reports',
    selectArea: 'my-reports',
  },
]
type SettingsSections = keyof typeof areaMap | "" | string;

export function Settings() {
  const { t } = useTranslation();
  const { xxl, md, lg, xl } = useBreakpoints();
  const [searchParams, setSearchParams] = useSearchParams();
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
                {
                  (IS_GEKKARD_APP()
                    ? settingsList.slice(0,3)
                    : settingsList.slice(0,2)
                  ).map((item, ind) => (
                    <SettingsButton
                      key={ind}
                      icon={<IconApp code={item.iconCode} size={23} color="#285E69" />}
                      text={t(item.text)}
                      onClick={() => {
                        setSelectedArea(item.selectArea);
                      }}
                      isSelected={selectedArea === item.selectArea}
                    />
                  ))
                }
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
                {
                  settingsList.slice(3,7).map((item, ind) => (
                    <SettingsButton
                      key={ind}
                      icon={<IconApp code={item.iconCode} size={23} color="#285E69" />}
                      text={t(item.text)}
                      onClick={() => {
                        setSelectedArea(item.selectArea);
                      }}
                      isSelected={selectedArea === item.selectArea}
                    />
                  ))
                }
              </div>
            </div>
            
            {IS_GEKKARD_APP() && (
              <div className={styles.box} >
                <h2 
                  className={`${styles.accessTitle} ${!md && styles.accessTitleColor} ${md && styles.accessTitleWeight} ${md && styles.accessTitleSize}`}
                >
                  {md ? t("documents_and_legal_notices") : t("documents")}
                </h2>
                <div className={`${styles.itemsList} ${md && styles.itemsListGap}`} >
                {
                    settingsList.slice(7, settingsList.length).map((item, ind) => (
                      <SettingsButton
                        key={ind}
                        icon={<IconApp code={item.iconCode} size={23} color="#285E69" />}
                        text={t(item.text)}
                        onClick={() => {
                          setSelectedArea(item.selectArea);
                        }}
                        isSelected={selectedArea === item.selectArea}
                      />
                    ))
                  }
                  <a href="https://gekkard.com/terms-and-conditions.html">
                    <SettingsButton
                      icon={<IconApp code="t42" size={23} color="#285E69" />}
                      text={t("terms_and_conditions")}
                    />
                  </a>
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
            )}
          </div>
        )}
        {area}
      </div>
    </settingsContext.Provider>
  );
}