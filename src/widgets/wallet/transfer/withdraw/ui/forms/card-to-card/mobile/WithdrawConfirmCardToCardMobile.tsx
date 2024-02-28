import {Skeleton} from "antd";
import Loader from "@/shared/ui/loader";
import Form from '@/shared/ui/form/Form';
import Button from "@/shared/ui/button/Button";
import {CtxRootData} from "@/processes/RootContext";
import {useContext, useEffect, useRef, useState} from "react";
import {apiPaymentContact, IResCommission} from "@/shared/api";
import {storeActiveCards} from "@/shared/store/active-cards/activeCards";
import {formatCardNumber} from "@/widgets/dashboard/model/helpers";
import {CtxWalletData, CtxWalletNetworks} from "@/widgets/wallet/transfer/model/context";
import { useTranslation } from "react-i18next";
import { storeAccountDetails } from "@/shared/store/account-details/accountDetails";
import { apiGetUas } from "@/shared/(orval)api";
import { signHeadersGeneration } from "@/widgets/action-confirmation-window/model/helpers";

interface IState {
    loading: boolean;
    total: IResCommission;
}

const WithdrawConfirmCardToCardMobile = ({
    amount,
    comment,
    cardNumber,
    selectedCard,
    cardholderName,
    handleCancel
}) => {
    const [{
        total,
        loading
    }, setState] = useState<IState>({
        loading: false,
        total: undefined
    });
    const {t} = useTranslation()
    const {account} = useContext(CtxRootData);
    const {$const} = useContext(CtxWalletData);
    const cards = storeActiveCards(state => state.activeCards);
    const {getAccountDetails} = storeAccountDetails(state => state);
    const {networkTypeSelect, networksForSelector} = useContext(CtxWalletNetworks);
    const {label} = networksForSelector?.find(it => it.value === networkTypeSelect);

    const details = useRef({
        account: account.account_id,
        beneficiaryName: cardholderName,
        cardNumber: cardNumber,
        fromCardId: selectedCard,
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
                <div className="w-full">
                    {label && <> <div className="row mb-2">
                        <div className="col">
                            <span className="text-gray-400">Type Transaction</span>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col">
                            <span>{label}</span>
                        </div>
                    </div> </>}
                    {selectedCard && <> <div className="row mb-2">
                        <div className="col">
                            <span className="text-gray-400">{t("from_card")}</span>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col">
                            <span>{selectedCard}</span>
                        </div>
                    </div> </>}
                    {cardNumber && <> <div className="row mb-2">
                        <div className="col">
                            <span className="text-gray-400">{t("to_card")}</span>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col">
                            <span>{cardNumber}</span>
                        </div>
                    </div> </>}
                    {cardholderName && <> <div className="row mb-2">
                        <div className="col">
                            <span className="text-gray-400">{t("cardholder")}</span>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col">
                            <span>{cardholderName}</span>
                        </div>
                    </div> </>}
                    {comment && <>
                        <div className="row mb-2">
                            <div className="col">
                                <span className="text-gray-400">{t("description")}</span>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col">
                                <span>{comment}</span>
                            </div>
                        </div>
                    </>}
                </div>
                <div className="row w-full flex justify-between gap-4 text-gray-400 font-medium mb-4 mt-6 text-sm">
                    <div className="col flex flex-col w-[max-content] gap-2">
                        <div className="row">
                            <span>You will pay</span>
                        </div>
                        <div className="row">
                        <span>
                            You will get
                        </span>
                        </div>
                        <div className="row">
                            <span>
                            Fee
                        </span>
                        </div>
                    </div>
                    <div className="col flex flex-col w-[max-content] gap-2">
                        <div className="row flex items-end">
                            <span
                                className="w-full text-start">{amount + total?.commission ? total.commission : 0} {$const}</span>
                        </div>
                        <div className="row flex items-end">
                            {loading ? "Loading..." : <span
                                className="w-full text-start">{amount} {$const}</span>}
                        </div>
                        <div className="row flex items-end">
                            {loading ? "Loading..." : <span
                                className="w-full text-start">{total?.commission ?? '-'} {$const}</span>}
                        </div>
                    </div>
                </div>
            

            <Form onFinish={onConfirm}>
                <div className="row my-5">
                    <div className="flex flex-row gap-5">
                        <Button size={"xl"}
                                htmlType={"submit"}
                                className="w-full"
                                disabled={!total}
                        >{t("confirm")}</Button>
                        <Button size={"xl"}
                                onClick={handleCancel}
                                className="w-full"
                                darkBlue
                        >{t("cancel")}</Button>
                    </div>
                </div>
            </Form>
        </div>
    </div>
}

export default WithdrawConfirmCardToCardMobile;
