import {createRef} from "preact";
import {formatAsNumber} from "./model/shared";
import Button from "./components/button/Button";
import {apiResetPassword} from "../shared/(orval)api/auth";

export const CallResetPasswordForm = ({
    handleCancel = () => {}
}: {
    handleCancel: () => void;
}) => {
    const refInputLogin = createRef()
    
    const getEmailCode = async () => {

        if (!refInputLogin.current.value) {
            return alert("Enter phone number.")
        }
        
        const phone = formatAsNumber(refInputLogin.current.value)

        await apiResetPassword({phone}, {
            withCredentials: true,
            headers: {
                'Accept': 'application/json'
            }
        })

        alert("A message with a confirmation code has been sent by email.")
    }

    return <div className="px-24 py-24" style={{width: "auto"}}>
        <div class="row mb-16">
            <h1>Password reset</h1>
            
            <span>
                To start the password reset process for your Gekkard account, please, enter the phone number that you have registered with Gekkard:
                The link will be sent to your email.
            </span>
        </div>
        
        <div className="row mb-16">
            <div className="col-xs-12">
                Phone number
            </div>
            <div className="col-xs-12">
                <input
                    type={"text"}
                    ref={refInputLogin}
                    name='phone'
                />
            </div>
        </div>
        
        <div style={{width: 'auto', display: 'flex', justifyContent: 'space-between'}} className="mb-16">
            <Button onClick={getEmailCode}>Send link</Button>
            
            <Button secondary onClick={handleCancel}>Back</Button>
        </div>
    </div>
}
