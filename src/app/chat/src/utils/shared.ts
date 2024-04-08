import {MD5} from "crypto-js";

export function generateUid() {
    // Generate a random Uint32 value as a string
    const uid = Math.floor(Math.random() * 0xffffffff).toString(16);
    // Calculate the MD5 hash of the UID using crypto-js
    const hashUid = MD5(uid).toString();

    return hashUid;
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
        //@ts-ignore
        cookieData[key] = decodedValue as T[keyof T];
    }

    return cookieData;
};


export const setCookieData = (cookieData: { key: string; value: string; expiration?: number | undefined }[]): void => {
    cookieData.forEach(({key, value, expiration}) => {
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


// функция которая проверяет расширение файла и возвращает true, если файл является медиафайлом
export function isMediaFile(fileName: string): boolean {
    const mediaExtensions = ['mp3', 'mp4', "gif", 'avi', 'mkv', 'jpeg', 'jpg', "heic", "mov", 'png'];
    
    const fileExtension = fileName.split('.').pop()?.toLowerCase();
    
    return mediaExtensions.includes(fileExtension || '');
}