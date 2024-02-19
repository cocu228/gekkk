import { apiRegisterOptions } from "@/shared/(orval)api/auth";
import { coerceToArrayBuffer, coerceToBase64Url } from "../helpers";

export async function RegisterOption(setChallenge, setSmsSent) {


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
        setChallenge({
            newCredential:newCredential,
            id:makeCredentialOptions.challenge_id,
        })
        setSmsSent(true)

    } catch (e) {
        console.log(e.message ? e.message : e);
    }
}

export async function RegisterKey(newCredential, challenge_id, code, changeKeyList, setSmsSent) {
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
        response = await registerCredentialWithServer(data, changeKeyList, setSmsSent);
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

async function registerCredentialWithServer(formData, changeKeyList, setSmsSent) {
    const servPath = import.meta.env.VITE_API_URL;
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
    changeKeyList(n=>!n)
    setSmsSent(false)

    return data.result;
}


