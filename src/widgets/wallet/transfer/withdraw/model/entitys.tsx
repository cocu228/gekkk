import Decimal from "decimal.js";
import React from "react";

export const getWithdrawDesc = (miWithdraw: null | number, $const: string) => {
    return !miWithdraw ? "" : `Minimum amount is ${new Decimal(miWithdraw).toString()} ${$const}`
}

export const CtnTrxInfo = <div className="flex flex-col">
    <div className="row mb-3">
        <div className="col w-full flex justify-center">
            <img width={40} height={40} src="/img/icon/SuccessIcon.svg" alt="SuccessIcon"/>
        </div>
    </div>
    <div className="row">
        <div className="col flex items-center">
            <p className="text-center font-bold leading-6 text-sm">Your transaction request has been
                successfully added to the queue. The
                transaction may take a few
                minutes to complete.
                If it’s not, please, contact <a className="text-blue-400" href="/support">our support</a></p>
        </div>
    </div>
</div>
