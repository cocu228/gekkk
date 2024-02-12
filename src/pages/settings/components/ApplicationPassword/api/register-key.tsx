import { apiRegisterOptions } from "@/shared/(orval)api/auth";

export async function RegisterKey(code) {


    let makeCredentialOptions;
    try {
        let options = {
            credentials: "include",
            headers: {
                'Accept': 'application/json'
            }
        }
        let data;
        
        await apiRegisterOptions(null, options).then(res=>data = res.data)


        makeCredentialOptions = data.result;
        

    } catch (e) {
        let msg = "Something went really wrong";
        console.error(e, msg);
    }
    let fido2_opt = makeCredentialOptions?.fido2_options;

    console.log("Credential Options Object", makeCredentialOptions);

    if (fido2_opt?.status !== "ok") {
        console.log("Error creating credential options");
        console.log(fido2_opt.errorMessage);
        return;
    }

    // Turn the challenge back into the accepted format of padded base64
    fido2_opt.challenge = coerceToArrayBuffer(fido2_opt.challenge);
    // Turn ID into a UInt8Array Buffer for some reason
    fido2_opt.user.id = coerceToArrayBuffer(fido2_opt.user.id);

    //makeCredentialOptions.excludeCredentials = makeCredentialOptions.excludeCredentials.map((c) => {
    //    c.id = coerceToArrayBuffer(c.id);
    //    return c;
    //});
    console.log(fido2_opt.authenticatorSelection.authenticatorAttachment);
    
    if (fido2_opt.authenticatorSelection.authenticatorAttachment === null) fido2_opt.authenticatorSelection.authenticatorAttachment = undefined;

    console.log("Credential Options Formatted", fido2_opt);

   


    let newCredential;
   
    try {
        newCredential = await navigator.credentials.create({publicKey: fido2_opt})
    } catch (e) {
        var msg = "Could not create credentials in browser. Probably because the username is already registered with your authenticator. Please change username or authenticator."
        console.error(msg, e);
    }

    console.log("PublicKeyCredential Created", newCredential);

    try {
        registerNewCredential(newCredential, makeCredentialOptions.challenge_id, code);

    } catch (e) {
        console.log(e.message ? e.message : e);
    }
}

async function registerNewCredential(newCredential, challenge_id, code) {
    // Move data into Arrays incase it is super long
    let attestationObject = new Uint8Array(newCredential.response.attestationObject);
    let clientDataJSON = new Uint8Array(newCredential.response.clientDataJSON);
    let rawId = new Uint8Array(newCredential.rawId);

    const data = {
        challenge_id,
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
        response = await registerCredentialWithServer(data);
    } catch (e) {
        console.log(e);
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
}

async function registerCredentialWithServer(formData) {
    const servPath = "https://localhost:5173/"
    let response = await fetch(servPath + 'auth/v1/register_key', {
        method: 'POST',
        credentials: "include", 
        body: JSON.stringify(formData),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    let data = await response.json();

    return data.result;
}


export function coerceToArrayBuffer(thing, name = "name") {
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