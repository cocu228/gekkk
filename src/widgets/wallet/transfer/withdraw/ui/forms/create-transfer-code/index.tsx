import Button from "@/shared/ui/button/Button";
import TransferTableCode from "@/widgets/wallet/transfer/components/transfer-code/table/TransferTableCode";
import CreateCode from "./CreateCode";
import useModal from "@/shared/model/hooks/useModal";
import { useTranslation } from 'react-i18next';
import TransferCodeDescription from "@/widgets/wallet/transfer/components/transfer-code/TransferCodeDescription";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import InputCurrency from "@/shared/ui/input-currency/ui";
import { useNavigate } from "react-router-dom";
import { useInputState } from "@/shared/ui/input-currency/model/useInputState";
import { useContext, useState } from "react";
import { CtxWalletData } from "@/widgets/wallet/transfer/model/context";
import { useInputValidateState } from "@/shared/ui/input-currency/model/useInputValidateState";
import { validateBalance } from "@/shared/config/validators";
import { apiCreateTxCode } from "@/shared/(orval)api";
import { actionResSuccess, getRandomInt32 } from "@/shared/lib";
import { storeListTxCode } from "@/shared/store/tx-codes/list-tx-code";
import useError from "@/shared/model/hooks/useError";
import styles from "../styles.module.scss"
import { IconApp } from "@/shared/ui/icons/icon-app";
import { Switch } from "@/shared/ui/!switch";
import { ModalC } from "@/shared/ui/!modal";

import { CtxRootData } from "@/processes/RootContext";
import Checkbox from "@/shared/ui/checkbox/Checkbox";

const CreateTransferCode = () => {
    const {t} = useTranslation();
    const {isModalOpen, showModal, handleCancel} = useModal();
    const {md} = useBreakpoints()
    


    const navigate = useNavigate();
    const {inputCurr, setInputCurr} = useInputState()
    const {setInputCurrValid} = useInputValidateState()
    const currency = useContext(CtxWalletData)
    const [loading, setLoading] = useState(false);
    const [checkbox, setCheckbox] = useState(false);
    const [newCode, setNewCode] = useState("");
    const {setRefresh} = useContext(CtxRootData);
    const {getListTxCode, listTxCode} = storeListTxCode(state => state);

    const [isHelpClicked, setIsHelpClicked] = useState<boolean>(false)

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
            setRefresh();
            await getListTxCode()
            setLoading(false)
        }).reject((error) => {
            setLoading(false)
        })
    }

    const switchHandler = () => {
        setCheckbox(!checkbox)
    }

    return !md ? <div>
        <TransferCodeDescription/>
        
        <div className="row mb-5">
            <Button onClick={showModal} size="lg" className="w-full">{t("create_transfer_code")}</Button>
            <ModalC
                active={isModalOpen} 
                onClose={handleCancel} 
                title={<span className={styles.MainModalTitle}>{t("create_transfer_code")}</span>}
            >
                <CreateCode/>
            </ModalC>
        </div>
        {listTxCode.length > 0 && <>
            <div className="row mb-2">
                <h3 className="text-lg font-bold">
                    {t("unredeemed_codes_info")}
                </h3>
            </div>
            <div className="row">
                <TransferTableCode isOwner/>
            </div>
        </>}
    </div> : <div>
        <div className="row">
            <div className="col">
                <div className="wrapper w-full">
                    <InputCurrency.Validator
                        value={inputCurr.value.number}
                        onError={setInputCurrValid}
                        validators={[validateBalance(currency, navigate, t)]}
                    >
                        <InputCurrency.PercentSelector onSelect={setInputCurr}
                                                        header={<span className='text-[#1F3446] text-[12px] font-semibold'>{t("amount")}:</span>}
                                                        currency={currency}>
                            <InputCurrency.DisplayBalance currency={currency}>
                                <InputCurrency
                                    transfers
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
            {!(!!inputCurr.value.number) &&
                <span className="text-[10px] text-[var(--gek-orange)]">
                    *Create a special code with which you can transfer or receive {currency.$const} funds between Gekkoin users with or without your confirmation
                </span>
            }
        </div>
        <div className="row mb-16 md:mb-2">
            {md ? <div className="flex flex-row gap-4">
                <Switch defaultCheked={checkbox} onChange={switchHandler} />
                <div className='flex items-center'>
                    <span className="text-[12px] mr-4">{t("use_confirmation")}</span>
                    <div onClick={()=>{setIsHelpClicked(true)}} className="inline-block relative align-middle w-[14px] ml-1 cursor-help">
                        <IconApp code="t27" color="#2BAB72" size={14} />
                    </div>
                        <ModalC active={isHelpClicked} onClose={()=> setIsHelpClicked(false)} title={<span className={styles.MainModalTitle}>{t("use_confirmation")}</span>}>
                            <hr className="text-[#3A5E66] border-[0px] h-[1px] bg-[#3A5E66]"/>
                            <div className="flex flex-row mt-4 items-center">
                                <IconApp code="t27" className="mr-2" color="#2BAB72" size={14} />
                                <div className="flex items-center">
                                    <span>{t("when_using_confirmation_mobile")}</span>
                                </div>
                            </div>
                            <div className={styles.ButtonContainerCenter}>
                                <Button
                                    size="lg"
                                    color="blue"
                                    className="w-full mt-5"
                                    onClick={()=>{setIsHelpClicked(false)}}
                                >
                                    {t("close")}
                                </Button>
                            </div>
                        </ModalC>
                </div>
            </div> : <Checkbox onChange={({target}) => setCheckbox(target.checked)}>
                <div className='flex items-center'>
                    {t("use_confirmation")}
                    <div onClick={()=>{setIsHelpClicked(true)}} className="inline-block relative align-middle w-[14px] ml-1 cursor-help">
                        <img src="/img/icon/HelpIcon.svg" alt="tooltip"/>
                    </div>

                        <ModalC title={t("use_confirmation")} active={isHelpClicked} onClose={()=>{setIsHelpClicked(false)}}>
                            <div>
                                {/* TODO: image */}
                            </div>
                            <div className="flex items-center">
                                <span>{t("when_using_confirmation")}</span>
                            </div>
                            <div className="w-full">
                                <Button
                                    size="lg"
                                    color="blue"
                                    className="w-full mt-5"
                                    onClick={()=>{setIsHelpClicked(false)}}
                                >
                                    {t("close")}
                                </Button>
                            </div>
                        </ModalC>
                </div>
            </Checkbox>}
                
        </div>
        {!md ? <div className="row">
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
                    </div>
                </div>
            </div>
        </div> : <div className={styles.PayInfo}>
                <div className={styles.PayInfoCol}>
                    <div className="row">
                        <span className={styles.PayInfoText}>{t("you_will_pay")}:</span>
                    </div>
                    <div className="row">
                    <span className={styles.PayInfoText}>
                        {t("you_will_get")}:
                    </span>
                    </div>
                    <div className="row">
                        <span className={styles.PayInfoTextFee}>
                            {t("fee")}:
                        </span>
                    </div>
                </div>
                <div className={styles.PayInfoColValue}>

                    <div className={styles.PayInfoCol}>
                        <div className={styles.PayInfoValueFlex}>
                            <span
                                className={styles.PayInfoValueFlexText}>{inputCurr.value.number}</span>
                        </div>
                        <div className={styles.PayInfoValueFlex}>
                            <span
                                className={styles.PayInfoValueFlexText}
                            >
                                {inputCurr.value.number}
                            </span>
                        </div>
                        <div className={styles.PayInfoValueFlex}>
                            <span
                                className={styles.PayInfoValueFlexTextFee}
                            >
                                -
                            </span>
                        </div>
                    </div>
                    
                    <div className={styles.PayInfoCol}>
                        <span className={styles.PayInfoValueFlexTextCurrency}>
                            {currency.$const}
                        </span>
                        <span className={styles.PayInfoValueFlexTextCurrency}>
                            {currency.$const}
                        </span>
                        <span className={styles.PayInfoValueFlexTextFee}>
                            {currency.$const}
                        </span>
                    </div>
                </div>
                
            </div>}     
        <div className={styles.ButtonContainerCenter}>
            <Button disabled={!inputCurr.value.number || (!(validateBalance(currency, navigate, t)(inputCurr.value.number)).validated)} onClick={()=>{
                onCreateCode()
                showModal()
            }} size="lg" className="w-full">{t("create_transfer_code")}</Button>
            <ModalC 
                onClose={()=>{
                    handleCancel();
                    setNewCode("")
                }} 
                title={<span className={styles.MainModalTitle}>{t("confirm_transaction")}</span>}
                active={isModalOpen}
            >
                <CreateCode onClose={()=>{handleCancel();setNewCode("")}} inputCurrMobile={inputCurr} code={newCode}/>
            </ModalC>
        </div>
        {listTxCode.length > 0 && <>
            <div className="row mb-2">
                <h3 className="text-lg font-bold">
                    {t("unredeemed_codes_info")}
                </h3>
            </div>
            <div className="row">
                <TransferTableCode isOwner/>
            </div>
        </>}
    </div>
}

export default CreateTransferCode;
