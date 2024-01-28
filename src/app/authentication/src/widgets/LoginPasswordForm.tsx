import {useState} from 'preact/hooks'
import {formatAsNumber} from "./model/shared";
//@ts-ignore
import elliptic from 'elliptic'
import {setAdvCookie} from "./model/shared";
import {coerceToBase64Url} from "./model/shared";
import {apiLogin, apiLoginOptions} from "../shared/(orval)api/auth";
//@ts-ignore
import sha256 from "crypto-js/sha256";
import {apiGetInfo} from "../shared/(orval)api/gek";


const setCookieData = (cookieData: { key: string; value: string; expiration?: number | undefined }[]): void => {
    cookieData.forEach(({key, value, expiration}) => {
        const encodedValue: string = encodeURIComponent(value);
        let cookieString: string = `${key}=${encodedValue}`;

        if (expiration) {
            const expiryDate = new Date();
            expiryDate.setSeconds(expiryDate.getSeconds() + expiration);
            const expires = expiryDate.toUTCString();
            cookieString += `; expires=${expires}`;
        }

        document.cookie = cookieString + '; path=/';
    });
};


export const LoginPasswordForm = () => {

    const [_password, _setPassword] = useState("")
    const [_phone, _setPhone] = useState("")


    const onFinish = async (e) => {
        e.preventDefault()


        const phone = formatAsNumber(_phone);

        const response = await apiLoginOptions({
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': 'origin-list'
            }
        })

        const challenge = response.data.result.challenge.replace(/-/g, "+").replace(/_/g, "/");

        const uintChallenge = Uint8Array.from(atob(challenge), c => c.charCodeAt(0));

        const passKey = sha256(phone + _password + "gekkard.com"); //makeAssertionOptions.fido2_options.rp.id);

        const EdDSA = elliptic.eddsa;
        const ec = new EdDSA('ed25519');
        const key = ec.keyFromSecret(passKey);
        const pub = key.getPublic();
        const signature = key.sign(uintChallenge).toBytes();

        console.log(key.verify(uintChallenge, signature));

        const data = {
            challenge_id: response.data.result.challenge_id,
            credential: null,
            public_key: coerceToBase64Url(pub),
            signature: coerceToBase64Url(signature)
        };

        try {
            //@ts-ignore
            let response = await apiLogin(data, {
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
            }

            location.reload();

        } catch (e) {
            alert("Request to server failed " + e);
            throw e;
        }
    }

    return <div>
        <p className="typography-b2" style={{
            color: 'var(--new-pale-blue)',
            marginBottom: '36px',

        }}>
            Log in using the form below
        </p>
        <div style={{
            background: 'var(--new-FFFFFF)',
            padding: '24px 36px 24px 36px',
            borderRadius: '8px 8px 0px 0px',
            boxShadow: 'var(--new-active-account-shadow)'
        }}>
        </div>
        <form autoComplete={"on"} onSubmit={onFinish}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid var(--new-dark-grey)',
                gap: '12px',
                paddingBottom: '10px',
                overflow: 'auto'
            }}>
                <div style={{flex: '0 0 auto'}}>
                    <div className='typography-b3' style={{color: 'var(--new-dark-blue)'}}>
                        Phone number
                    </div>
                    <div style={{height: '36px', display: 'flex', alignItems: 'center'}}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '3px 12px 3px 12px',
                            borderRadius: '10px',
                            background: 'var(--new-pale-grey)',
                            color: 'var(--new-pale-blue)',
                            cursor: 'pointer',

                        }}>

                        </div>

                    </div>
                </div>
                <div style={{flex: '0 0 auto'}}>
                    <div className='typography-b3' style={{color: 'var(--new-dark-blue)'}}>
                        <br></br>
                    </div>

                    <input
                        //@ts-ignore
                        onChange={({target}) => _setPhone(target.value)}
                        name='phone'
                        disabled={false}
                    />
                </div>


            </div>
            <div>
                <div className='typography-b3' style={{color: 'var(--new-dark-blue)'}}>
                    Password
                </div>
                <input disabled={false}
                    //@ts-ignore
                       onChange={({target}) => _setPassword(target.value)}
                       placeholder="Password"
                />
            </div>

            <div className="row text-right mb-4">
                <button className='account-button'
                        tabIndex={0}
                        data-testid="Login">Login
                </button>
            </div>

        </form>
    </div>
}