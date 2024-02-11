import {createRef} from "preact";
import styles from './style.module.css';
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

    return <div className={styles.CallReset} style={{width: "auto"}}>
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
