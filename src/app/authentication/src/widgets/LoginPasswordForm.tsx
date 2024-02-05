import {coerceToBase64Url, formatAsNumber, setAdvCookie} from "./model/shared";
import {eddsa} from 'elliptic'
import {apiLogin, apiLoginOptions} from "../shared/(orval)api/auth";
import {sha256} from "js-sha256";
import {apiGetInfo} from "../shared/(orval)api/gek";
import {createRef} from "preact";
import {setCookieData} from "../shared/lib/cookies-helper";


const fServerRequest = async (data: any) => {

    const response = await apiLogin(data, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'resolution': ("" + screen.width + "x" + screen.height),
            'device_guid': setAdvCookie()
        }
    });

    if (response.data.result === "Success") {
        let {data} = await apiGetInfo({refresh: false});
        if (data.result.length > 0) {
            setCookieData([{key: "accountId", value: data.result[0].account}]);
        } else {
            let {data} = await apiGetInfo({refresh: true});
            setCookieData([{key: "accountId", value: data.result[0].account}]);
        }

        location.replace('/');
    }

}

export const LoginPasswordForm = () => {

    const refInputPassword = createRef()
    const refInputLogin = createRef()


    const onSubmit = async (e) => {

        e.preventDefault()

        // const emailCode = refInputCodeEmail.current.value
        // const smsCode = refInputSmsEmail.current.value
        const password = refInputPassword.current.value
        const phone = formatAsNumber(refInputLogin.current.value)


        const response = await apiLoginOptions({
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': 'origin-list'
            }
        })

        if (response.data.result?.challenge) {
            const challenge = response.data.result.challenge
                .replace(/-/g, "+")
                .replace(/_/g, "/")

            const challengeUint8 = Uint8Array.from(atob(challenge), c => c.charCodeAt(0))

            const SHA256Seed = sha256(phone + password);

            const ec = new eddsa('ed25519');
            const key = ec.keyFromSecret(SHA256Seed);
            const pub = key.getPublic();
            const signature = key.sign(challengeUint8 as eddsa.Bytes).toBytes();

            console.log("verify signature:");
            console.log(key.verify(challengeUint8 as eddsa.Bytes, signature));
            console.log("Public key (elliptic):");
            console.log(coerceToBase64Url(pub));

            const data = {
                challenge_id: response.data.result.challenge_id,
                credential: null,
                public_key: coerceToBase64Url(pub),
                signature: coerceToBase64Url(signature)
            };

            await fServerRequest(data)

        } else {
            alert("Bad request, look at devtools network")
        }
    }

    return <div className="px-24 py-24" style={{width: "400px", borderRadius: "12px", border: "1px solid #000000"}}>
        <div className="row">
            <h1>Login with password</h1>
        </div>
        <div className="row mb-16">
            <div className="col-xs-12">
                Login
            </div>
            <div className="col-xs-12">
                <input
                    type={"text"}
                    ref={refInputLogin}
                    name='phone'
                />
            </div>
        </div>
        <div className="row mb-16">
            <div className="col-xs-12">
                Password
            </div>
            <div className="col-xs-12">
                <input
                    type={"text"}
                    ref={refInputPassword}
                    name='password'
                />
            </div>
        </div>
        <div className="row mb-16">
            <div className="col-xs-6">
                <button onClick={onSubmit}>Submit</button>
            </div>
        </div>
    </div>
}