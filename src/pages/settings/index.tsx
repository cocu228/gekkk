import { Box, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo } from "react";

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

import { PersonalInformation } from "./templates/personalInformation";

import { AccessManagement } from "./components/ApplicationPassword";
import { IdentificationStatus } from "./components/IdentificationStatus";
import { LegalNotices } from "./components/LegalNotices";
import { MyReports } from "./components/MyReports";
// import { PersonalInformation } from './components/PersonalInformation'
import { Pricing } from "./components/Pricing";
import { settingsContext } from "./settingsContext";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { AppVersion } from "./templates/app-version";
import { ChangePassword } from "./templates/change-password";
import { UserKeys } from "./templates/user-keys/ui/user-keys";
import { storeAccountDetails } from "@/shared/store/account-details/accountDetails";
import { LoginAndSignHistory } from "./templates/history";
import { UserSession } from "./templates/user-session";
import { LanguageSettings } from "./templates/language";

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
        <h1 className="select-none text-lg mb-[36px] p-[16px_30px_0_30px] xxl:p-0 font-[Archivo] font-bold">
          {t("my_settings")}
        </h1>
      )}
      <div
        className={`flex ${
          selectedArea ? "flex-row" : "flex-column"
        } gap-[15px] h-full ${
          xxl && selectedArea ? "overflow-visible" : "overflow-auto"
        } ${xxl ? "p-0" : "p-[0_60px_60px_30px]"}`}
      >
        {(!xl || !area) && (
          <div className="w-full flex flex-col gap-[30px] mb-[19px]">
            <Box display="flex" flexDirection="column" gap="24px">
              <h2 className={`
                ${!md ? "text-[#285E69ff]" : "text-[#7B797C]"} font-medium ${md && "font-normal"}
                text-[14px]
              `}>
                {t("general_information")}
              </h2>
              <div className={`flex flex-col ${md ? 'gap-[5px]' : "gap-[24px]"}`} >
                <SettingsButton
                  icon={<AccountIcon />}
                  text={t("personal_information")}
                  onClick={() => {
                    setSelectedArea("personal-information");
                  }}
                  isSelected={selectedArea === "personal-information"}
                />
                <SettingsButton
                  icon={<Info />}
                  text={t("app_version")}
                  onClick={() => {
                    setSelectedArea("app-version");
                  }}
                  isSelected={selectedArea === "app-version"}
                />
                <SettingsButton
                  icon={<World />}
                  text={t("language")}
                  onClick={() => {
                    setSelectedArea("language");
                  }}
                  isSelected={selectedArea === "language"}
                />
              </div>
            </Box>
            <div className="flex flex-col gap-[24px]" >
              <h2 className={`
                ${!md ? "text-[#285E69ff]" : "text-[#7B797C]"} font-medium ${md && "font-normal"}
                ${md && '!text-[18px]'} text-[14px]
              `}>
                {md ? t("access_management") : t("account_and_app_settings")}
              </h2>
              <div className={`flex flex-col ${md ? "gap-[5px]" : "gap-[24px]"}`} >
                <SettingsButton
                    icon={<Guard />}
                    text={t("change_password")}
                    onClick={() => {
                      setSelectedArea("change-password");
                    }}
                    isSelected={selectedArea === "change-password"}
                  />
                  <SettingsButton
                    icon={<Keys />}
                    text={t("user_keys")}
                    onClick={() => {
                      setSelectedArea("user-keys");
                    }}
                    isSelected={selectedArea === "user-keys"}
                  />
                  <SettingsButton
                    icon={<Docs />}
                    text={t("login_and_sign_history")}
                    onClick={() => {
                      setSelectedArea("history");
                    }}
                    isSelected={selectedArea === "history"}
                  />
                  <SettingsButton
                    icon={<Chain />}
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
            <div className="flex flex-col gap-[24px]" >
              <h2 className={`
                ${!md ? "text-[#285E69ff]" : "text-[#7B797C]"} font-medium ${md && "font-normal"}
                ${md && '!text-[18px]'} text-[14px]
              `}>
                {md ? t("documents_and_legal_notices") : t("documents")}
              </h2>
              <div className={`flex flex-col ${md ? "gap-[5px]" : "gap-[24px]"}`} >
                <SettingsButton
                  icon={<EuroIcon />}
                  text={t("pricing")}
                  onClick={() => {
                    setSelectedArea("pricing");
                  }}
                  isSelected={selectedArea === "pricing"}
                />
                <a href="https://gekkard.com/terms-and-conditions.html">
                  <SettingsButton
                    icon={<DocumentsDocumentsIcon />}
                    text={t("terms_and_conditions")}
                  />
                </a>
                <SettingsButton
                  icon={<ReportIcon />}
                  text={t("my_reports")}
                  onClick={() => {
                    setSelectedArea("my-reports");
                  }}
                  isSelected={selectedArea === "my-reports"}
                />
                <a href="https://gekkard.com/data-protection-policy.html">
                  <SettingsButton
                    icon={<DocumentsDocumentsIcon />}
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
