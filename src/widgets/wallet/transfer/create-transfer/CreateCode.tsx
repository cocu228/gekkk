import Button from '@/shared/ui/button/Button';
import React, {useContext, useState} from "react";
import {CtxWalletCurrency} from "@/widgets/wallet/model/context";
import PercentBtn from "@/shared/ui/percent-btn/PercentBtn";
import InputCurrency from "../../../../shared/ui/input-currency";
import {apiCreateTxCode} from "@/widgets/wallet/transfer/api/create-tx-code";
import Checkbox from "@/shared/ui/checkbox/Checkbox";
import Tooltip from "@/shared/ui/tooltip/Tooltip";
import Decimal from "decimal.js";

const text = "When using confirmation, your funds will be debited from the account as soon as the user applies the code, however, funds will be credited to the recipient only if you confirm transfer. If confirmation does not occur, it will be possible to return the funds only through contacting the Support of both the sender and the recipient of the funds."

const CreateCode = ({handleCancel}) => {

    const [input, setInput] = useState("")
    const [checkbox, setCheckbox] = useState(false)
    const [loading, setLoading] = useState(false)

    const currency = useContext(CtxWalletCurrency),
        {
            name,
            defaultInfoToken: {flags}
        } = currency

    const onCreateCode = async () => {
        setLoading(true)
        const typeTx = checkbox ? 12 : 11
        const res = await apiCreateTxCode(new Decimal(input).toNumber(), currency.const, typeTx)
        setLoading(false)
        handleCancel()
    }

    const onInput = ({target}) => setInput(target.value)

    return (
        <div>
            <div className="row bg-gray-300 -mx-14 px-14 py-4 mb-6">
                <p>Create a special code with which you can transfer EURG funds between Gekkoin users with or without
                    your confirmation.</p>
            </div>
            <div className="row">
                <div className="col">
                    <div className="wrapper w-full mb-10 xl:mb-8 md:mb-7">
                        <div className="row flex justify-between mb-2 md:mb-1 items-center">
                            <div className="wrapper flex text-xs gap-1">
                                <p className="text-gray-400 font-medium md:text-sm sm:text-xs">
                                    I will give
                                </p>
                            </div>

                            <div className="row flex gap-1 text-xs">
                                <PercentBtn>25%</PercentBtn>
                                <PercentBtn>50%</PercentBtn>
                                <PercentBtn>75%</PercentBtn>
                                <PercentBtn>100%</PercentBtn>
                            </div>
                        </div>

                        <InputCurrency disabled={loading} onChange={onInput}/>
                    </div>
                </div>
            </div>
            <div className="row mb-6">
                <Checkbox onChange={({target}) => setCheckbox(target.checked)}>
                    <div className="flex items-center gap-2">
                        <span>Use confirmation</span> <Tooltip text={text}>
                        <div className="inline-block relative align-middle w-[14px] ml-1 cursor-help">
                            <img src="/img/icon/HelpIcon.svg" alt="tooltip"/>
                        </div>
                    </Tooltip>
                    </div>
                </Checkbox>
            </div>
            <div className="row">
                <Button disabled={input === "" || loading} className="w-full" size="xl" onClick={onCreateCode}>Confirm
                </Button>
            </div>

        </div>
    );
};

export default CreateCode;
