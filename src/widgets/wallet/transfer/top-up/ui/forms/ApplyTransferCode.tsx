import Input from "@/shared/ui/input/Input";
import Button from "@/shared/ui/button/Button";
import {useContext, useEffect, useState} from "react";
import TransferTableCode from "@/widgets/wallet/transfer/components/transfer-code/table/TransferTableCode";
import {apiApplyCode} from "@/shared/(orval)api/gek";
import {storeListTxCode} from "@/shared/store/tx-codes/list-tx-code";
import useModal from "@/shared/model/hooks/useModal";
import Modal from "@/shared/ui/modal/Modal";
import CodeTxInfo from "@/widgets/wallet/transfer/components/transfer-code/CodeTxInfo";
import Loader from "@/shared/ui/loader";
import {CtxRootData} from "@/processes/RootContext";
import {actionResSuccess} from "@/shared/lib/helpers";
import useError from "@/shared/model/hooks/useError";
import { useTranslation } from 'react-i18next';
import {TxCodesOut} from "@/shared/(orval)api/gek/model";
import TransferCodeDescription from "@/widgets/wallet/transfer/components/transfer-code/TransferCodeDescription";
import ModalTitle from "@/shared/ui/modal/modal-title/ModalTitle";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import { validateInput } from "@/shared/ui/input/model/helpers";

const ApplyTransferCode = () => {
    const {t} = useTranslation();
    const {showModal, isModalOpen, handleCancel} = useModal()
    const {setRefresh} = useContext(CtxRootData)
    const [input, setInput] = useState("")
    const getListTxCode = storeListTxCode(state => state.getListTxCode)
    const [loading, setLoading] = useState(false)
    const [infoCode, setInfoCode] = useState<TxCodesOut>(null)
    const {md} = useBreakpoints()

    const [localErrorHunter, , applyTxCodeInfoBox, localErrorClear, localIndicatorError] = useError()

    useEffect(() => {

        if (!!infoCode || localIndicatorError) {
            setInfoCode(null)
        }
    }, [isModalOpen])

    const onBtnApply = async () => {

        setLoading(true)

        const response = await apiApplyCode({
            code: input
        });

        actionResSuccess(response).success(async () => {
            setRefresh()
            handleCancel()
            localErrorClear()
            setInput("")
            await getListTxCode()
        }).reject((error) => {
            // handleCancel()
            localErrorHunter(error)
        })


        setLoading(false)

    }

    return <div>
        <TransferCodeDescription/>
        
        <div className="row flex gap-10 md:gap-[5vw]">
            <div className="col flex items-center w-3/5">
                {!md ? <Input 
                    value={input} 
                    disabled={loading}
                    wrapperClassName={"w-full"}
                    allowDigits
                    onChange={({target}) => setInput(target.value)}
                    placeholder={t("enter_top_up_code")} type={"text"}
                />
                :
                    <div className="md:h-[43px] w-full border-solid border-[2px] flex justify-center overflow-hidden border-[var(--gek-green)] rounded-[8px]">
                        <input
                            value={input}
                            disabled={loading}
                            onChange={(event) => {
                                if(validateInput(event, true, false)){
                                    setInput(event.target.value)
                                }
                            }}
                            className="outline-none text-[12px] text-[var(--gek-additional)] h-full bg-[transparent] w-[90%] placeholder:text-center placeholder:text-[10px] placeholder:text-[var(--gek-light-grey)]" 
                            placeholder={`-${t("enter_top_up_code").toLowerCase()}-`} 
                            type="text"
                         />
                    </div>
                }
            </div>
            <div className="col h-inherit flex items-center w-2/5">
                {!md ? <Button disabled={input === "" || loading} onClick={showModal}
                        size={"xl"}
                        className={"w-full  !h-full !font-medium"}>
                    {t("apply")}
                </Button>
                :
                    <button
                        disabled={input === "" || loading}
                        onClick={showModal}
                        className="bg-[var(--gek-green)] cursor-pointer w-full h-[42px] rounded-[8px]"
                    >
                        <span 
                            className="font-bold text-[white] text-[14px] "
                        >
                            {t("apply")}
                        </span>
                    </button>
                }

                <Modal closable={false} padding title={<ModalTitle handleCancel={handleCancel} title={infoCode ? t("code_applied_successfully") : t("transfer_code_info")}/>}
                           onCancel={handleCancel} open={isModalOpen}>

                        {loading ? <Loader/> : !infoCode ?
                            <CodeTxInfo applyTxCodeInfoBox={applyTxCodeInfoBox} code={input} onBtnApply={onBtnApply}/> :
                            <>
                                <div className="row mb-6">
                                    <div className="col">
                                        <p className="text-sm">{t("your_account_has_been_topped")}</p>
                                    </div>
                                </div>
                                <div className="row mb-12">
                                    <div className="col">
                                        <p className="text-xl text-green">{infoCode.amount} {infoCode.currency}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <Button className="w-full" size={"xl"} onClick={() => {
                                            handleCancel()
                                        }}>{t("done")}</Button>
                                    </div>
                                </div>
                            </>}
                    </Modal>
            </div>
        </div>
        <div className="row mt-10">
            <TransferTableCode/>
        </div>
    </div>

}

export default ApplyTransferCode
