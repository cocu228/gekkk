import Button from "@/shared/ui/button/Button";
import TransferTableCode from "@/widgets/wallet/transfer/components/transfer-code/table/TransferTableCode";
import {Modal} from "antd";
import CreateCodeMobile from "./CreateCodeMobile";
import useModal from "@/shared/model/hooks/useModal";
import { useTranslation } from 'react-i18next';
import TransferCodeDescription from "@/widgets/wallet/transfer/components/transfer-code/TransferCodeDescription";
import InputCurrency from "@/shared/ui/input-currency/ui";
import { validateBalance } from "@/shared/config/validators";
import { useContext, useState } from "react";
import { useInputValidateState } from "@/shared/ui/input-currency/model/useInputValidateState";
import { useInputState } from "@/shared/ui/input-currency/model/useInputState";
import { useNavigate } from "react-router-dom";
import { CtxWalletData } from "@/widgets/wallet/transfer/model/context";
import { actionResSuccess, getRandomInt32 } from "@/shared/lib";
import { apiCreateTxCode } from "@/shared/(orval)api";
import { storeListTxCode } from "@/shared/store/tx-codes/list-tx-code";
import useError from "@/shared/model/hooks/useError";
import Tooltip from "@/shared/ui/tooltip/Tooltip";
import Checkbox from "@/shared/ui/checkbox/Checkbox";
import Decimal from "decimal.js";
import TransferTableCodeMobile from "@/widgets/wallet/transfer/components/mobile/table/TransferTableCodeMobile";

const CreateTransferCodeMobile = () => {
    const {t} = useTranslation();
    const {isModalOpen, showModal, handleCancel} = useModal();
    const navigate = useNavigate();
    const {inputCurr, setInputCurr} = useInputState()
    const {setInputCurrValid} = useInputValidateState()
    const currency = useContext(CtxWalletData)
    const [loading, setLoading] = useState(false);
    const [checkbox, setCheckbox] = useState(false);
    const [newCode, setNewCode] = useState("");

    const isInputEmptyOrNull = inputCurr.value.number === 0;
    const isInputMoreThanBalance = inputCurr.value.number > currency.availableBalance.toNumber();
    
    const getListTxCode = storeListTxCode(state => state.getListTxCode);
    const [isHelpClicked, setIsHelpClicked] = useState<boolean>(false)
    const [localErrorHunter, , localErrorInfoBox] = useError();
    
    const onCreateCode = async () => {
        setLoading(true)
        
        const response = await apiCreateTxCode({
            typeTx: checkbox ? 12 : 11,
            timeLimit: false,
            currency: currency.$const,
            amount: inputCurr.value.number,
            clientNonce: getRandomInt32()
        });
        
        actionResSuccess(response).success(async () => {
            setNewCode(response.data.result.code)
            await getListTxCode()
            setLoading(false)
        }).reject((error) => {
            localErrorHunter(error)
            setLoading(false)
        })

    }

    return <div>
        <div className="row">
            <div className="col">
                <div className="wrapper w-full">
                    <InputCurrency.Validator
                        value={inputCurr.value.number}
                        onError={setInputCurrValid}
                        validators={[validateBalance(currency, navigate, t)]}
                    >
                        <InputCurrency.PercentSelector onSelect={setInputCurr}
                                                        header={<span className='text-[#1F3446] text-[12px] font-bold'>{t("amount")}</span>}
                                                        currency={currency}>
                            <InputCurrency.DisplayBalance currency={currency}>
                                <InputCurrency
                                    value={inputCurr.value.string}
                                    currency={currency.$const}
                                    onChange={setInputCurr}
                                />
                            </InputCurrency.DisplayBalance>
                        </InputCurrency.PercentSelector>
                    </InputCurrency.Validator>
                </div>
            </div>
        </div>
        <div className="row mb-4">
            <span className="text-[10px] text-[#B9B9B5]">
                *Create a special code with which you can transfer or receive {currency.$const} funds between Gekkoin users with or without your confirmation
            </span>
        </div>
        <div className="row mb-16">
            <Checkbox onChange={({target}) => setCheckbox(target.checked)}>
                <div className='flex items-center'>
                    {t("use_confirmation")}
                    <div onClick={()=>{setIsHelpClicked(true)}} className="inline-block relative align-middle w-[14px] ml-1 cursor-help">
                        <img src="/img/icon/HelpIcon.svg" alt="tooltip"/>
                    </div>

                        <Modal title={t("use_confirmation")} open={isHelpClicked} onCancel={()=>{setIsHelpClicked(false)}} footer={null}>
                            <div>
                                {/* TODO: image */}
                            </div>
                            <div className="flex items-center">
                                <span>{t("when_using_confirmation")}</span>
                            </div>
                            <div className="w-full">
                                <Button
                                    red
                                    size="xl"
                                    className="w-full mt-5"
                                    onClick={()=>{setIsHelpClicked(false)}}
                                >
                                    Close
                                </Button>
                            </div>
                        </Modal>
                </div>
            </Checkbox>
        </div>
        <div className="row">
            <div className="col">
                <div className="row flex gap-4 text-gray-400 font-medium mb-4 mt-6 text-sm">
                    <div className="col flex flex-col w-[max-content] gap-2">
                        <div className="row">
                            <span>{t("you_will_pay")}</span>
                        </div>
                        <div className="row">
                        <span>
                          {t("you_will_get")}
                        </span>
                        </div>
                        <div className="row">
                            <span>
                          {t("fee")}
                        </span>
                        </div>
                    </div>
                    <div className="col flex flex-col w-[max-content] gap-2">
                        <div className="row flex items-end">
                            <span
                                className="w-full text-start">{inputCurr.value.number} {currency.$const}</span>
                        </div>
                        {/* <div className="row flex items-end">
                            {loading ? "Loading..." : <span
                                className="w-full text-start">{new Decimal(inputCurr.value.number).minus(withdraw_fee).toString()} EUR</span>}
                        </div>
                        <div className="row flex items-end">
                            {loading ? "Loading..." : <span
                                className="w-full text-start">{new Decimal(withdraw_fee).toString()} {currency.$const}</span>}
                        </div> 
                        
                        TODO: Для чего это в переводе другому?
                        */}
                    </div>
                </div>
            </div>
        </div>        
        <div className="row mb-5">
            <Button disabled={!inputCurr.value.number || (!(validateBalance(currency, navigate, t)(inputCurr.value.number)).validated)} onClick={()=>{
                onCreateCode()
                showModal()
            }} size={"xl"} className="w-full !font-medium">{t("create_transfer_code")}</Button>
            <Modal footer={null} onCancel={handleCancel} title={t("your_transfer_code")} open={isModalOpen}>
                <CreateCodeMobile onClose={handleCancel} inputCurr={inputCurr} code={newCode}/>
            </Modal>
        </div>
        <div className="row mb-2">
            <h3 className="text-lg font-bold">
                {t("unredeemed_codes_info")}
            </h3>
        </div>
        <div className="row">
            <TransferTableCodeMobile isOwner/>
        </div>
    </div>
}

export default CreateTransferCodeMobile;
