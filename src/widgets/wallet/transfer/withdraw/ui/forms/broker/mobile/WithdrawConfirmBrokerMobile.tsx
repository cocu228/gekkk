import Decimal from "decimal.js";
import Loader from "@/shared/ui/loader";
import Form from '@/shared/ui/form/Form';
import {IResErrors, apiPaymentSepa} from "@/shared/api";
import Button from "@/shared/ui/button/Button";
import {useContext, useEffect, useRef, useState} from "react";
import {CtxRootData} from "@/processes/RootContext";
import {getChosenNetwork} from "@/widgets/wallet/transfer/model/helpers";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import {CtxModalTrxInfo} from "@/widgets/wallet/transfer/withdraw/model/context";
import {CtnTrxInfo} from "@/widgets/wallet/transfer/withdraw/model/entitys";
import { useTranslation } from "react-i18next";
import { apiGetUas } from "@/shared/(orval)api";
import { storeAccountDetails } from "@/shared/store/account-details/accountDetails";
import { signHeadersGeneration } from "@/widgets/action-confirmation-window/model/helpers";

const WithdrawConfirmBrokerMobile = ({amount, handleCancel, setErr = null, setSuccess = null}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const {t} = useTranslation()
    const {
        networkTypeSelect,
        networksForSelector,
        tokenNetworks
    } = useContext(CtxWalletNetworks);

    const {
        token_hot_address,
        withdraw_fee
    } = getChosenNetwork(
        tokenNetworks,
        networkTypeSelect
    ) ?? {}

    const {account} = useContext(CtxRootData);
    const {$const} = useContext(CtxWalletData);
    const {getAccountDetails} = storeAccountDetails(state => state);
    const {label} = networksForSelector.find(it => it.value === networkTypeSelect);

    const details = useRef({
        purpose: "Purchase of EURG tokens",
        iban: token_hot_address,
        account: account.account_id,
        beneficiaryName: account.name,
        amount: {
            sum: {
                currency: {
                    code: $const
                },
                value: amount
            }
        }
    });

    const onConfirm = async () => {
        setLoading(true);
        
        const {data} = await apiGetUas();
        const {phone} = await getAccountDetails();
        
        await apiPaymentSepa(details.current, false, {
            Authorization: phone,
            Token: data.result.token
        }).then(async (response) => {
            // @ts-ignore
            const confToken = response.data.errors[0].properties.confirmationToken;
            
            const headers = await signHeadersGeneration(phone, confToken);

            await apiPaymentSepa(details.current, false, {
                ...headers,
                Authorization: phone,
                Token: data.result.token
            }).then((response)=>{
                if ((response.data as IResErrors).errors) {
                    setErr(true);
                    handleCancel();
                    setLoading(false);
                }

                handleCancel()
                setSuccess(true)
            }).catch(()=>{
                handleCancel()
                setErr(true)
            }).finally(()=>{
                setLoading(false);
            });
        }).catch(()=>{
            handleCancel()
            setErr(true)
        }).finally(()=>{
            setLoading(false);
        });
    }

    return <div>
        {loading && <Loader className='justify-center'/>}
        
        <div className={loading ? 'collapse' : ''}>
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
                            className="w-full text-start">{amount} {$const}</span>
                    </div>
                    <div className="row flex items-end">
                        {loading ? t("loading")+"..." : <span
                            className="w-full text-start">{amount-withdraw_fee} EUR</span>}
                    </div>
                    <div className="row flex items-end">
                        {loading ? t("loading")+"..." : <span
                            className="w-full text-start">{withdraw_fee} {$const}</span>}
                    </div>
                </div>
            </div>

           
            
            <Form onFinish={onConfirm}>
                <div className="row mt-4 mb-4">
                    <div className="flex flex-row gap-5">
                        <Button size={"xl"}
                                className="w-full"
                                htmlType={"submit"}
                        >{t("confirm")}</Button>
                        <Button size={"xl"}
                                className="w-full"
                                onClick={handleCancel}
                                darkBlue
                        >{t("cancel")}</Button>
                    </div>
                </div>
            </Form>
        </div>
        
    </div>
}

export default WithdrawConfirmBrokerMobile;
