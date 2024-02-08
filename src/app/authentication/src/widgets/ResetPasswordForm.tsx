import {createRef} from "preact";
import {apiRegisterKey, apiRegisterOptions, apiResetPassword} from "../shared/(orval)api/auth";
import {formatAsNumber} from "./model/shared";
import {sha256} from "js-sha256";
import {eddsa} from 'elliptic'
import {coerceToBase64Url} from "../shared/lib/helpers";
import Button from "./components/button/Button";

const clearUrlParam = (param: string) => {
    const url = window.location.href;
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete(param);
    const newSearchParams = searchParams.toString();
    const newUrl = url.split('?')[0] + (newSearchParams ? '?' + newSearchParams : '');
    window.history.replaceState({}, document.title, newUrl);
}

const fServerRequest = async (data: any) => {
    const response = await apiRegisterKey(data);
    if (response.data.result === "Success") {
        alert("Password changed successfully!")
        setTimeout(() => location.replace('/'), 2000)
    } else {
        alert("Bad request, look at devtools network")
    }
}

export const ResetPasswordForm = ({
    emailCode,
    handleCancel = () => {}
}: {
    emailCode: string;
    handleCancel: () => void;
}) => {

    const refInputCodeEmail = createRef()
    const refInputSmsEmail = createRef()
    const refInputPassword = createRef()
    const refInputPasswordConfirm = createRef()
    const refInputLogin = createRef()

    const getEmailCode = async () => {

        if (!refInputLogin.current.value) {
            return alert("Enter phone number.")
        }

        refInputCodeEmail.current.value = ""
        clearUrlParam("emailCode")

        const phone = formatAsNumber(refInputLogin.current.value)

        await apiResetPassword({phone}, {
            withCredentials: true,
            headers: {
                'Accept': 'application/json'
            }
        })

        alert("A message with a confirmation code has been sent by email.")
    }


    const onSubmit = async () => {

        const emailCode = refInputCodeEmail.current.value
        const smsCode = refInputSmsEmail.current.value
        const password = refInputPassword.current.value
        const passwordConfirm = refInputPasswordConfirm.current.value
        const phone = refInputLogin.current.value


        if (password !== passwordConfirm) {
            return alert("Password doesn't match.")
        }

        if (!phone) {
            return alert("Enter phone number.")
        }

        if (!emailCode) {
            return alert("Enter email code.")
        }

        const response = await apiRegisterOptions({code: emailCode})

        if (response.data.result?.fido2_options?.challenge) {
            const challenge = response.data.result.fido2_options.challenge
                .replace(/-/g, "+")
                .replace(/_/g, "/")

            const challengeUint8 = Uint8Array.from(atob(challenge), c => c.charCodeAt(0))
            const SHA256Seed = sha256(phone + password + response.data.result.rpId);

            const ec = new eddsa('ed25519');
            const key = ec.keyFromSecret(Buffer.from(SHA256Seed, 'base64'));
            const pub = key.getPublic();
            const signature = key.sign(challengeUint8 as eddsa.Bytes).toBytes();


            console.log(key.verify(challengeUint8 as eddsa.Bytes, signature));
            console.log("Public key (elliptic):");
            console.log(coerceToBase64Url(pub));

            const data = {
                challenge_id: response.data.result.challenge_id,
                code: smsCode,
                public_key: coerceToBase64Url(pub),
                signature: coerceToBase64Url(signature)
            };

            await fServerRequest(data)

        } else {
            alert("Bad request, look at devtools network")
        }
    }

    return <div className="px-24 py-24" style={{width: "auto"}}>
        <div class="row">
            <h1>Reset password</h1>
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
                SMS Code
            </div>
            <div className="col-xs-12">
                <input
                    type={"text"}
                    ref={refInputSmsEmail}
                    value={123456}
                    name='smsCode'
                    disabled={true}
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
            <div className="col-xs-12">
                Confirm Password
            </div>
            <div className="col-xs-12">
                <input
                    type={"text"}
                    ref={refInputPasswordConfirm}
                    name='password'
                />
            </div>
        </div>
        <div className="row mb-16">
            <div className="col-xs-12">
                Email code
            </div>
            <div className="col-xs-12">
                <input
                    readOnly={!!emailCode}
                    value={emailCode}
                    type={"text"}
                    ref={refInputCodeEmail}
                    name='emailCode'
                />
            </div>
        </div>
        <div style={{width: 'auto', display: 'flex', justifyContent: 'space-between'}} className="mb-16">
            <Button onClick={onSubmit}>Submit</Button>
            <Button onClick={getEmailCode}>Get email code</Button>
            <Button secondary onClick={handleCancel}>Back</Button>
        </div>
    </div>
}
