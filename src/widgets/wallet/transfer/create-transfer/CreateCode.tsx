import Button from '@/shared/ui/button/Button';
import React, {useContext, useState} from "react";
import {CtxCurrencyData} from "@/widgets/wallet/model/context";
import {apiCreateTxCode} from "@/widgets/wallet/transfer/api/create-tx-code";
import Checkbox from "@/shared/ui/checkbox/Checkbox";
import Tooltip from "@/shared/ui/tooltip/Tooltip";
import Decimal from "decimal.js";
import InputCurrency from "@/shared/ui/input-currency";
import {storeListTxCode} from "@/widgets/wallet/transfer/store/list-tx-code";
import useModal from "@/shared/model/hooks/useModal";
import Modal from "@/shared/ui/modal/Modal";
import CodeTxInfo from "@/widgets/wallet/transfer/CodeTxInfo";

const text = "When using confirmation, your funds will be debited from the account as soon as the user applies the code, however, funds will be credited to the recipient only if you confirm transfer. If confirmation does not occur, it will be possible to return the funds only through contacting the Support of both the sender and the recipient of the funds."

const CreateCode = ({handleCancel}) => {

    const [input, setInput] = useState("")
    const [checkbox, setCheckbox] = useState(false)
    const [newCode, setNewCode] = useState("")
    const [loading, setLoading] = useState(false)

    const getListTxCode = storeListTxCode(state => state.getListTxCode)

    const infoModal = useModal()

    const {asset, wallet} = useContext(CtxCurrencyData)

    const onCreateCode = async () => {

        setLoading(true)
        const typeTx = checkbox ? 12 : 11
        const res = await apiCreateTxCode(new Decimal(input).toNumber(), asset.code, typeTx)

        if (res.data.result?.code) {
            await getListTxCode()
            setNewCode(res.data.result.code)
            infoModal.showModal()

        } else {
            setLoading(false)
            handleCancel()
        }

        setLoading(false)
        handleCancel()

    }

    // const onInput = ({target}) => setInput(target.value)

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
                            currency={{
                                const: asset.code,
                                availableBalance: !wallet ? 0 : wallet.availableBalance.toNumber()
                            }}
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
                <Modal onCancel={infoModal.handleCancel} open={infoModal.isModalOpen}>
                    <CodeTxInfo code={newCode}/>
                </Modal>
            </div>

        </div>
    );
};

export default CreateCode;
