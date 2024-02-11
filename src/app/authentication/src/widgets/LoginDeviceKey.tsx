import Button from "./components/button/Button";
import { coerceToBase64Url } from "../shared/lib/helpers";
import { apiLogin, apiLoginOptions } from "../shared/(orval)api/auth";
import { apiGetInfo } from "../shared/(orval)api/gek";
import { setCookieData } from "../shared/lib/cookies-helper";


const fServerRequest = async (credential: any, challengeId: number) => {

    const authData = new Uint8Array(credential.response.authenticatorData),
        clientDataJSON = new Uint8Array(credential.response.clientDataJSON),
        rawId = new Uint8Array(credential.rawId),
        sig = new Uint8Array(credential.response.signature),
        userHandle = new Uint8Array(credential.response.userHandle)

    const data = {
        challenge_id: challengeId,
        credential:
        {
            id: credential.id,
            rawId: coerceToBase64Url(rawId),
            type: credential.type,
            extensions: credential.getClientExtensionResults(),
            response: {
                authenticatorData: coerceToBase64Url(authData),
                clientDataJSON: coerceToBase64Url(clientDataJSON),
                userHandle: userHandle !== null ? coerceToBase64Url(userHandle) : null,
                signature: coerceToBase64Url(sig)
            }
        }
    };

    const response = await apiLogin(data)

    if (response.data.result === "Success") {
        let { data } = await apiGetInfo({ refresh: false });

        if (data.result.length > 0) {
            setCookieData([{ key: "accountId", value: data.result[0].account }]);
        } else {
            let { data } = await apiGetInfo({ refresh: true });
            setCookieData([{ key: "accountId", value: data.result[0].account }]);
        }
        location.replace('/');
    } else {
        alert("Bad request, look at devtools network")
    }


}


export const LoginDeviceKey = () => {

    // console.log(window.PasswordCredential)
    // console.log(window.FederatedCredential)

    const onRegister = async () => {
        const response = await apiLoginOptions({
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': 'origin-list'
            }
        })


        console.log(response.data.result?.challenge_id)

        if (response.data.result?.challenge_id) {

            const challenge = response.data.result.challenge
                .replace(/-/g, "+")
                .replace(/_/g, "/")

            const challengeUint8 = Uint8Array.from(atob(challenge), c => c.charCodeAt(0))

            try {
                const credentials = await navigator.credentials.get({
                    //@ts-ignore
                    publicKey: {
                        ...response.data.result,
                        challenge: challengeUint8
                    }
                })

                await fServerRequest(credentials, response.data.result.challenge_id)

            } catch (err) {
                alert(err)
            }


        }
    }

    return <>    
        <p>Use of a hardware-based security key is fast and easy. <a href={"https://fidoalliance.org/fido2/"}>More about FIDO2.</a></p>
        <Button
            onClick={onRegister}>
            Login with Device Key
        </Button>
    </>
}
