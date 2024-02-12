export const formatAsNumber = (str: string) => str.replace(/\D/g, "");


export function coerceToBase64Url(thing) {
    // Array or ArrayBuffer to Uint8Array
    if (Array.isArray(thing)) {
        thing = Uint8Array.from(thing);
    }

    if (thing instanceof ArrayBuffer) {
        thing = new Uint8Array(thing);
    }

    // Uint8Array to base64
    if (thing instanceof Uint8Array) {
        var str = "";
        var len = thing.byteLength;

        for (var i = 0; i < len; i++) {
            str += String.fromCharCode(thing[i]);
        }
        thing = window.btoa(str);
    }

    if (typeof thing !== "string") {
        throw new Error("could not coerce to string");
    }

    // base64 to base64url
    // NOTE: "=" at the end of challenge is optional, strip it off here
    thing = thing.replace(/\+/g, "-").replace(/\//g, "_").replace(/=*$/g, "");

    return thing;
}

export function setAdvCookie() {
    let cookieArr = document.cookie.split(";");
    let flag = true;
    let guid;
    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if ("device_guid" == cookiePair[0].trim()) {
            flag = false;
            guid = cookiePair[1];
        }
    }
    if (flag) {
        guid = self.crypto.randomUUID();
        document.cookie = "device_guid=" + guid + "; path = /; max-age=" + 365 * 24 * 60 * 60;
    }
    return guid;
}
