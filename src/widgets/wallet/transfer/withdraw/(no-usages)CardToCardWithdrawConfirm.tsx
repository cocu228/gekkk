import {useContext, useState} from "react";
import {CtxWalletNetworks, CtxWalletData} from "../model/context";
import Button from "../../../../shared/ui/button/Button";
import Input from "../../../../shared/ui/input/Input";
import Form from '../../../../shared/ui/form/Form';
import FormItem from '../../../../shared/ui/form/form-item/FormItem';
import {codeMessage} from "../../../../shared/config/message";
import useMask from "../../../../shared/model/hooks/useMask";
import {MASK_CODE} from "../../../../shared/config/mask";
import Loader from "../../../../shared/ui/loader";
import {CtxRootData} from "../../../../processes/RootContext";
import useError from "../../../../shared/model/hooks/useError";
import {getChosenNetwork} from "../model/helpers";
import {apiPasswordVerify} from "../../../../shared/api/various/password";
import {actionResSuccess} from "../../../../shared/lib/helpers";
import {formatAsNumber} from "../../../../shared/lib/formatting-helper";
import {useTranslation} from 'react-i18next';

const NoUsagesCardToCardWithdrawConfirm = ({
                                 beneficiaryName,
                                 accountNumber,
                                 transferDescription,
                                 comment,
                                 amount,
                                 handleCancel,
                             }) => {

    const {
        networkTypeSelect
        , networksForSelector
        , tokenNetworks
    } = useContext(CtxWalletNetworks)

    const {label} = networksForSelector.find(it => it.value === networkTypeSelect)

    const {
        percent_fee = null,
        withdraw_fee = null,
        is_operable = null
    } = getChosenNetwork(
        tokenNetworks,
        networkTypeSelect
    ) ?? {}

    const {$const} = useContext(CtxWalletData)

    const {setRefresh} = useContext(CtxRootData)

    const [input, setInput] = useState("")

    const [loading, setLoading] = useState(false)

    const [localErrorHunter, , localErrorInfoBox, localErrorClear, localIndicatorError] = useError()

    const {onInput} = useMask(MASK_CODE);
    const {t} = useTranslation();
    const onConfirm = async () => {

        setLoading(true)

        const response = apiPasswordVerify(formatAsNumber(input))

        actionResSuccess(response)
            .success(() => {
                handleCancel()
                setRefresh()
            })
            .reject(localErrorHunter)

        setLoading(false)

    }

    return loading ? <Loader/> : <>
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
                        <span className="text-gray-400">{t("use_withdraw_addr_supported")}
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
                <span className="text-gray-400">{t("beneficiary_name")}</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span>{beneficiaryName}</span>
            </div>
        </div>
        <div className="row mb-2">
            <div className="col">
                <span className="text-gray-400">{t("account_number")}</span>
            </div>
        </div>
        <div className="row mb-4">
            <div className="col">
                <span>{accountNumber}</span>
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
                <span>{withdraw_fee} {$const}</span>
            </div>
        </div>
        {!comment ? null : <>
            <div className="row mb-2">
                <div className="col">
                    <span className="text-gray-400">{t("comment")}</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <span>{comment}</span>
                </div>
            </div>
        </>}
        <Form onFinish={onConfirm}>

            <span>{t("transfer_confirm")}</span>

            <FormItem className={"mb-4"} name="code" label={t("code")} preserve
                      rules={[{required: true, ...codeMessage}]}>

                <Input type="text"
                       onInput={onInput}
                       placeholder={t("enter_PIN")}
                       onChange={({target}) => setInput(target.value)}
                       autoComplete="off"
                />
            </FormItem>

            <div className="row mb-5">
                <div className="col">
                    <Button htmlType={"submit"} disabled={input === ""} className="w-full"
                            size={"xl"}>{t("confirm")}</Button>
                </div>
                <div className="col flex justify-center mt-4">
                    {localErrorInfoBox}
                </div>
            </div>
        </Form>

        {is_operable === false && <>
            <div className="info-box-danger">
                <p>{t("attention")}.</p>
            </div>
        </>}
    </>
}

export default NoUsagesCardToCardWithdrawConfirm
