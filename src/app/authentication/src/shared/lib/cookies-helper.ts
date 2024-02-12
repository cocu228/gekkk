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

function clearCookie(name) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
}

export function clearCookies() {
    const excludedCookies = ['CookieAccepted'];
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;

        if (!excludedCookies.includes(name)) {
            clearCookie(name);
        }
    }
}