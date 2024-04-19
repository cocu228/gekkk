import { useCallback, useEffect, useMemo } from "react";
import s from './styles.module.scss'
import Info from "@/assets/info.svg?react";
import World from "@/assets/world.svg?react";
import Guard from "@/assets/guard.svg?react";
import Chain from "@/assets/chain.svg?react";
import Docs from "@/assets/docs.svg?react";
import Keys from "@/assets/keys.svg?react";
import EuroIcon from "@/assets/euro.svg?react";
import DocumentsDocumentsIcon from "@/assets/documents-documents.svg?react";
import ReportIcon from "@/assets/report.svg?react";
import AccountIcon from "@/assets/account.svg?react";
import { SettingsButton } from "@/shared/ui/ButtonsMobile/settings-button";

// import { PersonalInformation } from './components/PersonalInformation'

import { settingsContext } from "./settingsContext";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { storeAccountDetails } from "@/shared/store/account-details/accountDetails";

import { PersonalInformation } from "./components/personalInformation";
import { Pricing } from "./components/Pricing";
import { AccessManagement } from "./components/ApplicationPassword";
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
  "access-management": <AccessManagement />,
  pricing: <Pricing />,
  "legal-notices": <LegalNotices />,
  "app-version": <AppVersion />,
  "change-password": <ChangePassword />,
  "user-keys": <UserKeys />,
  history: <LoginAndSignHistory />,
  "user-sessions": <UserSession />,
  language: <LanguageSettings />,
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
          className={s.title}
        >
          {t("my_settings")}
        </h1>
      )}
      <div
        className={`
          ${s.itemsWrap} ${xxl! && s.itemsWrapPadding} ${xxl && selectedArea && s.itemsWrapOverflow}
        `}
        style={{flexDirection: selectedArea ? 'row' : 'column'}}
      >
        {(!xl || !area) && (
          <div 
          className={`${s.boxWrap} ${selectedArea && s.boxWrapMin}`}
          >
            <div 
              className={s.box}
            >
              <h2 
                className={`${s.itemTitle} ${!md && s.itemTitleColor} ${md && s.itemTitleWeight}`}
              >
                {t("general_information")}
              </h2>
              <div 
                className={`${s.itemsList} ${md && s.itemsListGap}`}
              >
                <SettingsButton
                  icon={<IconApp code="t55" size={23} color="#285E69" />}
                  text={t("personal_information")}
                  onClick={() => {
                    setSelectedArea("personal-information");
                  }}
                  isSelected={selectedArea === "personal-information"}
                />
                <SettingsButton
                  icon={<IconApp code="t53" size={23} color="#285E69" />}
                  text={t("app_version")}
                  onClick={() => {
                    setSelectedArea("app-version");
                  }}
                  isSelected={selectedArea === "app-version"}
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
            <div className={s.box} >
              <h2 
                  className={`${s.accessTitle} ${!md && s.accessTitleColor} ${md && s.accessTitleWeight} ${md && s.accessTitleSize}`}
              >
                {md ? t("access_management") : t("account_and_app_settings")}
              </h2>
              <div 
                  className={`${s.btnsWrap} ${md && s.btnsWrapGap}`}
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
                    {/* <SettingsButton 
                  icon={<PinCodeIcon/>} 
                  text={t('access_management')}  
                  onClick={() => {setSelectedArea('access-management')}} 
                  isSelected={selectedArea === 'access-management'}
                /> */}
              </div>
            </div>
            <div className={s.box} >
              <h2 
                className={`${s.accessTitle} ${!md && s.accessTitleColor} ${md && s.accessTitleWeight} ${md && s.accessTitleSize}`}
              >
                {md ? t("documents_and_legal_notices") : t("documents")}
              </h2>
              <div className={`${s.itemsList} ${md && s.itemsListGap}`} >
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
              </div>
            </div>
          </div>
        )}
        {area}
      </div>
    </settingsContext.Provider>
  );
}
