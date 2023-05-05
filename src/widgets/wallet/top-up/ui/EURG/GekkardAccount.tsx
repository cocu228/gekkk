import React, {useContext, useState} from 'react';
import PercentBtn from "@/shared/ui/percent-btn/PercentBtn";
import InputCurrency from "../../../../../shared/ui/input-currency";
import Button from "@/shared/ui/button/Button";
import {CtxWalletCurrency} from "@/widgets/wallet/model/context";

const GekkardAccount = () => {

    const currency = useContext(CtxWalletCurrency)
    const [input, setInput] = useState(null)


    return (<div className="wrapper">
        <div className="row mb-8 flex flex-col gap-2 md:gap-1 font-medium info-box-warning">
            <div className="col text-xl font-bold">
                <span>1 EUR = 1 EURG*</span>
            </div>
            <div className="col text-xs">
                <span>* Note:  Standart exchange fee is 1,5%.   If you freeze GKE tokens fee is 0%.          </span>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <InputCurrency
                    value={input}
                    onChange={setInput}
                    currency={{const: currency.const, availableBalance: currency.availableBalance.toNumber()}}/>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <Button className="w-full" size={"xl"}>Buy EURG</Button>
            </div>
        </div>
    </div>)

};

export default GekkardAccount;
