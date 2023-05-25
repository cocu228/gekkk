import Button from '@/shared/ui/button/Button';
import React, {useContext, useState} from "react";
import {CtxWalletData} from "@/widgets/wallet/model/context";
import {apiCreateTxCode} from "@/widgets/wallet/transfer/api/create-tx-code";
import Checkbox from "@/shared/ui/checkbox/Checkbox";
import Tooltip from "@/shared/ui/tooltip/Tooltip";
import Decimal from "decimal.js";
import InputCurrency from "@/shared/ui/input-currency";
import {storeListTxCode} from "@/widgets/wallet/transfer/store/list-tx-code";
import useModal from "@/shared/model/hooks/useModal";
import Modal from "@/shared/ui/modal/Modal";
import CodeTxInfo from "@/widgets/wallet/transfer/CodeTxInfo";
import {actionResSuccess} from "@/shared/lib/helpers";
import useError from "@/shared/model/hooks/useError";

const text = "When using confirmation, your funds will be debited from the account as soon as the user applies the code, however, funds will be credited to the recipient only if you confirm transfer. If confirmation does not occur, it will be possible to return the funds only through contacting the Support of both the sender and the recipient of the funds."

const CreateCode = () => {

    const [input, setInput] = useState("")
    const [checkbox, setCheckbox] = useState(false)
    const [newCode, setNewCode] = useState("")
    const [loading, setLoading] = useState(false)

    const getListTxCode = storeListTxCode(state => state.getListTxCode)

    const {showModal, handleCancel, isModalOpen} = useModal()
    const [localErrorHunter, , localErrorInfoBox] = useError()

    const wallet = useContext(CtxWalletData)

    const onCreateCode = async () => {

        setLoading(true)

        const typeTx = checkbox ? 12 : 11
        const response = await apiCreateTxCode(new Decimal(input).toNumber(), wallet.currency, typeTx)

        actionResSuccess(response).success(async () => {
            await getListTxCode()
            setNewCode(response.data.result.code)
        }).reject((error) => {
            localErrorHunter(error)
        })
        showModal()
        setLoading(false)

    }

    return (
        <div>
            <div className="row bg-gray-300 -mx-14 px-14 py-4 mb-6">
                <p>Create a special code with which you can transfer EURG funds between Gekkoin users with or without
                    your confirmation.</p>
            </div>
            <div className="row">
                <div className="col">
                    <div className="wrapper w-full mb-10 xl:mb-8 md:mb-7">
                        <InputCurrency
                            value={input}
                            disabled={loading} onChange={setInput}
                            currencyData={wallet}
                        />
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
                <Modal onCancel={handleCancel} open={isModalOpen}>
                    {localErrorInfoBox ? localErrorInfoBox : <CodeTxInfo code={newCode}/>}
                </Modal>
            </div>

        </div>
    );
};

export default CreateCode;
