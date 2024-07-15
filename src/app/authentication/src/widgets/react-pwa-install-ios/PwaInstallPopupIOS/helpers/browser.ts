import { CONSTANTS } from "../consts";

export const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();  
  return /iphone|ipad|ipod/.test(userAgent);
};
export const isIPad = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /ipad/.test(userAgent);
};
export const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

export const isSafari = () => {
  const ua = window.navigator.userAgent;
  const webkit = !!ua.match(/WebKit/i);
  return isIos() && webkit && !ua.match(/CriOS/i);
};

export const checkLastPwaDisplay = () => {
  const lastDisplayTimestamp = window.localStorage.getItem(CONSTANTS.LOCAL_STORAGE_KEY);
  if (!lastDisplayTimestamp) return true;
  const lastDisplayMoment = parseInt(lastDisplayTimestamp);
  return +new Date().valueOf() - lastDisplayMoment > CONSTANTS.NB_DAYS_EXPIRE;
};

export const saveLastPwaDisplay = () => {
  window.localStorage.setItem(CONSTANTS.LOCAL_STORAGE_KEY, String(new Date().valueOf()));
};

export const addClickListener = clickListener => {
  window.addEventListener("click", clickListener);
  window.addEventListener("touchstart", clickListener);
  window.addEventListener("touch", clickListener);
};

export const removeClickListener = clickListener => {
  window.removeEventListener("click", clickListener);
  window.removeEventListener("touchstart", clickListener);
  window.removeEventListener("touch", clickListener);
};