import {memo, useEffect, useMemo, useState} from "react";
import {Timer} from "@/widgets/(no-usages)auth/model/helpers";
import { useTranslation } from 'react-i18next';

function isPromise(obj: unknown) {
    return obj instanceof Promise;
}


type TProps = { onAction: () => void | Promise<unknown> }
export default memo(({onAction}: TProps) => {

    const {t} = useTranslation();
    const [state, setState] = useState<null | number>(null)

    const instanceTimer = useMemo(() => new Timer(setState), [])

    useEffect(() => {
        return () => instanceTimer.clear()
    }, []);

    const onSendCode = async () => {
        await onAction();
        instanceTimer.run();
    }

    return <div>
        {state === null
            ? <a className={"text-gray-400 underline hover:text-blue-400"} onClick={onSendCode}>{t("resend_one-time_code")}</a>
            : <span className="text-gray-400">{ t("can_use_code", {amount: state})}</span>}
    </div>
})
