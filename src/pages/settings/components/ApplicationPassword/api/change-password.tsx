import { coerceToBase64Url } from "../helpers";
import elliptic from 'elliptic'
import sha256 from 'crypto-js/sha256';
import { eddsa } from "elliptic";
import { apiRegisterKey, apiRegisterOptions, apiResetPassword } from "@/shared/(orval)api";
import { useUserInfo } from "../../PersonalInformation/hooks/use-user-info";

const servPath = import.meta.env.VITE_API_URL;
export async function ChangePass(phoneNumber, newPass, confirmCode, makeAssertionOptions, challenge) {
    
    makeAssertionOptions.challenge = Uint8Array.from(atob(challenge), c => c.charCodeAt(0));

    let passKey = sha256(phoneNumber + newPass + "gekkard.com"); //makeAssertionOptions.fido2_options.rp.id);

    var EdDSA = elliptic.eddsa;
    var ec = new EdDSA('ed25519');
    //@ts-ignore
    var key = ec.keyFromSecret(passKey.words);
    var pub = key.getPublic();
    var signature = key.sign(makeAssertionOptions.challenge).toBytes();
    console.log(key.verify(makeAssertionOptions.challenge, signature));

    const data = {
        challenge_id: makeAssertionOptions.challenge_id,
        code: confirmCode,
        public_key: coerceToBase64Url(pub),
        signature: coerceToBase64Url(signature)
    };

    let response;
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
        throw e;
    }

    console.log("Assertion Object", response);

    // show error
    if (response.result !== 'Success') {
        console.log("Error doing assertion");
        //console.log(response.errorMessage);
        return;
    }


    

}


export async function RegisterOptionsToChangePass (setOptions, setChallenge, setSent){
    let makeAssertionOptions;
    let challenge;
    try {  
        let options = {
            credentials: "include",
            headers: {
                'Accept': 'application/json'
            }
        }
        let data;
        
        await apiRegisterOptions(null, options).then(res=>data = res.data)


        makeAssertionOptions = data.result;
        
        
        challenge = makeAssertionOptions.fido2_options.challenge.replace(/-/g, "+").replace(/_/g, "/");

        setOptions(makeAssertionOptions)
        setChallenge(challenge)
        setSent(true)

    } catch (e) {
        console.error(e);
        let msg = "Something went really wrong";
    }   
     
    
}   