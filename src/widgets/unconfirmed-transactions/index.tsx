import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import React, {useContext, useEffect, useState} from "react";
import {
    apiHistoryTransactions,
    apiUpdatePartnerInfo,
    IResHistoryTransactions
} from "@/shared/api";
import Loader from "@/shared/ui/loader";
import useError from "@/shared/model/hooks/useError";
import {actionResSuccess} from "@/shared/lib/helpers";
import {CtxRootData} from "@/app/RootContext";
import InfoBox from "@/widgets/info-box";
import {useNavigate} from "react-router-dom";

export const UnconfirmedTransactions = (props) => {

    const [state, setState] = useState(false)
    const {refreshKey} = useContext(CtxRootData)
    const navigate = useNavigate()


    useEffect(() => {
        (async () => {
            const response = await apiHistoryTransactions(
                null,
                null,
                null,
                [3],
                null,
                10
            )

            actionResSuccess(response).success(() => {
                const {result} = response.data
                setState(result.some(item => item.partner_info === ""))
            })

        })()
    }, [refreshKey])

    return <div className="negative-margin-content">
        <InfoBox><span className="font-semibold">You have unconfirmed transactions. Please enter the sender's name <a
            className="text-blue-400 underline"
            href="#History" onClick={() => navigate("/")}>here.</a></span></InfoBox>
    </div>
}

export default UnconfirmedTransactions