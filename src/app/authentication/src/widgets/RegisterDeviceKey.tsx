import {apiRegisterOptions} from "../shared/(orval)api/auth";
import {createRef} from "preact";
import {coerceToArrayBuffer} from "../shared/lib/helpers";

export const RegisterDeviceKey = () => {

    // console.log(window.PasswordCredential)
    // console.log(window.FederatedCredential)

    const refInputSmsEmail = createRef();

    const onRegister = async () => {

        const smsCode = refInputSmsEmail.current.value

        const response = await apiRegisterOptions({code: smsCode})

        if (response.data.result?.fido2_options) {

            const data = response.data.result.fido2_options

            const challenge = coerceToArrayBuffer(data.challenge)
            const userId = coerceToArrayBuffer(data.user.id)

            if (data.authenticatorSelection.authenticatorAttachment === null) {
                delete data.authenticatorSelection.authenticatorAttachment
            }

            const credential = await navigator.credentials.create({
                publicKey: {
                    ...data,
                    challenge,
                    //@ts-ignore
                    user: {
                        ...data.user,
                        id: userId
                    }
                }
            });

            console.log(credential)
        } else {
            alert("Bad request, look at devtools network")
        }

    }

    return <>
        <div className="px-24 py-24" style={{width: "400px", borderRadius: "12px", border: "1px solid #000000"}}>
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
            <div class="row">
                <div class="col-xs-12">
                    <button
                        onClick={onRegister}>
                        Register Device Key
                    </button>
                </div>
            </div>
        </div>

    </>
}