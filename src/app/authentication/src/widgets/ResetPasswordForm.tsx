import {useState} from "preact/hooks";
import {apiRegisterOptions, apiResetPassword} from "../shared/(orval)api/auth";
import {formatAsNumber} from "./model/shared";

export const ResetPasswordForm = () => {

    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")

    console.log(password)

    const onSubmit = () => {
        const response = apiResetPassword({phone: formatAsNumber(phone)}, {
            withCredentials: true,
            headers: {
                'Accept': 'application/json'
            }
        })

        const res = apiRegisterOptions({code: "123456"})

        console.log(res)

        console.log(response)
    }

    return <>
        <div style={{flex: '0 0 auto'}}>
            <div className='typography-b3' style={{color: 'var(--new-dark-blue)'}}>
                <br></br>
            </div>
            <input
                //@ts-ignore
                onChange={({target}) => setPhone(target.value)}
                name='phone'
                disabled={false}
            />
        </div>
        <div>
            <div className='typography-b3' style={{color: 'var(--new-dark-blue)'}}>
                Password
            </div>
            <input disabled={false}
                //@ts-ignore
                   onChange={({target}) => setPassword(target.value)}
                   placeholder="Password"
            />
        </div>
        <div>
            <div className='typography-b3' style={{color: 'var(--new-dark-blue)'}}>
                Password
            </div>
            <input disabled={false}
                //@ts-ignore
                   onChange={({target}) => setPassword(target.value)}
                   placeholder="Password"
            />
        </div>
        <div className="row text-right mb-4">
            <button className='account-button'
                    tabIndex={0}
                    onClick={onSubmit}
                    data-testid="Login">Change password
            </button>
        </div>
    </>
}