import Swal from 'sweetalert2';
import { eddsa } from 'elliptic';
import { sha256 } from "js-sha256";
import { RegisterKey, apiLogin, apiLoginOptions } from './apiInterfaces';

import imgUrl from '../images/securitykey.min.svg';

export const formatAsNumber = (str: string) => str.replace(/\D/g, "");
const ec = new eddsa('ed25519');

const Base64URL_to_Uint8Array = (str: string) =>
    Uint8Array.from(window.atob(str.replace(/-/g, "+").replace(/_/g, "/")), c => c.charCodeAt(0))

export async function SignInUser(phone: string, pass: string) {
    if (pass === '' || pass === ' ' || phone === '' || phone === ' ') return false;

    let res = await apiLoginOptions();
    if (!res.result) return false;
    let opt = res.result;

    let challengeBuf = Base64URL_to_Uint8Array(opt.challenge) as Buffer;

    let passKey = sha256(phone + pass + opt.rpId);
    let key = ec.keyFromSecret(passKey);
    let pub = key.getPublic();
    let signature = key.sign(challengeBuf).toBytes();

    // console.log("Public key (elliptic):");
    // console.log(coerceToBase64Url(pub));
    const data = {
        challenge_id: opt.challenge_id,
        credential: null,
        public_key: coerceToBase64Url(pub),
        signature: coerceToBase64Url(signature)
    };
    let resLogin = await apiLogin(data);
    return resLogin.result === 'Success';
}
export async function SignIn() {
    let opt;

    var res = await apiLoginOptions();
    if (!res.result) return false;
    opt = res.result;

    opt.challenge = Base64URL_to_Uint8Array(opt.challenge);

    Swal.fire({
        title: 'Logging In...',
        text: 'Tap your security key to login.',
        imageUrl: imgUrl,
        showCancelButton: true,
        showConfirmButton: false,
        focusConfirm: false,
        focusCancel: false
    });

    // ask browser for credentials (browser will ask connected authenticators)
    let assertedCredential;
    try {
        assertedCredential = await navigator.credentials.get({ publicKey: opt })
    } catch (e) {
        Swal.fire({
            title: 'Browser/OS request error',
            icon: "error",
            text: "Could not get credentials in browser or OS.",
            footer: e
        });
        return false;
    }

    // Move data into Arrays incase it is super long
    let authData = new Uint8Array(assertedCredential.response.authenticatorData);
    let clientDataJSON = new Uint8Array(assertedCredential.response.clientDataJSON);
    let rawId = new Uint8Array(assertedCredential.rawId);
    let sig = new Uint8Array(assertedCredential.response.signature);
    let userHandle = new Uint8Array(assertedCredential.response.userHandle);
    const data = {
        challenge_id: opt.challenge_id,
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
    let resLogin = await apiLogin(data);

    return resLogin.result === 'Success';
}

export async function ResetPass(opt: any, pass: string, code: string) {

    opt.challenge = Base64URL_to_Uint8Array(opt.fido2_options.challenge);
    let passKey = sha256(opt.phone + pass + opt.fido2_options.rp.id);

    var key = ec.keyFromSecret(passKey);
    var pub = key.getPublic();
    console.log("Public key (elliptic):");
    console.log(coerceToBase64Url(pub));
    var signature = key.sign(opt.challenge).toBytes();

    const data = {
        challenge_id: opt.challenge_id,
        code,
        public_key: coerceToBase64Url(pub),
        signature: coerceToBase64Url(signature)
    };
    return await RegisterKey(data);
}

export async function RegisterDeviceKey(opt: any, code: string) {

    let fido2_opt = opt?.fido2_options;

    if (fido2_opt?.status !== "ok") {
        Swal.fire({
            title: 'Server request error',
            icon: "error",
            text: "Sorry, something went wrong! :(",
            footer: fido2_opt?.errorMessage //rez.error?.message
        });
        return false;
    }

    // Turn the challenge back into the accepted format of padded base64
    fido2_opt.challenge = coerceToArrayBuffer(fido2_opt.challenge, 'fido2_opt.challenge');
    // Turn ID into a UInt8Array Buffer for some reason
    fido2_opt.user.id = coerceToArrayBuffer(fido2_opt.user.id, 'fido2_opt.user.id');

    if (fido2_opt.authenticatorSelection.authenticatorAttachment === null) fido2_opt.authenticatorSelection.authenticatorAttachment = undefined;

    Swal.fire({
        title: 'Registering...',
        text: 'Tap your security key to finish registration.',
        imageUrl: imgUrl,
        showCancelButton: true,
        showConfirmButton: false,
        focusConfirm: false,
        focusCancel: false
    });

    let newCredential;
    try {
        newCredential = await navigator.credentials.create({
            publicKey: fido2_opt
        });
    } catch (e) {
        var msg = "Could not create credentials in browser. Probably because the username is already registered with your authenticator. Please change username or authenticator."
        Swal.fire({
            title: 'Browser/OS request error',
            icon: "error",
            text: msg,
            footer: e
        });
    }

    // Move data into Arrays incase it is super long
    let attestationObject = new Uint8Array(newCredential.response.attestationObject);
    let clientDataJSON = new Uint8Array(newCredential.response.clientDataJSON);
    let rawId = new Uint8Array(newCredential.rawId);

    const data = {
        challenge_id: opt.challenge_id,
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
    return await RegisterKey(data);
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


