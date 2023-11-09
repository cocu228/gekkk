import Decimal from "decimal.js";
import React from "react";
import {useNavigate} from "react-router-dom";
import { useTranslation } from 'react-i18next';

export const getWithdrawDesc = (miWithdraw: null | number, $const: string) => {
    const {t} = useTranslation();
    return !miWithdraw ? "" : `${t("minimum_amount")} ${new Decimal(miWithdraw).toString()} ${$const}`
}

export const CtnTrxInfo = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();

    return <div className="flex flex-col -mx-4">
    <div className="row mb-3">
        <div className="col w-full flex justify-center">
            <img width={40} height={40} src="/img/icon/SuccessIcon.svg" alt="SuccessIcon"/>
        </div>
    </div>
    <div className="row">
        <div className="col flex items-center">
            <p className="text-center font-semibold leading-7 text-sm">{t("transaction_request_successfully")}
                <br/>{t("please_contact")} <span className="text-blue-400 cursor-pointer"
                                                   onClick={() => navigate("/support")}>{t("our_support")}</span></p>
        </div>
    </div>
    </div>
}
