import { useLocation } from "react-router-dom";
import { getGkePercent } from "@/shared/config/deposits/helpers";
import StructedDepositStrategies from "@/shared/config/deposits/structed-strategies";
import { InvestmentsTypeEnum } from "@/shared/(orval)api/gek/model";
import { useMemo } from "react";

import { apiLogout } from "../(orval)api";

export function randomId(value = 12): string {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < value; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export function getRandomNumberWithLength(length = 3) {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function throttle(callee: any, timeout: number) {
  let timer = null;

  return function perform(...args: any[]) {
    if (timer) return;
    timer = setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      callee(...args);
      clearTimeout(timer);
      timer = null;
    }, timeout);
  };
}

export const isActiveClass = (value: boolean): string => (value ? "active" : "");
export const isNull = (value: any): boolean => value === null;
export const isNullOrEmpty = (value: string): boolean => value === null || value.length === 0;

export const isNumber = (value: any): boolean => typeof value === "number";

export function evenOrOdd(number) {
  return number % 2 === 0;
}

export const getCryptoIconName = ($const: string, extension = "svg") =>
  `${$const.toLowerCase().capitalize()}Icon.${extension}`;

export const getRoundingValue = (balance: number | string, roundingValue: number) => {
  const numBalance = typeof balance === "string" ? parseFloat(balance) : balance;
  return parseFloat(numBalance.toFixed(roundingValue));
};

export function getSecondaryTabsAsRecord(tabs: Array<{ Key: string; Title: string }>) {
  const list: Record<string, string> = {};

  tabs.forEach(tab =>
    Object.assign(list, {
      [tab.Key]: tab.Title
    })
  );

  return list;
}

export const actionSuccessConstructor = function (value: boolean) {
  if (value) {
    return {
      success: val => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        val(this);
        return {
          reject: () => null
        };
      }
    };
  } else {
    return {
      success: () => {
        console.warn("Response error");
        return {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          reject: (val: any) => val(this)
        };
      }
    };
  }
};

export const actionResSuccess = function (response: any) {
  if (response?.data?.result !== undefined && response.data.result !== null) {
    return {
      success: (val: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        val(this?.success);

        return {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          reject: (val: any) => val({ message: null, code: null, id: null })
        };
      }
    };
  } else {
    return {
      success: () => {
        console.warn("Response error");
        return {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          reject: (val: any) => val(response.data.error)
        };
      }
    };
  }
};

export function getFlagsFromMask(mask: number, options: Record<string, number>) {
  const flags: Record<string, boolean> = {};

  for (const [flag, value] of Object.entries(options)) {
    // Complex flag if true flags count more than one
    if ((value & (value - 1)) !== 0) {
      flags[flag] = (value & mask) === value;
      continue;
    }

    if (mask === 0 && value === 0) {
      flags[flag] = (mask & value) === 0;
      continue;
    }

    flags[flag] = (mask & value) !== 0;
  }

  return flags;
}

export function scrollToTop() {
  window.scrollBy(0, -100); // можно использовать также метод scrollTo(0, 0)
  if (window.pageYOffset > 0) {
    requestAnimationFrame(scrollToTop);
  }
}

export function calculateAmount(
  _amount: string | number,
  percentage: number | string,
  flag: "withPercentage" | "onlyPercentage" | "afterPercentage"
) {
  const amount = typeof _amount === "string" ? parseFloat(_amount) : Number(_amount);
  const percent = typeof percentage === "string" ? parseFloat(percentage) : Number(percentage);

  const percentageValue = amount * (percent / 100);

  switch (flag) {
    case "afterPercentage":
      return amount - percentageValue;
    case "withPercentage":
      return amount + percentageValue;
    case "onlyPercentage":
      return percentageValue;
    default:
      return 0;
  }
}

export const uncoverResponse = response => response.data.result;

export const uncoverArray = <T>(arr: T[]): T | null => (Array.isArray(arr) && arr.length ? arr[0] : null);

export const getFormattedIBAN = (iban: string) => `${iban.slice(0, 10)}***${iban.slice(-4)}`;

export function getRandomInt32() {
  const minValue = -2147483648; // Минимальное 32-битное знаковое число
  const maxValue = 2147483647; // Максимальное 32-битное знаковое число

  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

export const getCookieData = <T>(): T => {
  const cookieValue = document.cookie;
  const cookiePairs = cookieValue.split(";");
  const cookieData = {} as T;

  for (let i = 0; i < cookiePairs.length; i++) {
    const pair = cookiePairs[i].trim();
    const separatorIndex = pair.indexOf("=");
    const key = pair.substring(0, separatorIndex);
    const value = pair.substring(separatorIndex + 1);

    const decodedValue = decodeURIComponent(value);

    cookieData[key] = decodedValue as T[keyof T];
  }

  return cookieData;
};

export const setCookieData = (cookieData: { key: string; value: string; expiration?: number | undefined }[]): void => {
  cookieData.forEach(({ key, value, expiration }) => {
    const encodedValue: string = encodeURIComponent(value);
    let cookieString: string = `${key}=${encodedValue}`;

    if (expiration) {
      const expiryDate = new Date();
      expiryDate.setSeconds(expiryDate.getSeconds() + expiration);
      const expires = expiryDate.toUTCString();
      cookieString += `; expires=${expires}`;
    }

    document.cookie = `${cookieString}; path=/`;
  });
};

export function clearCookie(name: string) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
}
export const logout = async () => {
  await apiLogout();

  const sw = await navigator.serviceWorker.getRegistration("./sw.js");
  await sw?.unregister();

  console.log("unregistered sw");

  clearCookie("accountId");
  clearCookie("bankToken");
  clearCookie("phoneNumber");
  location.replace("/");
};

export function debounce(func: (...props: any[]) => void, delay: number) {
  let timer: ReturnType<typeof setTimeout>;

  return function (...props: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...props);
    }, delay);
  };
}

export function numberWithSpaces(val: number) {
  const parts = val.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
}

export function horizontalScrollTo(el: HTMLElement, parent: HTMLElement) {
  const elRect = el.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();

  const scrollPosition = elRect.left - parentRect.left;
  parent.scrollLeft = parent.scrollLeft + scrollPosition;
}

/*export function pullStart(e: any, setStartPoint: any) {
  const { screenY } = e.targetTouches[0];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  setStartPoint(screenY);
}

export function pull(e, setPullChange, startPoint) {
  const touch = e.targetTouches[0];
  const { screenY } = touch;
  const pullLength = startPoint < screenY ? Math.abs(screenY - startPoint) : 0;
  setPullChange(pullLength);
}

export function endPull(setStartPoint, setPullChange, pullChange, initLoading) {
  setStartPoint(0);
  setPullChange(0);
  if (pullChange > 220) {
    initLoading();
  }
}*/

//Скрывает цифры банковской карты с 5 по 12 включительно
export function maskFullCardNumber(cardNumber: string): string {
  // Проверяем, содержит ли номер карты достаточное количество символов
  if (cardNumber.length < 12) {
    return cardNumber;
  }

  // Заменяем цифры с 7 по 12 звездочками
  const maskedDigits = cardNumber.slice(6, 12).replace(/\d/g, "*");
  const formattedNumber = cardNumber.slice(0, 6) + maskedDigits + cardNumber.slice(12);

  // Добавляем пробелы каждые 4 символа
  const cardNumberWithSpaces = formattedNumber.replace(/(.{4})/g, "$1 ");

  return cardNumberWithSpaces.trim();
}

export function getFixedDepositTitle(isGke: boolean) {
  return `Fixed rate (${isGke ? "1,6" : "0,8"}% per month)`;
}

export function getStructedDepositTitle(depType: InvestmentsTypeEnum, isGke: boolean) {
  const { name, percentageTypes } = StructedDepositStrategies.find(s => {
    const typeId = isGke ? depType - 100 : depType;

    return Math.trunc(s.id / 10) === Math.trunc(typeId / 10);
  }) ?? { name: "undefined", percentageTypes: [] };

  const percentageType = percentageTypes[depType % 10];

  const { risePercent, dropPercent } = getGkePercent(percentageType, isGke);

  return `${name} strategy (${risePercent}/${dropPercent})`;
}

export const getCurrencyRounding = (value: number) =>
  value >= 1000 ? Math.round(value) : value >= 1 ? value.toFixed(2) : value.toFixed(Math.floor(-Math.log10(value)) + 1);

export function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const onlyNumbersRegex = new RegExp(/^[0-9]*$/);

export function isNumbersOnly(val: string | number) {
  return onlyNumbersRegex.test(val as string);
}
