import Swal from 'sweetalert2';
import { eddsa } from 'elliptic';
import { sha256 } from "js-sha256";

/**
 * Объект-ошибки для объекта-ответа
 */
export interface ErrorObject {
    /** Цифровой код ошибки */
    code?: number;
    /** Текстовое сообщение об ошибке */
    readonly message?: string | null;
}
/**
 * Ответы-результаты запросов API в виде текста обозначающие вариант завершения процесса. 
Плюс стандартные статические ответы.
 */
export interface ApiResponse {
    error?: ErrorObject;
    /** Идентификатор запроса, если он был или 0 */
    id?: number;
    /** Объект-результат: null, если ошибка */
    result?: string | null;
}

export const formatAsNumber = (str: string) => str.replace(/\D/g, "");
const ec = new eddsa('ed25519');


const servPath = "https://gate-dev.gekkard.com:6789/";

export async function SignInUser(phone: string, pass: string) {

    if (pass === '' || pass === ' ' || phone === '' || phone === ' ') return false;
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: "info",
        title: "Login with user key"
    });

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
        showErrorAlert("Request login_options to server failed", e);
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
        showErrorAlert("Request login to server failed", e);
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

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: "info",
        title: "Login with device key"
    });

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
        showErrorAlert("Request login_options to server failed", e);
    }

    console.log("Assertion Options Object", makeAssertionOptions);

    // show options error to user
    if (makeAssertionOptions == null) {
        //console.log("Error creating assertion options");
        //console.log(makeAssertionOptions.errorMessage);
        showErrorAlert(makeAssertionOptions?.errorMessage);
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
export async function ResetPassStart(phone: string) {
    try {
        let response = await fetch(servPath + 'auth/v1/reset_password?phone=' + phone, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Accept': 'application/json'
            }
        });

        let data: ApiResponse = await response.json();

        return data;

    } catch (e) {
        showErrorAlert(e);
    }
}

export async function ResetPassSendSMS(emailcode: string) {
    try {
        let response = await fetch(servPath + 'auth/v1/register_options?code=' + emailcode, {
            method: 'GET',
            credentials: "include",
            headers: {
                'Accept': 'application/json'
            }
        });

        let data = await response.json();

        return data;

    } catch (e) {
        showErrorAlert(e);
    }
}

export async function ResetPass(makeAssertionOptions: any, pass: string, code: string) {

    const challenge = makeAssertionOptions.fido2_options.challenge.replace(/-/g, "+").replace(/_/g, "/");
    makeAssertionOptions.challenge = Uint8Array.from(atob(challenge), c => c.charCodeAt(0));

    let passKey = sha256(makeAssertionOptions.phone + pass + makeAssertionOptions.fido2_options.rp.id);

    var key = ec.keyFromSecret(passKey);
    var pub = key.getPublic();
    console.log("Public key (elliptic):");
    console.log(coerceToBase64Url(pub));
    var signature = key.sign(makeAssertionOptions.challenge).toBytes();

    const data = {
        challenge_id: makeAssertionOptions.challenge_id,
        code,
        public_key: coerceToBase64Url(pub),
        signature: coerceToBase64Url(signature)
    };

    let response: ApiResponse ;
    try {
        let res = await fetch(servPath + "auth/v1/register_key", {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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
        console.log("Error doing assertion");
        //console.log(response.errorMessage);
        showErrorAlert(response.error?.message);
        return;
    }

    // show success message
    Swal.fire({
        title: 'Password reseted!',
        text: 'Password reset successfully.',
        timer: 2000
    });
    return response;

}

export async function RegKeySendSMS() {
    
    try {
        let response = await fetch(servPath + 'auth/v1/register_options', {
            method: 'GET',
            credentials: "include",
            headers: {
                'Accept': 'application/json'
            }
        });

        let data: ApiResponse = await response.json();

        return data;

    } catch (e) {
        showErrorAlert(e);
    }
}

export async function RegisterKey(makeCredentialOptions: any, code: string) {

    let fido2_opt = makeCredentialOptions?.fido2_options;

    console.log("Credential Options Object", makeCredentialOptions);

    if (fido2_opt?.status !== "ok") {
        showErrorAlert(fido2_opt.errorMessage);
        return;
    }

    // Turn the challenge back into the accepted format of padded base64
    fido2_opt.challenge = coerceToArrayBuffer(fido2_opt.challenge, 'fido2_opt.challenge');
    // Turn ID into a UInt8Array Buffer for some reason
    fido2_opt.user.id = coerceToArrayBuffer(fido2_opt.user.id, 'fido2_opt.user.id');

    if (fido2_opt.authenticatorSelection.authenticatorAttachment === null) fido2_opt.authenticatorSelection.authenticatorAttachment = undefined;

    console.log("Credential Options Formatted", fido2_opt);

    Swal.fire({
        title: 'Registering...',
        text: 'Tap your security key to finish registration.',
        imageUrl: "/images/securitykey.min.svg",
        showCancelButton: true,
        showConfirmButton: false,
        focusConfirm: false,
        focusCancel: false
    });


    console.log("Creating PublicKeyCredential...");

    let newCredential;
    try {
        newCredential = await navigator.credentials.create({
            publicKey: fido2_opt
        });
    } catch (e) {
        var msg = "Could not create credentials in browser. Probably because the username is already registered with your authenticator. Please change username or authenticator."
        console.error(msg, e);
        showErrorAlert(msg, e);
    }

    console.log("PublicKeyCredential Created", newCredential);

    // Move data into Arrays incase it is super long
    let attestationObject = new Uint8Array(newCredential.response.attestationObject);
    let clientDataJSON = new Uint8Array(newCredential.response.clientDataJSON);
    let rawId = new Uint8Array(newCredential.rawId);

    const data = {
        challenge_id: makeCredentialOptions.challenge_id,
        code,
        credential_new:
        {
            id: newCredential.id,
            rawId: coerceToBase64Url(rawId),
            type: newCredential.type,
            extensions: newCredential.getClientExtensionResults(),
            response: {
                attestationObject: coerceToBase64Url(attestationObject),
                clientDataJSON: coerceToBase64Url(clientDataJSON),
                transports: newCredential.response.getTransports()
            }
        }
    };

    let response;
    try {

        response = await fetch(servPath + 'auth/v1/register_key', {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        let dataR = await response.json();

        return dataR.result;
    } catch (e) {
        showErrorAlert(e);
    }

    console.log("Credential Object", response);

    // show error
    if (response !== "Success") {
        console.log("Error creating credential");
        //console.log(response.errorMessage);
        //showErrorAlert(response.errorMessage);
        return;
    }

    // show success 
    Swal.fire({
        title: 'Registration Successful!',
        text: 'You\'ve registered successfully.',
        // type: 'success',
        timer: 2000
    });

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
