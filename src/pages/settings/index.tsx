import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import { SettingsButton } from "@/shared/ui/ButtonsMobile/settings-button";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import { IconApp } from "@/shared/ui/icons/icon-app";
import { getFlagsFromMask, IS_GEKKARD_APP } from "@/shared/lib";
import { CtxRootData } from "@/processes/RootContext";
import { apiSessions } from "@/shared/(orval)api";
import { maskSessionFlags, SessionFlags } from "@/shared/config/mask-session-flags";
import TabsGroupCustom from "@/shared/ui/tabs-group/custom";

import styles from "./styles.module.scss";
import { settingsContext } from "./settingsContext";
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
import { settingsList } from "./model/constants";

const areaMap = {
  "identification-status": <IdentificationStatus />,
  "personal-information": <PersonalInformation />,
  "my-reports": <MyReports />,
  pricing: <Pricing />,
  "app-version": <AppVersion />,
  "change-password": <ChangePassword />,
  "user-keys": <UserKeys />,
  "sign-history": <LoginAndSignHistory />,
  "user-sessions": <UserSession />,
  language: <LanguageSettings />
};

const settingsGroups: Record<string, string[]> = {
  general_information: ["app-version", "personal-information", "language"],
  access_management: ["change-password", "user-keys", "sign-history", "user-sessions"],
  documents_and_legal_notices: ["pricing", "terms-and-conditions", "data-protection", "legal-agreements"]
};

type SettingsSections = keyof typeof areaMap | "" | string;

export function Settings() {
  const { t } = useTranslation();
  const { account } = useContext(CtxRootData);
  const { xxl, md, xl, lg } = useBreakpoints();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [settingsGroup, setSettigsGroup] = useState<string>(null);
  const selectedArea = useMemo(() => searchParams.get("sessionsSection") || "", [searchParams]) as SettingsSections;
  const area = areaMap[selectedArea] || null;
  const fullWidthOrHalf = useMemo(() => (xl || !selectedArea ? 1 : 2), [xl, selectedArea]);

  const setGroupIfAreaInGroup = area => {
    setSettigsGroup(
      Object.keys(settingsGroups).find(group => {
        if (settingsGroups[group].includes(area)) {
          return group;
        }
      })
    );
  };

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

  const resetAll = () => {
    setSettigsGroup(null);
    setSelectedArea("");
  };

  useEffect(() => {
    setSelectedArea(selectedArea);

    (async () => {
      const { data } = await apiSessions({ current: true });
      const sessionFlags = getFlagsFromMask(data?.result[0].flags, maskSessionFlags);

      if (sessionFlags[SessionFlags.AdminPanelAvailable]) {
        setShowAdminPanel(true);
      }
    })();
  }, [account]);

  useEffect(() => {
    if (!settingsGroup) {
      setGroupIfAreaInGroup(selectedArea);
    }
  }, [selectedArea]);

  return (
    <settingsContext.Provider value={{ closeArea: useCallback(() => setSelectedArea(""), []) }}>
      {!md && (
        <div>
          <div className={styles.settingsHeader}>
            <div className={styles.settingsButton} onClick={resetAll}>
              <IconApp code='t13' size={35} color='#3A5E66' />
            </div>
            <div className={styles.settingsHeaderText}>
              <span className={styles.settingsTitle}>{t("settings")}</span>
              <span className={styles.settingsSubTitle}>
                {settingsGroup && selectedArea ? t(settingsGroup) : t("fast_and_easy")}
              </span>
            </div>
          </div>
          <TabsGroupCustom
            initValue={!selectedArea ? settingsGroup : selectedArea}
            callInitValue={!selectedArea ? settingsGroup : { account, selectedArea }}
          >
            {!selectedArea
              ? Object.keys(settingsGroups).map(group => (
                  <div
                    key={group}
                    data-name={t(group)}
                    data-tag={t(group)}
                    data-onclick={() => {
                      setSettigsGroup(group);
                      setSelectedArea(settingsGroups[group][0]);
                    }}
                  />
                ))
              : settingsGroup && settingsGroup !== "documents_and_legal_notices"
              ? settingsGroups[settingsGroup].map(area => (
                  <div
                    key={area}
                    data-name={t(area.replaceAll("-", "_"))}
                    data-tag={area}
                    data-onclick={() => {
                      setSelectedArea(area);
                    }}
                  />
                ))
              : settingsGroup &&
                settingsGroup === "documents_and_legal_notices" &&
                settingsGroups[settingsGroup].map(area => (
                  <div
                    key={area}
                    data-name={t(area.replaceAll("-", "_"))}
                    data-tag={area}
                    data-onclick={() => {
                      area === "pricing"
                        ? setSelectedArea(area)
                        : // @ts-ignore
                          (window.location = `https://gekkard.com/${
                            area === "data-protection" ? `${area}-policy` : area
                          }.html`);
                    }}
                  />
                ))}
          </TabsGroupCustom>
        </div>
      )}
      <div
        className={`
          ${styles.itemsWrap} pb-[10px] ${!md && styles.notMobileSettings} ${xxl! && styles.itemsWrapPadding} ${
            xxl && selectedArea && styles.itemsWrapOverflow
          }
        `}
        style={{
          flexDirection: selectedArea ? "row" : "column",
          gridTemplateColumns: `repeat(${fullWidthOrHalf}, minmax(0, 1fr))`
        }}
      >
        {(!xl || !area) && (
          <div className={`${styles.boxWrap} `}>
            <div className={`${styles.box} ${fullWidthOrHalf === 1 && !lg && styles.boxWrapMin}`}>
              <h2
                className={`${styles.itemTitle} ${styles.mobTitle} ${!md && styles.itemTitleColor} ${
                  md && styles.itemTitleWeight
                }`}
              >
                {t("general_information")}
              </h2>
              <div className={`${styles.itemsList}`}>
                {(IS_GEKKARD_APP() ? settingsList.slice(0, 3) : settingsList.slice(0, 2)).map(item => (
                  <SettingsButton
                    key={item.iconCode}
                    icon={<IconApp code={item.iconCode} size={23} color='#285E69' />}
                    text={t(item.text)}
                    isLang={item.selectArea === "language"}
                    onClick={() => {
                      setSelectedArea(item.selectArea);
                      setGroupIfAreaInGroup(item.selectArea);
                    }}
                    isSelected={selectedArea === item.selectArea}
                  />
                ))}
              </div>
            </div>
            <div className={`${styles.box} ${fullWidthOrHalf === 1 && !lg && styles.boxWrapMin}`}>
              <h2 className={`${styles.accessTitle} ${md && styles.accessTitleWeight} ${md && styles.accessTitleSize}`}>
                {md ? t("access_management") : t("account_and_app_settings")}
              </h2>
              <div className={`${styles.btnsWrap} ${md && styles.btnsWrapGap}`}>
                {settingsList.slice(3, 7).map(item => (
                  <SettingsButton
                    key={item.iconCode}
                    icon={<IconApp code={item.iconCode} size={23} color='#285E69' />}
                    text={t(item.text)}
                    onClick={() => {
                      setSelectedArea(item.selectArea);
                      setGroupIfAreaInGroup(item.selectArea);
                    }}
                    isSelected={selectedArea === item.selectArea}
                  />
                ))}
              </div>
            </div>

            {IS_GEKKARD_APP() && (
              <div className={`${styles.box} ${fullWidthOrHalf === 1 && !lg && styles.boxWrapMin}`}>
                <h2
                  className={`${styles.accessTitle} ${md && styles.accessTitleWeight} ${md && styles.accessTitleSize}`}
                >
                  {md ? t("documents_and_legal_notices") : t("documents")}
                </h2>
                <div className={`${styles.itemsList}`}>
                  {settingsList.slice(7, settingsList.length).map(item => (
                    <SettingsButton
                      key={item.iconCode}
                      icon={<IconApp code={item.iconCode} size={23} color='#285E69' />}
                      text={t(item.text)}
                      onClick={() => {
                        setSelectedArea(item.selectArea);
                        setGroupIfAreaInGroup(item.selectArea);
                      }}
                      isSelected={selectedArea === item.selectArea}
                    />
                  ))}
                  <a href='https://gekkard.com/terms-and-conditions.html'>
                    <SettingsButton
                      icon={<IconApp code='t42' size={23} color='#285E69' />}
                      text={t("terms_and_conditions")}
                    />
                  </a>
                  <a href='https://gekkard.com/data-protection-policy.html'>
                    <SettingsButton
                      icon={<IconApp code='t42' size={23} color='#285E69' />}
                      text={t("data_protection")}
                    />
                  </a>
                  <a href='https://gekkard.com/legal-agreements.html'>
                    <SettingsButton
                      icon={<IconApp code='t42' size={23} color='#285E69' />}
                      text={t("legal_agreements")}
                    />
                  </a>
                  {/* Admin panel button */}
                  {showAdminPanel && (
                    <a href={`${import.meta.env.VITE_API_URL}adm`} target='_blank' rel='noreferrer'>
                      <SettingsButton icon={null} text={"Admin panel"} />
                    </a>
                  )}
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
