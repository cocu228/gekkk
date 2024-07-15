import { useEffect, useState } from "react";
import translations from "./model/locales.json";
import shareIcon from "../../../images/ic_iphone_share.png";
import { 
  addClickListener,
  checkLastPwaDisplay,
  isInStandaloneMode, 
  isIos, 
  isIPad, 
  isSafari, 
  removeClickListener, 
  saveLastPwaDisplay
} from "./helpers/browser";
import { CONSTANTS } from "./consts";
import { IProps } from "./types";
import "./styles.css";


const PwaInstallPopupIOS = (props: IProps) => {

  const { 
    force, 
    delay = CONSTANTS.DEFAULT_DELAY_FOR_DISPLAY_SECONDS, 
    appIcon, 
    styles, 
    appName, 
  } = props

  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpen, setOpened] = useState(false);
  const languageCode = CONSTANTS.DEFAULT_LANG

  const clickListener = () => {
    setOpened(v => {
      if (v) {
        saveLastPwaDisplay();
        removeClickListener(clickListener);
        return false;
      }
      return v;
    });
  };

  useEffect(() => {
    setIsLoaded(true);
    addClickListener(clickListener);
    const t = setTimeout(() => {
      if (CONSTANTS.isDevelopment) {
        console.log("isIOS: ", isIos());
        console.log("isInStandaloneMode: ", isInStandaloneMode());
        console.log("checkLastPwaDisplay: ", checkLastPwaDisplay());
      }
      if (
        force ||
        (isIos() && !isInStandaloneMode() && checkLastPwaDisplay())
      ) {
        setOpened(true);
      }
    }, delay * 1000);
    return () => {
      removeClickListener(clickListener);
      if (t) clearTimeout(t);
    };
  }, []);

  if (!isLoaded) return null;

  const apppNameLabel = appName
    ? appName
    : translations[languageCode].APP_NAME_DEFAULT;
  return isOpen ? (
    <div
      style={styles}
      className={`pwa-install-popup-ios ${isIPad() && "ipad-device"} ${isSafari() && "safari-nav"}`}
    >
      <div className="pwa-install-popup-ios-content">
        <div className="left">
          <img className="appIcon" src={appIcon} />
        </div>
        <div className="right">
          <div>
            {translations[languageCode].PWA_POPUP_PART1.replace(
              "{{appName}}",
              apppNameLabel
            )}
          </div>
          <div>
            {translations[languageCode].PWA_POPUP_PART2.replace(
              "{{appName}}",
              apppNameLabel
            )}
          </div>
          <div>
            {translations[languageCode].PWA_POPUP_PART3}
            <span>
              <img className="small" src={shareIcon} />
            </span>
          </div>
          <div>{translations[languageCode].PWA_POPUP_PART4}</div>
        </div>
      </div>
    </div>
  ) : null;
};

export default PwaInstallPopupIOS;
