import {CtxNeedConfirm} from "@/processes/errors-provider-context";
import {useContext} from "react";

export const TransactionConfirmationWindow = () => {
    const {data, setSuccess} = useContext(CtxNeedConfirm)


    console.log(data)
    console.log(setSuccess)

    return <>

    </>
}
