import { useCallback, useContext, useState, memo, useRef } from "react";
import { CtxWalletNetworks, CtxWalletData } from "@/widgets/wallet/transfer/model/context";
import Button from "@/shared/ui/button/Button";
import { apiCreateWithdraw } from "@/shared/(orval)api/gek";
import Decimal from "decimal.js";
import { actionResSuccess, getRandomInt32, isNull, uncoverResponse } from "@/shared/lib/helpers";
import Input from "@/shared/ui/input/Input";
import Form from '@/shared/ui/form/Form';
import FormItem from '@/shared/ui/form/form-item/FormItem';
import { codeMessage } from "@/shared/config/message";
import useMask from "@/shared/model/hooks/useMask";
import { MASK_CODE } from "@/shared/config/mask";
import Loader from "@/shared/ui/loader";
import { CtxRootData } from "@/processes/RootContext";
import useError from "@/shared/model/hooks/useError";
import { getChosenNetwork } from "@/widgets/wallet/transfer/model/helpers";
import Timer from "@/shared/model/hooks/useTimer";
import InfoBox from "@/widgets/info-box";
import { IWithdrawFormCryptoState } from "@/widgets/wallet/transfer/withdraw/ui/forms/crypto/WithdrawFormCrypto";
import { IUseInputState } from "@/shared/ui/input-currency/model/useInputState";
import { useForm } from "antd/es/form/Form";
import { CtxModalTrxInfo } from "@/widgets/wallet/transfer/withdraw/model/context";
import { CtnTrxInfo } from "@/widgets/wallet/transfer/withdraw/model/entitys";
import { CreateWithdrawIn } from "@/shared/(orval)api/gek/model";
import { formatAsNumber } from "@/shared/lib/formatting-helper";
import { SignTX } from "./signTX";
import { $axios } from "@/shared/lib/(orval)axios";
import { useTranslation } from "react-i18next";
import { useBreakpoints } from "@/app/providers/BreakpointsProvider";
import StatusModalSuccess from "../../modals/StatusModalSuccess";
import StatusModalError from "../../modals/StatusModalError";
import WarningIcon from "@/assets/MobileModalWarningIcon.svg?react"
import styles from "../styles.module.scss"

const initStageConfirm = {
    status: null,
    txId: null,
    fee: null,
    autoInnerTransfer: false,
    code: null
}

type TProps = IWithdrawFormCryptoState & {
    amount: IUseInputState["value"]["number"],
    handleCancel: () => void
}

const WithdrawConfirmCrypto = memo(({
    address,
    amount,
    recipient,
    description,
    handleCancel,
}: TProps) => {
    const {
        networkTypeSelect,
        networksForSelector,
        tokenNetworks
    } = useContext(CtxWalletNetworks)

    const { label } = networksForSelector.find(it => it.value === networkTypeSelect)
    const [form] = useForm();
    const {
        id,
        percent_fee = 0,
        withdraw_fee = 0,
    } = getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {}

    const { $const } = useContext(CtxWalletData)
    const { setRefresh } = useContext(CtxRootData)
    const setContent = useContext(CtxModalTrxInfo)
    const {md} = useBreakpoints()

    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [localErrorHunter, , localErrorInfoBox, localErrorClear, localIndicatorError] = useError()
    const [stageReq, setStageReq] = useState(initStageConfirm)

    const [isErr, setErr] = useState<boolean>(false)
    const [isSuccess, setSuccess] = useState<boolean>(false)

    const fragmentReqParams = useRef<Omit<CreateWithdrawIn, "client_nonce" | "auto_inner_transfer">>({
        currency: $const,
        token_network: id,
        amount: amount,
        fee: withdraw_fee,
        address: isNull(address) ? "" : address,
        partner_info: recipient,
        tag: isNull(description) ? "" : description,
    })
    const {t} = useTranslation()
    const onReSendCode = useCallback(async () => {
        await onConfirm(true)
    }, [])

    const { onInput } = useMask(MASK_CODE)
    const onConfirm = async (reSendCode = false) => {
        setLoading(!reSendCode);
        console.log(`onConfirm start — stageReq?.status: ${stageReq?.status}`)
        // В случае когда требуется подпись
        let sign = null;
        if (stageReq?.status === 2) {
            sign = await SignTX(stageReq.txId + "" + stageReq.code);
            $axios.defaults.headers["x-signature"] = sign;
        }
        else 
        {            
            $axios.defaults.headers["x-signature"] = "";
        }

        const response = await apiCreateWithdraw({
            ...fragmentReqParams.current,
            client_nonce: getRandomInt32(),
            auto_inner_transfer: stageReq.autoInnerTransfer
        }, {
            confirmationTimetick: reSendCode ? null : stageReq.txId,
            confirmationCode: reSendCode
                ? null
                : input !== ""
                    ? formatAsNumber(input)
                    : null
        });

        actionResSuccess(response)
            .success(() => {
                const result:any = response.data?.result;

                if (reSendCode
                    || result.confirmationStatusCode === 0
                    || result.confirmationStatusCode === 1
                    || result.confirmationStatusCode === 2) {
                    setStageReq(prev => ({
                        ...prev,
                        status: result.confirmationStatusCode,
                        txId: result.txId,
                        fee: result.fee,
                        code: result.confirmCode,
                    }))
                }
                if (result.confirmationStatusCode === 4) {

                    if(md){
                        setSuccess(true)
                    }else{
                        handleCancel()
                        setContent(<CtnTrxInfo />)
                        setRefresh()
                    }
                    
                } else {
                    localErrorHunter({ message: "Something went wrong.", code: 1 })
                }

                console.log(`onConfirm end — stageReq?.status: ${stageReq?.status}`)
                console.log(`onConfirm end — result.confirmationStatusCode: ${result.confirmationStatusCode}`)
            })
            .reject((err) => {
                if (err.code === 10035) {
                    setStageReq(prev => ({
                        ...prev,
                        autoInnerTransfer: true,
                        // status: result.confirmationStatusCode,
                        // txId: result.txId,
                        // fee: result.fee
                    }))
                    setErr(true)
                }else if(err.code === 10064){
                    localErrorHunter(err)
                    form.resetFields();
                    setErr(true)
                }else {
                    localErrorHunter(err)
                    form.resetFields();
                }
            })

        setLoading(false)
    }

    if(md && networkTypeSelect === 150){ // Papaya modal
        return  <>
            <hr className={styles.ModalLine}/>
            <div className="row mb-5">
                <div className="col">
                    <div className="p-4">
                        <div className={`wrapper ${styles.ModalInfo}`}>
                            <div className={styles.ModalInfoIcon}>
                                <div className="col">
                                    <WarningIcon/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <span className={styles.ModalInfoText}>
                                        Please, check your transaction information carefully and confirm the operation.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.ModalRows}>
                <div className="row">
                    <div className="col">
                        <span className={styles.ModalRowsTitle}>{t("type_transaction")}</span>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <span className={styles.ModalRowsValue}>{label}</span>
                    </div>
                </div>
            </div>
            <div className={styles.ModalPayInfo}>
                <div className={styles.ModalPayInfoCol}>
                    <div className="row">
                        <span className={styles.ModalPayInfoText}>{t("you_will_pay")}:</span>
                    </div>
                    <div className="row">
                    <span className={styles.ModalPayInfoText}>
                        {t("you_will_get")}:
                    </span>
                    </div>
                    <div className="row">
                        <span className={styles.ModalPayInfoTextFee}>
                            {t("fee")}:
                        </span>
                    </div>
                </div>
                <div className={styles.ModalPayInfoColValue}>

                    <div className={styles.ModalPayInfoCol}>
                        <div className={styles.ModalPayInfoValueFlex}>
                            <span
                                className={styles.ModalPayInfoValueFlexText}>{amount}</span>
                        </div>
                        <div className={styles.ModalPayInfoValueFlex}>
                            <span
                                className={styles.ModalPayInfoValueFlexText}>
                                    {amount-withdraw_fee}
                            </span>
                        </div>
                        <div className={styles.ModalPayInfoValueFlex}>
                            <span
                                className={styles.ModalPayInfoValueFlexTextFee}>
                                    {withdraw_fee}
                            </span>
                        </div>
                    </div>
                    
                    <div className={styles.ModalPayInfoCol}>
                        <span className={styles.ModalPayInfoValueFlexTextCurrency}>
                            {$const}
                        </span>
                        <span className={styles.ModalPayInfoValueFlexTextCurrency}>
                            EUR
                        </span>
                        <span className={styles.ModalPayInfoValueFlexTextFee}>
                            {$const}
                        </span>
                    </div>
                </div>
                
            </div>
            {description && <>
                <div className="row mb-2">
                    <div className="col">
                        <span className="text-gray-400">Description</span>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <span>{description}</span>
                    </div>
                </div>
            </>}
            <Form form={form} onFinish={(e) => onConfirm()}>
                {stageReq.status === 0 || stageReq.status === 1 && <>
                    <span className="text-gray-400">{t("transfer_confirmation")}</span>
                    
                    <FormItem name="code" label="Code" preserve rules={[{required: true, ...codeMessage}]}>
                        
                        <Input type="text"
                        onInput={onInput}
                        autoComplete="off"
                        onChange={({target}) => setInput(target.value)}
                        placeholder={stageReq.status === 0
                            ? t("enter_sms_code")
                            : stageReq.status === 1
                                ? t("enter_code")
                                : t("enter_pin_code")
                        }
                        />
                    </FormItem>
                    
                    <Timer onAction={onReSendCode}/>
                </>}
                <div className="row mt-4">
                    <div className="flex flex-row gap-[5px] relative">
                        {loading ? <Loader className={"relative w-[24px] h-[24px]"}/> :
                            <div className={styles.ButtonContainer}>
                                <Button
                                    htmlType={"submit"}
                                    disabled={(input === "" && stageReq.status !== null)}
                                    className={styles.ButtonTwo}
                                    size={"xl"}
                                    greenTransfer
                                >
                                    {stageReq.status !== 2
                                        ? 'Confirm'
                                        : 'Sign'
                                    }
                                </Button>
                                <Button
                                    onClick={()=>{
                                        setRefresh()
                                        handleCancel()
                                    }}
                                    whiteGreenTransfer
                                    className={styles.ButtonTwo}
                                    size={"xl"}
                                >
                                    Cancel
                                </Button>
                            </div>
                        }
                    </div>
                    <div className="col flex justify-center mt-4">
                        {localErrorInfoBox ? localErrorInfoBox : stageReq.autoInnerTransfer &&
                            <InfoBox>The address is within our system. The transfer will be made via the internal network,
                                and not through the blockchain. Are you sure you want to continue?</InfoBox>}
                    </div>
                </div>
            </Form>
            <StatusModalSuccess refresh={setRefresh} setIsSuccess={setSuccess} open={isSuccess}/>
            <StatusModalError setIsErr={setErr} open={isErr}/>
            {/*{is_operable === false && <>*/}
            {/*    <div className="info-box-danger">*/}
            {/*        <p>Attention: transactions on this network may be delayed. We recommend that you use a different*/}
            {/*            network for this transaction.</p>*/}
            {/*    </div>*/}
            {/*</>}*/}
        </>
    }

    return !md ? <>
        <div className="row mb-5">
            <div className="col">
                <div className="p-4 bg-gray-300">
                    <div className="wrapper flex flex-col">
                        <div className="row mb-1">
                            <div className="col">
                                <span className="text-red-800">{t("please_note")}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <span className="text-gray-400">
                                    {t("use_withdraw_addr_supported")}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-2">
            <div className="col">
                <span className="text-gray-400">{t("network")}</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span>{label}</span>
            </div>
        </div>
        <div className="row mb-2">
            <div className="col">
                <span className="text-gray-400">{t("address")}</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span>{address}</span>
            </div>
        </div>
        <div className="row mb-2">
            <div className="col">
                <span className="text-gray-400">Recipient's name</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span>{recipient}</span>
            </div>
        </div>
        <div className="row mb-2">
            <div className="col">
                <span className="text-gray-400">{t("amount")}</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span>{amount} {$const}</span>
            </div>
        </div>
        <div className="row mb-2">
            <div className="col">
                <span className="text-gray-400">{t("fee")}</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span>{new Decimal(withdraw_fee).toString()} {$const}</span>
            </div>
        </div>
        {description && <>
            <div className="row mb-2">
                <div className="col">
                    <span className="text-gray-400">Description</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <span>{description}</span>
                </div>
            </div>
        </>}
        <Form form={form} onFinish={(e) => onConfirm()}>
            {!isNull(stageReq.status) && <>
                <span className="text-gray-400">{t("transfer_confirmation")}</span>

                <FormItem name="code" label="Code" preserve rules={[{ required: true, ...codeMessage }]}>

                    <Input type="text"
                        onInput={onInput}
                        autoComplete="off"
                        onChange={({ target }) => setInput(target.value)}
                        placeholder={stageReq.status === 0
                            ? t("enter_sms_code") 
                            : stageReq.status === 1
                                ? t("enter_code")
                                : t("enter_pin_code") 
                        }
                    />
                </FormItem>

                <Timer onAction={onReSendCode} />
            </>}
            <div className="row mt-4 mb-5">
                <div className="col relative">
                    {loading ? <Loader className={"relative w-[24px] h-[24px]"} /> :
                        <Button htmlType={"submit"} disabled={(input === "" && stageReq.status !== null)}
                            className="w-full"
                            size={"xl"}>{t("confirm")}</Button>}
                </div>
                <div className="col flex justify-center mt-4">
                    {localErrorInfoBox ? localErrorInfoBox : stageReq.autoInnerTransfer &&
                        <InfoBox>The address is within our system. The transfer will be made via the internal network,
                            and not through the blockchain. Are you sure you want to continue?</InfoBox>}
                </div>
            </div>
        </Form>
        {/*{is_operable === false && <>*/}
        {/*    <div className="info-box-danger">*/}
        {/*        <p>Attention: transactions on this network may be delayed. We recommend that you use a different*/}
        {/*            network for this transaction.</p>*/}
        {/*    </div>*/}
        {/*</>}*/}
    </> : <>
        <hr className="text-[#3A5E66] border-[0px] h-[1px] bg-[#3A5E66]"/>
        <div className="flex justify-center">

            <div className="flex flex-col items-start self-center w-[90%]">
                <div className="row mb-5">
                    <div className="col">
                        <div className="p-4">
                            <div className={`wrapper ${styles.ModalInfo}`}>
                                <div className={styles.ModalInfoIcon}>
                                    <div className="col">
                                        <WarningIcon/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <span className={styles.ModalInfoText}>
                                            Please, check your transaction information carefully and confirm the operation.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.ModalRows}>
                    {label && <> <div className="row mb-2">
                        <div className="col">
                            <span className={styles.ModalRowsTitle}>Type Transaction</span>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col text-[#3A5E66] font-semibold">
                            <span className={styles.ModalRowsValue}>{label}</span>
                        </div>
                    </div> </>}
                    {address && <> <div className="row mb-2">
                        <div className="col">
                            <span className={styles.ModalRowsTitle} >{t("address")}</span>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col text-[#3A5E66] font-semibold ">
                            <span className={styles.ModalRowsValue + " break-keep text-nowrap text-ellipsis"}>{address}</span>
                        </div>
                    </div> </>}
                    {recipient && <> <div className="row mb-2">
                        <div className="col">
                            <span className={styles.ModalRowsTitle}>{t("recipient")}</span>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col text-[#3A5E66] font-semibold">
                            <span className={styles.ModalRowsValue}>{recipient}</span>
                        </div>
                    </div> </>}
                    {description && <>
                        <div className="row mb-2">
                            <div className="col">
                                <span className={styles.ModalRowsTitle}>Description</span>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col text-[#3A5E66] font-semibold">
                                <span className={styles.ModalRowsValue}>{description}</span>
                            </div>
                        </div>
                    </>}
                </div>
                <div className={styles.ModalPayInfo}>
                    <div className={styles.ModalPayInfoCol}>
                        <div className="row">
                            <span className={styles.ModalPayInfoText}>{t("you_will_pay")}:</span>
                        </div>
                        <div className="row">
                        <span className={styles.ModalPayInfoText}>
                            {t("you_will_get")}:
                        </span>
                        </div>
                        <div className="row">
                            <span className={styles.ModalPayInfoTextFee}>
                                {t("fee")}:
                            </span>
                        </div>
                    </div>
                    <div className={styles.ModalPayInfoColValue}>

                        <div className={styles.ModalPayInfoCol}>
                            <div className={styles.ModalPayInfoValueFlex}>
                                <span
                                    className={styles.ModalPayInfoValueFlexText}>{amount}</span>
                            </div>
                            <div className={styles.ModalPayInfoValueFlex}>
                                <span
                                    className={styles.ModalPayInfoValueFlexText}>
                                        {amount-withdraw_fee}
                                </span>
                            </div>
                            <div className={styles.ModalPayInfoValueFlex}>
                                <span
                                    className={styles.ModalPayInfoValueFlexTextFee}>
                                        {withdraw_fee}
                                </span>
                            </div>
                        </div>
                        
                        <div className={styles.ModalPayInfoCol}>
                            <span className={styles.ModalPayInfoValueFlexTextCurrency}>
                                {$const}
                            </span>
                            <span className={styles.ModalPayInfoValueFlexTextCurrency}>
                                {$const}
                            </span>
                            <span className={styles.ModalPayInfoValueFlexTextFee}>
                                {$const}
                            </span>
                        </div>
                    </div>
                    
                </div>
            
                <Form form={form} wrapperClassName="w-full" onFinish={(e) => onConfirm()}>
                    <div className="w-full row mt-4">
                        <div className="w-full flex flex-row gap-[5px] relative">
                            {loading ? <Loader className={"relative w-[24px] h-[24px]"}/> :
                                <>
                                    <div className="w-full gap-5 flex flex-col justify-between">
                                        {!isNull(stageReq.status) && <>
                                            <span className="text-gray-400">{t("transfer_confirmation")}</span>

                                            <FormItem name="code" label="Code" preserve rules={[{ required: true, ...codeMessage }]}>

                                                <Input type="text"
                                                    onInput={onInput}
                                                    autoComplete="off"
                                                    onChange={({ target }) => setInput(target.value)}
                                                    placeholder={stageReq.status === 0
                                                        ? t("enter_sms_code") 
                                                        : stageReq.status === 1
                                                            ? t("enter_code")
                                                            : t("enter_pin_code") 
                                                    }
                                                />
                                            </FormItem>

                                            <Timer onAction={onReSendCode} />
                                        </>}
                                        <div className={styles.ButtonContainer + " w-full"}>
                                            
                                            {stageReq.status === 2 ? 
                                                    <Button
                                                        htmlType={"submit"}
                                                        onClick={()=>{onConfirm()}}
                                                        disabled={(input === "" && stageReq.status !== null)}
                                                        className={styles.ButtonTwo}
                                                        greenTransfer
                                                    >
                                                        {t("sign_transfer")}
                                                    </Button> 
                                                : 
                                                    isNull(stageReq.status) ? <Button
                                                        htmlType={"submit"}
                                                        onClick={()=>{onConfirm()}}
                                                        disabled={(input === "" && stageReq.status !== null)}
                                                        className={styles.ButtonTwo}
                                                        greenTransfer
                                                    >
                                                        {t("send_sms")}
                                                    </Button> : <Button
                                                        htmlType={"submit"}
                                                        onClick={()=>{onConfirm()}}
                                                        disabled={(input === "" && stageReq.status !== null)}
                                                        className={styles.ButtonTwo}
                                                        greenTransfer
                                                    >
                                                        {t("confirm")}
                                                    </Button> 
                                            }
                                            <Button
                                                onClick={()=>{handleCancel()}}
                                                whiteGreenTransfer
                                                className={styles.ButtonTwo}
                                                size={"xl"}
                                            >
                                                {t("cancel")}
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                        <div className="col flex justify-center mt-4">
                            {localErrorInfoBox ? localErrorInfoBox : stageReq.autoInnerTransfer &&
                                <InfoBox>The address is within our system. The transfer will be made via the internal network,
                                    and not through the blockchain. Are you sure you want to continue?</InfoBox>}
                        </div>
                    </div>
                </Form>
                <StatusModalSuccess refresh={setRefresh} setIsSuccess={setSuccess} open={isSuccess}/>
                <StatusModalError setIsErr={setErr} open={isErr}/>
                {/*{is_operable === false && <>*/}
                {/*    <div className="info-box-danger">*/}
                {/*        <p>Attention: transactions on this network may be delayed. We recommend that you use a different*/}
                {/*            network for this transaction.</p>*/}
                {/*    </div>*/}
                {/*</>}*/}
            </div>
        </div>
    </>
})

export default WithdrawConfirmCrypto
