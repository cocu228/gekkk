import {Skeleton} from "antd";
import Loader from "@/shared/ui/loader";
import Form from '@/shared/ui/form/Form';
import {formatAsNumber} from "@/shared/lib";
import {apiGetUas} from "@/shared/(orval)api";
import Button from "@/shared/ui/button/Button";
import {CtxRootData} from "@/processes/RootContext";
import {useContext, useEffect, useRef, useState} from "react";
import {apiPaymentContact, IResCommission} from "@/shared/api";
import {storeAccountDetails} from "@/shared/store/account-details/accountDetails";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import {signHeadersGeneration} from "@/widgets/action-confirmation-window/model/helpers";
import { useTranslation } from "react-i18next";

interface IState {
    loading: boolean;
    totalCommission: IResCommission;
}

const WithdrawConfirmPhoneNumber = ({
    amount,
    comment,
    phoneNumber,
    handleCancel
}) => {
    const [{
        loading,
        totalCommission
    }, setState] = useState<IState>({
        loading: false,
        totalCommission: undefined
    });
    const {t} = useTranslation()
    const {account} = useContext(CtxRootData);
    const {$const} = useContext(CtxWalletData);
    const {getAccountDetails} = storeAccountDetails(state => state);
    const {networkTypeSelect, networksForSelector} = useContext(CtxWalletNetworks);
    const {label} = networksForSelector.find(it => it.value === networkTypeSelect);

    const details = useRef({
        account: account.account_id,
        beneficiaryName: null,
        cardNumber: null,
        phoneNumber: formatAsNumber(phoneNumber),
        purpose: comment,
        amount: {
            sum: {
                value: amount,
                currency: {
                    code: $const
                }
            }
        }
    });

    // TODO: !!!Refactor bank confirmation logic in all bank methods
    const onConfirm = async () => {
        setState(prev => ({
            ...prev,
            loading: true
        }));
        
        const {data} = await apiGetUas();
        const {phone} = await getAccountDetails();
        
        await apiPaymentContact(details.current, false, {
            Authorization: phone,
            Token: data.result.token
        }).then(async (response) => {
            // @ts-ignore
            const confToken = response.data.errors[0].properties.confirmationToken;
            
            const headers = await signHeadersGeneration(phone, confToken);
            
            await apiPaymentContact(details.current, false, {
                ...headers,
                Authorization: phone,
                Token: data.result.token
            }).then(handleCancel);
        });
    }
    
    useEffect(() => {
        (async () => {
            const {data} = await apiGetUas();
            const {phone} = await getAccountDetails();
            
            apiPaymentContact(details.current, true, {
                Authorization: phone,
                Token: data.result.token
            }).then(({data}) => setState(prev => ({
                ...prev,
                totalCommission: data as IResCommission
            })));
        })();
    }, []);
    
    return <div>
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
                    <span className="text-gray-400">{t("recepient_phone_number")}</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <span>{phoneNumber}</span>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <span className="text-gray-400">{t("amount")}</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    <span>{amount ?? '-'} {$const}</span>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <span className="text-gray-400">{t("fee")}</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    {totalCommission !== undefined ? (
                        <span>{totalCommission.commission ?? '-'} {$const}</span>
                    ) : (
                        <Skeleton.Input style={{height: 16}} active/>
                    )}
                </div>
            </div>
            <div className="row mb-2">
                <div className="col">
                    <span className="text-gray-400">{t("total_amount")}</span>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col">
                    {totalCommission !== undefined ? (
                        <span>{totalCommission.total ?? '-'} {$const}</span>
                    ) : (
                        <Skeleton.Input style={{height: 16}} active/>
                    )}
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
                <div className="row my-5">
                    <div className="col">
                        <Button size={"xl"}
                                htmlType={"submit"}
                                className="w-full"
                                disabled={!totalCommission}
                        >{t("confirm")}</Button>
                    </div>
                </div>
            </Form>
        </div>
    </div>
}

export default WithdrawConfirmPhoneNumber;
