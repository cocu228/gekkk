import Button from '@/shared/ui/button/Button';
import React, {useContext, useState} from "react";
import {CtxWalletData} from "@/widgets/wallet/model/context";
import {apiCreateTxCode} from "@/widgets/wallet/transfer/api/create-tx-code";
import Checkbox from "@/shared/ui/checkbox/Checkbox";
import Tooltip from "@/shared/ui/tooltip/Tooltip";
import Decimal from "decimal.js";
import {storeListTxCode} from "@/widgets/wallet/transfer/store/list-tx-code";
import CodeTxInfo from "@/widgets/wallet/transfer/CodeTxInfo";
import {actionResSuccess} from "@/shared/lib/helpers";
import useError from "@/shared/model/hooks/useError";
import Loader from "@/shared/ui/loader";

const text = "When using confirmation, your funds will be debited from the account as soon as the user applies the code, however, funds will be credited to the recipient only if you confirm transfer. If confirmation does not occur, it will be possible to return the funds only through contacting the Support of both the sender and the recipient of the funds."

const CreateCode = () => {

    const [input, setInput] = useState("")
    const [checkbox, setCheckbox] = useState(false)
    const [newCode, setNewCode] = useState("")
    const [loading, setLoading] = useState(false)

    const getListTxCode = storeListTxCode(state => state.getListTxCode)

    const [localErrorHunter, , localErrorInfoBox] = useError()

    const currency = useContext(CtxWalletData)

    const onCreateCode = async () => {

        setLoading(true)

        const typeTx = checkbox ? 12 : 11
        const response = await apiCreateTxCode(new Decimal(input).toNumber(), currency.$const, typeTx)

        actionResSuccess(response).success(async () => {
            setNewCode(response.data.result.code)
            await getListTxCode()
            setLoading(false)
        }).reject((error) => {
            localErrorHunter(error)
            setLoading(false)
        })

    }

    return (loading ? <Loader/> : newCode ? <CodeTxInfo code={newCode}/> :
            <>
                <div className="row bg-gray-300 -mx-14 px-14 py-4 mb-6">
                    <p>Create a special code with which you can transfer EURG funds between Gekkoin users with or
                        without
                        your confirmation.</p>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="wrapper w-full mb-10 xl:mb-8 md:mb-7">
                            ***InputCurrencyPercented***
                        </div>
                    </div>
                </div>
                <div className="row mb-6">
                    <Checkbox onChange={({target}) => setCheckbox(target.checked)}>
                        <div className='flex items-center'>
                            Use confirmation

                            <div className="flex items-center">
                                <Tooltip text={text}>
                                    <div className="inline-block relative align-middle w-[14px] ml-1 cursor-help">
                                        <img src="/img/icon/HelpIcon.svg" alt="tooltip"/>
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                    </Checkbox>
                </div>
                <div className="row">
                    <Button disabled={input === "" || loading} className="w-full" size="xl" onClick={onCreateCode}>Confirm
                    </Button>
                </div>
                {localErrorInfoBox && <div className="row mt-4">{localErrorInfoBox}</div>}
            </>
    );
};

export default CreateCode;
