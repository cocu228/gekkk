import {memo, useEffect, useMemo, useState} from "react";
import {Timer} from "@/widgets/auth/model/helpers";

function isPromise(obj: unknown) {
    return obj instanceof Promise;
}


type TProps = { onAction: () => void | Promise<unknown> }
export default memo(({onAction}: TProps) => {

    const [state, setState] = useState<null | number>(null)

    const instanceTimer = useMemo(() => new Timer(setState), [])

    useEffect(() => {
        return () => instanceTimer.clear()
    }, []);

    const onSendCode = async () => {

        await onAction();

        console.log("await")

        instanceTimer.run();
    }

    return <div>
        {state === null ? <a className={"text-blue-400"} onClick={onSendCode}>Resend the code again</a> :
            <span className={"text-orange"}>You can resend the code for: {state} seconds</span>}
    </div>
})
