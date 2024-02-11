import Swal from 'sweetalert2';
import { eddsa } from 'elliptic';
import { sha256 } from "js-sha256";

export const formatAsNumber = (str: string) => str.replace(/\D/g, "");
const ec = new eddsa('ed25519');


const servPath = "https://gate-dev.gekkard.com:6789/";

export async function SignInUser(phone: string, pass: string) {

    if (pass === '' || pass === ' ' || phone === '' || phone === ' ') return false;
    let makeAssertionOptions;
    try {
        var res = await fetch(servPath + 'auth/v1/login_options', {
            method: 'GET',
            credentials: "include",
            headers: {
                'Accept': 'application/json',
            }
        });
        let bodyRes = await res.json();
        makeAssertionOptions = bodyRes.result;
    } catch (e) {
        showErrorAlert("Request to server failed", e);
    }
    let challenge = makeAssertionOptions.challenge.replace(/-/g, "+").replace(/_/g, "/");
    makeAssertionOptions.challenge = Uint8Array.from(atob(challenge), c => c.charCodeAt(0));

    let passKey = sha256(phone + pass + makeAssertionOptions.rpId);

    let key = ec.keyFromSecret(passKey);
    let pub = key.getPublic();
    let signature = key.sign(makeAssertionOptions.challenge).toBytes();

    console.log("Public key (elliptic):");
    console.log(coerceToBase64Url(pub));

    const data = {
        challenge_id: makeAssertionOptions.challenge_id,
        credential: null,
        public_key: coerceToBase64Url(pub),
        signature: coerceToBase64Url(signature)
    };

    let response;
    try {
        let res = await fetch(servPath + "auth/v1/login", {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'resolution': ("" + screen.width + "x" + screen.height),
                'device_guid': setAdvCookie()
            }
        });

        response = await res.json();
    } catch (e) {
        showErrorAlert("Request to server failed", e);
        throw e;
    }

    console.log("Assertion Object", response);

    // show error
    if (response.result !== 'Success') {
        //console.log("Error doing assertion");
        //console.log(response.errorMessage);
        showErrorAlert(response.error?.message);
        return false;
    }

    // show success message
    Swal.fire({
        title: 'Logged In!',
        text: 'You\'re logged in successfully.',
        timer: 2000
    });
    return true;
}
export async function SignIn() {

    let makeAssertionOptions;
    try {
        var res = await fetch(servPath + 'auth/v1/login_options', {
            method: 'GET',
            credentials: "include",
            headers: {
                'Accept': 'application/json',
            }
        });
        let bodyRes = await res.json();
        makeAssertionOptions = bodyRes.result;
    } catch (e) {
        showErrorAlert("Request to server failed", e);
    }

    console.log("Assertion Options Object", makeAssertionOptions);

    // show options error to user
    if (makeAssertionOptions == null) {
        //console.log("Error creating assertion options");
        //console.log(makeAssertionOptions.errorMessage);
        showErrorAlert(makeAssertionOptions.errorMessage);
        return;
    }

    const challenge = makeAssertionOptions.challenge.replace(/-/g, "+").replace(/_/g, "/");
    makeAssertionOptions.challenge = Uint8Array.from(atob(challenge), c => c.charCodeAt(0));

    Swal.fire({
        title: 'Logging In...',
        text: 'Tap your security key to login.',
        imageUrl: "/images/securitykey.min.svg",
        showCancelButton: true,
        showConfirmButton: false,
        focusConfirm: false,
        focusCancel: false
    });

    // ask browser for credentials (browser will ask connected authenticators)
    let assertedCredential;
    try {
        assertedCredential = await navigator.credentials.get({ publicKey: makeAssertionOptions })
    } catch (err) {
        showErrorAlert(err.message ? err.message : err);
        return;
    }

    // Move data into Arrays incase it is super long
    let authData = new Uint8Array(assertedCredential.response.authenticatorData);
    let clientDataJSON = new Uint8Array(assertedCredential.response.clientDataJSON);
    let rawId = new Uint8Array(assertedCredential.rawId);
    let sig = new Uint8Array(assertedCredential.response.signature);
    let userHandle = new Uint8Array(assertedCredential.response.userHandle);
    const data = {
        challenge_id: makeAssertionOptions.challenge_id,
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

    let response;
    try {

        let res = await fetch(servPath + "auth/v1/login", {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'resolution': ("" + screen.width + "x" + screen.height),
                'device_guid': setAdvCookie()
            }
        });

        response = await res.json();
    } catch (e) {
        showErrorAlert("Request to server failed", e);
        throw e;
    }

    //console.log("Assertion Object", response);

    // show error
    if (response.result !== 'Success') {
        //console.log("Error doing assertion");
        //console.log(response.errorMessage);
        showErrorAlert(response.error?.message);
        return false;
    }

    // show success message
    Swal.fire({
        title: 'Logged In!',
        text: 'You\'re logged in successfully.',
        timer: 2000
    });    
    return true;
}

export function coerceToArrayBuffer(thing, name) {
    if (typeof thing === "string") {
        // base64url to base64
        thing = thing.replace(/-/g, "+").replace(/_/g, "/");

        // base64 to Uint8Array
        var str = window.atob(thing);
        var bytes = new Uint8Array(str.length);
        for (var i = 0; i < str.length; i++) {
            bytes[i] = str.charCodeAt(i);
        }
        thing = bytes;
    }

    // Array to Uint8Array
    if (Array.isArray(thing)) {
        thing = new Uint8Array(thing);
    }

    // Uint8Array to ArrayBuffer
    if (thing instanceof Uint8Array) {
        thing = thing.buffer;
    }

    // error if none of the above worked
    if (!(thing instanceof ArrayBuffer)) {
        throw new TypeError("could not coerce '" + name + "' to ArrayBuffer");
    }

    return thing;
}
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
function showErrorAlert(message, error = "") {
    let footermsg = '';
    if (error) {
        footermsg = 'exception:' + error.toString();
    }
    Swal.fire({
        title: 'Error',
        text: message,
        footer: footermsg
    })
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
