import Decimal from "decimal.js";
import { apiLogout } from "../(orval)api";
import { useLocation } from "react-router-dom";
import React from "react";
import {getGkePercent} from "@/shared/config/deposits/helpers";

import StructedDepositStrategies from "@/shared/config/deposits/structed-strategies";

export function randomId(value = 12): string {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < value; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

export function getRandomNumberWithLength(length = 3) {
    const min = Math.pow(10, length - 1)
    const max = Math.pow(10, length) - 1

    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function throttle(callee, timeout) {
    let timer = null

    return function perform(...args) {
        if (timer) return
        timer = setTimeout(() => {
            callee(...args)
            clearTimeout(timer)
            timer = null
        }, timeout)
    }
}

export const isActiveClass = (value: boolean): string => value ? "active" : "";
export const isNull = (value: any): boolean => value === null;
export const isNullOrEmpty = (value: string): boolean => value === null || value.length === 0;

export const isNumber = (value: any): boolean => typeof value === "number"

export function evenOrOdd(number) {
    return number % 2 === 0
}

export const getCryptoIconName = ($const, extension = "svg") => {
    return `${$const.toLowerCase().capitalize()}Icon.${extension}`
}

export const getRoundingValue = (balance: Decimal | number | string, roundingValue: number) => {
    const result = typeof balance === "number" || typeof balance === "string" ? new Decimal(balance) : balance
    return result.toDecimalPlaces(roundingValue).toNumber()
}

export function getSecondaryTabsAsRecord(tabs: Array<{ Key: string, Title: string }>) {
    let list: Record<string, string> = {};

    tabs.forEach(tab => Object.assign(list, {
        [tab.Key]: tab.Title
    }));

    return list;
}


export const actionSuccessConstructor = function (value: boolean) {

    if (value) {
        return {
            success: (val) => {
                val(this)
                return ({
                    reject: (val) => null
                })
            }
        }
    } else {
        return {
            success: (val) => {
                console.warn("Response error")
                return ({
                    reject: (val) => val(this)
                })
            }
        }
    }
}

export const actionResSuccess = function (response) {
    if (response?.data?.result !== undefined && response.data.result !== null) {
        return {
            success: (val) => {
                val(this?.success)

                return {
                    reject: (val) => {
                        return val({ message: null, code: null, id: null })
                    }
                }
            }
        }
    } else {
        return {
            success: (val) => {
                console.warn("Response error")
                return {
                    reject: (val) => {
                        return val(response.data.error)
                    }
                }
            }
        }
    }
}

export function asteriskText(text) {
    if (text.length > 6) {
        return text.slice(0, 10) + '***' + text.slice(-3);
    } else {
        return text;
    }
}

export function getFlagsFromMask(mask: number, options: Record<string, number>) {
    const flags: Record<string, boolean> = {};

    for (const [flag, value] of Object.entries(options)) {
        // Complex flag if 1 bits count more than one
        const binaryVal = value.toString(2);
        const isComplex = binaryVal.split('').filter(bit => bit === '1').length > 1;

        // Checks maching if complex flag
        if (isComplex) {
            flags[flag] = (value & mask) === value;
            continue;
        }

        if (mask === 0 && value === 0) {
            flags[flag] = ((mask & value) === 0);
            continue;
        }

        flags[flag] = ((mask & value) !== 0);
    }

    return flags;
}

export function scrollToTop() {
    window.scrollBy(0, -100); // можно использовать также метод scrollTo(0, 0)
    if (window.pageYOffset > 0) {
        requestAnimationFrame(scrollToTop);
    }
}

export function calculateAmount(_amount: string | number | Decimal, percentage: number | string | Decimal, flag: 'withPercentage' | 'onlyPercentage' | 'afterPercentage') {

    const amount = new Decimal(_amount);
    const amountPercentageValue = amount.dividedBy(100);
    const percentageValue = amountPercentageValue.times(new Decimal(percentage));

    switch (flag) {
        case "afterPercentage":
            return amount.minus(percentageValue).toNumber();
        case "withPercentage":
            return amount.plus(percentageValue).toNumber()
        case "onlyPercentage":
            return percentageValue.toNumber()
    }

}

export const uncoverResponse = (response) => response.data.result

export const uncoverArray = <T>(arr: T[]): T | null => (Array.isArray(arr) && arr.length) ? arr[0] : null

export const getFormattedIBAN = (iban: string) => {
    return iban.slice(0, 10) + '***' + iban.slice(-4);
}


export function getRandomInt32() {
    const minValue = -2147483648; // Минимальное 32-битное знаковое число
    const maxValue = 2147483647;  // Максимальное 32-битное знаковое число

    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

export const getCookieData = <T>(): T => {
    const cookieValue = document.cookie;
    const cookiePairs = cookieValue.split(';');
    const cookieData = {} as T;

    for (let i = 0; i < cookiePairs.length; i++) {
        const pair = cookiePairs[i].trim();
        const separatorIndex = pair.indexOf('=');
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

        document.cookie = cookieString + '; path=/';
    });
};

export function clearCookie(name: string) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
}
export const logout = async () => {
    await apiLogout();
    
    const sw = await navigator.serviceWorker.getRegistration('./sw.js');
    await sw?.unregister();

    console.log('unregistered sw')

    clearCookie("accountId");
    clearCookie("bankToken");
    clearCookie("phoneNumber");
    location.replace('/');
};

export function debounce(func: (amount: number) => void, delay: number) {

    let timer: ReturnType<typeof setTimeout>;

    return function (amount?: number) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(amount);
        }, delay);
    };
}

export function numberWithSpaces(val: number) {
    let parts = val.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
}

export function horizontalScrollTo(el: HTMLElement, parent: HTMLElement) {
    const elRect = el.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();


    const scrollPosition = elRect.left - parentRect.left;
    parent.scrollLeft = parent.scrollLeft + scrollPosition;

}


export function pullStart(e, setStartPoint) {
    const { screenY } = e.targetTouches[0];
    setStartPoint(screenY);
}

export function pull(e, setPullChange, startPoint) {
    const touch = e.targetTouches[0];
    const { screenY } = touch;
    let pullLength = startPoint < screenY ? Math.abs(screenY - startPoint) : 0;
    setPullChange(pullLength);
}

export function endPull(setStartPoint, setPullChange, pullChange, initLoading) {
    setStartPoint(0);
    setPullChange(0);
    if (pullChange > 220) {
        initLoading()
    }
    ;
}

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
    return `Fixed rate (${isGke ? '1,6' : '0,8'}% per month)`;
}

import {InvestmentsTypeEnum} from "@/shared/(orval)api/gek/model";


export function getStructedDepositTitle(depType: InvestmentsTypeEnum, isGke: boolean) {
    const {name, percentageTypes} = StructedDepositStrategies.find(s => {
        const typeId = isGke ? depType - 100 : depType;

        return Math.trunc(s.id / 10) === Math.trunc(typeId / 10);
    }) ?? {name: 'undefined', percentageTypes: []};

    const percentageType = percentageTypes[depType % 10];

    const {
        risePercent,
        dropPercent
    } = getGkePercent(percentageType, isGke);

    return `${name} strategy (${risePercent}/${dropPercent})`;
}

export const getCurrencyRounding = (value: number) =>
    value >= 1000 ? Math.round(value) :
        value >= 1 ? value.toFixed(2) :
            value.toFixed(Math.floor(-Math.log10(value)) + 1);


export function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}