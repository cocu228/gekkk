import Button from "@/shared/ui/button/Button";
import TransferTableCode from "@/widgets/wallet/transfer/components/transfer-code/table/TransferTableCode";
import Modal from "@/shared/ui/modal/Modal";
import {Modal as MoadlAnt, Switch} from "antd"
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
import Checkbox from "@/shared/ui/checkbox/Checkbox";
import { apiCreateTxCode } from "@/shared/(orval)api";
import { actionResSuccess, getRandomInt32 } from "@/shared/lib";
import { storeListTxCode } from "@/shared/store/tx-codes/list-tx-code";
import useError from "@/shared/model/hooks/useError";
import styles from "../styles.module.scss"
import ModalTitle from "@/shared/ui/modal/modal-title/ModalTitle";

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

    const getListTxCode = storeListTxCode(state => state.getListTxCode);
    const [localErrorHunter, , localErrorInfoBox] = useError();

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
            await getListTxCode()
            setLoading(false)
        }).reject((error) => {
            localErrorHunter(error)
            setLoading(false)
        })

    }

    return !md ? <div>
        <TransferCodeDescription/>
        
        <div className="row mb-5">
            <Button onClick={showModal} size={"xl"} className="w-full !font-medium">{t("create_transfer_code")}</Button>
            <Modal padding onCancel={handleCancel} title={t("create_transfer_code")} open={isModalOpen}>
                <CreateCode/>
            </Modal>
        </div>
        <div className="row mb-2">
            <h3 className="text-lg font-bold">
                {t("unredeemed_codes_info")}
            </h3>
        </div>
        <div className="row">
            <TransferTableCode isOwner/>
        </div>
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
                <span className="text-[10px] text-[#B9B9B5] md:text-[#F8A73E]">
                    *Create a special code with which you can transfer or receive {currency.$const} funds between Gekkoin users with or without your confirmation
                </span>
            }
        </div>
        <div className="row mb-16 md:mb-2">
            {md ? <div className="flex flex-row gap-4">
                <Switch onChange={(e) => setCheckbox(e)}/>
                <div className='flex items-center'>
                    {t("use_confirmation")}
                    <div onClick={()=>{setIsHelpClicked(true)}} className="inline-block relative align-middle w-[14px] ml-1 cursor-help">
                        <img src="/img/icon/UseConfirmation.svg" alt="tooltip"/>
                    </div>
                        <MoadlAnt title={<span className={styles.MainModalTitle}>{t("use_confirmation")}</span>} open={isHelpClicked} onCancel={()=>{setIsHelpClicked(false)}} footer={null}>
                            <hr className="text-[#3A5E66] border-[0px] h-[1px] bg-[#3A5E66]"/>
                            <div className="flex flex-row mt-4 items-center">
                                <img className="mr-2" src="/img/icon/UseConfirmation.svg" alt="tooltip"/>
                                <div className="flex items-center">
                                    <span>{t("when_using_confirmation_mobile")}</span>
                                </div>
                            </div>
                            <div className={styles.ButtonContainerCenter}>
                                <Button
                                    blueTransfer
                                    size="xl"
                                    className="w-full mt-5"
                                    onClick={()=>{setIsHelpClicked(false)}}
                                >
                                    {t("close")}
                                </Button>
                            </div>
                        </MoadlAnt>
                </div>
            </div> : <Checkbox onChange={({target}) => setCheckbox(target.checked)}>
                <div className='flex items-center'>
                    {t("use_confirmation")}
                    <div onClick={()=>{setIsHelpClicked(true)}} className="inline-block relative align-middle w-[14px] ml-1 cursor-help">
                        <img src="/img/icon/HelpIcon.svg" alt="tooltip"/>
                    </div>

                        <MoadlAnt title={t("use_confirmation")} open={isHelpClicked} onCancel={()=>{setIsHelpClicked(false)}} footer={null}>
                            <div>
                                {/* TODO: image */}
                            </div>
                            <div className="flex items-center">
                                <span>{t("when_using_confirmation")}</span>
                            </div>
                            <div className="w-full">
                                <Button
                                    blueTransfer
                                    size="xl"
                                    className="w-full mt-5"
                                    onClick={()=>{setIsHelpClicked(false)}}
                                >
                                    {t("close")}
                                </Button>
                            </div>
                        </MoadlAnt>
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
            <Button greenTransfer disabled={!inputCurr.value.number || (!(validateBalance(currency, navigate, t)(inputCurr.value.number)).validated)} onClick={()=>{
                onCreateCode()
                showModal()
            }} size={"xl"} className="w-full !font-medium">{t("create_transfer_code")}</Button>
            <MoadlAnt 
                footer={null} 
                onCancel={()=>{
                    
                    handleCancel();
                    setNewCode("")
                }} 
                closable={false}
                title={<ModalTitle handleCancel={handleCancel} title={t("confirm_transaction")}/>}
                open={isModalOpen}
            >
                <CreateCode onClose={()=>{handleCancel();setNewCode("")}} inputCurrMobile={inputCurr} code={newCode}/>
            </MoadlAnt>
        </div>
        <div className="row mb-2">
            <h3 className="text-lg font-bold">
                {t("unredeemed_codes_info")}
            </h3>
        </div>
        <div className="row">
            <TransferTableCode isOwner/>
        </div>
    </div>
}

export default CreateTransferCode;
