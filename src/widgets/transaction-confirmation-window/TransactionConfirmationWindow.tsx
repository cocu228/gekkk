import {CtxNeedConfirm} from "@/processes/errors-provider-context";
import {useContext} from "react";

export const TransactionConfirmationWindow = () => {
    const data = useContext(CtxNeedConfirm)


    console.log(data.status)
    console.log(data.response)

    return <>

    </>
}
