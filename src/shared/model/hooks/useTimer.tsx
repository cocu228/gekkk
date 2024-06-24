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

    return (
        <div className="mt-[10px] text-center md:text-fs12 text-fs14">
            {state === null
                ? <a className={"text-gray-400 underline hover:text-blue-400"} onClick={onSendCode}>{t("resend_one-time_code")}</a>
                : (
                <div className="text-[var(--gek-dark-grey)]">
                  <span>{t("use_code.can_use_code")}</span>
                  <span className="text-[#3A5E66] font-bold">{t("use_code.amount", { amount: state })}</span>
                </div>
            )}
        </div>
    )
})
