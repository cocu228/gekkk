import { Fragment, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";

import styles from "./styles.module.scss";
import { faqContext } from "./faqContext";
import { AvailableFaqAreas, faqAreasMap, faqAreasMapKeys } from "./faqAreasMap";

export function Faq() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedArea = (searchParams.get("faqSection") || "") as AvailableFaqAreas;
  const { t } = useTranslation();

  const setSelectedArea = useCallback(
    (selectedArea: AvailableFaqAreas) => {
      if (!faqAreasMap(t)[selectedArea]) {
        searchParams.delete("faqSection");
        setSearchParams(searchParams, { replace: true });
      } else {
        searchParams.set("faqSection", selectedArea);
        setSearchParams(searchParams);
      }
    },
    [searchParams, setSearchParams]
  );

  const areas = faqAreasMap(t);

  const scrollHandler = (elementId: string) => {
    const element = document.getElementById(elementId);
    element.scrollIntoView({ block: "start", behavior: "smooth" });
  };

  useEffect(() => {
    if (selectedArea) {
      scrollHandler(selectedArea);
    }
  }, []);

  return (
    <faqContext.Provider value={{ setSelectedArea, selectedArea }}>
      <div className={styles.Wrapper}>
        <span className={styles.Title}>{t("frequently_asked_questions")}</span>
        <div>
          <ul className={styles.List}>
            {faqAreasMapKeys.map(key => (
              <li
                key={key}
                className={styles.Key}
                onClick={() => {
                  scrollHandler(key);
                  setSelectedArea(key);
                }}
              >
                {t(areas[key]?.title)}
              </li>
            ))}
          </ul>
          <div className={styles.OpenedList}>
            {faqAreasMapKeys.map(key => (
              <Fragment key={key}>
                <span id={key} className={styles.ValueTitle}>
                  {t(areas[key]?.title)}
                </span>
                <div>{areas[key].area}</div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </faqContext.Provider>
  );
}
