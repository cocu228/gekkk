import {useCallback, useContext, useState, memo, useRef, Dispatch, SetStateAction} from "react";
import {CtxWalletNetworks, CtxWalletData} from "@/widgets/wallet/transfer/model/context";
import Button from "@/shared/ui/button/Button";
import {apiCreateWithdraw} from "@/shared/(orval)api/gek";
import Decimal from "decimal.js";
import {actionResSuccess, getRandomInt32, isNull, uncoverResponse} from "@/shared/lib/helpers";
import Input from "@/shared/ui/input/Input";
import Form from '@/shared/ui/form/Form';
import FormItem from '@/shared/ui/form/form-item/FormItem';
import {codeMessage} from "@/shared/config/message";
import useMask from "@/shared/model/hooks/useMask";
import {MASK_CODE} from "@/shared/config/mask";
import Loader from "@/shared/ui/loader";
import {CtxRootData} from "@/processes/RootContext";
import useError from "@/shared/model/hooks/useError";
import {getChosenNetwork} from "@/widgets/wallet/transfer/model/helpers";
import Timer from "@/shared/model/hooks/useTimer";
import InfoBox from "@/widgets/info-box";
import {IWithdrawFormCryptoState} from "@/widgets/wallet/transfer/withdraw/ui/forms/crypto/WithdrawFormCrypto";
import {IUseInputState} from "@/shared/ui/input-currency/model/useInputState";
import {useForm} from "antd/es/form/Form";
import {CtxModalTrxInfo} from "@/widgets/wallet/transfer/withdraw/model/context";
import {CtnTrxInfo} from "@/widgets/wallet/transfer/withdraw/model/entitys";
import {CreateWithdrawIn} from "@/shared/(orval)api/gek/model";
import {formatAsNumber} from "@/shared/lib/formatting-helper";
import { $axios } from "@/shared/lib/(orval)axios";
import { SignTX } from "../../crypto/signTX";
import { useTranslation } from "react-i18next";


const initStageConfirm = {
    status: null,
    txId: null,
    fee: null,
    autoInnerTransfer: false,
    code: null
}

type TProps = IWithdrawFormCryptoState & {
    amount: IUseInputState["value"]["number"],
    willPay: number,
    setErr: Dispatch<SetStateAction<boolean>>,
    success: Dispatch<SetStateAction<boolean>>,
    handleCancel: () => void
}

const WithdrawConfirmPapayaMobile = memo(({
    address,
    willPay,
    amount,
    recipient,
    description,
    handleCancel,
    setErr,
    success
}: TProps) => {
    const {
        networkTypeSelect,
        networksForSelector,
        tokenNetworks
    } = useContext(CtxWalletNetworks)

    const {label} = networksForSelector.find(it => it.value === networkTypeSelect)
    const [form] = useForm();
    const {
        id,
        percent_fee = 0,
        withdraw_fee = 0,
    } = getChosenNetwork(tokenNetworks, networkTypeSelect) ?? {}

    const {$const} = useContext(CtxWalletData)
    const {setRefresh} = useContext(CtxRootData)
    const setContent = useContext(CtxModalTrxInfo)
    const {t} = useTranslation()
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const [localErrorHunter, , localErrorInfoBox, localErrorClear, localIndicatorError] = useError()
    const [stageReq, setStageReq] = useState(initStageConfirm)

    const fragmentReqParams = useRef<Omit<CreateWithdrawIn, "client_nonce" | "auto_inner_transfer">>({
        currency: $const,
        token_network: id,
        amount: amount,
        fee: withdraw_fee,
        address: isNull(address) ? "" : address,
        partner_info: recipient,
        tag: isNull(description) ? "" : description,
    })

    const onReSendCode = useCallback(async () => {
        await onConfirm(true)
    }, [])
    
    const {onInput} = useMask(MASK_CODE)
    const onConfirm = async (reSendCode = false) => {
        setLoading(!reSendCode);

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
            confirmationCode: reSendCode ? null : input !== "" ? formatAsNumber(input) : null
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
                        code: result.confirmCode
                    }))
                    success(true)
                }
                if (result.confirmationStatusCode === 4) {
                    handleCancel()
                    setContent(<CtnTrxInfo/>)
                    setRefresh()
                } else {
                    localErrorHunter({message: "Something went wrong.", code: 1})
                }
            })
            .reject((err) => {
                setErr(true)
                if (err.code === 10035) {
                    setStageReq(prev => ({
                        ...prev,
                        autoInnerTransfer: true,
                        // status: result.confirmationStatusCode,
                        // txId: result.txId,
                        // fee: result.fee
                    }))
                } else {
                    localErrorHunter(err)
                    form.resetFields();
                }
            })

        setLoading(false)
    }

    return <>
        <div className="row mb-5">
            <div className="col">
                <div className="p-4">
                    <div className="wrapper flex flex-row">
                        <div className="row mb-1">
                            <div className="col">
                                {/* image ! */}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <span className="text-[10px] text-[#7B797C]">
                                    Please, check your transaction information carefully and confirm the operation.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mb-2">
            <div className="col">
                <span className="text-gray-400">Type Transaction</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span>{label}</span>
            </div>
        </div>
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
                        className="w-full text-start">{willPay} {$const}</span>
                </div>
                <div className="row flex items-end">
                    {loading ? t("loading")+"..." : <span
                        className="w-full text-start">{willPay-withdraw_fee} EUR</span>}
                </div>
                <div className="row flex items-end">
                    {loading ? t("loading")+"..." : <span
                        className="w-full text-start">{withdraw_fee} {$const}</span>}
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
            {!isNull(stageReq.status) && <>
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
            <div className="row mt-4 mb-5">
                <div className="flex flex-row gap-[5px] relative">
                    {loading ? <Loader className={"relative w-[24px] h-[24px]"}/> :
                        <>
                            <Button
                                htmlType={"submit"}
                                onClick={()=>{handleCancel()}}
                                disabled={(input === "" && stageReq.status !== null)}
                                className="w-full"
                                size={"xl"}
                            >
                                Confirm
                            </Button>
                            <Button
                                onClick={()=>{handleCancel()}}
                                disabled={(input === "" && stageReq.status !== null)}
                                red
                                className="w-full"
                                size={"xl"}
                            >
                                Cancel
                            </Button>
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
        {/*{is_operable === false && <>*/}
        {/*    <div className="info-box-danger">*/}
        {/*        <p>Attention: transactions on this network may be delayed. We recommend that you use a different*/}
        {/*            network for this transaction.</p>*/}
        {/*    </div>*/}
        {/*</>}*/}
    </>
})

export default WithdrawConfirmPapayaMobile
