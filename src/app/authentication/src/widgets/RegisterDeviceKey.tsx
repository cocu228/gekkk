import {apiRegisterOptions} from "../shared/(orval)api/auth";
import * as utilNacl from "tweetnacl-util";

export const RegisterDeviceKey = () => {
    // console.log(window.PasswordCredential)
    // console.log(window.FederatedCredential)
    const onRegister = async () => {

        const response = await apiRegisterOptions()
        const data = response.data.result.fido2_options

        const challenge = utilNacl.decodeUTF8(data.challenge)
        const userId = utilNacl.decodeUTF8(data.user.id)

        if (data.authenticatorSelection.authenticatorAttachment === null) {
            delete data.authenticatorSelection.authenticatorAttachment
        }

        //@ts-ignore
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

        // alert(credential)

        console.log(credential)

    }

    return <>
        <div style={{marginTop: "40px"}} className="row text-right mb-4">
            <button className='account-button'
                    tabIndex={0}
                    onClick={onRegister}
                    data-testid="Login">Register Device Key
            </button>
        </div>

    </>
}