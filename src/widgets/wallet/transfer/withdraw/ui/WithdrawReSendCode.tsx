import {useEffect, useMemo, useState} from "react";
// import Decimal from "decimal.js";
import {Timer} from "@/widgets/auth/model/helpers";
import {useSessionStorage} from "usehooks-ts";
// import {TSessionAuth} from "@/widgets/auth/model/types";
// import {signInWithPhoneNumber, RecaptchaVerifier} from 'firebase/auth';
// import {auth} from "@/processes/firebaseConfig";
import {differenceInSeconds} from 'date-fns';

export const WithdrawReSendCode = ({onReSendCode}) => {

    const [{
        dateTimeStart,
    }, setSessionGlobal] = useSessionStorage("session-withdraw-token",
        {
            dateTimeStart: null
        }
    );

    const [state, setState] = useState<null | number>(null)

    const instanceTimer = useMemo(() => new Timer(60, setState, setSessionGlobal), [])

    useEffect(() => {

        if (dateTimeStart) {

            const date1 = new Date(dateTimeStart);
            const date2 = new Date();

            const difference = differenceInSeconds(date2, date1);

            difference <= 60 && instanceTimer.run(60 - difference)

        } else {
            instanceTimer.run()
        }

        return () => instanceTimer.clear()

    }, []);

    const onSendCode = () => {
        instanceTimer.run()
        onReSendCode()
    }



    return <div>
        {state === null ? <a onClick={onSendCode}>Send a repeat message to your phone</a> :
            <span>You can resend the message via: {state}</span>}
    </div>
}
