import { createHash } from "sha256-uint8array";
import base64url from "base64url";

export async function SignTX(signData: string) {

    let hash = createHash().update(signData);

    let hex = hash.digest("hex");    

    const publicKey: PublicKeyCredentialRequestOptions = {
        challenge: hash.digest(),
        rpId: "gekkard.com",
        allowCredentials: [],
        userVerification: "required",
    }

    // ask browser for credentials (browser will ask connected authenticators)
    let assertedCredential;
    try {
        assertedCredential = await navigator.credentials.get({ publicKey });
    } catch (e) {
        console.log(e);
        return null;
    }

    // Move data into Arrays incase it is super long
    let authData = new Uint8Array(assertedCredential.response.authenticatorData);
    let clientDataJSON = new Uint8Array(assertedCredential.response.clientDataJSON);
    let rawId = new Uint8Array(assertedCredential.rawId);
    let sig = new Uint8Array(assertedCredential.response.signature);
    let userHandle = new Uint8Array(assertedCredential.response.userHandle);
    const data = {
        credential:
        {
            id: assertedCredential.id,
            rawId: coerceToBase64Url(rawId),
            type: assertedCredential.type,
            extensions: assertedCredential.getClientExtensionResults(),
            response: {
                authenticatorData: coerceToBase64Url(authData),
                clientDataJSON: coerceToBase64Url(clientDataJSON),
                userHandle: userHandle !== null ? coerceToBase64Url(userHandle) : null,
                signature: coerceToBase64Url(sig)
            }
        }
    };  
    return base64url(JSON.stringify(data));
}

function coerceToBase64Url(thing) {
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