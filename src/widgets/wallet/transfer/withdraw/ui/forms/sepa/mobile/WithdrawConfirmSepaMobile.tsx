import {Skeleton} from "antd";
import Loader from "@/shared/ui/loader";
import Form from '@/shared/ui/form/Form';
import Button from "@/shared/ui/button/Button";
import {CtxRootData} from "@/processes/RootContext";
import {apiPaymentSepa, IResCommission, IResResult} from "@/shared/api";
import {useContext, useEffect, useRef, useState} from "react";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import {CtnTrxInfo} from "@/widgets/wallet/transfer/withdraw/model/entitys";
import { transferDescriptions } from "../../../../model/transfer-descriptions";
import { storeAccountDetails } from "@/shared/store/account-details/accountDetails";
import { apiGetUas } from "@/shared/(orval)api";
import { signHeadersGeneration } from "@/widgets/action-confirmation-window/model/helpers";
import { useTranslation } from "react-i18next";

interface IState {
    loading: boolean;
    total: IResCommission;
    status: 'error' | 'success' | null;
}

const WithdrawConfirmSepaMobile = ({
    amount,
    comment,
    accountNumber,
    beneficiaryName,
    transferDescription,
}) => {
    const [{
        total,
        status,
        loading,
    }, setState] = useState<IState>({
        status: null,
        loading: false,
        total: undefined,
    });

    const {account} = useContext(CtxRootData);
    const {$const} = useContext(CtxWalletData);
    const {getAccountDetails} = storeAccountDetails(state => state);
    const {networkTypeSelect, networksForSelector} = useContext(CtxWalletNetworks);
    const {label} = networksForSelector.find(it => it.value === networkTypeSelect);
    const {t} = useTranslation()

    const details = useRef({
        purpose: comment,
        iban: accountNumber,
        account: account.account_id,
        beneficiaryName: beneficiaryName,
        transferDetails: transferDescriptions.find(d => d.value === transferDescription).label,
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
        setState(prev => ({
            ...prev,
            loading: true
        }));

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
            }).then(({data}) => (setState(prev => ({
                ...prev,
                status: (data as IResResult).status === 'ok' ? 'success' : 'error'
            }))));
        });
    }
    
    useEffect(() => {
        (async () => {
            const {data} = await apiGetUas();
            const {phone} = await getAccountDetails();
            
            apiPaymentSepa(details.current, true, {
                Authorization: phone,
                Token: data.result.token
            }).then(({data}) => (setState(prev => ({
                ...prev,
                total: data as IResCommission
            }))));
        })();
    }, []);

    return status ? <CtnTrxInfo status={status}/> : <div>
        {loading && <Loader className='justify-center'/>}
        
        <div className={loading ? 'collapse' : ''}>
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
                    <span className="text-[#1F3446] text-[12px] font-semibold">{t("amount")}</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <span>{amount ?? '-'} {$const}</span>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <span className="text-[#1F3446] text-[12px] font-semibold">{t("fee")}</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    {total !== undefined ? (
                        <span>{total.commission ?? '-'} {$const}</span>
                    ) : (
                        <Skeleton.Input style={{height: 16}} active/>
                    )}
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <span className="text-[#1F3446] text-[12px] font-semibold">{t("total_amount")}</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    {total !== undefined ? (
                        <span>{total.total ?? '-'} {$const}</span>
                    ) : (
                        <Skeleton.Input style={{height: 16}} active/>
                    )}
                </div>
            </div>
            {!comment ? null : <>
                <div className="row mb-2">
                    <div className="col">
                        <span className="text-[#1F3446] text-[12px] font-semibold">{t("comment")}</span>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <span>{comment}</span>
                    </div>
                </div>
            </>}

            <Form onFinish={onConfirm}>
                <div className="row my-5">
                    <div className="col">
                        <Button size={"xl"}
                                className="w-full"
                                htmlType={"submit"}
                                disabled={!total}
                        >{t("confirm")}</Button>
                    </div>
                </div>
            </Form>
        </div>
    </div>
}

export default WithdrawConfirmSepaMobile;
